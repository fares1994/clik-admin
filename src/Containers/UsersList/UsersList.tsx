import React, { useState } from "react";
import { useNavigation, useTable } from "@pankod/refine-core";
import { account } from "Containers/QueryReturns";
import { Actions } from "Components/ActionsButtons";
import { Search } from "Components/Search";
import { ExportButton, List, Table, TextField,BooleanField } from "@pankod/refine-antd";
import { ExportList } from "Containers/Actions/ConfigsActions";

export const UsersList: React.FC = () => {
  const { show, edit } = useNavigation();
  const [searchResults, setSearchResults] = useState([]);
  const { tableQueryResult } = useTable({
    metaData: { fields: account },
  });

  const handleExportList = () => {
    ExportList(tableQueryResult?.data?.data || [], "Users");
  };

  return (
    <List
      title={`${"Users"}`}
      pageHeaderProps={{
        extra: (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Search
              path="user"
              setSearchResults={setSearchResults}
              searchResults={searchResults}
              data={tableQueryResult.data?.data || []}
            />
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
              record.id && show("findUsersAuth", record.id);
            },
          };
        }}
      >
        <Table.Column
          dataIndex="id"
          title={"ID"}
          width={10}
          render={(value) => <TextField value={value} />}
        />

        <Table.Column
          dataIndex="name"
          title={"Name"}
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex="username"
          title={"Username"}
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex={"email"}
          title={"Email"}
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex={"title"}
          title={"Title"}
          align={"center"}
          render={(value) => <TextField value={value?.title || "No Data"} />}
        />

        <Table.Column
          dataIndex={"deleted"}
          title={"Deleted"}
          align={"center"}
          render={(value) => <BooleanField value={value?.deleted} />}
        />
        <Table.Column
          dataIndex={"country"}
          title={"Country"}
          align={"center"}
          render={(value) => <TextField value={value || "No Data"} />}
        />
        <Table.Column<any>
          title={"Actions"}
          dataIndex="actions"
          align="center"
          render={(_text, record): any => {
            return (
              <Actions
                name_ar="User"
                edit
                record={record}
                onClickEdit={() =>
                  record?.id && edit("findUsersAuth", record?.id)
                }
              />
            );
          }}
        />
      </Table>
    </List>
  );
};
