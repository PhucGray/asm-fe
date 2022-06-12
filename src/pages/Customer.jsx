import "../styles/bootstrap.scss";
//
import { HistoryOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Badge, Button, Dropdown, Menu, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
// img
import LogoImg from "../assets/images/logo.png";
import { selectCart } from "../features/cart/cartSlice";
import { logout, selectUser } from "../features/user/userSlice";

const Customer = () => {
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _logout = () => {
    dispatch(logout());
    message.success("Đăng xuất thành công");
    navigate("/login");
  };

  const menu = (
    <Menu
      items={[
        {
          label: (
            <div onClick={() => navigate("/update-password")}>Đổi mật khẩu</div>
          ),
          key: "0",
        },
        {
          label: <div onClick={_logout}>Đăng xuất</div>,
          key: "1",
        },
      ]}
    />
  );
  return (
    <div className="customer__page">
      <div className="navbar">
        <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <img src={LogoImg} width={50} />
        </div>

        <div className="d-flex gap-3 align-items-center fw-bold">
          <Button
            onClick={() => navigate("/history")}
            className="d-flex align-items-center fw-bold"
            icon={<HistoryOutlined />}
            type="dashed"
            style={{ height: 45, paddingInline: 40, borderRadius: 10 }}>
            Lịch sử mua hàng
          </Button>

          <Badge count={cart?.length || 0}>
            <Button
              icon={<ShoppingCartOutlined />}
              type="ghost"
              shape="circle"
              onClick={() => navigate("/cart")}
            />
          </Badge>

          {user ? (
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button
                className="rounded"
                type="primary"
                onClick={(e) => e.preventDefault()}>
                {user.fullName}
              </Button>
            </Dropdown>
          ) : (
            <Button type="primary" onClick={() => navigate("/login")}>
              Đăng nhập
            </Button>
          )}
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Customer;
