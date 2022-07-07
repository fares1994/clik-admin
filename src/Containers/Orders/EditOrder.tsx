import { IResourceComponentsProps } from '@pankod/refine-core';
import React, { useEffect, useState } from 'react';
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
import { useParams } from "react-router-dom";
import { order } from 'Containers/QueryReturns';
import { showRecord, UpdateRecordAction } from 'Containers/Actions/ConfigsActions';
import { useFormik } from 'formik';
const { Text } = Typography;

interface Inputs {
    updateOrderInput: {
        value: {
            id?: string;
            name?: string;
            email?: string
            location?: string;
            phonenumber?: string;
            driver_name?: string;
            order_status?: string;
        };
        type: string;
        required: boolean;
    };
}

export const EditOrder: React.FC<IResourceComponentsProps> = () => {
    const params = useParams();
    const [record, setRecord] = useState<any>();
    const [refresh, setRefresh] = useState<boolean>(true);
    const handleRefetch = () => setRefresh(true);

    useEffect(() => {
        if (refresh && params?.id) {
            showRecord('findOrderById-custom', params?.id, order, setRecord, setRefresh)
        }
    }, [refresh, params?.id])

    const { values, handleChange, setFieldValue, handleSubmit, resetForm } =
        useFormik({
            initialValues: {
                id: record?.id,
                name: '',
                email: '',
                location: '',
                phonenumber: '',
                order_status: '',
                driver_name: '',
            },
            onSubmit: async (submittedValues) => {
                const inputs: Inputs = {
                    updateOrderInput: {
                        value: {
                            id: params?.id
                        },
                        type: "UpdateOrderInput",
                        required: true,
                    }
                };

                if (submittedValues.name) {
                    inputs.updateOrderInput.value.name = submittedValues.name;
                }
                if (submittedValues.email) {
                    inputs.updateOrderInput.value.email = submittedValues.email;
                }
                if (submittedValues.location) {
                    inputs.updateOrderInput.value.location = submittedValues.location;
                }
                if (submittedValues.phonenumber) {
                    inputs.updateOrderInput.value.phonenumber = submittedValues.phonenumber;
                }
                if (submittedValues.order_status) {
                    inputs.updateOrderInput.value.order_status = submittedValues.order_status;
                }
                if (submittedValues.driver_name) {
                    inputs.updateOrderInput.value.driver_name = submittedValues.driver_name;
                }

                UpdateRecordAction(
                    'updateOrder',
                    inputs,
                    handleRefetch,
                )
            },
        });


    const buttonProps = {
        disables: refresh,
        loading: refresh,
        onClick: () => handleSubmit(),
    };

    useEffect(() => {
        if (record) {
            setFieldValue('id', params?.id)
            setFieldValue('name', record?.name)
            setFieldValue('email', record?.email)
            setFieldValue('location', record?.location)
            setFieldValue('phonenumber', record?.phonenumber)
            setFieldValue('driver_name', record?.driver_name)
            setFieldValue('order_status', record?.order_status)
        }
    }, [record])

    return (
        <Edit
            saveButtonProps={buttonProps}
            title={'Edit Order'}
            pageHeaderProps={{
                extra: (
                    <>
                        <ListButton>
                            <Text>{'Orders'}</Text>
                        </ListButton>
                        <ShowButton>
                            <Text>{'Details'}</Text>
                        </ShowButton>
                    </>
                ),
            }}
        >
            <Form layout="vertical">
                <Form.Item label="Name" name="name">
                    <Input name="name" onChange={handleChange} value={values.name} placeholder={values.name} />
                </Form.Item>

                <Form.Item label="Email" name="email">
                    <Input name="email" onChange={handleChange} value={values.email} placeholder={values.email} />
                </Form.Item>

                <Form.Item label="Location" name="location">
                    <Input name="location" onChange={handleChange} value={values.location} placeholder={values.location} />
                </Form.Item>

                <Form.Item label="Phone Number" name="phonenumber">
                    <Input name="phonenumber" onChange={handleChange} value={values.phonenumber} placeholder={values.phonenumber} />
                </Form.Item>

                <Form.Item label="Driver Name" name="driver_name">
                    <Input name="driver_name" onChange={handleChange} value={values.driver_name} placeholder={values.driver_name} />
                </Form.Item>

                <Form.Item label={'Order Status'} name={'order_status'}>
                    <Select
                        value={values.order_status}
                        options={[
                            { label: 'New', value: 'new' },
                            { label: 'InProgress', value: 'inProgress' },
                            { label: 'Completed', value: 'completed' },
                            { label: 'Canceled', value: 'canceled' },
                        ]}
                        onChange={(value) => setFieldValue('order_status', value)}
                        defaultValue={values.order_status}
                        placeholder={values.order_status}
                    />
                </Form.Item>
            </Form>
        </Edit>
    );
};
