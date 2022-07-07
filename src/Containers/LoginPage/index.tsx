import { useLogin } from "@pankod/refine-core";
import { Button, Checkbox, Form, Input } from "antd";
import React from "react";
import "./style.css";
interface Values {
  username: string;
  password: string;
  remember: boolean;
}
const LoginPage: React.FC = () => {
  const { mutate: login } = useLogin<{
    username: string;
    password: string;
    remember: boolean;
  }>();

  const onFinish = (values: Values) => {
    login({ ...values });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-page-container">
      Clik Admin
      <div className="login-container">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
            style={{ marginBottom: 25 }}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
            style={{ marginBottom: 25 }}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              color="orange"
              style={{ backgroundColor: "orange", borderColor: "orange" }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
