import "../styles/admin.scss";
//
import { Menu, Avatar } from "antd";
import React from "react";
// img
import LogoImg from "../assets/images/logo.png";
import ManageFood from "../components/food/ManageFood";
import AddFood from "../components/food/AddFood";
import EditFood from "../components/food/EditFood";
import FoodDetail from "../components/food/FoodDetail";
import ManageUser from "../components/user/ManageUser";
import AddUser from "../components/user/AddUser";
import EditUser from "../components/user/EditUser";
import UserDetail from "../components/user/UserDetail";
import ManageCustomer from "../components/customer/ManageCustomer";
import CustomerDetail from "../components/customer/CustomerDetail";
//
import { Routes, Route, useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Món ăn",
      key: "food",
    },
    {
      label: "Người dùng",
      key: "user",
    },

    {
      label: "Khách hàng",
      key: "customer",
    },
    {
      label: "Hoá đơn",
      key: "order",
    },
  ];

  return (
    <div className="admin__page">
      <div className="navbar">
        <img className="logo" src={LogoImg} />

        <div className="d-flex align-items-center gap-2">
          <div>admin@gmail.com</div>
          <Avatar src="https://joeschmoe.io/api/v1/random" />
        </div>
      </div>

      <div className="main">
        <div className="sidebar">
          <Menu
            defaultSelectedKeys={["1"]}
            mode="inline"
            inlineCollapsed={false}
            items={menuItems}
            style={{ border: "none" }}
            onClick={({ key }) => {
              navigate(key);
            }}
          />
        </div>

        <div className="admin-swap-component">
          <Routes>
            <Route path="/food">
              <Route index element={<ManageFood />} />
              <Route path="add" element={<AddFood />} />
              <Route path="edit" element={<EditFood />} />
              <Route path=":id" element={<FoodDetail />} />
            </Route>

            <Route path="/user">
              <Route index element={<ManageUser />} />
              <Route path="add" element={<AddUser />} />
              <Route path="edit" element={<EditUser />} />
              <Route path=":id" element={<UserDetail />} />
            </Route>

            <Route path="/customer">
              <Route index element={<ManageCustomer />} />
              <Route path=":id" element={<CustomerDetail />} />
            </Route>
          </Routes>
          {/* <ManageCustomer /> */}
          {/* <AddUser /> */}
          {/* <EditUser /> */}
          {/* <CustomerDetail /> */}
        </div>
      </div>
    </div>
  );
};

export default Admin;
