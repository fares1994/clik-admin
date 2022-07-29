import React from "react";
import {
  CreateButton,
  List,
  Table,
  TextField,
  BooleanField,
  ExportButton,
} from "@pankod/refine-antd";
import { useNavigation, useTable } from "@pankod/refine-core";
import { admins } from "Containers/QueryReturns";
import { Actions } from "Components/ActionsButtons";
import { ExportList, removeRecord } from "Containers/Actions/ConfigsActions";
import { Search } from "Components/Search";

export const AdminsList: React.FC = () => {
  const { edit } = useNavigation();
  const [searchResults, setSearchResults] = React.useState([]);

  const { tableQueryResult } = useTable({
    metaData: {
      fields: admins,
    },
  });

  const handleExportList = () => {
    ExportList(tableQueryResult?.data?.data || [], "Admins");
  };

  return (
    <List
      title={`${"Admins"}`}
      pageHeaderProps={{
        extra: (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Search
              path="user"
              setSearchResults={setSearchResults}
              searchResults={searchResults}
              data={tableQueryResult.data?.data || []}
            />
            <CreateButton style={{ marginLeft: 5 }}>Create Admin</CreateButton>
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
        // style={{ cursor: "pointer" }}
        // onRow={(record) => {
        //   return {
        //     onClick: () => {
        //       record.id && show("admins", record.id);
        //     },
        //   };
        // }}
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
          dataIndex={"role"}
          title={"Role"}
          align={"center"}
          render={(value) => <TextField value={value || "No Data"} />}
        />

        <Table.Column
          dataIndex={"deleted"}
          title={"Deleted"}
          align={"center"}
          render={(value) => <BooleanField value={value} />}
        />

        <Table.Column<any>
          title={"Actions"}
          dataIndex="actions"
          align="center"
          render={(_text, record): any => {
            return (
              <Actions
                name_ar="Admin"
                deleteRecord
                edit
                record={record}
                onClickDelete={() =>
                  removeRecord(
                    "removeAdmin-custom",
                    record?.id,
                    tableQueryResult?.refetch
                  )
                }
                onClickEdit={() => record?.id && edit("admins", record?.id)}
              />
            );
          }}
        />
      </Table>
    </List>
  );
};
