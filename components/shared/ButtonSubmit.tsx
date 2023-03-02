import { FormItemProps, Form, Input, Button } from "antd";
import * as React from "react";

interface ButtonSubmitProps extends FormItemProps {
  text: string;
}

export const ButtonSubmit: React.FunctionComponent<ButtonSubmitProps> = (
  props
) => {
  return (
    <Form.Item {...props}>
      <Button type="primary" htmlType="submit">
        {props.text}
      </Button>
    </Form.Item>
  );
};
