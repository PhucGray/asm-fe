import { Button, Space, Table, Tag } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const OrderDetailHistory = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Tên món",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "VAT",
      dataIndex: "vat",
      key: "vat",
      render: (text) => <span>{text}%</span>,
    },
    {
      title: "Thành tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
  ];

  const data = [
    {
      key: "1",
      name: "Cháo gà",
      price: 50000,
      quantity: 2,
      vat: 10,
      totalPrice: 100000,
    },
  ];

  return (
    <div className="py-3 px-5">
      <div className="title mt-3">Thông tin đơn hàng chi tiết</div>

      <div>
        Ngày đặt: <span>12/09/2022</span>
      </div>

      <div>
        Trạng thái: <span>Hoàn thành</span>
      </div>

      <div>
        Tổng tiền: <span>500,000</span>
      </div>

      <Table className="mt-3" columns={columns} dataSource={data} />
    </div>
  );
};

export default OrderDetailHistory;
