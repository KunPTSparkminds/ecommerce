import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ApiHelper } from "../apis/apiHelper";
interface LoginProps {}

const Login: React.FunctionComponent<LoginProps> = (props) => {
  const router = useRouter();
  const [jwt, setJWT] = useState<{ jwtToken: string }>();

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
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("jwt", data.jwtToken);
          setJWT(data.jwtToken);
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

  useEffect(() => {
    if (jwt) {
      getUserDetail();
    }
  }, [jwt]);

  const getUserDetail = () => {
    ApiHelper({
      url: "http://localhost:8081/api/user-detail",
      method: "GET",
    }).then((data) => {
      if (data?.role) {
        router.push("/admin");
      } else {
        router.push("/");
      }
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
