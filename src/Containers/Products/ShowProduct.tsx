import React, { useEffect, useState } from 'react';
import {
  BooleanField,
  Grid,
  ListButton,
  RefreshButton,
  Show,
  Space,
  Typography,
} from '@pankod/refine-antd';
import styled from 'styled-components';
import { products } from 'Containers/QueryReturns';
import dayjs from 'dayjs';
import { useParams } from "react-router-dom";
import { Actions } from 'Components/ActionsButtons';
import { removeRecord, showRecord } from '../Actions/ConfigsActions';

const { useBreakpoint } = Grid;
const { Title, Text } = Typography;
function ShowProduct() {
  const params = useParams();
  const screens = useBreakpoint();
  const [record, setRecord] = useState<any>();
  const [refresh, setRefresh] = useState<boolean>(true);
  const handleRefetch = () => setRefresh(true);

  useEffect(() => {
    if (refresh && params?.id) {
      showRecord('findProductById-custom', params?.id, products, setRecord, setRefresh)
    }
  }, [refresh, params?.id])
  return (
    <>
      <Show
        isLoading={!record}
        title={'Product Details'}
        pageHeaderProps={{
          extra: (
            <Space>
              <RefreshButton>
                <Text>{'Refresh'}</Text>
              </RefreshButton>
              <ListButton>
                <Text>{'Products'}</Text>
              </ListButton>
              <Actions
                name_ar="Product"
                deleteRecord
                record={record}
                onClickDelete={() =>
                  removeRecord('removeProduct-custom', params?.id, handleRefetch)
                }
              />
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

            <Title level={5}>{'Price'}</Title>
            <Text>{record?.price}</Text>

            <Title level={5}>{'Description'}</Title>
            <DescriptionWrapper>
              <Text>{record?.description}</Text>
            </DescriptionWrapper>

          </Break>
          <Break breakPoint={!!screens.md}>
            {record?.choices?.length > 0 && (
              <>
                <Title level={5}>{'Choices'}</Title>
                {record?.choices?.map((item: any, key: number) => {
                  return (
                    <Text style={{ marginTop: 5, marginLeft: -15 }}>{(key + 1) + '- ' + 'Color: ' + item?.colorsHex}</Text>
                  )
                })}

              </>
            )}
          </Break>
          <Break breakPoint={!!screens.md}>
            <Title level={5}>{'Created At'}</Title>
            <Text>
              {dayjs(record?.created_at).format('YYYY-MM-DD, HH:mm')}
            </Text>
            <Title level={5}>{'Deleted'}</Title>
            <BooleanField value={record?.deleted} />
          </Break>

        </div>
      </Show>
    </>
  );
}
export default ShowProduct;
const Break = styled.div<{ breakPoint?: boolean }>`
  margin: ${(props) => (props.breakPoint ? '' : '20px')};
`;
const DescriptionWrapper = styled.div<{ breakPoint?: boolean }>`
  width: ${(props) => (props.breakPoint ? '400px' : '200px')};
`;