import "../styles/bootstrap.scss";
//
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
// img
import LogoImg from "../assets/images/logo.png";
import { Button, Badge } from "antd";
import { ShoppingCartOutlined, HistoryOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { selectCart } from "../features/cart/cartSlice";

const Customer = () => {
  const cart = useSelector(selectCart);

  const navigate = useNavigate();

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

          <Button
            className="ms-3 rounded"
            type="primary"
            onClick={() => navigate("/login")}>
            Đăng nhập
          </Button>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Customer;
