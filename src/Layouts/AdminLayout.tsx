import React, { Suspense } from "react";
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
  TransactionOutlined ,
  FileDoneOutlined 
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
      label: "Property Listing",
      path: "/propertyListing",
    },
    {
      key: "7",
      icon: <SlidersOutlined style={{ fontSize: 22 }} />,
      label: "Property Type",
      path: "/propertyType",
    },
    // {
    //   key: "9",
    //   icon: <PropertySafetyOutlined style={{ fontSize: 22 }} />,
    //   label: "Property Details",
    //   path: "/propertyDetails",
    // },

    {
      key: "5",
      icon: <WechatWorkOutlined style={{ fontSize: 22 }} />,
      label: "Chat",
      path: "/chat",
    },
    {
      key: "6",
      icon: <FieldTimeOutlined style={{ fontSize: 22 }} />,
      label: "Timeline",
      path: "/timeline",
    },
    // {
    //   key: "7",
    //   icon: <ProjectOutlined    style={{ fontSize: 22 }} />,
    //   label: "Timeline Feeds",
    //   path: "/feeds",
    // },
    {
      key: "8",
      icon: <ProductOutlined style={{ fontSize: 22 }} />,
      label: "Category",
      path: "/category",
    },
   
    {
        key: "10",
        icon: <DollarOutlined style={{ fontSize: 22 }} />,
        label: "Counter Offers",
        path: "/counter-offers",
     },
    //  {
    //   key: "4",
    //   icon: <TransactionOutlined  style={{ fontSize: 22 }} />,
    //   label: "Transactions",
    //   path: "/transactions",
    // },
     {
      key: "11",
      icon: <FileDoneOutlined   style={{ fontSize: 22 }} />,
      label: "Invoices",
      path: "/invoices",
    },
    // {
    //   key: "4",
    //   icon: <SnippetsOutlined style={{ fontSize: 22 }} />,
    //   label: "Pages",
    //   path: "#",
    //   // component:"Pages",
    //   subMenu: [
    //     {
    //       key: "4-1",
    //       label: "FAQ",
    //       icon: <QuestionCircleOutlined />,
    //       path: "/pages/faq",
    //     },
    //     {
    //       key: "4-2",
    //       label: "Privacy Policy",
    //       icon: <QuestionCircleOutlined />,
    //       path: "/pages/privacy",
    //     },
    //     {
    //       key: "4-3",
    //       label: "Terms And Conditions",
    //       icon: <QuestionCircleOutlined />,
    //       path: "/pages/terms",
    //     },
    //   ],
    // },
  ];
  const handleLogout = () => {
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
            // overflow: "hidden",
            // position: "fixed",
          }}
        >
          {/* <div
          style={{ display: "flex", justifyContent: "space-around", backgroundColor: "white", marginBottom: "2em", border: "2px solid", boxShadow:"", borderRadius:"20px"}}
          className="demo-logo-vertical"
        > */}
          {/* <div
          // style={{ display: "flex", justifyContent: "space-around" }}
          className="demo-logo-vertical"
        /> */}
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
          {/* </div> */}
          <Menu
            theme="dark"
            defaultSelectedKeys={[defaultSelectedKey || "1"]}
            mode="inline"
            style={{
              backgroundColor: customTheme.palette.primary.main,
              width: 200,
            }}
            // items={menuItems}
          >
            {menuItems.map((item) => {
              if (item.subMenu) {
                const subMenuItems = item.subMenu.map((subMenuItem) => (
                  <Menu.Item
                    style={{ color: "white" }}
                    onClick={() => handleNavigate(subMenuItem.path)}
                    key={subMenuItem.key}
                  >
                    <span style={{ fontSize: 14 }}>{subMenuItem.label}</span>
                  </Menu.Item>
                ));

                return (
                  <Menu.SubMenu
                    style={{ color: "white" }}
                    icon={item.icon}
                    title={item.label}
                    key={item.key}
                  >
                    {subMenuItems}
                  </Menu.SubMenu>
                );
              } else {
                return (
                  <Menu.Item
                    style={{ marginBottom: "10px", color: "white" }}
                    onClick={() => handleNavigate(item.path)}
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
            // overflow:"hidden",
            // position:"fixed",
            // zIndex:1000,
            // width:"86%"
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
