import { Space, Table } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Ngày ghi nhận",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate("awnfajwfnjwafnwf")}>Chi tiết</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      orderId: 1,
      totalPrice: 100000,
      orderDate: "12/02/2022",
      status: "Hoàn thành",
    },
  ];

  return (
    <div className="py-3 px-5">
      <div className="title mt-3">Lịch sử mua hàng</div>

      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default OrderHistory;
