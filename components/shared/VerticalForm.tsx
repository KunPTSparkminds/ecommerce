import { Form, FormProps } from "antd";
import React, { ReactNode } from "react";

interface VerticalFormProps extends FormProps {
  children?: ReactNode;
}
export const VerticalForm: React.FC<VerticalFormProps> = (props) => {
  const [form] = Form.useForm();
  return <Form {...props} layout="vertical" autoComplete="off" form={form} />;
};
