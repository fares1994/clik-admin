import React from 'react';
import {
  BooleanField,
  CreateButton,
  List,
  Table,
  TextField,
} from '@pankod/refine-antd';
import { useNavigation, useTable } from '@pankod/refine-core';
import { globalLniks } from 'Containers/QueryReturns';
import { Actions } from 'Components/ActionsButtons';
import { UpdateRecordAction } from '../Actions/ConfigsActions';

export const GlobalLinksList: React.FC = () => {
  const { show, edit } = useNavigation();
  const { tableQueryResult } = useTable({
    metaData: {
      fields: globalLniks,
    },
  });


  return (
    <List
      title={`${'Global Links'}`}
      pageHeaderProps={{
        extra: (
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {/* <Search
              path="comment"
              setSearchResults={setSearchResults}
              searchResults={searchResults}
            /> */}
            <CreateButton>Create Global Link</CreateButton>
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
              record._id && show('findAllGlobalLinks', record._id);
            },
          };
        }}
      >
        <Table.Column
          dataIndex="_id"
          title={'ID'}
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex="type"
          title={'Type'}
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex="title"
          title={'Title'}
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
                name_ar="Global Link"
                edit
                deleteRecord
                record={record}
                onClickEdit={() => record?._id && edit('findAllGlobalLinks', record?._id)}
                onClickDelete={() => UpdateRecordAction('updateGlobalLink', { updateGlobalLinkInput: { id: record?._id, deleted: !record?.deleted } }, tableQueryResult?.refetch)}
              />
            );
          }}
        />
      </Table>
    </List>
  );
};