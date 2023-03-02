import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import commonApi from "../apis/commonApi";
import { RegisterForm, Toast } from "../components";

interface RegisterPageProps {}
export interface RegisterProps {
  name: string;
  email: string;
  password: any;
}
const RegisterPage: React.FunctionComponent<RegisterPageProps> = (props) => {
  const router = useRouter();

  const onSubmitForm = async (values: RegisterProps) => {
    const { error, body } = await commonApi({
      url: "api/register",
      method: "POST",
      body: JSON.stringify(values),
    });
    if (error?.status) {
      Toast({
        message: error.message,
        type: "error",
      });
    }
    if (body?.email) {
      Toast({
        message: "Register successfull. You will be redirected to login page",
        type: "success",
      });
      router.push("/login");
    }
  };

  return (
    <div className="register auth-page">
      <div className="register__form auth-form">
        <h2>Register</h2>
        <RegisterForm onSubmitForm={onSubmitForm} />
        <div className="another-options">
          <Link href={"/login"}>
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
