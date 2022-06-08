import { Button, message, Popconfirm, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManageFood = () => {
  const navigate = useNavigate();

  const [foodData, setFoodData] = useState([]);

  const handleDeleteFood = async (id) => {
    const res = await axios({
      method: "delete",
      url: `https://localhost:44328/api/foods/${id}`,
    });

    if (res.data) {
      message.success("Xoá món thành công");

      setFoodData([...foodData].filter((food) => food.key !== id)).map(
        (f) => f,
      );
    }
  };

  const columns = [
    {
      title: "Tên món",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (value) => <img src={value} style={{ width: 100 }} />,
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
          <a onClick={() => navigate(`${record.key}`)}>Chi tiết</a>
          <a onClick={() => navigate(`edit/${record.key}`)}>Sửa</a>
          <Popconfirm
            title="Bạn có chắc chắn muốn xoá món ăn này"
            onConfirm={() => handleDeleteFood(record.key)}
            onCancel={null}
            okText="Có"
            cancelText="Không">
            <a>Xoá</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  //
  useEffect(() => {
    const getFoodList = async () => {
      const res = await axios.get("https://localhost:44328/api/foods");

      const foodList = res.data?.map((i) => {
        return {
          key: i.id,
          image: `https://localhost:44328/Images/${i.image}`,
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
