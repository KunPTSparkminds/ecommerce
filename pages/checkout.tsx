import * as React from "react";
import countryList from "react-select-country-list";

interface CheckoutProps {}

const Checkout: React.FunctionComponent<CheckoutProps> = (props) => {
  const options = React.useMemo(() => countryList().getData(), []);
  console.log("check options", options);
  return <div className="check-out">hihi</div>;
};

export default Checkout;
