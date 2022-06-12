import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/user/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const onFinish = async (data) => {
    setLoading(true);

    const res = await axios({
      method: "post",
      url: `${import.meta.env.VITE_APP_API}auth/login`,
      data: data,
    });

    if (res.data.success) {
      const { token, roleId } = res.data.data;

      dispatch(setUser(res.data.data));
      message.success("Đăng nhập thành công");
      localStorage.setItem("token", token);

      if (roleId === 1) {
        navigate("/");
      } else {
        navigate("admin");
      }
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

      <div className="title mt-3">Đăng nhập</div>

      <Form
        form={form}
        name="login"
        onFinish={onFinish}
        initialValues={{
          isEmployee: false,
        }}
        autoComplete="off"
        layout="vertical"
        style={{ maxWidth: 450, marginInline: "auto" }}>
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
          <Input autoFocus />
        </Form.Item>

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

        <Form.Item>
          <Button
            className="d-block w-50 mx-auto mt-3 rounded"
            type="primary"
            style={{ height: 45 }}
            htmlType="submit"
            loading={loading}>
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
