import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import commonApi from "../apis/commonApi";
import { LoginForm, Toast } from "../components";
import { useAppDispatch } from "../hooks/hooks";
import { setIsLoggedIn } from "../redux/slice/authSlice";

interface LoginProps {}
export type InputLogin = {
  email: string;
  password: string;
};
const Login: React.FunctionComponent<LoginProps> = (props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSubmitForm = async (values: InputLogin) => {
    const { error, body } = await commonApi({
      url: "api/login",
      method: "POST",
      isLoggedIn: true,
      body: JSON.stringify(values),
    });
    if (error?.status) {
      Toast({
        message: error.message,
        type: "error",
      });
    }
    if (body?.jwtToken) {
      dispatch(setIsLoggedIn(true));
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("jwt", body.jwtToken);
      router.push("/");
    }
  };

  return (
    <div className="login auth-page">
      <div className="login__form auth-form">
        <h2>Login</h2>
        <LoginForm onSubmitForm={onSubmitForm} />
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
