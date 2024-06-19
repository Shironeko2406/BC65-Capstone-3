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
} from "antd";
import { useDispatch } from "react-redux";
import {
  TOKEN_AUTHOR,
  getDataJSONStorage,
  getDataTextStorage,
} from "../Util/UtilFunction";

const Profile = () => {
  const { Text } = Typography;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});

  const getProfileApi = async () => {
    const token = getDataTextStorage(TOKEN_AUTHOR);
    console.log(token);
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
    } catch (error) {
      console.error("Error fetching profile:", error);
      message.error("Failed to fetch profile: " + error.message);
    }
  };

  useEffect(() => {
    getProfileApi();
  }, []);

  const onFinish = (values) => {};

  const onFinishFailed = (errorInfo) => {
    message.warning("Please check the form and try again.");
  };
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
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "The input is not valid E-mail!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Please input your phone number!" },
                {
                  pattern: /^\d+$/,
                  message: "Please input a valid phone number!",
                },
              ]}
            >
              <Input />
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
    </div>
  );
};

export default Profile;
