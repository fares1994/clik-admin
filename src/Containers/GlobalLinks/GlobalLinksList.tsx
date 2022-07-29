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
import { globalLniks } from "Containers/QueryReturns";
import { Actions } from "Components/ActionsButtons";
import { ExportList, UpdateRecordAction } from "../Actions/ConfigsActions";
import { Search } from "Components/Search";

export const GlobalLinksList: React.FC = () => {
  const { show, edit } = useNavigation();
  const [searchResults, setSearchResults] = React.useState([]);
  const { tableQueryResult } = useTable({
    metaData: {
      fields: globalLniks,
    },
  });

  const handleExportList = () => {
    ExportList(tableQueryResult?.data?.data || [], "GlobalLInks");
  };

  return (
    <List
      title={`${"Global Links"}`}
      pageHeaderProps={{
        extra: (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Search
              path="globalLink"
              setSearchResults={setSearchResults}
              searchResults={searchResults}
              data={tableQueryResult.data?.data || []}
            />
            <CreateButton style={{ marginLeft: 5 }}>
              Create Global Link
            </CreateButton>
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
              record._id && show("findAllGlobalLinks", record._id);
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
          dataIndex="type"
          title={"Type"}
          width={10}
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex="title"
          title={"Title"}
          render={(value) => <TextField value={value} />}
        />

        <Table.Column
          dataIndex="placeholder"
          title={"Place Holder"}
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
                name_ar="Global Link"
                edit
                deleteRecord
                record={record}
                onClickEdit={() =>
                  record?._id && edit("findAllGlobalLinks", record?._id)
                }
                onClickDelete={() =>
                  UpdateRecordAction(
                    "updateGlobalLink",
                    {
                      updateGlobalLinkInput: {
                        value: {
                          id: record?._id,
                          deleted: !record?.deleted,
                        },
                        required: true,
                        type: "UpdateGlobalLinkInput",
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
