import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Input, Button, theme } from "antd";
import { Outlet } from "react-router-dom";
import "../../Style/TempUI.css"; // Thêm một file CSS để tùy chỉnh

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);

const TemplateUI = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between", // Đảm bảo các phần tử được căn đều
        }}
      >
        <div
          className="header-content"
          style={{
            padding: "0 50px",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="logo">
            <img
              src="data:image/jpeg;base64,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"
              alt="Logo"
            />
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items1}
            style={{
              flex: 1,
              justifyContent: "center",
              display: "flex",
            }}
          />
          <div className="header-right">
            <Search
              placeholder="Search..."
              onSearch={(value) => console.log(value)}
              style={{ width: 200, marginRight: 20 }}
            />
            <Button type="primary">Login</Button>
          </div>
        </div>
      </Header>
      <Content
        style={{
          padding: "0 50px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
          }}
        >
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            flex: 1,
          }}
        >
          <Sider
            style={{
              background: colorBgContainer,
            }}
            width={200}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{
                height: "100%",
              }}
              items={items2}
            />
          </Sider>
          <Content
            style={{
              padding: "0 24px",
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Content>
      <Footer
        style={{
          textAlign: "center",
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default TemplateUI;
