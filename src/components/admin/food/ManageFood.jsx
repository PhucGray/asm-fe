import { Button, message, Popconfirm, Space, Table, Tag, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { formatMoneyVND } from "../../../utils/formatMoney";

const ManageFood = () => {
  const navigate = useNavigate();

  const [foodData, setFoodData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);

  const handleDeleteFood = async (id) => {
    const res = await axios({
      method: "delete",
      url: `${import.meta.env.VITE_APP_API}foods/${id}`,
    });

    if (res.data.success) {
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
      render: (value) => <>{formatMoneyVND(value)}</>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (value) => (
        <Tooltip title={value}>
          <div className="text-truncate" style={{ maxWidth: 90 }}>
            {value}
          </div>
        </Tooltip>
      ),
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

  useEffect(() => {
    const getFoodList = async () => {
      const res = await axios.get(`${import.meta.env.VITE_APP_API}foods`);

      if (res.data.success) {
        const foodList = res.data.data.map((i) => {
          return {
            key: i.id,
            image: `${import.meta.env.VITE_APP_IMAGE}${i.image}`,
            name: i.name,
            price: i.price,
            status: i.status ? "Còn hàng" : "Hết hàng",
            description: i.description,
          };
        });

        setFoodData(foodList);
        setTableLoading(false);
      }
    };

    getFoodList();
  }, []);

  return (
    <div>
      <div className="title">Quản lí món ăn</div>

      <Button type="primary rounded mb-3" onClick={() => navigate("add")}>
        Thêm món
      </Button>

      <Table loading={tableLoading} columns={columns} dataSource={foodData} />
    </div>
  );
};

export default ManageFood;
