import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <>
      <Button
        className="mt-3 ms-5 d-flex align-items-center"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/")}>
        Quay lại
      </Button>

      <div className="title mt-3">Đăng nhập</div>

      <Form
        name="login"
        initialValues={
          {
            // remember: true,
          }
        }
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        style={{ maxWidth: 500, marginInline: "auto" }}>
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
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu",
            },
            {
              min: 6,
              max: 20,
              message: "Vui lòng nhập mật khẩu từ 6 - 20 ký tự",
            },
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            className="d-block w-50 mx-auto mt-3 rounded"
            type="primary"
            style={{ height: 45 }}
            htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>

        <div className="text-center">
          Chưa có tài khoản ?
          <Button type="link" onClick={() => navigate("/register")}>
            Đăng ký
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Login;
