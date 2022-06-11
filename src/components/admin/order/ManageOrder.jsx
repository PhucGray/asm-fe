import { Space, Table, Modal, Radio, Tooltip, Form, message, Tag } from "antd";
import { useForm } from "antd/lib/form/Form";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatCsharpDate } from "../../../utils/formatDate";
import { formatMoneyVND } from "../../../utils/formatMoney";

const ManageOrder = () => {
  const navigate = useNavigate();
  const [form] = useForm();

  const [ordersList, setOrdersList] = useState([]);
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
          <a
            onClick={() => {
              setIsUpdateStatusModalOpen(true);
              setOrderRecord(record);
            }}>
            Thay đổi trạng thái
          </a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const getOrders = async () => {
      const getOrdersRes = await axios.get(
        `${import.meta.env.VITE_APP_API}orders`,
      );
      const getOrderStatusesRes = await axios.get(
        `${import.meta.env.VITE_APP_API}orders/statuses`,
      );

      if (getOrdersRes.data.success && getOrderStatusesRes.data.success) {
        setOrderStatuses(getOrderStatusesRes.data.data);

        setOrdersList(
          getOrdersRes.data.data.map((i) => {
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

    getOrders();
  }, []);

  const onFinish = async (values) => {
    setFinishLoading(true);

    try {
      const res = await axios({
        method: "put",
        url: `${import.meta.env.VITE_APP_API}orders/${orderRecord.id}`,
        data: {
          statusId: values.status,
        },
      });

      if (res.data.success) {
        const order = res.data.data;

        setOrdersList(
          [...ordersList].map((i) => {
            if (i.id === order.id) {
              i.status = order.orderStatusId;
            }

            return i;
          }),
        );

        setIsUpdateStatusModalOpen(false);
        message.success("Thay đổi trạng thái hoá đơn thành công");
      }
    } catch (error) {
      message.error("Update order status error");
    } finally {
      setFinishLoading(false);
    }
  };

  return (
    <div>
      <div className="title">Quản lí hoá đơn</div>
      <Table loading={tableLoading} columns={columns} dataSource={ordersList} />

      <Modal
        confirmLoading={finishLoading}
        title="Thay đổi trạng thái đơn hàng"
        visible={isUpdateStatusModalOpen && orderStatuses.length > 0}
        onCancel={() => setIsUpdateStatusModalOpen(false)}
        okText="Thay đổi"
        onOk={() => form.submit()}
        cancelText="Huỷ">
        <div>
          <span>Mã đơn hàng: </span>
          <span className="fw-bold">{orderRecord?.id}</span>
        </div>

        <Form
          form={form}
          initialValues={{ status: orderRecord?.status }}
          onFinish={onFinish}>
          <Form.Item name="status">
            <Radio.Group className="mt-3">
              {orderStatuses &&
                orderStatuses.map((status) => (
                  <Radio key={status.id} value={status?.id}>
                    {status.title}
                  </Radio>
                ))}
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageOrder;
