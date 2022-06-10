import { Button, Space, Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManageCustomer = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
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

  useEffect(() => {
    const getCustomerList = async () => {
      const res = await axios.get("https://localhost:44328/api/user");
    };
  }, []);
  return (
    <div>
      <div className="title">Quản lí người dùng</div>

      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ManageCustomer;
