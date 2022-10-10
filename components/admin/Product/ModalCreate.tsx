import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Upload } from "antd";
import { RcFile } from "antd/lib/upload";
import React, { useEffect } from "react";
import { Product } from "../../../models";
interface ModalCreateProps {
  onSubmit: any;
  onUpdateForm?: any;
  onGetBase64: (value: string) => void;
  optionsCategory: { key: number; label: string }[];
  form: any;
  dataDetail?: Product;
  type?: string;
}

const ModalCreate: React.FunctionComponent<ModalCreateProps> = ({
  onSubmit,
  onGetBase64,
  form,
  dataDetail,
  optionsCategory,
  onUpdateForm,
  type,
}) => {
  const { Option } = Select;
  const getBase64 = (img: any, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onChangeFile = (file: File) => {
    getBase64(file as RcFile, (url: string) => {
      if (onGetBase64) onGetBase64(url);
    });
  };

  useEffect(() => {
    if (dataDetail && Object.keys(dataDetail).length > 0) {
      form.setFieldsValue({
        name: dataDetail.name,
        description: dataDetail.description,
        price: dataDetail.price,
        quantity: dataDetail.quantity,
        categoryId: dataDetail.categoryId,
        image: dataDetail.image,
      });
    }
  }, [dataDetail]);

  return (
    <div className="modal-create">
      <Form
        name="basic"
        onFinish={type === "update" ? onUpdateForm : onSubmit}
        autoComplete="on"
        layout="vertical"
        form={form}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Type your name's product" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <Input placeholder="Type your description" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input your price!" }]}
        >
          <Input placeholder="Type your price" />
        </Form.Item>

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please input your quantity!" }]}
        >
          <Input placeholder="Type your quantity" />
        </Form.Item>
        <Form.Item
          name="categoryId"
          label="Category"
          hasFeedback
          rules={[{ required: true, message: "Please select your category!" }]}
        >
          <Select placeholder="Please select your category">
            {optionsCategory.map((item, index) => (
              <Option value={item.key} key={index}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Upload Image">
          <Form.Item
            name="dragger"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
            rules={[{ required: true, message: "Please input your image!" }]}
          >
            <Upload.Dragger
              name="files"
              action="/"
              accept=".png,.jpg,.jpeg"
              listType="picture"
              beforeUpload={(file) => {
                onChangeFile(file);
                return false;
              }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item className="button-submit">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ModalCreate;
