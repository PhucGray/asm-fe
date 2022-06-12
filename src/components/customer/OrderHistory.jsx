import { Space, Table, Tag, Tooltip } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatMoneyVND } from "../../utils/formatMoney";
import { formatCsharpDate } from "../../utils/formatDate";
import { selectUser } from "../../features/user/userSlice";
import axios from "axios";

const ManageOrder = () => {
  const navigate = useNavigate();
  const [form] = useForm();
  const user = useSelector(selectUser);

  const [orderHistory, setOrderHistory] = useState([]);
  const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] = useState(false);
  const [orderStatuses, setOrderStatuses] = useState([]);
  const [orderRecord, setOrderRecord] = useState(null);
  const [tableLoading, setTableLoading] = useState(true);
  const [finishLoading, setFinishLoading] = useState(false);

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tổng tiền",
      dataIndex: "price",
      key: "price",
      render: (value) => <>{formatMoneyVND(value)}</>,
    },
    {
      title: "Ngày đặt",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (value) => {
        const tagColors = ["purple", "blue", "green"];

        return (
          <Tag color={tagColors[value - 1]}>
            {orderStatuses.find((status) => status.id === value)?.title}
          </Tag>
        );
      },
    },
    {
      title: "Ghi chú",
      dataIndex: "note",
      key: "note",
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
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const getOrders = async () => {
      const getOrderHistoryRes = await axios.get(
        `${import.meta.env.VITE_APP_API}orders/history/${user.id}`,
      );

      const getOrderStatusesRes = await axios.get(
        `${import.meta.env.VITE_APP_API}orders/statuses`,
      );

      if (getOrderHistoryRes.data.success && getOrderStatusesRes.data.success) {
        setOrderStatuses(getOrderStatusesRes.data.data);

        setOrderHistory(
          getOrderHistoryRes.data.data.map((i) => {
            const formatedDate = formatCsharpDate(i.createdAt);
            return {
              key: i.id,
              id: i.id,
              price: i.price,
              orderDate: formatedDate,
              status: i.orderStatusId,
              note: i.note,
            };
          }),
        );
      }
      setTableLoading(false);
    };

    if (user) {
      getOrders();
    }
  }, [user]);

  return (
    <div className="px-5 mt-3">
      <div className="title">Lịch sử mua hàng</div>
      <Table
        loading={tableLoading}
        columns={columns}
        dataSource={orderHistory}
      />
    </div>
  );
};

export default ManageOrder;
