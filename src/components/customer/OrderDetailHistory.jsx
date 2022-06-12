import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Spin, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatCsharpDate } from "../../utils/formatDate";
import { formatMoneyVND } from "../../utils/formatMoney";

const OrderDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [orderInfo, setOrderInfo] = useState(null);
  const [orderDetailsData, setOrderDetailsData] = useState([]);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên món",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (value) => <>{formatMoneyVND(value)}</>,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Thành tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (value) => <>{formatMoneyVND(value)}</>,
    },
  ];

  useEffect(() => {
    const getOrderDetailsById = async (id) => {
      const getOrderByIdRes = await axios.get(
        `${import.meta.env.VITE_APP_API}orders/${id}`,
      );

      const getOrderDetailsRes = await axios.get(
        `${import.meta.env.VITE_APP_API}orders/${id}/orderDetails`,
      );

      if (getOrderDetailsRes.data.success && getOrderByIdRes.data.success) {
        setOrderInfo(getOrderByIdRes.data.data);

        setOrderDetailsData(
          getOrderDetailsRes.data.data.map((i) => {
            return {
              key: i.id,
              id: i.id,
              name: i.foodName,
              price: i.price,
              quantity: i.quantity,
              totalPrice: i.totalPrice,
            };
          }),
        );
      }
    };

    if (params.id) {
      getOrderDetailsById(params?.id);
    }
  }, []);

  return (
    <div className="px-5 mt-3">
      <Button
        className="mt-3 d-flex align-items-center"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/history")}>
        Quay lại
      </Button>

      <div className="title">Thông tin đơn hàng</div>

      {orderInfo && orderDetailsData.length > 0 ? (
        <>
          <div>
            Ngày đặt: <span>{formatCsharpDate(orderInfo.createdAt)}</span>
          </div>

          <div>
            Trạng thái: <span>Hoàn thành</span>
          </div>

          <div>
            Tổng tiền: <span>{formatMoneyVND(orderInfo.price)}</span>
          </div>

          <Table
            className="mt-3"
            columns={columns}
            dataSource={orderDetailsData}
          />
        </>
      ) : (
        <div className="mt-5 text-center">
          <Spin />
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
