import "../styles/bootstrap.scss";
//
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
// img
import LogoImg from "../assets/images/logo.png";
import { Button, Badge } from "antd";
import { ShoppingCartOutlined, HistoryOutlined } from "@ant-design/icons";

const Customer = () => {
  const navigate = useNavigate();

  return (
    <div className="customer__page">
      <div className="navbar">
        <div onClick={() => navigate("/")}>
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

          <Badge count={5}>
            <Button
              icon={<ShoppingCartOutlined />}
              type="ghost"
              shape="circle"
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
      {/* <div className="food-list">
        <div className="food-item">
          <img src="https://burgerking.vn/media/catalog/product/cache/1/small_image/316x/9df78eab33525d08d6e5fb8d27136e95/1/-/1-mieng-ga-gion-ko-cay.jpg" />

          <div style={{ fontSize: 20, fontWeight: "bold" }}>
            Gà giòn không cay
          </div>

          <div style={{ color: "#757575" }}>1 cái đùi gà bự chà bá</div>

          <div className="fw-bold text-danger" style={{ fontSize: 25 }}>
            36,000 VND
          </div>

          <Button className="w-100" style={{ height: 45 }} type="primary">
            Thêm vào giỏ hàng
          </Button>
        </div>

        <div className="food-item">
          <img src="https://burgerking.vn/media/catalog/product/cache/1/small_image/316x/9df78eab33525d08d6e5fb8d27136e95/1/-/1-mieng-ga-gion-ko-cay.jpg" />

          <div style={{ fontSize: 20, fontWeight: "bold" }}>
            Gà giòn không cay
          </div>

          <div style={{ color: "#757575" }}>1 cái đùi gà bự chà bá</div>

          <div className="fw-bold text-danger" style={{ fontSize: 25 }}>
            36,000 VND
          </div>

          <Button className="w-100" style={{ height: 45 }} type="primary">
            Thêm vào giỏ hàng
          </Button>
        </div>

        <div className="food-item">
          <img src="https://burgerking.vn/media/catalog/product/cache/1/small_image/316x/9df78eab33525d08d6e5fb8d27136e95/1/-/1-mieng-ga-gion-ko-cay.jpg" />

          <div style={{ fontSize: 20, fontWeight: "bold" }}>
            Gà giòn không cay
          </div>

          <div style={{ color: "#757575" }}>1 cái đùi gà bự chà bá</div>

          <div className="fw-bold text-danger" style={{ fontSize: 25 }}>
            36,000 VND
          </div>

          <Button className="w-100" style={{ height: 45 }} type="primary">
            Thêm vào giỏ hàng
          </Button>
        </div>

        <div className="food-item">
          <img src="https://burgerking.vn/media/catalog/product/cache/1/small_image/316x/9df78eab33525d08d6e5fb8d27136e95/1/-/1-mieng-ga-gion-ko-cay.jpg" />

          <div style={{ fontSize: 20, fontWeight: "bold" }}>
            Gà giòn không cay
          </div>

          <div style={{ color: "#757575" }}>1 cái đùi gà bự chà bá</div>

          <div className="fw-bold text-danger" style={{ fontSize: 25 }}>
            36,000 VND
          </div>

          <Button className="w-100" style={{ height: 45 }} type="primary">
            Thêm vào giỏ hàng
          </Button>
        </div>

        <div className="food-item">
          <img src="https://burgerking.vn/media/catalog/product/cache/1/small_image/316x/9df78eab33525d08d6e5fb8d27136e95/1/-/1-mieng-ga-gion-ko-cay.jpg" />

          <div style={{ fontSize: 20, fontWeight: "bold" }}>
            Gà giòn không cay
          </div>

          <div style={{ color: "#757575" }}>1 cái đùi gà bự chà bá</div>

          <div className="fw-bold text-danger" style={{ fontSize: 25 }}>
            36,000 VND
          </div>

          <Button className="w-100" style={{ height: 45 }} type="primary">
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default Customer;
