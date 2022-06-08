import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FoodDetail = () => {
  const params = useParams();
  const [food, setFood] = useState(null);

  useEffect(() => {
    const getFoodById = async (id) => {
      const res = await axios.get(`https://localhost:44328/api/foods/${id}`);

      console.log(res);
      setFood(res.data);
    };

    if (params.id) {
      getFoodById(params?.id);
    }
  }, []);

  return (
    <div>
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
