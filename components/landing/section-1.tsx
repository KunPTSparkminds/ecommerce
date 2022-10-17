import { Button, InputNumber, Modal } from "antd";
import { InferGetServerSidePropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Product } from "../../models";

interface SectionOneProps {
  listProduct: Product[];
  luffyProduct: Product[];
  zoroProduct: Product[];
  chopperProduct: Product[];
}

const SectionOne: React.FunctionComponent<SectionOneProps> = ({
  listProduct,
  luffyProduct,
  chopperProduct,
  zoroProduct,
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [data, setData] = useState<Product[]>();

  useEffect(() => {
    switch (activeTab) {
      case 0:
        setData(listProduct);
        break;
      case 1:
        setData(zoroProduct);
        break;
      case 2:
        setData(luffyProduct);
        break;
      case 3:
        setData(chopperProduct);
        break;
      default:
        break;
    }
  }, [listProduct, luffyProduct, activeTab, zoroProduct, chopperProduct]);

  const warning = () => {
    Modal.warning({
      title: "Add item failed",
      content: "Please login to use this function",
    });
  };

  const handleAddToCart = async (id: number) => {
    await fetch(`http://localhost:8081/cart/add-item`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        cartId: 1,
        productId: id,
        quantity: 1,
      }),
    }).then((res) => {
      if (res.status === 401) {
        warning();
      }
      if (res.ok) {
        toast("Add item to cart successfully", {
          hideProgressBar: true,
          autoClose: 1000,
          type: "success",
        });
        return res.json();
      }
      return Promise.reject(res);
    });
  };

  return (
    <div className="section-1">
      <div className="section-1__options">
        {["ALL", "ZORO", "LUFFY", "CHOPPER"].map((item, index) => (
          <span
            key={index}
            className={activeTab === index ? "actived" : ""}
            onClick={() => setActiveTab(index)}
          >
            {item}
          </span>
        ))}
      </div>
      <div className="section-1__items">
        {data &&
          data.length > 0 &&
          data.map((item, index) => (
            <div className="item" key={index}>
              <Image
                alt=""
                src={item.image}
                width={400}
                height={400}
                onClick={() => router.push(`/products/${item.id}`)}
              />
              <div className="item__info">
                <div className="item__info-wrap">
                  <span>{item.name}</span>
                  <span onClick={() => handleAddToCart(item.id)}>+ Add</span>
                </div>
                <span>
                  {item.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "VND",
                  })}{" "}
                  VND
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SectionOne;
