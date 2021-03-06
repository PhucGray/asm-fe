import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const FoodDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);

  useEffect(() => {
    const getFoodById = async (id) => {
      const res = await axios.get(`${import.meta.env.VITE_APP_API}foods/${id}`);

      if (res.data.success) {
        setFood(res.data.data);
      }
    };

    if (params.id) {
      getFoodById(params?.id);
    }
  }, []);

  return (
    <div>
      <Button
        className="mt-3 ms-5 d-flex align-items-center"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/admin/food")}>
        Quay lại
      </Button>

      <div className="title">Chi tiết món ăn</div>

      {food && (
        <div
          style={{
            width: "fit-content",
            marginInline: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}>
          <div className="d-flex gap-3">
            <div className="fw-bold" style={{ minWidth: 100 }}>
              Tên:
            </div>
            <div>{food.name}</div>
          </div>

          <div className="d-flex gap-3">
            <div className="fw-bold" style={{ minWidth: 100 }}>
              Ảnh:
            </div>

            <img
              width={100}
              height={100}
              src={`https://localhost:44328/images/${food.image}`}
            />
          </div>

          <div className="d-flex gap-3">
            <div className="fw-bold" style={{ minWidth: 100 }}>
              Giá:
            </div>
            <div>{food.price}</div>
          </div>

          <div className="d-flex gap-3">
            <div className="fw-bold" style={{ minWidth: 100 }}>
              Giá đặc biệt:
            </div>
            <div>
              {food.specialPrice === 0 ? "Không có" : food.specialPrice}
            </div>
          </div>

          <div className="d-flex gap-3">
            <div className="fw-bold" style={{ minWidth: 100 }}>
              Mô tả:
            </div>
            <div>{food.description}</div>
          </div>

          <div className="d-flex gap-3">
            <div className="fw-bold" style={{ minWidth: 100 }}>
              Trạng thái:
            </div>
            <div>{food.status ? "Còn hàng" : "Hết hàng"}</div>
          </div>

          <div className="d-flex gap-3">
            <div className="fw-bold" style={{ minWidth: 100 }}>
              Ẩn:
            </div>
            <div>{food.isDeleted ? "Có" : "Không"}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetail;
