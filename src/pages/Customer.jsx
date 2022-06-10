import "../styles/bootstrap.scss";
//
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
// img
import LogoImg from "../assets/images/logo.png";
import { Button, Badge, Popconfirm, Avatar } from "antd";
import { ShoppingCartOutlined, HistoryOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../features/cart/cartSlice";
import { selectUser, setUser } from "../features/user/userSlice";

const Customer = () => {
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const confirm = () => {
    dispatch(setUser(null));
    localStorage.clear();
    message.success("Đăng xuất thành công");
    navigate("/");
  };

  const cancel = (e) => {};

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
            <Popconfirm
              title="Bạn có chắc chắn muốn đăng xuất ?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Có"
              cancelText="Huỷ">
              <Avatar
                src="https://joeschmoe.io/api/v1/random"
                style={{ cursor: "pointer" }}
              />
            </Popconfirm>
          ) : (
            <Button
              className="ms-3 rounded"
              type="primary"
              onClick={() => navigate("/login")}>
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
