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
  BellFilled,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
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
  const [notificationCount, setNotificationCount] = useState<number>(1);
  const [collapsed, setCollapsed] = useState(false);

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
  const notificationMenu = (
    <Menu style={{ padding: 8, width: 300, height: 200 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: 8,
        }}
      >
        {/* <Avatar style={{ backgroundColor: "#001529" }} icon={<BellFilled />} /> */}
        <Typography.Title
          level={4}
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "10px",
            margin: "0px 10px",
          }}
        >
          Notification
        </Typography.Title>
      </div>
      <Menu.Divider />
      {/** Example notification item */}
      <Menu.Item style={{ padding: "8px 16px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar src="path_to_user_avatar" />
          <div style={{ marginLeft: 5, flex: 1 }}>
            <Typography.Text strong>Anderson</Typography.Text>
            {/* <Typography.Text>Notification message goes here.</Typography.Text> */}
          </div>
          <Typography.Text type="secondary" style={{ fontSize: "12px" }}>
            2 hours ago
          </Typography.Text>
        </div>
      </Menu.Item>
      <Menu.Divider />
      {/** Add more notification items similarly */}
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
            overflow: "hidden",
            position: "fixed",
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
            theme="light"
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
                    <span style={{ fontSize: 14, color: "#4a9687" }}>
                      {subMenuItem.label}
                    </span>
                  </Menu.Item>
                ));

                return (
                  <Menu.SubMenu
                    style={{ color: "#4a9687", fontWeight: 600 }}
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
                    style={{
                      marginBottom: "6px",
                      color: "#4a9687",
                      fontWeight: 600,
                    }}
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
            padding: "5px 0px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "fixed",
            zIndex: 1000,
            width: collapsed ? "calc(100% - 80px)" : "calc(100% - 200px)",
            transition: "width 0.2s",
          }}
        >
          <Typography.Title
            style={{ marginLeft: "20px", fontSize: "22px", fontWeight: "bold" }}
          >
            {screenName}
          </Typography.Title>
          <div style={{ display: "flex" }}>
            <Dropdown overlay={userMenu} trigger={["click"]}>
              <div style={{ marginRight: "10px" }}>
                <Avatar
                  style={{ backgroundColor: "#001529", cursor: "pointer" }}
                  icon={<UserOutlined />}
                />
              </div>
            </Dropdown>
            <Dropdown overlay={notificationMenu} trigger={["click"]}>
              <div style={{ marginRight: "20px" }}>
                <Badge
                  style={{ backgroundColor: "#4a9687" }}
                  count={notificationCount}
                >
                  <Avatar
                    style={{ backgroundColor: "#001529", cursor: "pointer" }}
                    icon={<BellFilled />}
                  />
                </Badge>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content style={{ margin: "30px 30px", marginTop: "95px" }}>
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
