import * as React from "react";
import { Layout } from "antd";
interface FooterProps {}

const Footer: React.FunctionComponent<FooterProps> = (props) => {
  const { Footer } = Layout;
  return (
    <Footer>
      <p>this is footer</p>
    </Footer>
  );
};

export default Footer;
