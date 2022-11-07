import * as React from "react";
import { Layout } from "antd";
import Header from "./clientLayout/Header";
import Footer from "./clientLayout/Footer";
interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FunctionComponent<ClientLayoutProps> = (props) => {
  const { Content } = Layout;
  return (
    <Layout className="layout-client">
      <Header />
      <Content>{props.children}</Content>
      <Footer />
    </Layout>
  );
};

export default ClientLayout;
