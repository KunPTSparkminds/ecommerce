import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Product } from "../../models";
import date from "date-and-time";
import { DATE_TIME_FORMAT } from "../../consts";
import { Button, InputNumber, Modal, Rate } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { selectStep, setStep } from "../../redux/slice/cartSlice";

interface ProductDetailProps {}

const ProductDetail: React.FunctionComponent<ProductDetailProps> = (props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [product, setProduct] = useState<Product>();
  const [quantityBuy, setQuantityBuy] = useState<number>(1);
  const getDetailProduct = async (id: any) => {
    await fetch(`http://localhost:8081/api/product/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then((data) => {
        if (data?.id) {
          setProduct(data);
        }
      });
  };

  useEffect(() => {
    if (router.query?.id) {
      getDetailProduct(router.query.id);
    }
  }, [router.query?.id]);
  const onChange = (value: any) => {
    if (value) {
      setQuantityBuy(value);
    }
  };

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
        quantity: quantityBuy,
      }),
    }).then((res) => {
      if (res.status === 401) {
        warning();
      }
      if (res.ok) {
        dispatch(setStep(Math.random()));
        return res.json();
      }
      return Promise.reject(res);
    });
  };
  return (
    <div className="product-detail">
      {product && Object.keys(product).length > 0 ? (
        <>
          <div className="product-detail__left">
            <Image alt="" src={product.image} width={500} height={500} />
          </div>
          <div className="product-detail__right">
            <div className="title">
              <h1>{product.name}</h1>
              <Rate disabled defaultValue={4} />
            </div>
            <span>
              {product.price.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
            </span>
            <span>Quick Overview</span>
            <span>{product.description}</span>
            <span>{`Updated At: ${date.format(
              new Date(product.updateAt),
              DATE_TIME_FORMAT
            )}`}</span>
            <span>{`Quantity: ${product.quantity}`}</span>
            <span>{`Total: ${(quantityBuy * product.price).toLocaleString(
              "en-US",
              {
                style: "currency",
                currency: "VND",
              }
            )}`}</span>
            <div className="add-to-cart">
              <InputNumber
                min={1}
                max={product.quantity}
                defaultValue={1}
                onChange={onChange}
              />
              <Button onClick={() => handleAddToCart(product.id)}>
                Add to cart
              </Button>
            </div>
          </div>
        </>
      ) : (
        <h1>Product not found</h1>
      )}
    </div>
  );
};

export default ProductDetail;
