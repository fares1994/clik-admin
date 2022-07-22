import { IResourceComponentsProps } from "@pankod/refine-core";
import React, { useEffect, useState } from "react";
import {
  useForm,
  Form,
  Input,
  Edit,
  Select,
  ListButton,
  Typography,
  ShowButton,
} from "@pankod/refine-antd";
import { account } from "Containers/QueryReturns";
import {
  UpdateRecordAction,
  showRecord,
} from "Containers/Actions/ConfigsActions";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
const { Text } = Typography;

interface Inputs {
  updateUserInput: {
    value: {
      id?: string;
      name?: string;
      email?: string;
      personalBio?: string;
      twitterId?: string;
      gender?: string;
      instagramId?: string;
      title?: string;
    };
    required: boolean;
    type: string;
  };
}

export const EditUser: React.FC<IResourceComponentsProps> = () => {
  const params = useParams();
  const [record, setRecord] = useState<any>();
  const [refresh, setRefresh] = useState<boolean>(true);

  useEffect(() => {
    if (refresh && params?.id) {
      showRecord("findUserAuth", params?.id, account, setRecord, setRefresh);
    }
  }, [refresh, params?.id]);
  const handleRefetch = () => setRefresh(true);

  const { values, handleChange, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      id: record?.id,
      name: "",
      email: "",
      personalBio: "",
      gender: "",
      title: "",
      instagramId: "",
      twitterId: "",
    },
    onSubmit: async (submittedValues) => {
      const inputs: Inputs = {
        updateUserInput: {
          value: {
            // id: record?.id
          },
          required: true,
          type: "UpdateUserInput",
        },
      };
      if (submittedValues.name) {
        inputs.updateUserInput.value.name = submittedValues.name;
      }
      //   if (submittedValues.email) {
      //     inputs.updateUserInput.value.email = submittedValues.email;
      //   }
      if (submittedValues.gender) {
        inputs.updateUserInput.value.gender = submittedValues.gender;
      }
      if (submittedValues.personalBio) {
        inputs.updateUserInput.value.personalBio = submittedValues.personalBio;
      }

      if (submittedValues.instagramId) {
        inputs.updateUserInput.value.instagramId = submittedValues.instagramId;
      }
      if (submittedValues.title) {
        inputs.updateUserInput.value.title = submittedValues.title;
      }
      if (submittedValues.twitterId) {
        inputs.updateUserInput.value.twitterId = submittedValues.twitterId;
      }

      UpdateRecordAction("updateUser", inputs, handleRefetch);
    },
  });

  const buttonProps = {
    disables: refresh,
    loading: refresh,
    onClick: () => handleSubmit(),
  };

  useEffect(() => {
    if (record) {
      setFieldValue("name", record?.name);
      setFieldValue("personalBio", record?.personalBio);
      setFieldValue("email", record?.email);
      setFieldValue("title", record?.title?.title);
      setFieldValue("gender", record?.gender);
    }
  }, [record, setFieldValue]);

  if (!values?.gender) return <></>;

  return (
    <Edit
      saveButtonProps={buttonProps}
      title={"Edit User"}
      pageHeaderProps={{
        extra: (
          <>
            <ListButton>
              <Text>{"Users"}</Text>
            </ListButton>
            <ShowButton>
              <Text>{"Details"}</Text>
            </ShowButton>
          </>
        ),
      }}
    >
      <Form layout="vertical">
        <Form.Item label="Name" rules={[{ required: true }]} required>
          <Input name="name" onChange={handleChange} value={values.name} />
        </Form.Item>
        {/* <Form.Item label="Email" rules={[{ required: true }]} required>
          <Input name="email" onChange={handleChange} value={values.email} />
        </Form.Item> */}
        <Form.Item label="Title" required rules={[{ required: true }]}>
          <Input name="title" onChange={handleChange} value={values.title} />
        </Form.Item>
        <Form.Item label="Personal Bio" rules={[{ required: true }]}>
          <Input.TextArea
            name="personalBio"
            onChange={handleChange}
            value={values.personalBio}
          />
        </Form.Item>

        <Form.Item label="TwitterId" required>
          <Input
            name="twitterId"
            onChange={handleChange}
            value={values.twitterId}
          />
        </Form.Item>

        <Form.Item label="InstagramId" required>
          <Input
            name="instagramId"
            onChange={handleChange}
            value={values.instagramId}
          />
        </Form.Item>

        <Form.Item label="Gender" required>
          <Select
            defaultValue={record?.gender}
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ]}
            onChange={(val) => setFieldValue("gender", val)}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
