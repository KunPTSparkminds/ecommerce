import * as React from "react";
import { Layout } from "antd";
interface HeaderProps {}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
  const { Header } = Layout;
  return (
    <Header>
      <p>This is header</p>
    </Header>
  );
};

export default Header;
