import React from 'react';
import {
    List,
    Table,
    TextField,
    BooleanField,
} from '@pankod/refine-antd';
import { useNavigation, useTable } from '@pankod/refine-core';
import { order } from 'Containers/QueryReturns';
import { Actions } from 'Components/ActionsButtons';

export const OrderesList: React.FC = () => {
    const { show, edit } = useNavigation();
    const { tableQueryResult } = useTable({
        metaData: {
            fields: order
        },
    });

    return (
        <List
            title={`${'Orders'}`}
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
                            record._id && show('findAllOrders', record._id);
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
                    dataIndex="email"
                    title={'Email'}
                    render={(value) => <TextField value={value} />}
                />
                <Table.Column
                    dataIndex={'location'}
                    title={'Location'}
                    render={(value) => <TextField value={value} />}
                />
                <Table.Column
                    dataIndex={'phonenumber'}
                    title={'Phone Number'}
                    align={'center'}
                    render={(value) => <TextField value={value || 'No Data'} />}
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
                                name_ar="User"
                                edit
                                record={record}
                                onClickEdit={() => record?.id && edit('findAllOrders', record?.id)}
                            />
                        );
                    }}
                />
            </Table>
        </List>
    );
};