import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface RegisterPageProps {}

const RegisterPage: React.FunctionComponent<RegisterPageProps> = (props) => {
  const router = useRouter();
  const onFinish = async (values: any) => {
    await fetch("http://localhost:8081/api/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    })
      .then((response) => {
        if (!response.ok) throw response;
        return response.json();
      })
      .then((data) => {
        if (data?.email) {
          toast("Register successfull. You will be redirected to login page", {
            hideProgressBar: true,
            autoClose: 1500,
            type: "success",
          });
          router.push("/login");
        }
      })
      .catch((error) => {
        error.json().then((body: any) => {
          toast(body?.message, {
            hideProgressBar: true,
            autoClose: 2000,
            type: "error",
          });
        });
      });
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
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm password"
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Password not match!");
                },
              }),
            ]}
          >
            <Input.Password />
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
