import * as React from "react";
import { PlusOutlined } from "@ant-design/icons";
interface ProductProps {}

const Product: React.FunctionComponent<ProductProps> = (props) => {
  return (
    <div className="product">
      <div className="product__title">
        <h1 className="page__title">Products</h1>
        <div className="add-news">
          <PlusOutlined />
          <span>Add Product</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
