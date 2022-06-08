import { Button, Form, Input } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { selectCart } from "../../features/cart/cartSlice";

const CheckoutInfo = () => {
  const cart = useSelector(selectCart);
  const onFinish = (values) => {
    alert("Đặt hàng thành công");
  };

  return (
    <div>
      <div className="title mt-3">Điền thông tin thanh toán</div>

      <Form
        name="register"
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
          <Input />
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
            className="d-block w-50 mx-auto mt-3 rounded"
            type="primary"
            style={{ height: 45 }}
            htmlType="submit">
            Xác nhận mua hàng
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CheckoutInfo;
