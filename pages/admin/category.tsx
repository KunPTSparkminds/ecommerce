import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Table } from "antd";
import date from "date-and-time";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import commonApi from "../../apis/commonApi";
import { Toast } from "../../components";
import ModalCreate from "../../components/admin/Category/ModalCreate";
import { DATE_TIME_FORMAT } from "../../consts";
import { Category } from "../../models";

interface CategoryProps {}
const Category: React.FunctionComponent<CategoryProps> = (props) => {
  const router = useRouter();
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState<Category[]>([]);
  const [categoryDetail, setCategoryDetail] = useState<Category>();
  const [base64String, setBase64String] = useState<string>();
  const [index, setIndex] = useState<number>(Math.random());
  const [type, setType] = useState<string>();

  useEffect(() => {
    if (index) {
      getCategories();
    }
  }, [index]);

  const getCategories = async () => {
    const { body } = await commonApi({
      url: "api/category",
      method: "GET",
    });
    if (body) {
      setCategory(
        body.map((item: Category) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          createdAt: item.createdAt,
          updatedAt: item.updateAt,
          image: item.image,
          action: item.id,
        }))
      );
    }
  };

  const onGetBase64 = (value: string) => {
    setBase64String(value);
  };

  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        align: "center" as "center",
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        align: "center" as "center",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        align: "center" as "center",
      },
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
        align: "center" as "center",
        render: (value: string) => {
          if (value) {
            return <Image alt="" src={value} width={50} height={50} />;
          }
        },
      },
      {
        title: "Created At",
        dataIndex: "createdAt",
        key: "createdAt",
        align: "center" as "center",
        render: (value: Date) => (
          <span>{date.format(new Date(value), DATE_TIME_FORMAT)}</span>
        ),
      },
      {
        title: "Updated At",
        dataIndex: "updatedAt",
        key: "updatedAt",
        align: "center" as "center",
        render: (value: Date) => (
          <span>{date.format(new Date(value), DATE_TIME_FORMAT)}</span>
        ),
      },
      {
        title: "Actions",
        dataIndex: "action",
        key: "action",
        align: "center" as "center",
        render: (value: number) => {
          return (
            <div className="group-actions">
              <Button
                icon={<EditOutlined />}
                type="primary"
                title="Edit"
                onClick={() => handleEdit(value)}
              />
              <Button
                icon={<DeleteOutlined />}
                danger
                type="primary"
                title="Delete"
                onClick={() => handleDelete(value)}
              />
            </div>
          );
        },
      },
    ],
    []
  );

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleDelete = async (id: number) => {
    const { ok } = await commonApi({
      url: `api/category/${id}`,
      method: "DELETE",
    });
    if (ok) {
      setIndex(Math.random());
      Toast({
        message: "Delete successfull",
        type: "success",
      });
    }
  };

  const handleEdit = async (id: number) => {
    setIsModalOpen(!isModalOpen);
    setType("update");
    const { body } = await commonApi({
      url: `api/category/${id}`,
      method: "GET",
    });
    if (body) {
      setCategoryDetail(body);
      router.push(`/admin/category?id=${id}`);
    }
  };

  const onSubmit = async (values: any) => {
    const { body } = await commonApi({
      url: "api/category/create",
      method: "POST",
      body: JSON.stringify({
        name: values.name,
        description: values.description,
        image: base64String,
      }),
    });
    if (body) {
      form.resetFields();
      setIsModalOpen(false);
      Toast({
        message: "Create category successfully",
        type: "success",
      });
      setIndex(Math.random());
    }
  };

  const handleUpdate = async (values: any) => {
    const { ok } = await commonApi({
      url: `api/category/${router.query.id}`,
      method: "PUT",
      body: JSON.stringify({
        name: values.name,
        description: values.description,
        image: base64String,
      }),
    });
    if (ok) {
      form.resetFields();
      setIsModalOpen(false);
      router.push("/admin/category");
      Toast({
        message: "Update successfully",
        type: "success",
      });
      setIndex(Math.random());
    }
  };

  return (
    <>
      <Modal
        title="Create Category"
        open={isModalOpen}
        onCancel={handleCancel}
        className="modal-category"
      >
        <ModalCreate
          onSubmit={onSubmit}
          onUpdateForm={handleUpdate}
          onGetBase64={onGetBase64}
          dataDetail={categoryDetail}
          form={form}
          type={type}
        />
      </Modal>
      <div className="category">
        <div className="category__title">
          <h1 className="page__title">Category</h1>
          <div
            className="add-news"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <PlusOutlined />
            <span onClick={() => setType("add")}>Add Category</span>
          </div>
        </div>
        <div className="category__table">
          <Table dataSource={category || []} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default Category;
