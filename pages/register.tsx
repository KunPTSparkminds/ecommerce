import { Button, Form, Input } from "antd";
import Link from "next/link";
import React, { useState } from "react";

interface RegisterPageProps {}

const RegisterPage: React.FunctionComponent<RegisterPageProps> = (props) => {
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const onFinish = (values: any) => {};
  const handleChangePassword = (e: any) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e: any) => {
    console.log("checl e", e);
  };
  return (
    <div className="register auth-page">
      <div className="register__form auth-form">
        <h2>Register</h2>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password onChange={(e) => handleChangePassword(e)} />
          </Form.Item>

          <Form.Item
            label="Confirm password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please input your confirm password!",
              },
            ]}
          >
            <Input.Password onChange={(e) => handleConfirmPassword(e)} />
          </Form.Item>

          <Form.Item className="button-submit">
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
        <div className="another-options">
          <Link href={"#"}>
            <a>Already have account?</a>
          </Link>
          <Link href={"#"}>
            <a>FAQ</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
