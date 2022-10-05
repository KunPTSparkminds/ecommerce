import * as React from "react";
import { Layout } from "antd";
interface SiderProps {}

const Sider: React.FunctionComponent<SiderProps> = (props) => {
  const { Sider } = Layout;
  return (
    <Sider>
      <p>sider</p>
    </Sider>
  );
};

export default Sider;
