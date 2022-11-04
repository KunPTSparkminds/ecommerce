import { Modal } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import commonApi from "../../apis/commonApi";
import { useAppDispatch } from "../../hooks/hooks";
import { Product } from "../../models";
import { setStep } from "../../redux/slice/cartSlice";

interface SectionOneProps {
  listProduct: Product[];
  luffyProduct: Product[];
  zoroProduct: Product[];
  chopperProduct: Product[];
  sanjiProduct: Product[];
  namiProduct: Product[];
}

const SectionOne: React.FunctionComponent<SectionOneProps> = ({
  listProduct,
  luffyProduct,
  chopperProduct,
  zoroProduct,
  sanjiProduct,
  namiProduct,
}) => {
  const dispatch = useAppDispatch();
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
      case 4:
        setData(sanjiProduct);
        break;
      case 5:
        setData(namiProduct);
      default:
        break;
    }
  }, [
    listProduct,
    luffyProduct,
    activeTab,
    zoroProduct,
    chopperProduct,
    sanjiProduct,
    namiProduct,
  ]);

  const warning = () => {
    Modal.warning({
      title: "Add item failed",
      content: "Please login to use this function",
      onOk: () => router.push("/login"),
    });
  };

  const handleAddToCart = async (id: number) => {
    const { ok, error } = await commonApi({
      method: "POST",
      url: `http://localhost:8081/cart/add-item`,
      body: JSON.stringify({
        cartId: 1,
        productId: id,
        quantity: 1,
      }),
    });
    if (ok) {
      dispatch(setStep(Math.random()));
      toast("Add item to cart successfully", {
        hideProgressBar: true,
        autoClose: 1000,
        type: "success",
      });
    }
    if (error) {
      warning();
    }
  };

  return (
    <div className="section-1">
      <div className="section-1__options">
        {["ALL", "ZORO", "LUFFY", "CHOPPER", "SANJI", "NAMI"].map(
          (item, index) => (
            <span
              key={index}
              className={activeTab === index ? "actived" : ""}
              onClick={() => setActiveTab(index)}
            >
              {item}
            </span>
          )
        )}
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
                  })}
                  VND
                </span>
              </div>
            </div>
          ))}
      </div>
      <h3 onClick={() => router.push("/products")}>See more</h3>
    </div>
  );
};

export default SectionOne;
