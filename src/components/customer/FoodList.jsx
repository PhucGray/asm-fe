import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFoodToCart } from "../../features/cart/cartSlice";

const FoodList = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    const getFoodList = async () => {
      const res = await axios.get("https://localhost:44328/api/foods");

      console.log(res.data);

      setFoodList(res.data.filter((i) => i.isDeleted === false));
    };

    getFoodList();
  }, []);

  return (
    <div className="food-list">
      {foodList &&
        foodList.map((food) => (
          <div
            key={food.id}
            className="food-item"
            onClick={() => navigate(`${food.id}`)}>
            <img src={`https://localhost:44328/images/${food.image}`} />

            <div style={{ fontSize: 20, fontWeight: "bold" }}>{food.name}</div>

            <div style={{ color: "#757575" }}>{food.description}</div>

            <div className="fw-bold text-danger" style={{ fontSize: 25 }}>
              {food.price} VND
            </div>

            <Button
              disabled={!food.status}
              onClick={(e) => {
                e.stopPropagation();
                dispatch(addFoodToCart(food));
              }}
              className="w-100"
              style={{ height: 45 }}
              type="primary">
              {food.status ? "Thêm vào giỏ hàng" : "Hết hàng"}
            </Button>
          </div>
        ))}
    </div>
  );
};

export default FoodList;
