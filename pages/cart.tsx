import React, { useEffect, useMemo, useState } from "react";
import { CartItem } from "../models";
import date from "date-and-time";
import { DATE_TIME_FORMAT } from "../consts";
import { TableCommon } from "../shared/Table/TableCommon";
import { DeleteOutlined } from "@ant-design/icons";
import { Table } from "antd";
import Image from "next/image";
import { toast } from "react-toastify";
interface CartProps {}

const Cart: React.FunctionComponent<CartProps> = (props) => {
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
          console.log(values);
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
        <span>Remove all</span>
      </div>
      <div className="cart__table">
        <Table columns={columns} dataSource={data} bordered />
      </div>
      <div className="cart__total">
        {data && data.length > 0 && (
          <div className="total">
            <span>Total</span>
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
    </div>
  );
};

export default Cart;
