import { Space, Table, Modal, Radio } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageOrder = () => {
  const navigate = useNavigate();
  const [isUpdateStatusModalOpen, setIsUpdateStatusModalOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState(0);

  const columns = [
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Ngày đặt",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
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
          <a onClick={() => setIsUpdateStatusModalOpen(true)}>
            Thay đổi trạng thái
          </a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      totalPrice: 100000,
      orderDate: "12/02/2022",
      totalPrice: 100000,
      status: 2,
    },
    {
      key: "2",
      totalPrice: 75000,
      orderDate: "03/06/2022",
      totalPrice: 75000,
      status: 1,
    },
  ];

  const handleChangeStatus = async () => {
    alert("Trạng thái mới là: " + orderStatus);
    setIsUpdateStatusModalOpen(false);
  };

  return (
    <div>
      <div className="title">Quản lí hoá đơn</div>

      <Table columns={columns} dataSource={data} />

      <Modal
        title="Thay đổi trạng thái đơn hàng"
        visible={isUpdateStatusModalOpen}
        onOk={handleChangeStatus}
        onCancel={() => setIsUpdateStatusModalOpen(false)}
        okText="Thay đổi"
        cancelText="Huỷ">
        <div>
          <span>Mã đơn hàng:</span>
          <span className="fw-bold">1</span>
        </div>

        <Radio.Group
          className="mt-3"
          onChange={(e) => setOrderStatus(e.target.value)}
          value={orderStatus}>
          <Radio value={0}>Đang chờ xử lí</Radio>
          <Radio value={1}>Đang giao</Radio>
          <Radio value={2}>Thành công</Radio>
        </Radio.Group>
      </Modal>
    </div>
  );
};

export default ManageOrder;
