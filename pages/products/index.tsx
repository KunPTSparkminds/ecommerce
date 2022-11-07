import { Pagination } from "antd";
import { url } from "inspector";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import commonApi from "../../apis/commonApi";
import ProductFilterForm from "../../components/products/ProductFilterForm";
import { Category, Product } from "../../models";
import { parseParamUrl } from "../../utils/parseParamUrl";

interface ProductProps {}
interface ObjFilter {
  page: number;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
}
const optionsPrice: { key: number; value: string }[] = [
  {
    key: 0,
    value: "All",
  },
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
  const [dataFilter, setDataFilter] = useState<ObjFilter>({
    page: 0,
  });

  useEffect(() => {
    const cloneFilter = (({ page, ...o }) => o)(dataFilter);
    const clonePrevFilter = (({ page, ...x }) => x)(prevDataFilter);
    if (JSON.stringify(cloneFilter) !== JSON.stringify(clonePrevFilter)) {
      if (currentPage === 0) {
        getProducts(dataFilter);
      } else {
        setCurrentPage(0);
        setDataFilter({
          ...dataFilter,
          page: 0,
        });
      }
    } else {
      getProducts(dataFilter);
    }
  }, [dataFilter]);

  useEffect(() => {
    getCategories();
  }, []);

  const getProducts = async (dataFilter: ObjFilter) => {
    const { body, total } = await commonApi({
      url: parseParamUrl({
        param: dataFilter,
        url: "http://localhost:8081/api/product",
      }),
      method: "GET",
    });
    if (typeof total === "number") {
      setTotal(total);
    }
    if (body) {
      setProducts(body);
    }
  };

  const getCategories = async () => {
    const { body } = await commonApi({
      method: "GET",
      url: "http://localhost:8081/api/category",
    });
    if (body) {
      const allOptions = [{ key: 0, value: "All" }];
      body.map((item: Category) => {
        const obj = {
          key: item.id,
          value: item.name,
        };
        allOptions.push(obj);
      });
      setOptionsCategory(allOptions);
    }
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page - 1);
    setDataFilter({ ...dataFilter, page: page - 1 });
  };
  const handleChangeChamp = (value: number) => {
    setDataFilter({
      ...dataFilter,
      categoryId: parseInt(value.toString()) ? value : undefined,
    });
  };
  const handleChangePrice = (value: number) => {
    switch (parseInt(value.toString())) {
      case 0:
        setDataFilter({
          ...dataFilter,
          minPrice: undefined,
          maxPrice: undefined,
        });
        break;
      case 1:
        setDataFilter({
          ...dataFilter,
          minPrice: 100000,
          maxPrice: 200000,
        });
        break;
      case 2:
        setDataFilter({
          ...dataFilter,
          minPrice: 200000,
          maxPrice: 300000,
        });
        break;
      default:
        break;
    }
  };
  const FindPreviousState = (value: ObjFilter) => {
    const ref = useRef({} as ObjFilter);
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };
  const prevDataFilter = FindPreviousState(dataFilter);

  return (
    <div className="products">
      <div className="products__filter">
        <ProductFilterForm
          optionsChamp={optionsCategory || []}
          optionsPrice={optionsPrice}
          handleChangeChamp={handleChangeChamp}
          handleChangePrice={handleChangePrice}
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
