import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Avatar,
  Form,
  Input,
  Button,
  message,
  Select,
  Typography,
  List,
  Card,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  TOKEN_AUTHOR,
  getDataJSONStorage,
  getDataTextStorage,
} from "../Util/UtilFunction";
import CheckLogin from "./CheckLogin";
import { updateProfileActionApi } from "../Redux/Reducers/UsersReducer";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { Text } = Typography;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [products, setProducts] = useState([]);
  const { userLogin } = useSelector((state) => state.UsersReducer);
  console.log(products);
  const token = getDataTextStorage(TOKEN_AUTHOR);
  console.log(token);
  const navigate = useNavigate();
  const getProfileApi = async () => {
    try {
      const res = await axios.post(
        "https://apistore.cybersoft.edu.vn/api/Users/getProfile",
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res.data.content);
      setUser(res.data.content);
      const extractedProducts = res.data.content.ordersHistory.flatMap(
        (order) =>
          order.orderDetail.map((detail) => ({ ...detail, date: order.date }))
      );
      setProducts(extractedProducts);
    } catch (error) {
      console.error("Error fetching profile:", error);
      message.error("Failed to fetch profile: " + error.message);
    }
  };

  const renderProfile = () => {
    if (userLogin) {
      return (
        <div className="container">
          <Row gutter={16}>
            <Col span={6} style={{ textAlign: "center" }}>
              <Avatar size={128} src={user.avatar} />
              <Text style={{ display: "block", marginTop: "16px" }}>
                {user.name}
              </Text>
            </Col>
            <Col span={18}>
              <Form
                form={form}
                name="profile"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={user}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                >
                  <Input placeholder={user.name} />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                    {
                      type: "email",
                      message: "The input is not valid E-mail!",
                    },
                  ]}
                >
                  <Input placeholder={user.email} />
                </Form.Item>

                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                    {
                      pattern: /^\d+$/,
                      message: "Please input a valid phone number!",
                    },
                  ]}
                >
                  <Input placeholder={user.phone} />
                </Form.Item>

                <Form.Item
                  label="Gender"
                  name="gender"
                  rules={[
                    {
                      required: true,
                      message: "Please select your Gender!",
                    },
                  ]}
                >
                  <Select placeholder="Gender">
                    <Select.Option value="true">Male</Select.Option>
                    <Select.Option value="false">Female</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="primary" htmlType="submit">
                    Update Profile
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <div style={{ marginTop: "32px" }}>
            <Typography.Title level={4}>Orders History</Typography.Title>
            <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={products}
              renderItem={(item) => (
                <List.Item>
                  <Card cover={<img alt={item.name} src={item.image} />}>
                    <Card.Meta
                      title={item.name}
                      description={
                        <>
                          <div>Price: {item.price}</div>
                          <div>Quantity: {item.quantity}</div>
                          <div>Ngày order: {item.date}</div>
                        </>
                      }
                    />
                  </Card>
                </List.Item>
              )}
            />
          </div>
        </div>
      );
    }
    return <CheckLogin />;
  };

  useEffect(() => {
    if (userLogin) {
      getProfileApi();
    }
  }, []);

  const onFinish = async (values) => {
    try {
      const updateProfileActionThunk = updateProfileActionApi(values);
      await dispatch(updateProfileActionThunk);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.warning("Please check the form and try again.");
  };
  return renderProfile();
};

export default Profile;
