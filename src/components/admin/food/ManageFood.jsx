import { Button, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManageFood = () => {
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
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate(record.key)}>Chi tiết</a>
          <a onClick={() => navigate(`edit/${record.key}`)}>Sửa</a>
          <a>Xoá</a>
        </Space>
      ),
    },
  ];

  const [foodData, setFoodData] = useState([]);
  //
  useEffect(() => {
    const getFoodList = async () => {
      const res = await axios.get("https://localhost:44328/api/foods");

      const foodList = res.data?.map((i) => {
        return {
          key: i.id,
          name: i.name,
          price: i.price,
          status: i.status ? "Còn hàng" : "Hết hàng",
        };
      });

      setFoodData(foodList);
    };

    getFoodList();
  }, []);

  return (
    <div>
      <div className="title">Quản lí món ăn</div>

      <Button type="primary rounded mb-3" onClick={() => navigate("add")}>
        Thêm món
      </Button>

      <Table columns={columns} dataSource={foodData} />
    </div>
  );
};

export default ManageFood;
