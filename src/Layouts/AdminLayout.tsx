import React, { Suspense } from "react";
import { HomeOutlined, UsergroupAddOutlined } from "@ant-design/icons";

import { Layout, Menu, Spin, theme } from "antd";
import { logo } from "../Assets/assets";
import { useLocation, useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;

interface MenuItem {
  key: string;
  icon: JSX.Element;
  label: string;
  path: string;
}
const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
  ];
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
        <Header style={{ padding: 0, background: colorBgContainer }} />
        {/* <Input placeholder="Search" /> */}
        {/* </Header> */}
        <Content style={{ margin: "20px 20px" }}>
          <div
            style={{
              padding: 24,
              // minHeight: 360,
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
