import React from "react";
import { ExportButton, List, Table, TextField } from "@pankod/refine-antd";
import { useNavigation, useTable } from "@pankod/refine-core";
import { order } from "Containers/QueryReturns";
import { Actions } from "Components/ActionsButtons";
import {
  ExportList,
  UpdateRecordAction,
} from "Containers/Actions/ConfigsActions";
import { Search } from "Components/Search";

export const OrderesList: React.FC = () => {
  const { show, edit } = useNavigation();
  const [searchResults, setSearchResults] = React.useState([]);
  const { tableQueryResult } = useTable({
    syncWithLocation: true,
    resource: "findAllOrders",
    metaData: { fields: order },
  });

  const handleExportList = () => {
    ExportList(tableQueryResult?.data?.data || [], "Orders");
  };

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
              record._id && show("findAllOrders", record._id);
            },
          };
        }}
      >
        <Table.Column
          dataIndex="_id"
          width={50}
          title={"ID"}
          render={(value) => (
            <div style={{ width: 100 }}>
              <TextField value={value} />
            </div>
          )}
        />
        <Table.Column
          dataIndex="name"
          title={"Name"}
          width={10}
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex="email"
          width={10}
          title={"Email"}
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex={"driver_name"}
          title={"Driver"}
          width={10}
          render={(value) => <TextField value={value || "No Data"} />}
        />
        <Table.Column
          dataIndex={"location"}
          title={"Location"}
          width={10}
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex={"phonenumber"}
          title={"Phone Number"}
          width={10}
          align={"center"}
          render={(value) => <TextField value={value || "No Data"} />}
        />
        <Table.Column
          dataIndex={"order_status"}
          title={"Status"}
          width={10}
          align={"center"}
          render={(value) => <TextField value={value || "No Data"} />}
        />

        {/* <Table.Column
          dataIndex={"deleted"}
          title={"Deleted"}
          width={10}
          align={"center"}
          render={(value) => <BooleanField value={value} />}
        /> */}

        <Table.Column<any>
          title={"Actions"}
          dataIndex="actions"
          width={10}
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
                  UpdateRecordAction(
                    "updateOrder",
                    {
                      updateOrderInput: {
                        value: {
                          id: record?._id,
                          deleted: !record?.deleted,
                        },
                        required: true,
                        type: "UpdateOrderInput",
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
