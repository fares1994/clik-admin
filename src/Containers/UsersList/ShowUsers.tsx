import React, { useEffect, useState } from "react";
import {
  Avatar,
  BooleanField,
  Card,
  Col,
  Grid,
  Icons,
  List,
  ListButton,
  RefreshButton,
  Row,
  Show,
  Space,
  Table,
  TextField,
  Typography,
} from "@pankod/refine-antd";
import styled from "styled-components";
import { account } from "Containers/QueryReturns";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import {
  showRecord,
  UpdateRecordAction,
} from "Containers/Actions/ConfigsActions";
import { VIEW_UPLOAD_URI } from "App";
import { Actions } from "Components/ActionsButtons";
import { useNavigation } from "@pankod/refine-core";
import { BsGenderAmbiguous } from "react-icons/bs";
import { GrMapLocation } from "react-icons/gr";
import noPhoto from "../../Assets/Images/noPhoto.png";

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;
function ShowUsers() {
  const { edit } = useNavigation();
  const screens = useBreakpoint();
  const params = useParams();
  const [record, setRecord] = useState<any>();
  const [refresh, setRefresh] = useState<boolean>(true);
  const handleRefetch = () => setRefresh(true);

  useEffect(() => {
    if (refresh && params?.id) {
      showRecord("findUserAuth", params?.id, account, setRecord, setRefresh);
    }
  }, [refresh, params?.id]);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xl={6} lg={24} xs={24}>
          <Card bordered={false} style={{ height: "100%" }}>
            <Space
              direction="vertical"
              style={{ width: "100%", height: "100%" }}
            >
              <Space
                direction="vertical"
                style={{ textAlign: "center", width: "100%" }}
              >
                <Avatar
                  size={120}
                  src={
                    record?.profileImage?._id
                      ? `${VIEW_UPLOAD_URI}${record?.profileImage?._id}`
                      : noPhoto
                  }
                />
                <Typography.Title level={3}>{record?.name}</Typography.Title>
              </Space>
              <Space
                direction="vertical"
                style={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <Typography.Text>
                  <Icons.UserOutlined /> {record?.username}
                </Typography.Text>
                {record?.phone && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icons.PhoneOutlined />
                    <div style={{ direction: "ltr" }}>
                      <Text>{record?.phone}</Text>
                    </div>
                  </div>
                )}
                {record?.email && (
                  <Typography.Text>
                    <Icons.MailOutlined /> {record?.email}
                  </Typography.Text>
                )}
                {record?.city?.city && (
                  <Typography.Text>
                    <GrMapLocation size={18} style={{ marginLeft: 4 }} />
                    {record?.city?.country?.country} / {record?.city?.city}
                  </Typography.Text>
                )}
                {record?.gender && (
                  <Typography.Text>
                    <BsGenderAmbiguous size={18} /> {record?.gender}
                  </Typography.Text>
                )}
              </Space>
            </Space>
          </Card>
        </Col>
        <Col xl={18} xs={24}>
          <Show
            title={"user Details"}
            pageHeaderProps={{
              extra: (
                <Space>
                  <RefreshButton>
                    <Text>{"Refresh"}</Text>
                  </RefreshButton>
                  <ListButton>
                    <Text>{"Users"}</Text>
                  </ListButton>
                  <Actions
                    name_ar="الوجبة"
                    deleteRecord
                    record={record}
                    onClickDelete={() =>
                      UpdateRecordAction(
                        "updateUser",
                        {
                          updateGlobalLinkInput: {
                            id: record?._id,
                            deleted: !record?.deleted,
                          },
                        },
                        handleRefetch
                      )
                    }
                    onClickEdit={() =>
                      record?.id && edit("findUsersAuth", record?.id)
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

                <Title level={5}>{"Username"}</Title>
                <Text>{record?.username}</Text>

                <Title level={5}>{"Email"}</Title>
                <Text>{record?.email}</Text>

                <Title level={5}>{"Country"}</Title>
                <Text>{record?.country}</Text>

                <Title level={5}>{"City"}</Title>
                <Text>{record?.city}</Text>
              </Break>
              <Break breakPoint={!!screens.md}>
                <Title level={5}>{"Gender"}</Title>
                <Text>{record?.gender}</Text>

                <Title level={5}>{"Date Of Birth"}</Title>
                <Text>{dayjs(record?.dob).format("YYYY-MM-DD")}</Text>
                {record?.personalBio && (
                  <>
                    <Title level={5}>{"Personal Bio"}</Title>
                    <DescriptionWrapper
                      breakPoint={record?.personalBio?.length > 50}
                    >
                      <Text>{record?.personalBio}</Text>
                    </DescriptionWrapper>
                  </>
                )}
              </Break>
              <Break breakPoint={!!screens.md}>
                {record?.title && (
                  <>
                    <Title level={5}>{"Title"}</Title>
                    <Text>{record?.title?.title}</Text>

                    <Title level={5}>{"Category"}</Title>
                    <Text>{record?.title?.category}</Text>
                  </>
                )}
              </Break>
            </div>
          </Show>
        </Col>
      </Row>
      {record?.myLinks?.length > 0 && (
        <>
          <div style={{ marginTop: 20 }} />

          <List
            title={`${"Links"}`}
            pageHeaderProps={{
              extra: (
                <div style={{ display: "flex", flexDirection: "row" }}></div>
              ),
            }}
          >
            <Table dataSource={record?.myLinks} rowKey="id">
              <Table.Column
                dataIndex={["globalLink", "title"]}
                title={"title"}
                render={(value) => <TextField value={value} />}
              />
              <Table.Column
                dataIndex="value"
                title={"Value"}
                render={(value) => <TextField value={value} />}
              />
              <Table.Column
                dataIndex={["globalLink", "placeholder"]}
                title={"Placeholder"}
                render={(value) => <TextField value={value} />}
              />

              <Table.Column
                dataIndex={["globalLink", "redirectionType"]}
                title={"Redirection Type"}
                render={(value) => <TextField value={value} />}
              />

              <Table.Column
                dataIndex={["globalLink", "type"]}
                title={"Type"}
                render={(value) => <TextField value={value} />}
              />

              <Table.Column
                dataIndex={["globalLink", "deleted"]}
                title={"Deleted"}
                align={"center"}
                render={(value) => <BooleanField value={value} />}
              />

              <Table.Column<any>
                title={"Actoins"}
                dataIndex="actions"
                align="center"
                render={(_text, record): any => {
                  return (
                    <a
                      href={`${VIEW_UPLOAD_URI}${record?.globalLink?.image?._id}`}
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
        </>
      )}

      {record?.customLinks?.length > 0 && (
        <>
          <div style={{ marginTop: 20 }} />

          <List
            title={`${"Custom Links"}`}
            pageHeaderProps={{
              extra: (
                <div style={{ display: "flex", flexDirection: "row" }}></div>
              ),
            }}
          >
            <Table dataSource={record?.customLinks} rowKey="id">
              <Table.Column
                dataIndex="id"
                title={"ID"}
                render={(value) => <TextField value={value} />}
              />
              <Table.Column
                dataIndex="title"
                title={"Title"}
                render={(value) => <TextField value={value} />}
              />
              <Table.Column
                dataIndex={"value"}
                title={"Value"}
                render={(value) => <TextField value={value} />}
              />

              <Table.Column
                dataIndex={"show"}
                title={"Show"}
                render={(value) => <BooleanField value={value} />}
              />

              <Table.Column<any>
                title={"Actoins"}
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
        </>
      )}
    </>
  );
}
export default ShowUsers;
const Break = styled.div<{ breakPoint?: boolean }>`
  margin: ${(props) => (props.breakPoint ? "" : "20px")};
`;
const DescriptionWrapper = styled.div<{ breakPoint?: boolean }>`
  width: ${(props) => (props.breakPoint ? "400px" : "200px")};
`;
