import { Button } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFoodToCart } from "../../features/cart/cartSlice";

const FoodList = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <div className="food-list">
      <div className="food-item" onClick={() => navigate("awkjwbfjawfbkjwf")}>
        <img src="https://burgerking.vn/media/catalog/product/cache/1/small_image/316x/9df78eab33525d08d6e5fb8d27136e95/1/-/1-mieng-ga-gion-ko-cay.jpg" />

        <div style={{ fontSize: 20, fontWeight: "bold" }}>
          Gà giòn không cay
        </div>

        <div style={{ color: "#757575" }}>1 cái đùi gà bự chà bá</div>

        <div className="fw-bold text-danger" style={{ fontSize: 25 }}>
          36,000 VND
        </div>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addFoodToCart({ name: "chao long" }));
          }}
          className="w-100"
          style={{ height: 45 }}
          type="primary">
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
    </div>
  );
};

export default FoodList;
