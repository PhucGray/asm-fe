import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Option } = Select;

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const onFinish = async (data) => {
    setLoading(true);

    const res = await axios({
      method: "post",
      url: `${import.meta.env.VITE_APP_API}auth/register`,
      data: data,
    });

    if (res.data.success) {
      message.success("Đăng ký thành công");
      form.resetFields();
      navigate("/login");
    } else {
      message.error(res.data.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Button
        className="mt-3 ms-5 d-flex align-items-center"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/")}>
        Quay lại
      </Button>

      <div className="title mt-3">Đăng ký</div>

      <Form
        name="register"
        initialValues={{}}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        style={{ maxWidth: 450, marginInline: "auto" }}
        form={form}>
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

        <Row className="gap-3">
          <Col flex="auto">
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
          </Col>

          <Col flex="none">
            <Form.Item
              label="Mật khẩu"
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
          </Col>
        </Row>

        <Row className="gap-3">
          <Col flex="auto">
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
          </Col>

          <Col flex="50px">
            <Form.Item
              label="Tuổi"
              name="age"
              rules={[
                {
                  type: "number",
                  required: true,
                  message: "Vui lòng nhập tuổi (là số nguyên dương)",
                },
              ]}>
              <InputNumber />
            </Form.Item>
          </Col>

          <Col flex="100px">
            <Form.Item
              name="gender"
              label="Giới tính"
              rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}>
              <Select placeholder="Chọn giới tính">
                <Option value={true}>Nam</Option>
                <Option value={false}>Nữ</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

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
            htmlType="submit"
            loading={loading}>
            Đăng ký
          </Button>
        </Form.Item>

        <div className="text-center">
          Đã có tài khoản ?
          <Button type="link" onClick={() => navigate("/login")}>
            Đăng nhập
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Register;
