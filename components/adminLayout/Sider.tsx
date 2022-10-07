import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu } from "antd";
import Link from "next/link";
import React, { useState } from "react";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  onTitleClick?: any
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    onTitleClick,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    <Link href={"/admin"}>
      <a>Dashboard</a>
    </Link>,
    "1",
    <PieChartOutlined />
  ),
  getItem(
    <Link href="/admin/category">
      <a>Category</a>
    </Link>,
    "2",
    <DesktopOutlined />
  ),
  getItem(
    <Link href="/admin/product">
      <a>Product</a>
    </Link>,
    "sub1",
    <UserOutlined />,
    [getItem("Tom", "3"), getItem("Bill", "4"), getItem("Alex", "5")]
  ),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const SiderAdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="logo" />
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default SiderAdminLayout;
