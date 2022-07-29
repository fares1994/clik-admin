import { IResourceComponentsProps } from "@pankod/refine-core";
import React from "react";
import {
  Form,
  Input,
  ListButton,
  Typography,
  ShowButton,
  Create,
  Select,
} from "@pankod/refine-antd";
import { CreateAdminAction } from "Containers/Actions/ConfigsActions";
import { useFormik } from "formik";
const { Text } = Typography;

interface Inputs {
  createAdminInput: {
    value: {
      username: string;
      email: string;
      name: string;
      role: string;
      password: string;
    };
    required: boolean;
    type: string;
  };
}

export const CreateAdmin: React.FC<IResourceComponentsProps> = () => {
  const { values, handleChange, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      email: "",
      name: "",
      role: "",
      password: "",
    },
    onSubmit: async (submittedValues) => {
      const inputs: Inputs = {
        createAdminInput: {
          value: {
            password: submittedValues?.password,
            email: submittedValues?.email,
            name: submittedValues.name,
            username: submittedValues.username,
            role: submittedValues.role,
          },
          required: true,
          type: "CreateAdminInput",
        },
      };

      CreateAdminAction("createAdmin", inputs);
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
      title={"Create Admin"}
      pageHeaderProps={{
        extra: (
          <>
            <ListButton>
              <Text>{"Admins"}</Text>
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
        <Form.Item label="Username">
          <Input
            name="username"
            onChange={handleChange}
            value={values.username}
            placeholder={values.username}
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
        <Form.Item label="password">
          <Input
            name="password"
            onChange={handleChange}
            value={values.password}
            placeholder={values.password}
          />
        </Form.Item>
        <Form.Item label="Role">
          <Select
            value={values.role}
            options={[
              { label: "Super Admin", value: "super_admin" },
              { label: "Admin", value: "admin" },
              { label: "Driver", value: "driver" },
            ]}
            onChange={(value) => setFieldValue("role", value)}
            defaultValue={values.role}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
