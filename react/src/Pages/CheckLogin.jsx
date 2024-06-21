import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const CheckLogin = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Result
        status="error"
        title="Bạn chưa đăng nhập!"
        subTitle="Xin vui lòng đăng nhập tài khoản của bạn, nếu chưa có tài khoản hãy tạo mới!"
        extra={[
          <Button
            type="primary"
            key="console"
            onClick={() => {
              navigate("/");
            }}
          >
            Trở về trang chủ
          </Button>,
          <Button
            key="login"
            onClick={() => {
              navigate("/login");
            }}
          >
            Đăng kí
          </Button>,
        ]}
      ></Result>
    </div>
  );
};

export default CheckLogin;
