import { Button, Popconfirm, Space, Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageUser = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
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
      title: "Quyền",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate(`${record.key}`)}>Chi tiết</a>
          <a onClick={() => navigate(`edit/${record.key}`)}>Sửa</a>

          {record.role !== "Super Admin" && (
            <Popconfirm
              title="Bạn có chắc chắn muốn xoá người dùng này"
              onConfirm={() => handleDeleteFood(record.key)}
              onCancel={null}
              okText="Có"
              cancelText="Không">
              <a>Xoá</a>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  //
  useEffect(() => {
    const getUserList = async () => {
      const res = await axios.get("https://localhost:44328/api/users");

      const userList = res.data?.map((i) => {
        let role = "Nhân viên";
        if (i.role === 1) role = "Admin";
        if (i.role === 2) role = "Super Admin";
        return {
          key: i.id,
          email: i.email,
          fullName: i.fullName,
          gender: i.gender ? "Nam" : "Nữ",
          phone: i.phone,
          role,
        };
      });

      setUserData(userList);
    };

    getUserList();
  }, []);

  return (
    <div>
      <div className="title">Quản lí người dùng</div>

      <Button type="primary rounded mb-3" onClick={() => navigate("add")}>
        Thêm người dùng
      </Button>

      <Table columns={columns} dataSource={userData} />
    </div>
  );
};

export default ManageUser;
