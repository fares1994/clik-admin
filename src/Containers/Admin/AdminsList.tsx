import React from 'react';
import {
  List,
  Table,
  TextField,
} from '@pankod/refine-antd';
import { useNavigation, useTable } from '@pankod/refine-core';
import { admins } from 'Containers/QueryReturns';
import { Actions } from 'Components/ActionsButtons';

export const AdminsList: React.FC = () => {
  const { show, edit } = useNavigation();
  const { tableQueryResult } = useTable({
    metaData: {
      fields: admins,
    },
  });


  return (
    <List
      title={`${'Admins'}`}
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
              record.id && show('admins', record.id);
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
          dataIndex={'role'}
          title={'Role'}
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
                name_ar="Admin"
                edit
                record={record}
                onClickEdit={() => record?.id && edit('admins', record?.id)}
              />
            );
          }}
        />
      </Table>
    </List>
  );
};