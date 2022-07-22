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
  createTitleInput: {
    value: {
      category?: string;
      title?: string;
    };
    required: boolean;
    type: string;
  };
}

export const CreateTitle: React.FC<IResourceComponentsProps> = () => {
  const { values, handleChange, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      category: "",
      title: "",
    },
    onSubmit: async (submittedValues) => {
      const inputs: Inputs = {
        createTitleInput: {
          value: {},
          required: true,
          type: "CreateTitleInput",
        },
      };

      if (submittedValues.category) {
        inputs.createTitleInput.value.category = submittedValues.category;
      }
      if (submittedValues.title) {
        inputs.createTitleInput.value.title = submittedValues.title;
      }

      CreateRecordAction("createTitle", inputs);
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
      title={"Title"}
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
    </Create>
  );
};
