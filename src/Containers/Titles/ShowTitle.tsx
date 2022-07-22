import React, { useEffect, useState } from "react";
import {
  BooleanField,
  Grid,
  ListButton,
  RefreshButton,
  Show,
  Space,
  Typography,
} from "@pankod/refine-antd";
import styled from "styled-components";
import { titles } from "Containers/QueryReturns";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { Actions } from "Components/ActionsButtons";
import { showRecord, UpdateRecordAction } from "../Actions/ConfigsActions";
import { useNavigation } from "@pankod/refine-core";

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;
function ShowTitle() {
  const { edit } = useNavigation();
  const params = useParams();
  const screens = useBreakpoint();
  const [record, setRecord] = useState<any>();
  const [refresh, setRefresh] = useState<boolean>(true);
  const handleRefetch = () => setRefresh(true);

  useEffect(() => {
    if (refresh && params?.id) {
      showRecord(
        "findTitleById-custom",
        params?.id,
        titles,
        setRecord,
        setRefresh
      );
    }
  }, [refresh, params?.id]);
  return (
    <>
      <Show
        isLoading={!record}
        title={"Title Details"}
        pageHeaderProps={{
          extra: (
            <Space>
              <RefreshButton>
                <Text>{"Refresh"}</Text>
              </RefreshButton>
              <ListButton>
                <Text>{"Titles"}</Text>
              </ListButton>
              <Actions
                name_ar="Title"
                deleteRecord
                record={record}
                edit
                onClickEdit={() =>
                  record?._id && edit("findTitles", record?._id)
                }
                onClickDelete={() =>
                  UpdateRecordAction(
                    "updateTitle",
                    {
                      updateTitleInput: {
                        value: {
                          id: record?._id,
                          deleted: !record?.deleted,
                        },
                        required: true,
                        type: "UpdateTitleInput",
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
            <Title level={5}>{"ID"}</Title>
            <Text>{record?._id}</Text>

            <Title level={5}>{"Title"}</Title>
            <Text>{record?.title}</Text>

            <Title level={5}>{"Category"}</Title>
            <Text>{record?.category}</Text>
          </Break>

          <Break breakPoint={!!screens.md}>
            {record?.updated_at && (
              <>
                <Title level={5}>{"Updated At"}</Title>
                <Text>
                  {dayjs(record?.updated_at).format("YYYY-MM-DD, HH:mm")}
                </Text>
              </>
            )}
            <Title level={5}>{"Deleted"}</Title>
            <BooleanField value={record?.deleted} />
          </Break>
        </div>
      </Show>
    </>
  );
}
export default ShowTitle;
const Break = styled.div<{ breakPoint?: boolean }>`
  margin: ${(props) => (props.breakPoint ? "" : "20px")};
`;
// const DescriptionWrapper = styled.div<{ breakPoint?: boolean }>`
//   width: ${(props) => (props.breakPoint ? "400px" : "200px")};
// `;
