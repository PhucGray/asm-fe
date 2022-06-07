import { Button, Space, Table, Tag } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const ManageFood = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Tên món",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
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
          <a onClick={() => navigate("awbfawfkawfk")}>Chi tiết</a>
          <a onClick={() => navigate("edit")}>Sửa</a>
          <a>Xoá</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "Gà rán",
      price: 200000,
      status: "Còn hàng",
    },
    {
      key: "2",
      name: "Hamburger",
      price: 500000,
      status: "Còn hàng",
    },
    {
      key: "3",
      name: "Cháo",
      price: 140000,
      status: "Còn hàng",
    },
  ];
  return (
    <div>
      <div className="title">Quản lí món ăn</div>

      <Button type="primary rounded mb-3" onClick={() => navigate("add")}>
        Thêm món
      </Button>

      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ManageFood;
