import React from 'react';
import {
  BooleanField,
  CreateButton,
  List,
  Table,
  TextField,
} from '@pankod/refine-antd';
import { useNavigation, useTable } from '@pankod/refine-core';
import { products } from 'Containers/QueryReturns';
import { Actions } from 'Components/ActionsButtons';
import { removeRecord } from '../Actions/ConfigsActions';

export const ProductsList: React.FC = () => {
  const { show, edit } = useNavigation();
  const { tableQueryResult } = useTable({
    metaData: {
      fields: products,
    },
  });


  return (
    <List
      title={`${'Products'}`}
      pageHeaderProps={{
        extra: (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {/* <Search
              path="comment"
              setSearchResults={setSearchResults}
              searchResults={searchResults}
            /> */}
            <CreateButton>Create Product</CreateButton>
          </div>
        ),
      }}
    >
      <Table
        dataSource={tableQueryResult.data?.data}
        rowKey="id"
        style={{ cursor: 'pointer' }}
        onRow={(record) => {
          return {
            onClick: () => {
              record._id && show('findProducts', record._id);
            },
          };
        }}
      >
        <Table.Column
          dataIndex="name"
          title={'Name'}
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex="price"
          title={'Price'}
          render={(value) => <TextField value={value} />}
        />

        <Table.Column
          dataIndex={'deleted'}
          title={'Deleted'}
          align={'center'}
          render={(value) => <BooleanField value={value} />}
        />

        <Table.Column<any>
          title={'Actoins'}
          dataIndex="actions"
          align="center"
          render={(_text, record): any => {
            return (
              <Actions
                name_ar="Products"
                edit
                deleteRecord
                record={record}
                onClickEdit={() => record?._id && edit('findProducts', record?._id)}
                onClickDelete={() => removeRecord('removeProduct-custom', record?._id, tableQueryResult?.refetch)}
              />
            );
          }}
        />
      </Table>
    </List>
  );
};