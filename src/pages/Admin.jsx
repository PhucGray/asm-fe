import "../styles/bootstrap.scss";
//
import React, { useEffect, useState } from "react";
import { Button, Menu, message, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
// img
import LogoImg from "../assets/images/logo.png";
import { logout, selectUser } from "../features/user/userSlice";
import MenuItem from "antd/lib/menu/MenuItem";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(selectUser);

  const [currentMenuItem, setCurrentMenuItem] = useState(null);

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
    {
      label: "Đổi mật khẩu",
      key: "update-password",
    },
  ];

  const confirm = () => {
    dispatch(logout());
    message.success("Đăng xuất thành công");
    navigate("/login");
  };

  if (user && user.roleId === 1) return <Navigate to="/" />;

  if (!localStorage.getItem("token")) return <Navigate to="/login" />;

  useEffect(() => {
    const item = menuItems.find((item) => location.pathname.includes(item.key));
    setCurrentMenuItem(item);
  }, [location.pathname]);

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
              okText="Có"
              cancelText="Huỷ">
              <Button>Đăng xuất</Button>
            </Popconfirm>
          </div>
        </div>

        <div className="main">
          <div className="sidebar">
            <Menu
              selectedKeys={[currentMenuItem?.key]}
              mode="inline"
              inlineCollapsed={false}
              items={menuItems}
              style={{ border: "none" }}
              onClick={({ key }) => {
                if (key === "update-password") {
                  navigate(`/${key}`);
                } else {
                  navigate(key);
                }
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
