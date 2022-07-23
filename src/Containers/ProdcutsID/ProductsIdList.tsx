import React from "react";
import { CreateButton, List, Table, TextField } from "@pankod/refine-antd";
import { useNavigation, useTable } from "@pankod/refine-core";
import { productsId } from "Containers/QueryReturns";
import { Actions } from "Components/ActionsButtons";
import { UpdateRecordAction } from "../Actions/ConfigsActions";
import { Search } from "Components/Search";

export const ProductsIdList: React.FC = () => {
  const { show } = useNavigation();
  const [searchResults, setSearchResults] = React.useState([]);
  const { tableQueryResult } = useTable({
    metaData: { fields: productsId },
  });

  return (
    <List
      title={`${"Products ID"}`}
      pageHeaderProps={{
        extra: (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Search
              path="productId"
              setSearchResults={setSearchResults}
              searchResults={searchResults}
              data={tableQueryResult.data?.data || []}
            />
            <CreateButton style={{ marginLeft: 5 }}>
              Create Product ID
            </CreateButton>
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
              record.user?._id && show("findUsersAuth", record.user?._id);
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
          dataIndex="productId"
          title={"Product ID"}
          render={(value) => <TextField value={value || "No Data"} />}
        />
        <Table.Column
          dataIndex="data"
          title={"Data"}
          render={(value) => <TextField value={value || "No Data"} />}
        />

        <Table.Column
          dataIndex={["user", "username"]}
          width={10}
          title={"Username"}
          render={(value) => <TextField value={value || "No Data"} />}
        />

        <Table.Column<any>
          title={"Actions"}
          dataIndex="actions"
          align="center"
          render={(_text, record): any => {
            return (
              <Actions
                name_ar="Product ID"
                deleteRecord
                record={record}
                onClickDelete={() =>
                  UpdateRecordAction(
                    "updateProductsId",
                    {
                      updateProductsIdInput: {
                        value: {
                          _id: record?._id,
                          deleted: !record?.deleted,
                        },
                        required: true,
                        type: "UpdateProductsIdInput",
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
