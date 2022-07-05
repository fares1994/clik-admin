import { IResourceComponentsProps } from '@pankod/refine-core';
import React from 'react';
import {
    useForm,
    Form,
    Input,
    Edit,
    Select,
    ListButton,
    Typography,
    ShowButton,
} from '@pankod/refine-antd';
import { account } from 'Containers/QueryReturns';
const { Text } = Typography;

export const EditUser: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps, queryResult } = useForm<any>({
        metaData: {
            fields: account
        }
    });
    const record = queryResult?.data?.data;

    return (
        <Edit
            saveButtonProps={saveButtonProps}
            title={'Edit User'}
            pageHeaderProps={{
                extra: (
                    <>
                        <ListButton>
                            <Text>{'Users'}</Text>
                        </ListButton>
                        <ShowButton>
                            <Text>{'Details'}</Text>
                        </ShowButton>
                    </>
                ),
            }}
        >
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true }]}
                    required
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Personal Bio"
                    name="personalBio"
                    rules={[{ required: true }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name={'email'}
                    required
                    rules={[{ required: true }]}
                >
                    <Input />

                </Form.Item>
                <Form.Item
                    label="Gender"
                    name={'gender'}
                    required
                    rules={[{ required: true }]}
                >
                    <Select defaultValue={record?.gender} options={[
                        { label: 'Male', value: "male" },
                        { label: 'Female', value: 'female' }
                    ]} />

                </Form.Item>

            </Form>
        </Edit>
    );
};
