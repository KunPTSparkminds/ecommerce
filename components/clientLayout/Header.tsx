import React, { useEffect, useState } from "react";
import { Button, Input, Layout, Popover } from "antd";
import {
  SearchOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { CartItem } from "../../models";
import Image from "next/image";
import { toast } from "react-toastify";
import { useAppSelector } from "../../hooks/hooks";
import { selectStep } from "../../redux/slice/cartSlice";
interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
  const { Header } = Layout;
  const router = useRouter();
  const [data, setData] = useState<CartItem[]>();
  const [index, setIndex] = useState<number>(Math.random());
  const resultAddItem = useAppSelector(selectStep);
  useEffect(() => {
    getItemCart();
  }, [index, resultAddItem]);

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

  const handleClickMenu = (item: string) => {
    switch (item) {
      case "HOME":
        router.push("/");
        break;
      case "PRODUCTS":
        router.push("/");
      default:
        break;
    }
  };
  return (
    <Header>
      <div className="header__wrap">
        <div className="header__wrap__top">
          <Input addonAfter={<SearchOutlined />} placeholder="Search here..." />
          <h1>{`Kun's Shop`}</h1>
          <div className="group-icon">
            <UserAddOutlined />
            <Popover
              placement="bottom"
              content={
                <div className="mini-cart">
                  {data &&
                    data.length > 0 &&
                    data.map((item, index) => (
                      <div className="mini-cart__wrap" key={index}>
                        <div className="mini-cart__wrap__image">
                          <Image
                            alt=""
                            src={item.image}
                            width={60}
                            height={60}
                          />
                        </div>
                        <div className="mini-cart__wrap__product">
                          <span>{item.productName}</span>
                          <div className="price">
                            <span>{`${item.quantity} x ${(
                              item.price / item.quantity
                            ).toLocaleString("en-US", {
                              style: "currency",
                              currency: "VND",
                            })}`}</span>
                            <span>
                              {item.price.toLocaleString("en-US", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </span>
                          </div>
                        </div>
                        <div className="mini-cart__wrap__remove">
                          <DeleteOutlined
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDelete(item.id)}
                          />
                        </div>
                      </div>
                    ))}
                  <div className="total">
                    <span>Total</span>
                    <span>
                      {data &&
                        data
                          .reduce((prev, curr) => prev + curr.price, 0)
                          .toLocaleString("en-US", {
                            style: "currency",
                            currency: "VND",
                          })}
                    </span>
                  </div>
                  <div className="view-cart">
                    <Button onClick={() => router.push("/cart")}>
                      View cart
                    </Button>
                  </div>
                </div>
              }
              trigger="click"
            >
              <ShoppingCartOutlined />
            </Popover>
          </div>
        </div>
        <div className="header__wrap__bottom">
          {["HOME", "PORTFOLIO", "BLOG", "SHOP", "PRODUCTS", "PAGES"].map(
            (item, index) => (
              <div
                className="menu-item"
                key={index}
                onClick={() => handleClickMenu(item)}
              >
                <p>{item}</p>
              </div>
            )
          )}
        </div>
      </div>
    </Header>
  );
};

export default Header;
