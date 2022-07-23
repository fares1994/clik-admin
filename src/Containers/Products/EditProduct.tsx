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
  Avatar,
  notification,
} from "@pankod/refine-antd";
import { useParams } from "react-router-dom";
import { products } from "Containers/QueryReturns";
import {
  showRecord,
  UpdateRecordAction,
} from "Containers/Actions/ConfigsActions";
import { useFormik } from "formik";
import { UPLOAD_URI, VIEW_UPLOAD_URI } from "App";
import noPhoto from "../../Assets/Images/noPhoto.png";
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
  const [newImage, setNewImage] = useState<{
    image: string;
    colorsHex: string;
  }>({
    colorsHex: "",
    image: "",
  });
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
      newImage: [],
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
      if (newImage.image && newImage.colorsHex) {
        const arr: any = values.choices;
        arr.push(newImage);
        inputs.updateProductInput.value.choices = arr;
      }
      if (
        (newImage.image && !newImage.colorsHex) ||
        (!newImage.image && newImage.colorsHex)
      ) {
        return notification.info({
          message: "You must add a color and image",
        });
      }

      // if (submittedValues.choices?.length > 0) {
      //   inputs.updateProductInput.value.choices = submittedValues.choices;

      //   // const arr: any = [];
      //   // arr.push({
      //   //   colorsHex: submittedValues.colorsHex,
      //   //   image: submittedValues.image,
      //   // });
      //   // inputs.updateProductInput.value.choices =
      //   //   submittedValues.choices.concat(arr);
      // }

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
      setFieldValue(
        "choices",
        record?.choices?.map(
          (e: { image: { _id: string }; colorsHex: string }) => ({
            image: e?.image?._id,
            colorsHex: e.colorsHex,
          })
        )
      );
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
      </Form>
      {record?.choices?.length > 0 && (
        <Form.Item label={`item Colors/Images`} style={{ marginBottom: 7 }} />
      )}
      {record?.choices?.map(
        (item: { image: { _id: string }; colorsHex: string }, key: number) => {
          return (
            <div key={key}>
              <Input
                name="colorsHex"
                disabled
                onChange={(val) => {
                  let foundItem: any = values.choices?.find(
                    (img: any) => img?.colorsHex === item?.colorsHex
                  );
                  foundItem.colorsHex = val.target.value;
                }}
                placeholder={item?.colorsHex}
              />
              <Upload.Dragger
                name="image"
                disabled
                action={UPLOAD_URI}
                listType="picture"
                style={{ marginTop: 10, marginBottom: 10 }}
                maxCount={1}
                onChange={(file) => {
                  let foundItem: any = values.choices?.find(
                    (img: any) => img?.image?._id === item?.image?._id
                  );
                  const imgId = file?.file?.response?._id;
                  foundItem.image = imgId;
                }}
              >
                <Avatar
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 5,
                  }}
                  src={
                    item?.image?._id
                      ? `${VIEW_UPLOAD_URI}${item?.image?._id}`
                      : noPhoto
                  }
                  alt="Banner"
                />
              </Upload.Dragger>
            </div>
          );
        }
      )}

      <Form.Item
        label={` Add New item Color/Image`}
        style={{ marginBottom: 7 }}
      />
      <Input
        name="colorsHex"
        onChange={(val) =>
          setNewImage({ image: newImage.image, colorsHex: val.target.value })
        }
        placeholder={"example: #fff"}
      />
      <Upload.Dragger
        name="image"
        action={UPLOAD_URI}
        style={{ marginTop: 10 }}
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
    </Edit>
  );
};
