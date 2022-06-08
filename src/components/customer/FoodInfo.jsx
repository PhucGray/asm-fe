import { Button, Image } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { addFoodToCart } from "../../features/cart/cartSlice";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const FoodInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="py-4 px-5">
      <Button
        type="dashed"
        className="mt-3 ms-5 d-flex align-items-center"
        style={{ background: "transparent" }}
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/")}>
        Quay lại
      </Button>

      <div className="d-flex justify-content-center gap-5">
        <Image src="https://burgerking.vn/media/catalog/product/cache/1/small_image/316x/9df78eab33525d08d6e5fb8d27136e95/1/-/1-mieng-ga-gion-ko-cay.jpg" />

        <div>
          <div style={{ fontSize: 20, fontWeight: "bold" }}>
            Gà giòn không cay
          </div>
          <div style={{ color: "#757575" }}>1 cái đùi gà bự chà bá</div>
          <div className="fw-bold text-danger" style={{ fontSize: 25 }}>
            36,000 VND
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-3 gap-3">
        <Button
          onClick={() => dispatch(addFoodToCart({ name: "ga" }))}
          style={{ height: 45 }}
          type="primary">
          Thêm vào giỏ hàng
        </Button>

        <Button
          onClick={() => navigate("/cart")}
          style={{ height: 45 }}
          type="ghost">
          Đi đến giỏ hàng
        </Button>
      </div>
    </div>
  );
};

export default FoodInfo;
