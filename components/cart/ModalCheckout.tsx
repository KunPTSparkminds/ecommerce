import { Button, Form, Input, Select } from "antd";
import * as React from "react";
import countryList from "react-select-country-list";

interface ModalCheckoutProps {}
const { Option } = Select;
const ModalCheckout: React.FunctionComponent<ModalCheckoutProps> = (props) => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  const options = React.useMemo(() => countryList().getData(), []);
  console.log("check options", options);
  return (
    <div className="modal-checkout">
      <Form name="basic" onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Full Name"
          name="name"
          rules={[{ required: true, message: "Please input your fullname!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Country"
          name="country"
          rules={[{ required: true, message: "Please select your country!" }]}
        >
          <Select>
            {options?.length > 0 &&
              options.map((item) => (
                <Option key={item.value}>{item.label}</Option>
              ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ModalCheckout;
