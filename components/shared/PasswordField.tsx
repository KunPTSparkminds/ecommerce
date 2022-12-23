import { FormItemProps, Form, Input } from "antd";
import * as React from "react";

interface PasswordFieldProps extends FormItemProps {
  placeholder?: string;
}

export const PasswordField: React.FunctionComponent<PasswordFieldProps> = (
  props
) => {
  return (
    <Form.Item {...props}>
      <Input.Password placeholder={props.placeholder} />
    </Form.Item>
  );
};
