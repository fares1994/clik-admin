import { IResourceComponentsProps } from '@pankod/refine-core';
import React from 'react';
import {
    Form,
    Input,
    ListButton,
    Typography,
    ShowButton,
    Create,
    Upload,
} from '@pankod/refine-antd';
import { CreateRecordAction } from 'Containers/Actions/ConfigsActions';
import { useFormik } from 'formik';
import { UPLOAD_URI } from 'App';
const { Text } = Typography;

interface Inputs {
    createProductInput: {
        value: {
            name?: string;
            price?: string;
            description?: string;
            choices?: { image: string, colorsHex: string }[];
        };
        required: boolean;
        type: string
    }
}

export const CreateProduct: React.FC<IResourceComponentsProps> = () => {

    const { values, handleChange, setFieldValue, handleSubmit } =
        useFormik({
            initialValues: {
                name: '',
                price: '',
                description: '',
                image: '',
                colorsHex: '',
                choices: [],
            },
            onSubmit: async (submittedValues) => {
                const inputs: Inputs = {
                    createProductInput: {
                        value: {},
                        required: true,
                        type: "CreateProductInput",
                    }
                };

                if (submittedValues.name) {
                    inputs.createProductInput.value.name = submittedValues.name;
                }
                if (submittedValues.price) {
                    inputs.createProductInput.value.price = submittedValues.price;
                }
                if (submittedValues.description) {
                    inputs.createProductInput.value.description = submittedValues.description;
                }

                if (submittedValues.colorsHex && submittedValues.image) {
                    const arr = []
                    arr.push({ colorsHex: submittedValues.colorsHex, image: submittedValues.image })
                    inputs.createProductInput.value.choices = arr
                }

                CreateRecordAction(
                    'createProduct',
                    inputs,
                )
            },
        });


    const buttonProps = {
        disables: false,
        loading: false,
        onClick: () => handleSubmit(),
    };


    return (
        <Create
            saveButtonProps={buttonProps}
            title={'Create Product'}
            pageHeaderProps={{
                extra: (
                    <>
                        <ListButton>
                            <Text>{'Products'}</Text>
                        </ListButton>
                        <ShowButton>
                            <Text>{'Details'}</Text>
                        </ShowButton>
                    </>
                ),
            }}
        >
            <Form layout="vertical">
                <Form.Item
                    label="Name"
                    name="name"
                >
                    <Input name="name" onChange={handleChange} value={values.name} />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                >
                    <Input.TextArea name="description" onChange={handleChange} value={values.description} />
                </Form.Item>
                <Form.Item
                    label="Price"
                    name={'price'}
                >
                    <Input name="price" onChange={handleChange} value={values.price} />
                </Form.Item>

                <Form.Item
                    label="Color Hex"
                >
                    <Input name="colorsHex" onChange={handleChange} value={values.colorsHex} />
                </Form.Item>

                <Form.Item name="icon" noStyle>
                    <Upload.Dragger
                        name="file"
                        action={UPLOAD_URI}
                        listType="picture"
                        maxCount={1}
                        onChange={(file) => {
                            setFieldValue('image', file?.file?.response?.id);
                        }}
                    //   headers={{
                    //     authorization: `Bearer ${getAccount?.token}`,
                    //   }}
                    >
                        Upload Image
                    </Upload.Dragger>
                </Form.Item>
            </Form>
        </Create>
    );
};
