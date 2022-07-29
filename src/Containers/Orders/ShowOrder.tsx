import React, { useEffect, useState } from "react";
import {
  BooleanField,
  Button,
  Grid,
  List,
  ListButton,
  RefreshButton,
  Show,
  Space,
  Table,
  TextField,
  Typography,
} from "@pankod/refine-antd";
import styled from "styled-components";
import { order } from "Containers/QueryReturns";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { Actions } from "Components/ActionsButtons";
import {
  showRecord,
  UpdateRecordAction,
} from "Containers/Actions/ConfigsActions";
import { useNavigation } from "@pankod/refine-core";
import ListModal from "Components/ListModal";

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;
function ShowOrder() {
  const [visible, setVisible] = useState([]);
  const { show, edit } = useNavigation();
  const params = useParams();
  const screens = useBreakpoint();
  const [record, setRecord] = useState<any>();
  const [refresh, setRefresh] = useState<boolean>(true);
  const handleRefetch = () => setRefresh(true);

  useEffect(() => {
    if (refresh && params?.id) {
      showRecord(
        "findOrderById-custom",
        params?.id,
        order,
        setRecord,
        setRefresh
      );
    }
  }, [refresh, params?.id]);

  return (
    <>
      <Show
        isLoading={!record}
        title={"Order Details"}
        pageHeaderProps={{
          extra: (
            <Space>
              <RefreshButton>
                <Text>{"Refresh"}</Text>
              </RefreshButton>
              <ListButton>
                <Text>{"Orders"}</Text>
              </ListButton>
              <Actions
                name_ar="Order"
                deleteRecord
                edit
                record={record}
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
                    handleRefetch
                  )
                }
              />
            </Space>
          ),
        }}
      >
        <div
          className="detailsWrapper"
          style={{ justifyContent: screens.md ? "" : "space-between" }}
        >
          <Break breakPoint={!!screens.md}>
            <Title level={5}>{"Name"}</Title>
            <Text>{record?.name}</Text>

            <Title level={5}>{"Email"}</Title>
            <Text>{record?.email}</Text>

            <Title level={5}>{"Driver"}</Title>
            <Text>{record?.driver_name}</Text>

            <Title level={5}>{"Location"}</Title>
            <Text>{record?.location}</Text>

            <Title level={5}>{"Phone Number"}</Title>
            <Text>{record?.phonenumber}</Text>

            <Title level={5}>{"Status"}</Title>
            <Text>{record?.order_status}</Text>
          </Break>
          <Break breakPoint={!!screens.md}>
            {record?.products?.length > 0 && (
              <>
                <Title level={5}>{"Products"}</Title>
                {record?.products?.map((item: any, key: number) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: 5,
                      }}
                    >
                      <Text style={{ marginTop: 5, marginLeft: -15 }}>
                        {key + 1 + "- " + "Color: " + item?.color}
                      </Text>
                      <Text style={{ marginTop: 5 }}>
                        {"Quantity: " + item?.quantity || "No Data"}
                      </Text>
                      <Text style={{ marginTop: 5 }}>
                        {"Name: " + item?.product?.name || "No Data"}
                      </Text>
                      <Text style={{ marginTop: 5 }}>
                        {"Price: " + item?.product?.price || "No Data"}
                      </Text>
                    </div>
                  );
                })}
              </>
            )}
          </Break>
          <Break breakPoint={!!screens.md}>
            <Title level={5}>{"Created At"}</Title>
            <Text>{dayjs(record?.created_at).format("YYYY-MM-DD, HH:mm")}</Text>
            <Title level={5}>{"Deleted"}</Title>
            <BooleanField value={record?.deleted} />
          </Break>
        </div>
      </Show>
      <div style={{ marginTop: 20 }} />
      <List
        title={`${"Products"}`}
        pageHeaderProps={{
          extra: <div style={{ display: "flex", flexDirection: "row" }}></div>,
        }}
      >
        <Table
          dataSource={record?.products}
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
            dataIndex={["product", "name"]}
            title={"Name"}
            width={10}
            render={(value) => <TextField value={value} />}
          />
          <Table.Column
            dataIndex={"quantity"}
            title={"Quantity"}
            render={(value) => <TextField value={value} />}
          />
          <Table.Column
            dataIndex={["product", "price"]}
            title={"Price"}
            render={(value) => <TextField value={value} />}
          />
          <Table.Column
            dataIndex={"color"}
            title={"Color"}
            render={(value) => (
              <TextField
                value={
                  <div
                    style={{
                      height: 15,
                      border: "1px solid gray",
                      width: 15,
                      borderRadius: 3,
                      backgroundColor: value,
                    }}
                  />
                }
              />
            )}
          />

          <Table.Column<any>
            title={"Actions"}
            dataIndex="actions"
            align="center"
            render={(_text, record): any => {
              return (
                <Button onClick={() => setVisible(record?.product?.choices)}>
                  Choices
                </Button>
              );
            }}
          />
        </Table>
      </List>
      <ListModal
        visible={visible?.length > 0}
        setVisible={setVisible}
        record={visible}
      />
    </>
  );
}
export default ShowOrder;
const Break = styled.div<{ breakPoint?: boolean }>`
  margin: ${(props) => (props.breakPoint ? "" : "20px")};
`;
const DescriptionWrapper = styled.div<{ breakPoint?: boolean }>`
  width: ${(props) => (props.breakPoint ? "400px" : "200px")};
`;
