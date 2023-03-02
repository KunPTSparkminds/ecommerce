import { Form, FormItemProps, Select } from "antd";
import * as React from "react";

interface SelectFieldProps extends FormItemProps {
  data: { key: number; label: string }[];
  selectPlaceh;
}

export const SelectField: React.FunctionComponent<SelectFieldProps> = (
  props
) => {
  const { Option } = Select;
  return (
    <Form.Item {...props}>
      <Select placeholder="Please select your category">
        {props.data.map((item, index) => (
          <Option value={item.key} key={index}>
            {item.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};
