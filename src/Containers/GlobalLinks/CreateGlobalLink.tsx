import { IResourceComponentsProps } from "@pankod/refine-core";
import React from "react";
import {
  Form,
  Input,
  ListButton,
  Typography,
  ShowButton,
  Create,
  Upload,
  Select,
} from "@pankod/refine-antd";
import { CreateRecordAction } from "Containers/Actions/ConfigsActions";
import { useFormik } from "formik";
import { UPLOAD_URI } from "App";
const { Text } = Typography;

interface Inputs {
  createGlobalLinkInput: {
    value: {
      type?: string;
      title?: string;
      placeholder?: string;
      redirectionType?: string;
      image?: string;
    };
    required: boolean;
    type: string;
  };
}

export const CreateGlobalLink: React.FC<IResourceComponentsProps> = () => {
  const { values, handleChange, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      type: "",
      title: "",
      redirectionType: "",
      image: "",
      placeholder: "",
    },
    onSubmit: async (submittedValues) => {
      const inputs: Inputs = {
        createGlobalLinkInput: {
          value: {},
          required: true,
          type: "CreateGlobalLinkInput",
        },
      };

      if (submittedValues.type) {
        inputs.createGlobalLinkInput.value.type = submittedValues.type;
      }
      if (submittedValues.title) {
        inputs.createGlobalLinkInput.value.title = submittedValues.title;
      }
      if (submittedValues.redirectionType) {
        inputs.createGlobalLinkInput.value.redirectionType =
          submittedValues.redirectionType;
      }
      if (submittedValues.placeholder) {
        inputs.createGlobalLinkInput.value.placeholder =
          submittedValues.placeholder;
      }

      if (submittedValues.image) {
        inputs.createGlobalLinkInput.value.image = submittedValues.image;
      }

      CreateRecordAction("createGlobalLink", inputs);
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
      title={"Create Global Link"}
      pageHeaderProps={{
        extra: (
          <>
            <ListButton>
              <Text>{"Global Links"}</Text>
            </ListButton>
            <ShowButton>
              <Text>{"Details"}</Text>
            </ShowButton>
          </>
        ),
      }}
    >
      <Form layout="vertical">
        <Form.Item label="Type" name="type">
          <Select
            value={values.type}
            options={[
              { label: "Contact Info", value: "contactInfo" },
              { label: "Social Media", value: "socialMedia" },
              { label: "Bussiness", value: "bussiness" },
              { label: "Payments", value: "payments" },
              { label: "Music", value: "music" },
            ]}
            onChange={(value) => setFieldValue("type", value)}
          />
        </Form.Item>
        <Form.Item label="Title" name="title">
          <Input name="title" onChange={handleChange} value={values.title} />
        </Form.Item>
        <Form.Item label="RedirectionType" name={"redirectionType"}>
          <Select
            value={values.redirectionType}
            options={[
              { label: "Phone number", value: "phonenumber" },
              { label: "SMS", value: "sms" },
              { label: "Mail to", value: "mailto" },
              { label: "WhatsApp", value: "whatsApp" },
              { label: "In App Browser", value: "inAppBrowser" },
            ]}
            onChange={(value) => setFieldValue("redirectionType", value)}
          />
        </Form.Item>

        <Form.Item label="Placeholder" name={"placeholder"}>
          <Input
            name="placeholder"
            onChange={handleChange}
            value={values.placeholder}
            placeholder={values.placeholder}
          />
        </Form.Item>

        <Form.Item name={"image"} noStyle>
          <Upload.Dragger
            name="image"
            action={UPLOAD_URI}
            listType="picture"
            maxCount={1}
            onChange={(file) => {
              setFieldValue("image", file?.file?.response?._id);
            }}
          >
            Upload Image
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Create>
  );
};
