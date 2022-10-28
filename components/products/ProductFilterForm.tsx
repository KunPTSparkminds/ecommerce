import * as React from "react";

import { Select } from "antd";

interface OptionsItem {
  key: number;
  value: string;
}
interface ProductFilterFormProps {
  optionsChamp: OptionsItem[];
  optionsPrice: OptionsItem[];
}

const ProductFilterForm: React.FunctionComponent<ProductFilterFormProps> = ({
  optionsChamp,
  optionsPrice,
}) => {
  const { Option } = Select;
  return (
    <div className="products__filter__form">
      <div className="select-champ">
        <span>Champion</span>
        <Select placeholder="Select your champion">
          {optionsChamp.map((item, index) => (
            <Option key={index}>{item.value}</Option>
          ))}
        </Select>
      </div>
      <div className="select-price">
        <span>Price</span>
        <Select placeholder="Select your price">
          {optionsPrice.map((item, index) => (
            <Option key={index}>{item.value}</Option>
          ))}
        </Select>
      </div>
    </div>
  );
};

export default ProductFilterForm;
