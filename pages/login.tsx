import { Button, Form, Input } from "antd";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../hooks/hooks";
import { setIsLoggedIn } from "../redux/slice/authSlice";

interface LoginProps {}

const Login: React.FunctionComponent<LoginProps> = (props) => {
  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    fetch("http://localhost:8081/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        if (!res.ok) throw res;
        return res.json();
      })
      .then((data) => {
        if (data?.jwtToken) {
          dispatch(setIsLoggedIn(true));
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("jwt", data.jwtToken);
        }
      })
      .catch((error) => {
        error.json().then((body: any) => {
          toast(body.message, {
            hideProgressBar: true,
            autoClose: 1000,
            type: "error",
          });
        });
      });
  };

  return (
    <div className="login auth-page">
      <div className="login__form auth-form">
        <h2>Login</h2>
        <Form
          name="basic"
          initialValues={{}}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
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

          <Form.Item className="button-submit">
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
        <div className="another-options">
          <Link href={"#"}>
            <a>Forget password</a>
          </Link>
          <Link href={"/register"}>
            <a>Register now</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
