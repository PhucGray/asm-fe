import { Button, Space, Table, Tag } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const ManageUser = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate("awnfajwfnjwafnwf")}>Chi tiết</a>
          <a onClick={() => navigate("edit")}>Sửa</a>
          <a>Xoá</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      fullName: "Nguyễn Văn Tèo",
      email: "teonv@gmail.com",
      phone: "012345678",
      gender: "Nam",
    },
  ];

  return (
    <div>
      <div className="title">Quản lí người dùng</div>

      <Button type="primary rounded mb-3" onClick={() => navigate("add")}>
        Thêm người dùng
      </Button>

      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ManageUser;
