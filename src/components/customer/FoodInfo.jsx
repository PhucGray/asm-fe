import { Button, Image } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addFoodToCart, clearCart } from "../../features/cart/cartSlice";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FoodInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFoodById = async (id) => {
      if (!isNaN(parseInt(id))) {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_API}foods/${id}`,
        );

        if (res.data.success) {
          setFood(res.data.data);
        } else {
          setFood(null);
        }
      }

      setLoading(false);
    };

    if (params.id) {
      getFoodById(params?.id);
    }
  }, []);

  if (!food && !loading) return <Navigate to="/not-found" />;

  return (
    <>
      {food && (
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
            <Image src={`https://localhost:44328/images/${food.image}`} />

            <div>
              <div style={{ fontSize: 20, fontWeight: "bold" }}>
                {food.name}
              </div>
              <div style={{ color: "#757575" }}>{food.description}</div>
              <div className="fw-bold text-danger" style={{ fontSize: 25 }}>
                {food.price} VND
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-center mt-3 gap-3">
            <Button
              onClick={() => dispatch(addFoodToCart(food))}
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
      )}
    </>
  );
};

export default FoodInfo;
