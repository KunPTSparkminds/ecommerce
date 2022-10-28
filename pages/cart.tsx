import { DeleteOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../hooks/hooks";
import { CartItem } from "../models";
import { setStep } from "../redux/slice/cartSlice";
interface CartProps {}

const Cart: React.FunctionComponent<CartProps> = (props) => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<CartItem[]>();
  const [index, setIndex] = useState<number>(Math.random());

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
    await fetch(`http://localhost:8081/cart/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => {
      if (res.status === 204) {
        setIndex(Math.random());
        dispatch(setStep(Math.random()));
        toast("Delete successfully", {
          hideProgressBar: true,
          autoClose: 1000,
          type: "success",
        });
      }
    });
  };
  const getItemCart = async () => {
    await fetch(`http://localhost:8081/api/cart/1`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data[0]?.cartId) {
          setData(data);
        } else {
          setData([]);
        }
      });
  };

  const handleRemoveAll = async () => {
    await fetch(`http://localhost:8081/cart?cartId=1`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then((res) => {
      if (res.status === 204) {
        toast("Delete all successfully", {
          hideProgressBar: true,
          autoClose: 1000,
          type: "success",
        });
        setIndex(Math.random());
      }
    });
  };

  return (
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
        <Button>Checkout</Button>
      </div>
    </div>
  );
};

export default Cart;
