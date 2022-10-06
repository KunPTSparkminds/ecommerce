import { Card, Layout } from "antd";
import * as React from "react";
import Sider from "../adminLayout/Sider";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FunctionComponent<AdminLayoutProps> = (props) => {
  const { Content } = Layout;
  return (
    <Layout hasSider>
      <Sider />
      <Layout>
        <Card title={props.title} bordered={false}>
          <Content>{props.children}</Content>
        </Card>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
