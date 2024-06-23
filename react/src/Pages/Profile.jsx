// import React, { useEffect, useState } from "react";
// import {
//   Row,
//   Col,
//   Avatar,
//   Form,
//   Input,
//   Button,
//   message,
//   Select,
//   Typography,
//   List,
//   Card,
// } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   TOKEN_AUTHOR,
//   getDataJSONStorage,
//   getDataTextStorage,
// } from "../Util/UtilFunction";
// import CheckLogin from "./CheckLogin";
// import { updateProfileActionApi } from "../Redux/Reducers/UsersReducer";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//   const { Text } = Typography;
//   const [form] = Form.useForm();
//   const dispatch = useDispatch();
//   const [user, setUser] = useState({});
//   const [products, setProducts] = useState([]);
//   const { userLogin } = useSelector((state) => state.UsersReducer);
//   console.log(products);
//   const token = getDataTextStorage(TOKEN_AUTHOR);
//   console.log(token);
//   const navigate = useNavigate();
//   const getProfileApi = async () => {
//     try {
//       const res = await axios.post(
//         "https://apistore.cybersoft.edu.vn/api/Users/getProfile",
//         {},
//         {
//           headers: {
//             Authorization: token,
//           },
//         }
//       );
//       console.log(res.data.content);
//       setUser(res.data.content);
//       const extractedProducts = res.data.content.ordersHistory.flatMap(
//         (order) =>
//           order.orderDetail.map((detail) => ({ ...detail, date: order.date }))
//       );
//       setProducts(extractedProducts);
//     } catch (error) {
//       console.error("Error fetching profile:", error);
//       message.error("Failed to fetch profile: " + error.message);
//     }
//   };

//   // const updateProfileApi = async () => {
//   //   try {
//   //     const res = await axios.post(
//   //       "https://apistore.cybersoft.edu.vn/api/Users/updateProfile",
//   //       {},
//   //       {
//   //         headers: {
//   //           Authorization: token,
//   //         },
//   //       }
//   //     );
//   //     message.success("Cập nhập thành công!");
//   //   } catch (error) {
//   //     console.error(error);
//   //     message.error("Cập nhập thất bại:" + error.message);
//   //   }
//   // }
//   const renderProfile = () => {
//     if (userLogin) {
//       return (
//         <div className="container">
//           <Row gutter={16}>
//             <Col span={6} style={{ textAlign: "center" }}>
//               <Avatar size={128} src={user.avatar} />
//               <Text style={{ display: "block", marginTop: "16px" }}>
//                 {user.name}
//               </Text>
//             </Col>
//             <Col span={18}>
//               <Form
//                 form={form}
//                 name="profile"
//                 labelCol={{ span: 8 }}
//                 wrapperCol={{ span: 16 }}
//                 initialValues={user}
//                 onFinish={onFinish}
//                 onFinishFailed={onFinishFailed}
//                 autoComplete="off"
//               >
//                 <Form.Item
//                   label="Name"
//                   name="name"
//                   rules={[
//                     { required: true, message: "Please input your name!" },
//                   ]}
//                 >
//                   <Input placeholder={user.name} />
//                 </Form.Item>

//                 <Form.Item
//                   label="Email"
//                   name="email"
//                   rules={[
//                     { required: true, message: "Please input your email!" },
//                     {
//                       type: "email",
//                       message: "The input is not valid E-mail!",
//                     },
//                   ]}
//                 >
//                   <Input placeholder={user.email} />
//                 </Form.Item>

//                 <Form.Item
//                   label="Phone Number"
//                   name="phone"
//                   rules={[
//                     {
//                       required: true,
//                       message: "Please input your phone number!",
//                     },
//                     {
//                       pattern: /^\d+$/,
//                       message: "Please input a valid phone number!",
//                     },
//                   ]}
//                 >
//                   <Input placeholder={user.phone} />
//                 </Form.Item>

//                 <Form.Item
//                   label="Gender"
//                   name="gender"
//                   rules={[
//                     {
//                       required: true,
//                       message: "Please select your Gender!",
//                     },
//                   ]}
//                 >
//                   <Select placeholder="Gender">
//                     <Select.Option value="true">Male</Select.Option>
//                     <Select.Option value="false">Female</Select.Option>
//                   </Select>
//                 </Form.Item>

