import {
  DeleteOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Input, Layout, Popover } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import commonApi from "../../../apis/commonApi";
import { useAppSelector } from "../../../hooks/hooks";
import { CartItem } from "../../../models";
import { isLoggedIn } from "../../../redux/slice/authSlice";
import { selectStep } from "../../../redux/slice/cartSlice";
import { Toast } from "../../toasts/Toast";

interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
  const { Header } = Layout;

  const router = useRouter();

  const [data, setData] = useState<CartItem[]>();
  const [index, setIndex] = useState<number>(Math.random());

  const resultAddItem = useAppSelector(selectStep);
  const isLogged = useAppSelector(isLoggedIn);

  useEffect(() => {
    if (isLogged) {
      getItems();
    }
  }, [index, resultAddItem, isLogged]);

  const getItems = async () => {
    const { body } = await commonApi({
      url: "api/cart/1",
      method: "GET",
    });
    if (body) {
      setData(body);
    }
  };

  const handleDelete = async (id: number) => {
    const { ok } = await commonApi({
      url: `cart/${id}`,
      method: "DELETE",
    });
    if (ok) {
      setIndex(Math.random());
      Toast({
        message: "Delete successfully",
        type: "success",
      });
    }
  };

  const handleClickMenu = (item: string) => {
    switch (item) {
      case "HOME":
        router.push("/");
        break;
      case "PRODUCTS":
        router.push("/products");
      default:
        break;
    }
  };
  const handleLogOut = async () => {
    const { ok } = await commonApi({
      method: "POST",
      url: "api/logout",
    });
    if (ok) {
      setIndex(Math.random());
    }
  };
  return (
    <Header>
      <div className="header__wrap">
        <div className="header__wrap__top">
          <Input addonAfter={<SearchOutlined />} placeholder="Search here..." />
          <h1>{`Kun's Shop`}</h1>
          <div className="group-icon">
            {!isLogged && (
              <Link href="/login">
                <a>
                  <UserOutlined />
                </a>
              </Link>
            )}
            {isLogged && (
              <Popover
                placement="bottom"
                content={
                  <div
                    className="account"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "90px",
                      textAlign: "center",
                    }}
                  >
                    <Link href={"#"}>
                      <a
                        style={{
                          fontSize: "16px",
                        }}
                      >
                        Setting
                      </a>
                    </Link>
                    <span
                      style={{
                        fontSize: "16px",
                      }}
                      onClick={() => handleLogOut()}
                    >
                      Log Out
                    </span>
                  </div>
                }
              >
                <UserOutlined />
              </Popover>
            )}
            <Popover
              placement="bottom"
              content={
                !isLogged ? (
                  <span>You must be login to use this function</span>
                ) : (
                  <div className="mini-cart">
                    {data && data.length > 0 ? (
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
                      ))
                    ) : (
                      <span>Empty cart</span>
                    )}
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
                )
              }
            >
              <ShoppingCartOutlined
                className={
                  data && data.reduce((prev, curr) => prev + curr.price, 0)
                    ? "anticon-shopping-cart--has-item"
                    : ""
                }
              />
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
