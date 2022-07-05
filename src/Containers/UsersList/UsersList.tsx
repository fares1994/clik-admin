import React from 'react';
import {
  List,
  Table,
  TextField,
} from '@pankod/refine-antd';
import { useNavigation, useTable } from '@pankod/refine-core';
import { account } from 'Containers/QueryReturns';
import { Actions } from 'Components/ActionsButtons';

export const UsersList: React.FC = () => {
  const { show, edit } = useNavigation();
  const { tableQueryResult } = useTable({
    metaData: {
      fields: account,
    },
  });


  return (
    <List
      title={`${'Users'}`}
      pageHeaderProps={{
        extra: (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {/* <Search
              path="comment"
              setSearchResults={setSearchResults}
              searchResults={searchResults}
            /> */}
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
              record.id && show('findUsers', record.id);
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
          dataIndex="username"
          title={'Username'}
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex={'email'}
          title={'Email'}
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex={'country'}
          title={'Country'}
          align={'center'}
          render={(value) => <TextField value={value || 'No Data'} />}
        />

        <Table.Column<any>
          title={'Actoins'}
          dataIndex="actions"
          align="center"
          render={(_text, record): any => {
            return (
              <Actions
                name_ar="User"
                edit
                record={record}
                onClickEdit={() => record?.id && edit('findUsers', record?.id)}
              />
            );
          }}
        />
      </Table>
    </List>
  );
};