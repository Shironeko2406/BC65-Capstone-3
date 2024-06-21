import React, { useEffect } from "react";
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
import { NavLink, Outlet } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons"; // Import icon giỏ hàng
import "../../Style/TempUI.css"; // Thêm một file CSS để tùy chỉnh
import { useSelector, useDispatch } from "react-redux"; // Import useSelector hook
import { getDataJSONStorage } from "../../Util/UtilFunction";
import { setCartLocalStorage } from "../../Redux/Reducers/CartReducer";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const items1 = ["Home", "About", "Contact"].map((key) => ({
  key,
  label: `${key}`,
}));

const TemplateUI = () => {
  const { cart } = useSelector((state) => state.CartReducer);
  const totalItem = cart.reduce((acc, item) => acc + item.quantity, 0);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const dispatch = useDispatch();

  useEffect(() => {
    // Khôi phục dữ liệu từ localStorage khi component mount
    const storedCart = getDataJSONStorage("cart");
    if (storedCart) {
      const action = setCartLocalStorage(storedCart);
      dispatch(action);
    }
  }, []);
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
          {/* <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["Home"]} // Chỉnh sửa để mặc định chọn Home khi vào trang
            style={{
              flex: 1,
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Menu.Item key="Home">
              <NavLink to="/">Home</NavLink>
            </Menu.Item>
            <Menu.Item key="About">
              <NavLink to="/about">About</NavLink>
            </Menu.Item>
            <Menu.Item key="Contact">
              <NavLink to="/contact">Contact</NavLink>
            </Menu.Item>
          </Menu> */}
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
            <NavLink to="/cart" className="ms-2">
              {" "}
              {/* Sử dụng margin-start để tạo khoảng cách */}
              <Badge count={totalItem} className="ms-2">
                <Avatar
                  style={{ backgroundColor: "#003366" }}
                  shape="square"
                  size="large"
                  icon={<ShoppingCartOutlined />}
                />
              </Badge>
            </NavLink>
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
