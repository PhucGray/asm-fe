import { Button, message, Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFoodToCart } from "../../features/cart/cartSlice";
import { formatMoneyVND } from "../../utils/formatMoney";

const FoodList = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    const getFoodList = async () => {
      const res = await axios.get(`${import.meta.env.VITE_APP_API}foods`);

      if (res.data.success) {
        setFoodList(res.data.data.filter((i) => i.isDeleted === false));
      }
    };

    getFoodList();
  }, []);

  return (
    <>
      {foodList.length > 0 ? (
        <div className="food-list">
          {foodList.map((food) => (
            <div
              key={food.id}
              className="food-item"
              onClick={() => navigate(`${food.id}`)}>
              <img src={`${import.meta.env.VITE_APP_IMAGE + food.image}`} />

              <div style={{ fontSize: 20, fontWeight: "bold" }}>
                {food.name}
              </div>

              <div style={{ color: "#757575" }}>{food.description}</div>

              <div className="fw-bold text-danger" style={{ fontSize: 25 }}>
                {formatMoneyVND(food.price)}
              </div>

              <Button
                disabled={!food.status}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(addFoodToCart(food));
                  message.success("Đã thêm sản phẩm vào giỏ hàng");
                }}
                className="w-100"
                style={{ height: 45 }}
                type="primary">
                {food.status ? "Thêm vào giỏ hàng" : "Hết hàng"}
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-5 text-center">
          <Spin />
        </div>
      )}
    </>
  );
};

export default FoodList;
