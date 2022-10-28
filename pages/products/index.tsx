import { Pagination } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ProductFilterForm from "../../components/products/ProductFilterForm";
import { Category, Product } from "../../models";

interface ProductProps {}
const optionsPrice: { key: number; value: string }[] = [
  {
    key: 1,
    value: "100.000 VND - 200.000 VND",
  },
  {
    key: 2,
    value: "200.000 VND - 300.000 VND",
  },
  {
    key: 1,
    value: "300.000 VND - 300.000 VND",
  },
];
const Product: React.FunctionComponent<ProductProps> = (props) => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>();
  const [optionsCategory, setOptionsCategory] =
    useState<{ key: number; value: string }[]>();
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    getProducts();
  }, [currentPage]);

  useEffect(() => {
    getCategories();
  }, []);

  const getProducts = async () => {
    let url = new URL("http://localhost:8081/api/product");
    url.searchParams.append("page", currentPage.toString());
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Expose-Headers": "*",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => {
        if (!res.ok) return;
        if (res?.headers?.get("x-total-count")) {
          setTotal(parseInt(res.headers.get("x-total-count") as string));
        }
        return res.json();
      })
      .then((data) => setProducts(data));
  };
  const getCategories = async () => {
    await fetch("http://localhost:8081/api/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return;
        }
        return response.json();
      })
      .then((data) =>
        setOptionsCategory(
          data.map((item: Category) => ({
            key: item.id,
            value: item.name,
          }))
        )
      );
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page - 1);
  };

  return (
    <div className="products">
      <div className="products__filter">
        <ProductFilterForm
          optionsChamp={optionsCategory || []}
          optionsPrice={optionsPrice}
        />
      </div>
      <div className="products__items">
        <div className="products__items__value">
          {products &&
            products.length > 0 &&
            products.map((item, index) => (
              <div className="products__items__value__info" key={index}>
                <Image
                  alt=""
                  src={item.image}
                  width={350}
                  height={350}
                  onClick={() => router.push(`/products/${item.id}`)}
                />
                <div className="price">
                  <span>{item.name}</span>
                  <span>
                    {item.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </div>
              </div>
            ))}
        </div>
        <div className="products__items__pagination">
          <Pagination
            defaultCurrent={currentPage + 1}
            total={total}
            current={currentPage + 1}
            onChange={handleChangePage}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
