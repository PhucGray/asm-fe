import "../styles/bootstrap.scss";
//
import React from "react";
import { Button, Menu, message, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
// img
import LogoImg from "../assets/images/logo.png";
import { logout, selectUser } from "../features/user/userSlice";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

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
    dispatch(logout());
    message.success("Đăng xuất thành công");
    navigate("/login");
  };

  const cancel = (e) => {};

  if (localStorage.getItem("token") && user && user.role === 0)
    return <Navigate to="/" />;

  if (!localStorage.getItem("token")) return <Navigate to="/login" />;

  return (
    <>
      <div className="admin__page">
        <div className="navbar">
          <div onClick={() => navigate("/admin")} style={{ cursor: "pointer" }}>
            <img className="logo" src={LogoImg} />
          </div>

          <div className="d-flex align-items-center gap-2">
            <div>
              Chào: <span className="fw-bold">{user?.fullName}</span>
            </div>

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
    </>
  );
};

export default Admin;
