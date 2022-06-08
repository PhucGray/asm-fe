import React from "react";

const CustomerDetail = () => {
  return (
    <div>
      <div className="title">Thông tin khách hàng</div>

      <div style={{ maxWidth: 450, marginInline: "auto" }}>
        <div>
          Tên: <span>Nguyễn Văn A</span>
        </div>

        <div>
          Giới tính: <span>Nam</span>
        </div>

        <div>
          Email: <span>namnv@gmail.com</span>
        </div>

        <div>
          Điện thoại: <span>01234567899</span>
        </div>

        <div>
          Địa chỉ <span>Quận 7</span>
        </div>

        <div>
          Trạng thái: <span>Còn hoạt động</span>
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

export default CustomerDetail;
