import React, { useEffect, useMemo, useState } from "react";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Category, Product } from "../../models";
import Image from "next/image";
import { Button, Form, Modal, Table } from "antd";
import date from "date-and-time";
import { DATE_TIME_FORMAT } from "../../consts";
import ModalCreate from "../../components/admin/Product/ModalCreate";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { TableCommon } from "../../shared/Table/TableCommon";
import commonApi, { BASE_URL } from "../../apis/commonApi";
import { Toast } from "../../components";
import { parseParamUrl } from "../../utils/parseParamUrl";
interface ProductProps {}
interface DataFilter {
  page: number;
}

const initialFilter: DataFilter = {
  page: 0,
};

const Product: React.FunctionComponent<ProductProps> = (props) => {
  const router = useRouter();

  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [index, setIndex] = useState<number>(Math.random());
  const [totalRecord, setTotalRecord] = useState<number>();
  const [optionsCategory, setOptionsCategory] =
    useState<{ key: number; label: string }[]>();

  const [productDetail, setProductDetail] = useState<Product>();
  const [page, setPage] = useState<number>(0);
  const [base64String, setBase64String] = useState<string>();
  const [type, setType] = useState<string>();

  const [dataFilter, setDataFilter] = useState<DataFilter>(initialFilter);
  useEffect(() => {
    getProducts();
  }, [index, page]);

  useEffect(() => {
    if (type === "update" || type === "add-new") {
      getCategories();
    }
  }, [type]);

  const columns = useMemo(
    () => [
      {
        title: "No",
        dataIndex: "no",
        key: "no",
        align: "center" as "center",
      },
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
        title: "Price",
        dataIndex: "price",
        key: "price",
        align: "center" as "center",
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        align: "center" as "center",
      },
      {
        title: "Category ID",
        dataIndex: "categoryId",
        key: "categoryId",
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
        render: (value: Date) => {
          return <span>{date.format(new Date(value), DATE_TIME_FORMAT)}</span>;
        },
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

  const getProducts = async () => {
    const { body, total } = await commonApi({
      url: parseParamUrl({
        param: dataFilter,
        url: `${BASE_URL}api/product`,
      }).split(BASE_URL)[1],
      method: "GET",
    });
    setTotalRecord(total || 0);
    if (body) {
      setProducts(
        body.map((item: Product, index: number) => ({
          no: index + 1,
          id: item.id,
          name: item.name,
          description: item.description,
          quantity: item.quantity,
          price: item.price,
          categoryId: item.categoryId,
          createdAt: item.createdAt,
          updatedAt: item.updateAt,
          image: item.image,
          action: item.id,
        }))
      );
    }
  };

  const getCategories = async () => {
    const { body } = await commonApi({
      method: "GET",
      url: "api/category",
    });
    if (body) {
      setOptionsCategory(
        body.map((item: Category) => ({
          key: item.id,
          label: item.name,
        }))
      );
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onGetBase64 = (value: string) => {
    setBase64String(value);
  };

  const handleEdit = async (id: number) => {
    setIsModalOpen(!isModalOpen);
    setType("update");
    const { body } = await commonApi({
      url: `api/product/${id}`,
      method: "GET",
    });
    if (body) {
      setProductDetail(body);
      router.push(`/admin/product?id=${id}`);
    }
  };

  const handleDelete = async (id: number) => {
    const { ok } = await commonApi({
      url: `api/product/${id}`,
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

  const onSubmit = async (values: any) => {
    const { body } = await commonApi({
      url: "api/product",
      method: "POST",
      body: JSON.stringify({
        name: values.name,
        description: values.description,
        price: values.price,
        quantity: values.quantity,
        categoryId: values.categoryId,
        image: base64String,
      }),
    });
    if (body) {
      form.resetFields();
      setIsModalOpen(false);
      Toast({
        message: "Create product successfully",
        type: "success",
      });
      setIndex(Math.random());
    }
  };

  const handleUpdate = async (values: any) => {
    const { ok } = await commonApi({
      url: `api/product/${router.query.id}`,
      method: "PUT",
      body: JSON.stringify({
        name: values.name,
        description: values.description,
        price: values.price,
        quantity: values.quantity,
        categoryId: values.categoryId,
        image: base64String,
      }),
    });
    if (ok) {
      form.resetFields();
      setIsModalOpen(false);
      router.push("/admin/product");
      Toast({
        message: "Update successfully",
        type: "success",
      });
      setIndex(Math.random());
    }
  };
  const handleChangePage = async (page: number) => {
    setPage(page);
    setDataFilter({ ...dataFilter, page: page - 1 });
  };
  return (
    <>
      <Modal
        title="Create Product"
        open={isModalOpen}
        onCancel={handleCancel}
        className="modal-product"
      >
        <ModalCreate
          onSubmit={onSubmit}
          onUpdateForm={handleUpdate}
          onGetBase64={onGetBase64}
          optionsCategory={optionsCategory || []}
          dataDetail={productDetail}
          form={form}
          type={type}
        />
      </Modal>
      <div className="product">
        <div className="product__title">
          <h1 className="page__title">Products</h1>
          <div
            className="add-news"
            onClick={() => {
              setIsModalOpen(!isModalOpen);
              setType("add-new");
            }}
          >
            <PlusOutlined />
            <span>Add Product</span>
          </div>
        </div>
        <div className="product__table">
          <TableCommon
            columns={columns}
            dataSource={products}
            onChange={handleChangePage}
            showTotal
            total={totalRecord || 0}
            currentPage={page || 1}
          />
        </div>
      </div>
    </>
  );
};

export default Product;
