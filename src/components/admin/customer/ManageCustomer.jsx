import { Button, Space, Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import qs from "querystring";

const ManageCustomer = () => {
  const navigate = useNavigate();

  const [customerData, setCustomerData] = useState(null);
  const [tableLoading, setTableLoading] = useState(true);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
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
          <a onClick={() => navigate(`${record.id}`)}>Chi tiết</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const getCustomerList = async () => {
      const res = await axios.get(
        "https://localhost:44328/api/users/getByRoles?roles=0",
      );

      const customerList = res.data?.map((i) => {
        return {
          key: i.id,
          id: i.id,
          email: i.email,
          fullName: i.fullName,
          gender: i.gender ? "Nam" : "Nữ",
          phone: i.phone,
        };
      });

      setCustomerData(customerList);
      setTableLoading(false);
    };

    getCustomerList();
  }, []);

  return (
    <div>
      <div className="title">Quản lí khách hàng</div>

      <Table
        loading={tableLoading}
        columns={columns}
        dataSource={customerData}
      />
    </div>
  );
};

export default ManageCustomer;
