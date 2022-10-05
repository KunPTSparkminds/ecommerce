import * as React from "react";
import { Layout } from "antd";
import Header from "../attribute/Header";
import Footer from "../attribute/Footer";
interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FunctionComponent<ClientLayoutProps> = (props) => {
  const { Content } = Layout;
  return (
    <Layout>
      <Header />
      <Content>{props.children}</Content>
      <Footer />
    </Layout>
  );
};

export default ClientLayout;
