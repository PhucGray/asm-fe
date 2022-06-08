import { Button, Space, Table, Tag } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const ManageOrder = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Ngày đặt",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
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
      totalPrice: 100000,
      orderDate: "12/02/2022",
      status: "Hoàn thành",
    },
    {
      key: "2",
      totalPrice: 75000,
      orderDate: "03/06/2022",
      status: "Đang xử lí",
    },
  ];

  return (
    <div>
      <div className="title">Quản lí hoá đơn</div>

      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ManageOrder;
