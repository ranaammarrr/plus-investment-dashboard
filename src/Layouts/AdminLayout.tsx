import React, { Suspense, useState } from "react";
import {
  HomeOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  LogoutOutlined,
  PropertySafetyOutlined,
  DollarOutlined,
  WechatWorkOutlined,
  FieldTimeOutlined,
  ProductOutlined,
  SlidersOutlined,
  FileDoneOutlined,
  WalletOutlined,
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
import { theme as customTheme } from "../Theme/theme";
import { logo } from "../Assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserData } from "../Utils/helperFunctions";
import "../Style/style.css";

const { Header, Content, Sider } = Layout;

interface MenuItem {
  key: string;
  icon: JSX.Element;
  label: string;
  path: string;
  subMenu?: MenuItem[];
}

const AdminLayout: React.FC<{
  children: React.ReactNode;
  screenName: string;
}> = ({ children, screenName }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const user = getUserData();

  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const menuItems: MenuItem[] = [
    {
      key: "1",
      icon: <HomeOutlined style={{ fontSize: 22 }} />,
      label: "Home",
      path: "/",
    },
    {
      key: "2",
      icon: <UsergroupAddOutlined style={{ fontSize: 22 }} />,
      label: "Users",
      path: "/users",
    },
    {
      key: "3",
      icon: <PropertySafetyOutlined style={{ fontSize: 22 }} />,
      label: "Property",
      path: "/propertyListing",
      subMenu: [
        {
          key: "3-1",
          icon: <SlidersOutlined style={{ fontSize: 22 }} />,
          label: "Property Listing",
          path: "/propertyListing",
        },
        {
          key: "3-2",
          icon: <SlidersOutlined style={{ fontSize: 22 }} />,
          label: "Property Type",
          path: "/propertyType",
        },
      ],
    },
    {
      key: "6",
      icon: <FieldTimeOutlined style={{ fontSize: 22 }} />,
      label: "Timeline",
      path: "/timeline",
      subMenu: [
        {
          key: "6-1",
          icon: <ProductOutlined style={{ fontSize: 22 }} />,
          label: "Timeline",
          path: "/timeline",
        },
        {
          key: "6-2",
          icon: <ProductOutlined style={{ fontSize: 22 }} />,
          label: "Category",
          path: "/category",
        },
      ],
    },
    {
      key: "5",
      icon: <WechatWorkOutlined style={{ fontSize: 22 }} />,
      label: "Chat",
      path: "/chat",
    },
    {
      key: "10",
      icon: <DollarOutlined style={{ fontSize: 22 }} />,
      label: "Counter Offers",
      path: "/counter-offers",
    },
    {
      key: "11",
      icon: <FileDoneOutlined style={{ fontSize: 22 }} />,
      label: "Invoices",
      path: "/invoices",
    },
    {
      key: "12",
      icon: <WalletOutlined style={{ fontSize: 22 }} />,
      label: "Tickets",
      path: "/tickets",
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const userMenu = (
    <Menu style={{ padding: 8 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: 200,
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
          <Typography.Text style={{ color: "#ccc" }}>
            {user.email}
          </Typography.Text>
        </Typography.Title>
      </div>
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
        <LogoutOutlined />
        <Typography.Title style={{ width: "50%", margin: 0 }} level={5}>
          Logout
        </Typography.Title>
      </Button>
    </Menu>
  );

  const handleNavigate = (path: string) => {
    if (path) {
      navigate(path);
    }
  };

  const handleClickMenuItem = (item: MenuItem) => {
    if (item.subMenu) {
      setOpenKeys([item.key]);
    } else {
      handleNavigate(item.path);
      setOpenKeys([]);
    }
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const defaultSelectedKey = menuItems.find(
    (item) => item.path === location.pathname
  )?.key;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        style={{
          backgroundColor: customTheme.palette.primary.main,
        }}
        width={200}
        collapsedWidth={100}
        collapsed={false}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{
              objectFit: "contain",
              marginTop: 12,
              marginBottom: 22,
            }}
            width={100}
            height={100}
          />
          <Menu
            theme="dark"
            defaultSelectedKeys={[defaultSelectedKey || "1"]}
            mode="inline"
            style={{
              backgroundColor: customTheme.palette.primary.main,
              width: 200,
            }}
            openKeys={openKeys}
            onOpenChange={(keys) => setOpenKeys(keys as string[])}
          >
            {menuItems.map((item) => {
              if (item.subMenu) {
                const subMenuItems = item.subMenu.map((subMenuItem) => (
                  <Menu.Item
                    className="ant-menu-submenu-title"
                    onClick={() => handleNavigate(subMenuItem.path)}
                    style={{
                      color: "red !important",

                      // backgroundColor: customTheme.palette.primary.main,
                      // width: 100,
                    }}
                    key={subMenuItem.key}
                  >
                    <span style={{ fontSize: 14, color: "white" }}>
                      {subMenuItem.label}
                    </span>
                  </Menu.Item>
                ));

                return (
                  <Menu.SubMenu
                    style={{ color: "white" }}
                    icon={item.icon}
                    title={item.label}
                    key={item.key}
                    onTitleClick={() => handleClickMenuItem(item)}
                  >
                    {subMenuItems}
                  </Menu.SubMenu>
                );
              } else {
                return (
                  <Menu.Item
                    style={{ marginBottom: "6px", color: "white" }}
                    onClick={() => handleClickMenuItem(item)}
                    key={item.key}
                  >
                    {item.icon}
                    <span style={{ fontSize: 14 }}>{item.label}</span>
                  </Menu.Item>
                );
              }
            })}
          </Menu>
        </div>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "10px 0px",
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
        <Content style={{ margin: "30px 30px" }}>
          <div
            style={{
              padding: 8,
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
