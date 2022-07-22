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
import { globalLniks } from "Containers/QueryReturns";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { Actions } from "Components/ActionsButtons";
import { showRecord, UpdateRecordAction } from "../Actions/ConfigsActions";
import { VIEW_UPLOAD_URI } from "App";
import { useNavigation } from "@pankod/refine-core";

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;
function ShowGlobalLink() {
  const { edit } = useNavigation();
  const params = useParams();
  const screens = useBreakpoint();
  const [record, setRecord] = useState<any>();
  const [refresh, setRefresh] = useState<boolean>(true);
  const handleRefetch = () => setRefresh(true);

  useEffect(() => {
    if (refresh && params?.id) {
      showRecord(
        "findGlobalLink-custom",
        params?.id,
        globalLniks,
        setRecord,
        setRefresh
      );
    }
  }, [refresh, params?.id]);
  return (
    <>
      <Show
        isLoading={!record}
        title={"Global Link Details"}
        pageHeaderProps={{
          extra: (
            <Space>
              <RefreshButton>
                <Text>{"Refresh"}</Text>
              </RefreshButton>
              <ListButton>
                <Text>{"Glbal Links"}</Text>
              </ListButton>
              <Actions
                name_ar="Glbal Link"
                deleteRecord
                record={record}
                edit
                onClickEdit={() =>
                  record?._id && edit("findAllGlobalLinks", record?._id)
                }
                onClickDelete={() =>
                  UpdateRecordAction(
                    "updateGlobalLink",
                    {
                      updateGlobalLinkInput: {
                        value: {
                          id: record?._id,
                          deleted: !record?.deleted,
                        },
                        required: true,
                        type: "UpdateGlobalLinkInput",
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

            <Title level={5}>{"Image"}</Title>
            <a
              href={VIEW_UPLOAD_URI + record?.image?._id}
              target={"_blank"}
              rel="noreferrer"
            >
              {"Image"}
            </a>

            <Title level={5}>{"Type"}</Title>
            <Text>{record?.type}</Text>

            <Title level={5}>{"Title"}</Title>
            <Text>{record?.title}</Text>
          </Break>
          <Break breakPoint={!!screens.md}>
            <Title level={5}>{"redirectionType"}</Title>
            <DescriptionWrapper>
              <Text>{record?.redirectionType}</Text>
            </DescriptionWrapper>

            <Title level={5}>{"Placeholder"}</Title>
            <Text>{record?.placeholder}</Text>
          </Break>
          <Break breakPoint={!!screens.md}>
            <Title level={5}>{"Created At"}</Title>
            <Text>{dayjs(record?.created_at).format("YYYY-MM-DD, HH:mm")}</Text>
            <Title level={5}>{"Deleted"}</Title>
            <BooleanField value={record?.deleted} />
          </Break>
        </div>
      </Show>
    </>
  );
}
export default ShowGlobalLink;
const Break = styled.div<{ breakPoint?: boolean }>`
  margin: ${(props) => (props.breakPoint ? "" : "20px")};
`;
const DescriptionWrapper = styled.div<{ breakPoint?: boolean }>`
  width: ${(props) => (props.breakPoint ? "400px" : "200px")};
`;
