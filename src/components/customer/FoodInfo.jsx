import { Button, Image } from "antd";
import React from "react";

const FoodInfo = () => {
  return (
    <div className="py-4 px-5">
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

      <Button
        className="w-25 d-block mx-auto mt-3"
        style={{ height: 45 }}
        type="primary">
        Thêm vào giỏ hàng
      </Button>
    </div>
  );
};

export default FoodInfo;
