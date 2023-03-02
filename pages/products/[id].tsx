import { Button, InputNumber, Modal, Rate } from "antd";
import date from "date-and-time";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import commonApi from "../../apis/commonApi";
import { DATE_TIME_FORMAT } from "../../consts";
import { useAppDispatch } from "../../hooks/hooks";
import { Product } from "../../models";
import { setStep } from "../../redux/slice/cartSlice";

interface ProductDetailProps {}

export const warning = () => {
  Modal.warning({
    title: "Add item failed",
    content: "Please login to use this function",
  });
};

const ProductDetail: React.FunctionComponent<ProductDetailProps> = (props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [product, setProduct] = useState<Product>();
  const [quantityBuy, setQuantityBuy] = useState<number>(1);

  const getDetailProduct = async (id: any) => {
    const { body } = await commonApi({
      url: `api/product/${id}`,
      method: "GET",
    });
    if (body?.id) {
      setProduct(body);
    }
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

  const handleAddToCart = async (id: number) => {
    const { ok, error } = await commonApi({
      url: `cart/add-item`,
      method: "POST",
      body: JSON.stringify({
        cartId: 1,
        productId: id,
        quantity: quantityBuy,
      }),
    });
    if (error?.status) {
      warning();
    }
    if (ok) {
      dispatch(setStep(Math.random()));
      toast("Add item to cart successfully", {
        hideProgressBar: true,
        autoClose: 1000,
        type: "success",
      });
    }
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
