import { IResourceComponentsProps } from "@pankod/refine-core";
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Edit,
  ListButton,
  Typography,
  ShowButton,
  Upload,
} from "@pankod/refine-antd";
import { useParams } from "react-router-dom";
import { products } from "Containers/QueryReturns";
import {
  showRecord,
  UpdateRecordAction,
} from "Containers/Actions/ConfigsActions";
import { useFormik } from "formik";
import { UPLOAD_URI } from "App";
const { Text } = Typography;

interface Inputs {
  updateProductInput: {
    value: {
      _id?: string;
      name?: string;
      price?: string;
      description?: string;
      choices?: { image: string; colorsHex: string }[];
    };
    required: boolean;
    type: string;
  };
}

export const EditProduct: React.FC<IResourceComponentsProps> = () => {
  const params = useParams();
  const [record, setRecord] = useState<any>();
  const [refresh, setRefresh] = useState<boolean>(true);
  const handleRefetch = () => setRefresh(true);

  useEffect(() => {
    if (refresh && params?.id) {
      showRecord(
        "findProductById-custom",
        params?.id,
        products,
        setRecord,
        setRefresh
      );
    }
  }, [refresh, params?.id]);

  const { values, handleChange, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      _id: record?._id,
      name: "",
      price: "",
      description: "",
      image: "",
      colorsHex: "",
      choices: [],
    },
    onSubmit: async (submittedValues) => {
      const inputs: Inputs = {
        updateProductInput: {
          value: {
            _id: params?.id,
          },
          required: true,
          type: "UpdateProductInput",
        },
      };
      if (submittedValues.name) {
        inputs.updateProductInput.value.name = submittedValues.name;
      }
      if (submittedValues.price) {
        inputs.updateProductInput.value.price = submittedValues.price;
      }
      if (submittedValues.description) {
        inputs.updateProductInput.value.description =
          submittedValues.description;
      }
      if (submittedValues.colorsHex && submittedValues.image) {
        const arr: any = [];
        arr.push({
          colorsHex: submittedValues.colorsHex,
          image: submittedValues.image,
        });
        inputs.updateProductInput.value.choices =
          submittedValues.choices.concat(arr);
      }
      UpdateRecordAction("updateProduct", inputs, handleRefetch);
    },
  });

  const buttonProps = {
    disables: refresh,
    loading: refresh,
    onClick: () => handleSubmit(),
  };

  useEffect(() => {
    if (record) {
      setFieldValue("_id", record?._id);
      setFieldValue("name", record?.name);
      setFieldValue("price", record?.price);
      setFieldValue("description", record?.description);
      setFieldValue("choices", record?.choices);
    }
  }, [record, setFieldValue]);

  return (
    <Edit
      saveButtonProps={buttonProps}
      title={"Edit Product"}
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
        <Form.Item label="Name">
          <Input
            name="name"
            onChange={handleChange}
            value={values.name}
            placeholder={values.name}
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input.TextArea
            name="description"
            onChange={handleChange}
            value={values.description}
            placeholder={values.description}
          />
        </Form.Item>
        <Form.Item label="Price">
          <Input
            name="price"
            onChange={handleChange}
            value={values.price}
            placeholder={values.price}
          />
        </Form.Item>

        <Form.Item label="Color Hex">
          <Input
            name="colorsHex"
            onChange={handleChange}
            value={values.colorsHex}
          />
        </Form.Item>

        <Form.Item name={["choices", "image"]} noStyle>
          <Upload.Dragger
            name="file"
            action={UPLOAD_URI}
            listType="picture"
            maxCount={1}
            onChange={(file) => {
              setFieldValue("image", file?.file?.response?.id);
            }}
          >
            Upload Image
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Edit>
  );
};
