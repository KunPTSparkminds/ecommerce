import { Form } from "antd";
import * as React from "react";
import { EMAIL_REGEX } from "../../consts";
import { InputLogin } from "../../pages/login";
import { InputField, PasswordField, VerticalForm } from "../shared";
import { ButtonSubmit } from "../shared/ButtonSubmit";

interface LoginFormProps {
  onSubmitForm: (values: InputLogin) => Promise<void>;
}
const initialValues = {};
export const LoginForm: React.FunctionComponent<LoginFormProps> = ({
  onSubmitForm,
}) => {
  return (
    <VerticalForm
      name="auth"
      initialValues={initialValues}
      onFinish={onSubmitForm}
    >
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
        placeholder="Email"
      />

      <PasswordField
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      />

      <ButtonSubmit text="Login" className="button-submit" />
    </VerticalForm>
  );
};