//                 <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
//                   <Button type="primary" htmlType="submit">
//                     Update Profile
//                   </Button>
//                 </Form.Item>
//               </Form>
//             </Col>
//           </Row>
//           <div style={{ marginTop: "32px" }}>
//             <Typography.Title level={4}>Orders History</Typography.Title>
//             <List
//               grid={{ gutter: 16, column: 4 }}
//               dataSource={products}
//               renderItem={(item) => (
//                 <List.Item>
//                   <Card cover={<img alt={item.name} src={item.image} />}>
//                     <Card.Meta
//                       title={item.name}
//                       description={
//                         <>
//                           <div>Price: {item.price}</div>
//                           <div>Quantity: {item.quantity}</div>
//                           <div>Ngày order: {item.date}</div>
//                         </>
//                       }
//                     />
//                   </Card>
//                 </List.Item>
//               )}
//             />
//           </div>
//         </div>
//       );
//     }
//     return <CheckLogin />;
//   };

//   useEffect(() => {
//     if (userLogin) {
//       getProfileApi();
//     }
//   }, []);

//   const onFinish = async (values) => {
//     try {
//       const updateProfileActionThunk = updateProfileActionApi(values);
//       await dispatch(updateProfileActionThunk);
//       navigate("/login");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const onFinishFailed = (errorInfo) => {
//     message.warning("Please check the form and try again.");
//   };
//   return renderProfile();
// };

// export default Profile;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  GetInfoProfileActionAsync,
  UpdateProfileActionAsync,
} from "../Redux/Reducers/ProfileReducer";

const Profile = () => {
  const dispatch = useDispatch();
  const { profileInfo } = useSelector((state) => state.ProfileReducer);
  const [isEditing, setIsEditing] = useState(false);

  const getInfo = () => {
    const action = GetInfoProfileActionAsync();
    dispatch(action);
  };

  useEffect(() => {
    getInfo();
  }, [dispatch]);

  const handleUpdate = () => {
    setIsEditing(true); // Hiển thị form chỉnh sửa
  };

  const handleCancel = () => {
    formUpdate.resetForm(); // Đặt lại giá trị form
    setIsEditing(false); // Ẩn form chỉnh sửa
  };

  const formUpdate = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: profileInfo?.email || "",
      name: profileInfo?.name || "",
      phone: profileInfo?.phone || "",
      gender: profileInfo?.gender ? "true" : "false",
    },
    onSubmit: (values) => {
      console.log(values);
      const action = UpdateProfileActionAsync(values);
      dispatch(action)
        .then(() => {
          alert("Profile updated successfully!");
          setIsEditing(false);
          formUpdate.resetForm();
        })
        .catch(() => {
          alert("Failed to update profile!");
        });
    },
  });

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <img
            src={profileInfo?.avatar}
            alt="Profile"
            className="img-fluid rounded-circle"
          />
        </div>
        <div className="col-md-9">
          <h2>Profile</h2>
          <form onSubmit={formUpdate.handleSubmit}>
            <div className="row mb-3">
              <div className="col">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={formUpdate.values.email}
                  onChange={formUpdate.handleChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="col">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formUpdate.values.name}
                  onChange={formUpdate.handleChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label>Phone</label>
                <input
                  type="text"
                  className="form-control"
                  name="phone"
                  value={formUpdate.values.phone}
                  onChange={formUpdate.handleChange}
                  readOnly={!isEditing}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label>Gender</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="male"
                      value="true"
                      checked={formUpdate.values.gender === "true"}
                      onChange={formUpdate.handleChange}
                      disabled={!isEditing}
                    />
                    <label className="form-check-label" htmlFor="male">
                      Male
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="female"
                      value="false"
                      checked={formUpdate.values.gender === "false"}
                      onChange={formUpdate.handleChange}
                      disabled={!isEditing}
                    />
                    <label className="form-check-label" htmlFor="female">
                      Female
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {isEditing ? (
              <div>
                <button type="submit" className="btn btn-success mr-2 me-2">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleUpdate}
              >
                Update
              </button>
            )}
          </form>
        </div>
      </div>


      <div className="mt-4">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className="nav-link active"
              href="#order-history"
              data-bs-toggle="tab"
            >
              Order history
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#favourite" data-bs-toggle="tab">
              Favourite
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="order-history">
            <div className="order-history mt-4">
              <p>Orders have been placed on 09-19-2020</p>
              <table className="table">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>img</th>
                    <th>name</th>
                    <th>price</th>
                    <th>quantity</th>
                    <th>total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <img src="https://via.placeholder.com/50" alt="Product" />
                    </td>
                    <td>Product 1</td>
                    <td>1000</td>
                    <td>1</td>
                    <td>1000</td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td>
                      <img src="https://via.placeholder.com/50" alt="Product" />
                    </td>
                    <td>Product 1</td>
                    <td>1000</td>
                    <td>1</td>
                    <td>1000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="tab-pane fade" id="favourite">
            <p>Favourite content here...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
