import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { store } from "./Redux/Store";
import TemplateUI from "./Component/FormLayoutTemplate/TemplateUI";
import Profile from "./Pages/Profile";
import ShowAllProduct from "./Pages/ShowAllProduct";
import ShowProductDetail from "./Pages/ShowProductDetail";
import CartPage from "./Pages/CartPage";
import CheckLogin from "./Pages/CheckLogin";
import ModalConfirmOrder from "./Modal/ModalConfirmOrder";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="register" element={<Register></Register>}></Route>

        <Route path="" element={<TemplateUI></TemplateUI>}>
          <Route path="" element={<ShowAllProduct></ShowAllProduct>}></Route>
          <Route path="cart" element={<CartPage></CartPage>}></Route>
          <Route path="product-detail/:id" element={<ShowProductDetail />} />
        </Route>
        <Route path="profile" element={<Profile></Profile>}></Route>
        <Route path="checklogin" element={<CheckLogin></CheckLogin>}></Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);
