import { Form } from "antd";
import * as React from "react";
import { EMAIL_REGEX } from "../../consts";
import {
  InputField,
  PasswordField,
  ButtonSubmit,
  VerticalForm,
} from "../shared";
import { RegisterProps } from "./../../pages/register";

interface RegisterFormProps {
  onSubmitForm: (values: RegisterProps) => Promise<void>;
}
const initialValues = {};
export const RegisterForm: React.FunctionComponent<RegisterFormProps> = ({
  onSubmitForm,
}) => {
  return (
    <VerticalForm
      name="auth"
      initialValues={initialValues}
      onFinish={onSubmitForm}
    >
      <InputField
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      />

      <InputField
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          {
            pattern: EMAIL_REGEX,
            message: "Invalid email",
          },
        ]}
      />

      <PasswordField
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      />

      <PasswordField
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
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("Password not match!");
            },
          }),
        ]}
      />
      <ButtonSubmit text="Register" className="button-submit" />
    </VerticalForm>
  );
};
