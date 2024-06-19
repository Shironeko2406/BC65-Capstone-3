import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { store } from "./Redux/Store";
import TemplateUI from "./Component/FormLayoutTemplate/TemplateUI";
import ShowAddProduct from "./Pages/ShowAddProduct";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="register" element={<Register></Register>}></Route>
        <Route path="" element={<TemplateUI></TemplateUI>}>
          <Route path="" element={<ShowAddProduct></ShowAddProduct>}></Route>
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);
