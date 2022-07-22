import { IResourceComponentsProps } from "@pankod/refine-core";
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Edit,
  ListButton,
  Typography,
  ShowButton,
  Select,
} from "@pankod/refine-antd";
import { useParams } from "react-router-dom";
import { titles } from "Containers/QueryReturns";
import {
  showRecord,
  UpdateRecordAction,
} from "Containers/Actions/ConfigsActions";
import { useFormik } from "formik";
const { Text } = Typography;

interface Inputs {
  updateTitleInput: {
    value: {
      id?: string;
      title?: string;
      category?: string;
    };
    required: boolean;
    type: string;
  };
}

export const EditTitle: React.FC<IResourceComponentsProps> = () => {
  const params = useParams();
  const [record, setRecord] = useState<any>();
  const [refresh, setRefresh] = useState<boolean>(true);
  const handleRefetch = () => setRefresh(true);

  useEffect(() => {
    if (refresh && params?.id) {
      showRecord(
        "findTitleById-custom",
        params?.id,
        titles,
        setRecord,
        setRefresh
      );
    }
  }, [refresh, params?.id]);

  const { values, handleChange, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      id: record?._id,
      category: "",
      title: "",
    },
    onSubmit: async (submittedValues) => {
      const inputs: Inputs = {
        updateTitleInput: {
          value: {
            id: params?.id,
          },
          required: true,
          type: "UpdateTitleInput",
        },
      };
      if (submittedValues.category) {
        inputs.updateTitleInput.value.category = submittedValues.category;
      }
      if (submittedValues.title) {
        inputs.updateTitleInput.value.title = submittedValues.title;
      }

      UpdateRecordAction("updateTitle", inputs, handleRefetch);
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
      setFieldValue("category", record?.category);
    }
  }, [record, setFieldValue]);

  if (!values?.category) return <></>;

  return (
    <Edit
      saveButtonProps={buttonProps}
      title={"Edit Title"}
      pageHeaderProps={{
        extra: (
          <>
            <ListButton>
              <Text>{"Titles"}</Text>
            </ListButton>
            <ShowButton>
              <Text>{"Details"}</Text>
            </ShowButton>
          </>
        ),
      }}
    >
      <Form layout="vertical">
        <Form.Item label="Title">
          <Input
            name="title"
            onChange={handleChange}
            value={values.title}
            placeholder={values.title}
          />
        </Form.Item>
        <Form.Item label="Category">
          <Select
            value={values.category}
            options={[
              { label: "Technology", value: "technology" },
              { label: "Finance", value: "finance" },
              { label: "Education", value: "education" },
            ]}
            onChange={(value) => setFieldValue("category", value)}
            defaultValue={values.category}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
