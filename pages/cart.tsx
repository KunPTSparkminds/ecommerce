import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, Table } from "antd";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import commonApi from "../apis/commonApi";
import { Toast } from "../components";
import ModalCheckout from "../components/cart/ModalCheckout";
import { useAppDispatch } from "../hooks/hooks";
import { CartItem } from "../models";
import { setStep } from "../redux/slice/cartSlice";
interface CartProps {}

const Cart: React.FunctionComponent<CartProps> = (props) => {
  const dispatch = useAppDispatch();

  const [data, setData] = useState<CartItem[]>();
  const [index, setIndex] = useState<number>(Math.random());
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getItemCart();
  }, [index]);

  const columns = useMemo(
    () => [
      {
        title: "Image",
        dataIndex: "image",
        key: "image",
        align: "center" as "center",
        render: (value: string) => (
          <Image alt="" src={value} width={100} height={100} />
        ),
      },
      {
        title: "Product",
        dataIndex: "productName",
        key: "productName",
        align: "center" as "center",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        align: "center" as "center",
        render: (_: number, values: any) => {
          return (
            <span>
              {(values.price / values.quantity).toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          );
        },
      },

      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
        align: "center" as "center",
      },
      {
        title: "Total",
        dataIndex: "price",
        key: "price",
        align: "center" as "center",
        render: (value: number) =>
          value.toLocaleString("en-US", {
            style: "currency",
            currency: "VND",
          }),
      },
      {
        title: "Action",
        dataIndex: "id",
        key: "id",
        align: "center" as "center",
        render: (id: number) => {
          return <DeleteOutlined onClick={() => handleDelete(id)} />;
        },
      },
    ],
    []
  );

  const handleDelete = async (id: number) => {
    const { ok } = await commonApi({
      url: `cart/${id}`,
      method: "DELETE",
    });
    if (ok) {
      setIndex(Math.random());
      dispatch(setStep(Math.random()));
      toast("Delete successfully", {
        hideProgressBar: true,
        autoClose: 1000,
        type: "success",
      });
    }
  };

  const getItemCart = async () => {
    const { ok, body } = await commonApi({
      url: "api/cart/1",
      method: "GET",
    });
    if (!ok) {
      setData([]);
    }
    setData(body);
  };

  const handleRemoveAll = async () => {
    const { ok } = await commonApi({
      url: `cart?cartId=1`,
      method: "DELETE",
    });
    if (ok) {
      Toast({
        message: "Delete all successfully",
        type: "success",
      });
      setIndex(Math.random());
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <ModalCheckout />
      </Modal>
      <div className="cart">
        <div
          className="cart__options"
          style={{
            textAlign: "right",
            padding: "10px",
          }}
        >
          <span onClick={() => handleRemoveAll()}>Remove all</span>
        </div>
        <div className="cart__table">
          <Table
            columns={columns}
            dataSource={data}
            bordered
            pagination={{ pageSize: 999 }}
          />
        </div>
        <div className="cart__total">
          {data && data.length > 0 && (
            <div className="total">
              <span>{`Total ${data.reduce(
                (prev, curr) => prev + curr.quantity,
                0
              )} items:`}</span>
              <span>
                {data
                  .reduce((prev, curr) => prev + curr.price, 0)
                  .toLocaleString("en-US", {
                    style: "currency",
                    currency: "VND",
                  })}
              </span>
            </div>
          )}
        </div>
        <div className="cart__btn-checkout">
          <Button onClick={() => setIsModalOpen(!isModalOpen)}>Checkout</Button>
        </div>
      </div>
    </>
  );
};

export default Cart;
