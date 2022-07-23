import { IResourceComponentsProps } from "@pankod/refine-core";
import React, { useState } from "react";
import {
  Form,
  Input,
  ListButton,
  Typography,
  ShowButton,
  Create,
  Upload,
  notification,
} from "@pankod/refine-antd";
import { CreateRecordAction } from "Containers/Actions/ConfigsActions";
import { useFormik } from "formik";
import { VIEW_UPLOAD_URI } from "App";
const { Text } = Typography;

interface Inputs {
  createProductInput: {
    value: {
      name?: string;
      price?: string;
      description?: string;
      choices?: { image: string; colorsHex: string }[];
    };
    required: boolean;
    type: string;
  };
}

export const CreateProduct: React.FC<IResourceComponentsProps> = () => {
  const [newImage, setNewImage] = useState<{
    image: string;
    colorsHex: string;
  }>({
    colorsHex: "",
    image: "",
  });
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      choices: [],
    },
    onSubmit: async (submittedValues) => {
      const inputs: Inputs = {
        createProductInput: {
          value: {},
          required: true,
          type: "CreateProductInput",
        },
      };

      if (submittedValues.name) {
        inputs.createProductInput.value.name = submittedValues.name;
      }
      if (submittedValues.price) {
        inputs.createProductInput.value.price = submittedValues.price;
      }
      if (submittedValues.description) {
        inputs.createProductInput.value.description =
          submittedValues.description;
      }

      if (newImage.image && newImage.colorsHex) {
        const arr: any = [];
        arr.push(newImage);
        inputs.createProductInput.value.choices = arr;
      }
      if (
        (newImage.image && !newImage.colorsHex) ||
        (!newImage.image && newImage.colorsHex)
      ) {
        return notification.info({
          message: "You must add a color and image",
        });
      }

      CreateRecordAction("createProduct", inputs);
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
      title={"Create Product"}
      pageHeaderProps={{
        extra: (
          <>
            <ListButton>
              <Text>{"Products"}</Text>
            </ListButton>
            <ShowButton>
              <Text>{"Details"}</Text>
            </ShowButton>
          </>
        ),
      }}
    >
      <Form layout="vertical">
        <Form.Item label="Name" name="name">
          <Input name="name" onChange={handleChange} value={values.name} />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea
            name="description"
            onChange={handleChange}
            value={values.description}
          />
        </Form.Item>
        <Form.Item label="Price" name={"price"}>
          <Input name="price" onChange={handleChange} value={values.price} />
        </Form.Item>

        <Form.Item label="Color Hex">
          <Input
            name="colorsHex"
            onChange={(val) =>
              setNewImage({
                image: newImage.image,
                colorsHex: val.target.value,
              })
            }
            placeholder={"example: #fff"}
          />
        </Form.Item>

        <Form.Item name="icon" noStyle>
          <Upload.Dragger
            name="image"
            action={VIEW_UPLOAD_URI + "public"}
            listType="picture"
            maxCount={1}
            onChange={(file) => {
              setNewImage({
                image: file?.file?.response?._id,
                colorsHex: newImage.colorsHex,
              });
            }}
          >
            Upload Image
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Create>
  );
};
