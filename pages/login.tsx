import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
interface LoginProps {}

const Login: React.FunctionComponent<LoginProps> = (props) => {
  const router = useRouter();
  const [jwt, setJWT] = useState<{ jwtToken: string }>();
  console.log("check jwt", jwt);
  const onFinish = async (values: any) => {
    const obj = JSON.parse(JSON.stringify(values));
    const formData = new FormData();
    formData.append("email", obj.email);
    formData.append("password", obj.password);
    await fetch("http://localhost:8081/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => setJWT(data));
  };

  useEffect(() => {
    if (jwt) {
      router.push("/");
      localStorage.setItem("isLoggedIn", jwt ? "true" : "false");
      localStorage.setItem("jwt", jwt.jwtToken);
    }
  }, [jwt]);
  return (
    <div className="login auth-page">
      <div className="login__form auth-form">
        <h2>Login</h2>
        <Form
          name="basic"
          initialValues={{ remember: true }}
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
          <Link href={"#"}>
            <a>Register now</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
