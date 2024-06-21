// import React from "react";
// import { Breadcrumb, Layout, Menu, Input, Button, theme } from "antd";
// import { Outlet } from "react-router-dom";
// import "../../Style/TempUI.css"; // Thêm một file CSS để tùy chỉnh

// const { Header, Content, Footer } = Layout;
// const { Search } = Input;

// const items1 = ["1", "2", "3"].map((key) => ({
//   key,
//   label: `nav ${key}`,
// }));

// const TemplateUI = () => {
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();
//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <Header
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between", // Đảm bảo các phần tử được căn đều
//         }}
//       >
//         <div
//           className="header-content"
//           style={{
//             padding: "0 50px",
//             width: "100%",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <div className="logo">
//             <img
//               src=""
//               alt="Logo"
//             />
//           </div>
//           <Menu
//             theme="dark"
//             mode="horizontal"
//             defaultSelectedKeys={["2"]}
//             items={items1}
//             style={{
//               flex: 1,
//               justifyContent: "center",
//               display: "flex",
//             }}
//           />
//           <div className="header-right">
//             <Search
//               placeholder="Search..."
//               onSearch={(value) => console.log(value)}
//               style={{ width: 200, marginRight: 20 }}
//             />
//             <Button type="primary">Login</Button>
//           </div>
//         </div>
//       </Header>
//       <Content
//         style={{
//           padding: "0 50px",
//           flex: 1,
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <Breadcrumb
//           style={{
//             margin: "16px 0",
//           }}
//         >
//           <Breadcrumb.Item>Home</Breadcrumb.Item>
//           <Breadcrumb.Item>List</Breadcrumb.Item>
//           <Breadcrumb.Item>App</Breadcrumb.Item>
//         </Breadcrumb>
//         <div
//           style={{
//             padding: "24px 0",
//             background: colorBgContainer,
//             borderRadius: borderRadiusLG,
//             flex: 1,
//           }}
//         >
//           <Content
//             style={{
//               padding: "0 24px",
//               minHeight: 280,
//             }}
//           >
//             <Outlet />
//           </Content>
//         </div>
//       </Content>
//       <Footer
//         style={{
//           textAlign: "center",
//         }}
//       >
//         Ant Design ©{new Date().getFullYear()} Created by Ant UED
//       </Footer>
//     </Layout>
//   );
// };

// export default TemplateUI;

import React from "react";
import {
  Breadcrumb,
  Layout,
  Menu,
  Input,
  Button,
  Badge,
  theme,
  Avatar,
} from "antd";
import { Outlet } from "react-router-dom";
import { ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons"; // Import icon giỏ hàng
import "../../Style/TempUI.css"; // Thêm một file CSS để tùy chỉnh

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

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
            <img src="" alt="Logo" />
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
          <div className="header-right d-flex align-items-center">
            <Search
              placeholder="Search..."
              onSearch={(value) => console.log(value)}
              style={{ width: 200, marginRight: "1rem" }} // Điều chỉnh khoảng cách bằng giá trị rem
            />
            <Button type="primary" className="me-2">
              Login
            </Button>{" "}
            {/* Sử dụng margin-end để tạo khoảng cách */}
            <a href="#" className="ms-2">
              {" "}
              {/* Sử dụng margin-start để tạo khoảng cách */}
              <Badge count={3} className="ms-2">
                <Avatar
                  style={{ backgroundColor: "#003366" }}
                  shape="square"
                  size="large"
                  icon={<ShoppingCartOutlined />}
                />
              </Badge>
            </a>
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
        <div
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            flex: 1,
          }}
        >
          <Content
            style={{
              padding: "0 24px",
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </div>
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
