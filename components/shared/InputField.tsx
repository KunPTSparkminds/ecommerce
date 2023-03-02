import { FormItemProps, Form, Input } from "antd";
import * as React from "react";

interface InputFieldProps extends FormItemProps {
  placeholder?: string;
}

export const InputField: React.FunctionComponent<InputFieldProps> = (props) => {
  return (
    <Form.Item {...props}>
      <Input placeholder={props.placeholder} />
    </Form.Item>
  );
};
