import { Card, Layout } from "antd";
import * as React from "react";
import Sider from "../adminLayout/Sider";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FunctionComponent<AdminLayoutProps> = (props) => {
  const { Content, Header } = Layout;
  return (
    <Layout className="layout-admin">
      <Header>Header</Header>
      <Layout>
        <Sider />
        <Content>
          <Card bordered={false}>{props.children}</Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
