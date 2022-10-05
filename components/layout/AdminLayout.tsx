import { Layout } from "antd";
import * as React from "react";
import Sider from "../attribute/Sider";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FunctionComponent<AdminLayoutProps> = (props) => {
  const { Content } = Layout;
  return (
    <Layout hasSider>
      <Sider />
      <Layout>
        <Content>{props.children}</Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
