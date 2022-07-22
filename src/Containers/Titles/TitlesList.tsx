import React from "react";
import {
  BooleanField,
  CreateButton,
  List,
  Table,
  TextField,
} from "@pankod/refine-antd";
import { useNavigation, useTable } from "@pankod/refine-core";
import { titles } from "Containers/QueryReturns";
import { Actions } from "Components/ActionsButtons";
import { UpdateRecordAction } from "../Actions/ConfigsActions";

export const TitlesList: React.FC = () => {
  const { show, edit } = useNavigation();
  const { tableQueryResult } = useTable({
    metaData: { fields: titles },
  });

  return (
    <List
      title={`${"Titles"}`}
      pageHeaderProps={{
        extra: (
          <div style={{ display: "flex", flexDirection: "row" }}>
            {/* <Search
              path="comment"
              setSearchResults={setSearchResults}
              searchResults={searchResults}
            /> */}
            <CreateButton>Create Title</CreateButton>
          </div>
        ),
      }}
    >
      <Table
        dataSource={tableQueryResult.data?.data}
        rowKey="id"
        style={{ cursor: "pointer" }}
        onRow={(record) => {
          return {
            onClick: () => {
              record._id && show("findTitles", record._id);
            },
          };
        }}
      >
        <Table.Column
          dataIndex="_id"
          title={"ID"}
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex="title"
          title={"Title"}
          render={(value) => <TextField value={value} />}
        />

        <Table.Column
          dataIndex="category"
          title={"Category"}
          render={(value) => <TextField value={value} />}
        />

        <Table.Column
          dataIndex={"deleted"}
          title={"Deleted"}
          align={"center"}
          render={(value) => <BooleanField value={value} />}
        />

        <Table.Column<any>
          title={"Actoins"}
          dataIndex="actions"
          align="center"
          render={(_text, record): any => {
            return (
              <Actions
                name_ar="Title"
                edit
                deleteRecord
                record={record}
                onClickEdit={() =>
                  record?._id && edit("findTitles", record?._id)
                }
                onClickDelete={() =>
                  UpdateRecordAction(
                    "updateTitle",
                    {
                      updateTitleInput: {
                        value: {
                          id: record?._id,
                          deleted: !record?.deleted,
                        },
                        required: true,
                        type: "UpdateTitleInput",
                      },
                    },
                    tableQueryResult?.refetch
                  )
                }
              />
            );
          }}
        />
      </Table>
    </List>
  );
};
