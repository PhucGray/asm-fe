import { Button, Popconfirm, Space, Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser } from "../../../features/user/userSlice";

const ManageUser = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const [userData, setUserData] = useState(null);
  const [tableLoading, setTableLoading] = useState(true);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
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
      render: (value) => (
        <>
          {value === 1 && "Nhân viên"}
          {value === 2 && "Admin"}
          {value === 3 && "Super Admin"}
        </>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate(`${record.id}`)}>Chi tiết</a>

          {record.role !== 3 && (
            <>
              <a onClick={() => navigate(`edit/${record.id}`)}>Sửa</a>

              <Popconfirm
                title="Bạn có chắc chắn muốn xoá người dùng này"
                onConfirm={() => handleDeleteFood(record.id)}
                onCancel={null}
                okText="Có"
                cancelText="Không">
                <a>Xoá</a>
              </Popconfirm>
            </>
          )}
        </Space>
      ),
    },
  ];

  //
  useEffect(() => {
    const getUserList = async () => {
      const res = await axios.get("https://localhost:44328/api/users");

      const userList = res.data
        ?.filter((_user) => _user.id !== user?.id)
        .map((i) => {
          let role = "Nhân viên";
          if (i.role === 1) role = "Admin";
          if (i.role === 2) role = "Super Admin";

          return {
            key: i.id,
            id: i.id,
            email: i.email,
            fullName: i.fullName,
            gender: i.gender ? "Nam" : "Nữ",
            phone: i.phone,
            role: i.role,
          };
        });

      setUserData(userList);
      setTableLoading(false);
    };

    if (user) {
      getUserList();
    }
  }, [user]);

  return (
    <div>
      <div className="title">Quản lí người dùng</div>

      <Button type="primary rounded mb-3" onClick={() => navigate("add")}>
        Thêm người dùng
      </Button>

      <Table loading={tableLoading} columns={columns} dataSource={userData} />
    </div>
  );
};

export default ManageUser;
