import * as React from "react";
import { Input, Layout } from "antd";
import {
  FacebookOutlined,
  LinkedinOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
interface FooterProps {}

const Footer: React.FunctionComponent<FooterProps> = (props) => {
  const { Footer } = Layout;
  return (
    <Footer>
      <div className="footer__wrap">
        <div className="footer__wrap__left">
          <h1>{`Kun's Shop`}</h1>
          {[
            { label: "Building", value: "123 18C Tower Building" },
            { label: "Address", value: "12 Hong Kong, Kong Hong" },
            { label: "Tel", value: "000 888 1238" },
          ].map((item, index) => (
            <div className="item" key={index}>
              <span>{`${item.label}: ${item.value}`}</span>
            </div>
          ))}
        </div>
        <div className="footer__wrap__middle">
          <h1>About Us</h1>
          {["Terms and Condition", "Listing", "Return money", "Resource"].map(
            (item, index) => (
              <div className="item" key={index}>
                <span>{item}</span>
              </div>
            )
          )}
        </div>
        <div className="footer__wrap__right">
          <h1>Contact Us</h1>
          <Input
            placeholder="Your feedback..."
            addonAfter={<ArrowRightOutlined />}
          />
          <div className="social-media">
            <span>Connect with us</span>
            <div className="group">
              <FacebookOutlined />
              <LinkedinOutlined />
            </div>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default Footer;
