import { Button, Collapse, Dropdown, Layout, Menu, Popover } from "antd";
import * as React from "react";
import { useAppSelector } from "../../hooks/hooks";
import { selectCurrentUser } from "../../redux/slice/authSlice";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
interface HeaderAdminProps {}

const HeaderAdmin: React.FunctionComponent<HeaderAdminProps> = (props) => {
  const { Header } = Layout;
  const currentUser = useAppSelector(selectCurrentUser);
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <span>{`Role : ${currentUser?.role}`}</span>,
        },
        {
          key: "2",
          label: <span>Log Out</span>,
        },
      ]}
    />
  );
  return (
    <Header>
      <div className="header__admin__wrap">
        <div className="header__admin__wrap__left">
          <h2>{`Kun's Shop`}</h2>
        </div>
        <div className="header__admin__wrap__right">
          <div className="header__admin__wrap__right__wrap">
            <Dropdown
              overlay={menu}
              placement="bottomRight"
              trigger={["click"]}
            >
              <div>
                <UserOutlined />
                <span>{currentUser?.name}</span>
                <DownOutlined />
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default HeaderAdmin;
