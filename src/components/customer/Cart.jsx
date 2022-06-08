import { Button, Space, Table, Modal, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [isModalCheckoutOpen, setIsModalCheckoutOpen] = useState(false);

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
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Thành tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate("/awfawfwafwaf")}>Chi tiết</a>
          <a>Xoá</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "Gà rán",
      price: 200000,
      quantity: 2,
      totalPrice: 200000,
    },
  ];

  const handleCheckout = async () => {
    // alert("thanh toan");
    navigate("/checkout-info");
  };

  const onFinish = async (values) => {
    console.log(values);
    message.success({ content: "Đặt hàng thành công" });
    setIsModalCheckoutOpen(false);
  };

  const handleCancel = () => {
    setIsModalCheckoutOpen(false);
  };
  return (
    <>
      <div className="py-4 px-5">
        <div className="title">Giỏ hàng</div>

        <div className="d-flex gap-5">
          <Table className="flex-grow-1" columns={columns} dataSource={data} />

          <div
            className="bg-white rounded px-4 py-2 d-flex flex-column gap-2"
            style={{ width: 400 }}>
            <div className="fw-bold" style={{ fontSize: 30 }}>
              Thanh toán
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <div>Tạm tính</div>
              <div>200000</div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <div>VAT</div>
              <div>10 (%)</div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <div>Tổng</div>
              <div>220000</div>
            </div>

            <Button
              onClick={() => navigate("/")}
              className="rounded"
              style={{ height: 45 }}
              type="primary">
              Tiếp tục mua hàng
            </Button>
            <Button
              onClick={() => setIsModalCheckoutOpen(true)}
              className="rounded"
              style={{ height: 45 }}
              type="ghost">
              Thanh Toán
            </Button>
          </div>
        </div>
      </div>

      <Modal
        title="Điền thông tin thanh toán"
        visible={isModalCheckoutOpen}
        footer={null}
        onCancel={handleCancel}>
        <Form
          name="checkout"
          initialValues={{}}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          style={{ maxWidth: 450, marginInline: "auto" }}>
          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ và tên",
              },
            ]}>
            <Input autoFocus />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email",
              },
              {
                type: "email",
                message: "Sai định dạng email",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              className="d-block w-50 mx-auto mt-2 rounded"
              type="primary"
              style={{ height: 45 }}
              htmlType="submit">
              Xác nhận mua hàng
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Cart;
