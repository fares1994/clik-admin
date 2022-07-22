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
  Select,
  Switch,
} from "@pankod/refine-antd";
import { useParams } from "react-router-dom";
import { globalLniks } from "Containers/QueryReturns";
import {
  showRecord,
  UpdateRecordAction,
} from "Containers/Actions/ConfigsActions";
import { useFormik } from "formik";
import { UPLOAD_URI } from "App";
const { Text } = Typography;

interface Inputs {
  updateGlobalLinkInput: {
    value: {
      id?: string;
      type?: string;
      title?: string;
      placeholder?: string;
      redirectionType?: string;
      image?: string;
      deleted?: boolean | string;
    };
    required: boolean;
    type: string;
  };
}

export const EditGlobalLink: React.FC<IResourceComponentsProps> = () => {
  const params = useParams();
  const [record, setRecord] = useState<any>();
  const [refresh, setRefresh] = useState<boolean>(true);
  const handleRefetch = () => setRefresh(true);

  useEffect(() => {
    if (refresh && params?.id) {
      showRecord(
        "findGlobalLink-custom",
        params?.id,
        globalLniks,
        setRecord,
        setRefresh
      );
    }
  }, [refresh, params?.id]);

  const { values, handleChange, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      id: record?._id,
      type: "",
      title: "",
      redirectionType: "",
      image: "",
      placeholder: "",
      deleted: "",
    },
    onSubmit: async (submittedValues) => {
      const inputs: Inputs = {
        updateGlobalLinkInput: {
          value: {
            id: params?.id,
          },
          required: true,
          type: "UpdateGlobalLinkInput",
        },
      };
      if (submittedValues.type) {
        inputs.updateGlobalLinkInput.value.type = submittedValues.type;
      }
      if (submittedValues.title) {
        inputs.updateGlobalLinkInput.value.title = submittedValues.title;
      }
      if (submittedValues.redirectionType) {
        inputs.updateGlobalLinkInput.value.redirectionType =
          submittedValues.redirectionType;
      }
      if (submittedValues.placeholder) {
        inputs.updateGlobalLinkInput.value.placeholder =
          submittedValues.placeholder;
      }
      if (submittedValues.image) {
        inputs.updateGlobalLinkInput.value.image = submittedValues.image;
      }

      UpdateRecordAction("updateGlobalLink", inputs, handleRefetch);
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
      setFieldValue("title", record?.title);
      setFieldValue("type", record?.type);
      setFieldValue("redirectionType", record?.redirectionType);
      setFieldValue("placeholder", record?.placeholder);
      setFieldValue("image", record?.image?._id);
      setFieldValue("deleted", record?.deleted);
    }
  }, [record, setFieldValue]);

  if (!values?.type) return <></>;

  return (
    <Edit
      saveButtonProps={buttonProps}
      title={"Edit Global Link"}
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
        <Form.Item label="Type">
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
            defaultValue={values.type}
          />
        </Form.Item>
        <Form.Item label="Title">
          <Input
            name="title"
            onChange={handleChange}
            value={values.title}
            placeholder={values.title}
          />
        </Form.Item>
        <Form.Item label="RedirectionType">
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
            defaultValue={values.redirectionType}
          />
        </Form.Item>

        <Form.Item label="Placeholder">
          <Input
            name="placeholder"
            onChange={handleChange}
            value={values.placeholder}
            placeholder={values.placeholder}
          />
        </Form.Item>

        <Form.Item label="deleted" name={"Deleted"}>
          <Switch
            onChange={(val) => setFieldValue("deleted", val)}
            defaultChecked={!!values?.deleted}
          />
        </Form.Item>

        <Form.Item name={"image"} noStyle>
          <Upload.Dragger
            name="file"
            action={UPLOAD_URI}
            listType="picture"
            maxCount={1}
            onChange={(file) => {
              setFieldValue("image", file?.file?.response?.id);
            }}
            //   headers={{
            //     authorization: `Bearer ${getAccount?.token}`,
            //   }}
          >
            Upload Image
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Edit>
  );
};
