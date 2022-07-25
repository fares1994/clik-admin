import { IResourceComponentsProps } from "@pankod/refine-core";
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Edit,
  ListButton,
  Typography,
  ShowButton,
  Spin,
} from "@pankod/refine-antd";
import { useParams } from "react-router-dom";
import { admins } from "Containers/QueryReturns";
import {
  showRecord,
  UpdateRecordAction,
} from "Containers/Actions/ConfigsActions";
import { useFormik } from "formik";
const { Text } = Typography;

interface Inputs {
  updateAdminInput: {
    value: {
      id?: string;
      username?: string;
      email?: string;
      name?: string;
      role?: string;
    };
    required: boolean;
    type: string;
  };
}

export const EditAdmin: React.FC<IResourceComponentsProps> = () => {
  const params = useParams();
  const [record, setRecord] = useState<any>();
  const [refresh, setRefresh] = useState<boolean>(true);
  const handleRefetch = () => setRefresh(true);

  useEffect(() => {
    if (refresh && params?.id) {
      showRecord("admin-custom", params?.id, admins, setRecord, setRefresh);
    }
  }, [refresh, params?.id]);

  const { values, handleChange, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      id: record?.id,
      username: "",
      email: "",
      name: "",
      role: "",
    },
    onSubmit: async (submittedValues) => {
      const inputs: Inputs = {
        updateAdminInput: {
          value: {
            id: params?.id,
          },
          required: true,
          type: "UpdateAdminInput",
        },
      };
      // if (submittedValues.username) {
      //   inputs.updateAdminInput.value.username = submittedValues.username;
      // }
      if (submittedValues.email) {
        inputs.updateAdminInput.value.email = submittedValues.email;
      }
      // if (submittedValues.role) {
      //   inputs.updateAdminInput.value.role = submittedValues.role;
      // }
      if (submittedValues.name) {
        inputs.updateAdminInput.value.name = submittedValues.name;
      }

      UpdateRecordAction("updateAdmin", inputs, handleRefetch);
    },
  });

  const buttonProps = {
    disables: refresh,
    loading: refresh,
    onClick: () => handleSubmit(),
  };

  useEffect(() => {
    if (record) {
      setFieldValue("id", record?.id);
      setFieldValue("email", record?.email);
      setFieldValue("name", record?.name);
    }
  }, [record, setFieldValue]);

  if (!values?.email) return <Spin className="spinner" size={"large"} />;

  return (
    <Edit
      saveButtonProps={buttonProps}
      title={"Edit Admin"}
      pageHeaderProps={{
        extra: (
          <>
            <ListButton>
              <Text>{"Admins"}</Text>
            </ListButton>
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
        <Form.Item label="Email">
          <Input
            name="email"
            onChange={handleChange}
            value={values.email}
            placeholder={values.email}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
