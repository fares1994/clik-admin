import React from "react";
import { List, Modal, Table, TextField } from "@pankod/refine-antd";
import { VIEW_UPLOAD_URI } from "App";
interface Props {
  visible: boolean;
  setVisible: (val: any) => void;
  isLoading?: boolean;
  record?: any;
  listingData?: any;
  type?: string;
  refresh?: () => void;
}
const ListModal = ({ visible, setVisible, record }: Props) => {
  return (
    <>
      <Modal
        visible={visible}
        onCancel={() => setVisible([])}
        onOk={() => setVisible([])}
        cancelText={"Cancel"}
        okText={"Ok"}
        width={700}
      >
        <div style={{ height: "70vh", overflowY: "scroll", marginTop: "20px" }}>
          <List
            title={`${"Choices"}`}
            pageHeaderProps={{
              extra: (
                <div style={{ display: "flex", flexDirection: "row" }}></div>
              ),
            }}
          >
            <Table
              dataSource={record}
              rowKey="id"
              //   style={{ cursor: "pointer" }}
              //   onRow={(record) => {
              //     return {
              //       onClick: () => {
              //         record._id && show("findProducts", record._id);
              //       },
              //     };
              //   }}
            >
              <Table.Column
                dataIndex={["colorsHex"]}
                title={"Color Hex"}
                render={(value) => <TextField value={value} />}
              />
              <Table.Column
                dataIndex={"colorsHex"}
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
                    <a
                      href={`${VIEW_UPLOAD_URI}${record?.image?._id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Image
                    </a>
                  );
                }}
              />
            </Table>
          </List>
        </div>
      </Modal>
    </>
  );
};
export default ListModal;
