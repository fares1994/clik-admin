import React from "react";
import { List, Table, TextField, BooleanField } from "@pankod/refine-antd";
import { useNavigation, useTable } from "@pankod/refine-core";
import { order } from "Containers/QueryReturns";
import { Actions } from "Components/ActionsButtons";
import { removeRecord } from "Containers/Actions/ConfigsActions";
import { Search } from "Components/Search";

export const OrderesList: React.FC = () => {
  const { show, edit } = useNavigation();
  const [searchResults, setSearchResults] = React.useState([]);
  const { tableQueryResult } = useTable({
    syncWithLocation: true,
    resource: "findAllOrders",
    metaData: { fields: order },
  });

  return (
    <List
      title={`${"Orders"}`}
      pageHeaderProps={{
        extra: (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Search
              path="order"
              setSearchResults={setSearchResults}
              searchResults={searchResults}
              data={tableQueryResult.data?.data || []}
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
              record._id && show("findAllOrders", record._id);
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
          dataIndex="name"
          title={"Name"}
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex="email"
          title={"Email"}
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex={"driver_name"}
          title={"Driver"}
          render={(value) => <TextField value={value || "No Data"} />}
        />
        <Table.Column
          dataIndex={"location"}
          title={"Location"}
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex={"phonenumber"}
          title={"Phone Number"}
          align={"center"}
          render={(value) => <TextField value={value || "No Data"} />}
        />
        <Table.Column
          dataIndex={"order_status"}
          title={"Status"}
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
                name_ar="Order"
                edit
                record={record}
                deleteRecord
                onClickEdit={() =>
                  record?._id && edit("findAllOrders", record?._id)
                }
                onClickDelete={() =>
                  removeRecord(
                    "removeOrder-custom",
                    record?.id,
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
