import React, { Suspense } from "react";
import {
  HomeOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  LogoutOutlined,
  PropertySafetyOutlined 
} from "@ant-design/icons";

import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  Spin,
  Typography,
  theme,
} from "antd";
import { logo } from "../Assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserData } from "../Utils/helperFunctions";

const { Header, Content, Sider } = Layout;

interface MenuItem {
  key: string;
  icon: JSX.Element;
  label: string;
  path: string;
}
const AdminLayout: React.FC<{
  children: React.ReactNode;
  screenName: string;
}> = ({ children, screenName }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = getUserData();

  const menuItems: MenuItem[] = [
    {
      key: "1",
      icon: <HomeOutlined style={{ fontSize: 24 }} />,
      label: "Home",
      path: "/",
    },
    {
      key: "2",
      icon: <UsergroupAddOutlined style={{ fontSize: 24 }} />,
      label: "Customers",
      path: "/users",
    },
    {
      key: "3",
      icon: <PropertySafetyOutlined  style={{ fontSize: 24 }} />,
      label: "Property Listing",
      path: "/propertyListing",
    },
  ];
  const handleLogout = () => {
    console.log("logout");
    localStorage.clear();
    navigate("/login");
  };

  const userMenu = (
    <Menu style={{ padding: 8 }}>
      {/* <Menu.Item key="profile"> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          // justifyContent: "space-between",
          alignItems: "center",
          width: 200,
          // minHeight: 130,
          padding: 8,
        }}
      >
        <Avatar
          style={{ backgroundColor: "#001529" }}
          icon={<UserOutlined />}
        />
        <Typography.Title
          level={4}
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "10px",
          }}
        >
          {user.name}
          {/* John doe */}
          <Typography.Text style={{ color: "#ccc" }}>
            {user.email}
          </Typography.Text>{" "}
        </Typography.Title>
      </div>
      {/* </Menu.Item> */}
      <Menu.Divider />
      <Button
        type="text"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
        key="logout"
        onClick={handleLogout}
      >
        <LogoutOutlined />{" "}
        <Typography.Title style={{ width: "50%", margin: 0 }} level={5}>
          Logout
        </Typography.Title>
      </Button>
    </Menu>
  );

  const handleNavigate = (path: string) => {
    console.log("path", path);
    navigate(path);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const defaultSelectedKey = menuItems.find(
    (item) => item.path === location.pathname
  )?.key;
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={250} collapsedWidth={150} collapsed={true}>
        <div className="demo-logo-vertical" />
        <img
          src={logo}
          alt="logo"
          style={{
            objectFit: "contain",
            marginLeft: "25px",
            marginTop: 12,
            marginBottom: 50,
          }}
          width={100}
          height={100}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={[defaultSelectedKey || "1"]}
          mode="inline"
        >
          {menuItems.map((item) => (
            <Menu.Item
              style={{ marginBottom: "40px" }}
              onClick={() => handleNavigate(item.path)}
              key={item.key}
            >
              {item.icon}
              <span style={{ color: "white", fontSize: 16 }}>{item.label}</span>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography.Title
            style={{ marginLeft: "20px", fontSize: "22px", fontWeight: "bold" }}
          >
            {screenName}
          </Typography.Title>
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <div style={{ marginRight: "20px" }}>
              <Avatar
                style={{ backgroundColor: "#001529", cursor: "pointer" }}
                icon={<UserOutlined />}
              />
            </div>
          </Dropdown>
        </Header>
        <Content style={{ margin: "20px 20px" }}>
          <div
            style={{
              padding: 24,
              height: "100%",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Suspense
              fallback={
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Spin size="large" />
                </div>
              }
            >
              {children}
            </Suspense>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
