import React from 'react';
import {
  Grid,
  ListButton,
  RefreshButton,
  Show,
  Space,
  Typography,
} from '@pankod/refine-antd';
import { useShow } from '@pankod/refine-core';
import styled from 'styled-components';
import { account } from 'Containers/QueryReturns';
import dayjs from 'dayjs';

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;
function ShowUsers() {
  const screens = useBreakpoint();
  const { queryResult } = useShow({
    metaData: {
      fields: account
    }
  });
  const { data, isLoading, refetch } = queryResult;
  const record = data?.data;
  return (
    <>
      <Show
        isLoading={isLoading}
        title={'user Details'}
        pageHeaderProps={{
          extra: (
            <Space>
              <RefreshButton>
                <Text>{'Refresh'}</Text>
              </RefreshButton>
              <ListButton>
                <Text>{'Users'}</Text>
              </ListButton>
              {/* <Actions
                name_ar="الوجبة"
                deleteRecord
                record={record}
                onClickDelete={() =>
                  DeleteRecordAction(
                    `Meal-cruds/${record?.id}`,
                    refetch,
                    record?.is_deleted
                  )
                }
                onClickEdit={() => record?.id && edit('Meal-cruds', record?.id)}
              /> */}
            </Space>
          ),
        }}
      >
        <div
          className="detailsWrapper"
          style={{ justifyContent: screens.md ? '' : 'space-between' }}
        >
          <Break breakPoint={!!screens.md}>
            <Title level={5}>{'Name'}</Title>
            <Text>{record?.name}</Text>

            <Title level={5}>{'Username'}</Title>
            <Text>{record?.username}</Text>

            <Title level={5}>{'Email'}</Title>
            <Text>{record?.email}</Text>

            <Title level={5}>{'Country'}</Title>
            <Text>{record?.country}</Text>

            <Title level={5}>{'City'}</Title>
            <Text>{record?.city}</Text>
          </Break>
          <Break breakPoint={!!screens.md}>
            <Title level={5}>{'Gender'}</Title>
            <Text>{record?.gender}</Text>

            <Title level={5}>{'Date Of Birth'}</Title>
            <Text>{dayjs(record?.dob).format('YYYY-MM-DD')}</Text>
            {record?.personalBio && (
              <>
                <Title level={5}>{'Personal Bio'}</Title>
                <DescriptionWrapper
                  breakPoint={record?.personalBio?.length > 50}
                >
                  <Text>{record?.personalBio}</Text>
                </DescriptionWrapper>
              </>
            )}
          </Break>
          <Break breakPoint={!!screens.md}>
            {record?.myLinks?.length > 0 && (
              <>
                <Title level={5}>{'Links'}</Title>
                {record?.myLinks?.map((item: { value: string }) => {
                  return (
                    <DescriptionWrapper
                      breakPoint={item?.value?.length > 50}
                    >
                      <Text>{item?.value}</Text>
                    </DescriptionWrapper>

                  )
                })}
              </>
            )}

          </Break>

        </div>
      </Show>
    </>
  );
}
export default ShowUsers;
const Break = styled.div<{ breakPoint?: boolean }>`
  margin: ${(props) => (props.breakPoint ? '' : '20px')};
`;
const DescriptionWrapper = styled.div<{ breakPoint?: boolean }>`
  width: ${(props) => (props.breakPoint ? '400px' : '200px')};
`;