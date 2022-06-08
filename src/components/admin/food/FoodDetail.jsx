import React from "react";

const FoodDetail = () => {
  return (
    <div>
      <div className="title">Chi tiết món ăn</div>

      <div style={{ maxWidth: 500, marginInline: "auto" }}>
        <div>
          Tên: <span>Cháo gà</span>
        </div>

        <div className="d-flex">
          Ảnh:
          <img
            width={100}
            height={100}
            src="https://joeschmoe.io/api/v1/random"
          />
        </div>

        <div>
          Giá: <span>250000</span>
        </div>

        <div>
          Giá đặc biệt: <span></span>
        </div>

        <div>
          Mô tả:
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
            delectus iste excepturi necessitatibus aperiam quisquam reiciendis
            reprehenderit incidunt deserunt alias, dolor accusamus officiis
            error nihil facere recusandae iure placeat expedita, corrupti illo
            assumenda omnis et! Fuga consequatur nihil quisquam repellat.
          </span>
        </div>

        <div>
          Trạng thái: <span>Còn hàng</span>
        </div>

        <div>
          Ngày thêm: <span>20/12/2000</span>
        </div>

        <div>
          Ẩn: <span>Không</span>
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;
