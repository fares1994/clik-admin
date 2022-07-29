import React from "react";
import {
  BooleanField,
  CreateButton,
  ExportButton,
  List,
  Table,
  TextField,
} from "@pankod/refine-antd";
import { useNavigation, useTable } from "@pankod/refine-core";
import { titles } from "Containers/QueryReturns";
import { Actions } from "Components/ActionsButtons";
import { ExportList, UpdateRecordAction } from "../Actions/ConfigsActions";
import { Search } from "Components/Search";

export const TitlesList: React.FC = () => {
  const { show, edit } = useNavigation();
  const [searchResults, setSearchResults] = React.useState([]);
  const { tableQueryResult } = useTable({
    metaData: { fields: titles },
  });

  const handleExportList = () => {
    ExportList(tableQueryResult?.data?.data || [], "Titles");
  };

  return (
    <List
      title={`${"Titles"}`}
      pageHeaderProps={{
        extra: (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Search
              path="title"
              setSearchResults={setSearchResults}
              searchResults={searchResults}
              data={tableQueryResult.data?.data || []}
            />
            <CreateButton style={{ marginLeft: 5 }}>Create Title</CreateButton>
            <ExportButton
              onClick={handleExportList}
              style={{ marginLeft: 5 }}
            />
          </div>
        ),
      }}
    >
      <Table
        dataSource={
          searchResults?.length > 0
            ? searchResults
            : tableQueryResult.data?.data
        }
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
          width={10}
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex="title"
          title={"Title"}
          render={(value) => <TextField value={value} />}
        />

        <Table.Column
          dataIndex="category"
          width={10}
          title={"Category"}
          render={(value) => <TextField value={value} />}
        />

        {/* <Table.Column
          dataIndex={"deleted"}
          title={"Deleted"}
          align={"center"}
          render={(value) => <BooleanField value={value} />}
        /> */}

        <Table.Column<any>
          title={"Actions"}
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
