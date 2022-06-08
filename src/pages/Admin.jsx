import "../styles/bootstrap.scss";
//
import React from "react";
import { Button, Menu, message, Popconfirm } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
// img
import LogoImg from "../assets/images/logo.png";

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

  const confirm = () => {
    navigate("/");
    message.success("Đăng xuất thành công");
  };

  const cancel = (e) => {};

  return (
    <div className="admin__page">
      <div className="navbar">
        <div onClick={() => navigate("/admin")} style={{ cursor: "pointer" }}>
          <img className="logo" src={LogoImg} />
        </div>

        <div className="d-flex align-items-center gap-2">
          <div>admin@gmail.com</div>

          <Popconfirm
            title="Bạn có chắc chắn muốn đăng xuất ?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Có"
            cancelText="Huỷ">
            <Button>Đăng xuất</Button>
          </Popconfirm>
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
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
