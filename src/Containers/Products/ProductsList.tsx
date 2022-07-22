import React from "react";
import {
  BooleanField,
  CreateButton,
  List,
  Table,
  TextField,
} from "@pankod/refine-antd";
import { useNavigation, useTable } from "@pankod/refine-core";
import { products } from "Containers/QueryReturns";
import { Actions } from "Components/ActionsButtons";
import { UpdateRecordAction } from "../Actions/ConfigsActions";
import { Search } from "Components/Search";

export const ProductsList: React.FC = () => {
  const { show, edit } = useNavigation();
  const [searchResults, setSearchResults] = React.useState([]);
  const { tableQueryResult } = useTable({
    metaData: {
      fields: products,
    },
  });

  return (
    <List
      title={`${"Products"}`}
      pageHeaderProps={{
        extra: (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Search
              path="product"
              setSearchResults={setSearchResults}
              searchResults={searchResults}
              data={tableQueryResult.data?.data || []}
            />
            <CreateButton style={{ marginLeft: 5 }}>
              Create Product
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
              record._id && show("findProducts", record._id);
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
          dataIndex="price"
          title={"Price"}
          render={(value) => <TextField value={value} />}
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
                name_ar="Products"
                edit
                deleteRecord
                record={record}
                onClickEdit={() =>
                  record?._id && edit("findProducts", record?._id)
                }
                onClickDelete={
                  () =>
                    UpdateRecordAction(
                      "updateProduct",
                      {
                        updateProductInput: {
                          value: {
                            _id: record?._id,
                            deleted: !record?.deleted,
                          },
                          required: true,
                          type: "UpdateProductInput",
                        },
                      },
                      tableQueryResult?.refetch
                    )
                  // removeRecord(
                  //   "removeProduct-custom",
                  //   record?._id,
                  //   tableQueryResult?.refetch
                  // )
                }
              />
            );
          }}
        />
      </Table>
    </List>
  );
};
