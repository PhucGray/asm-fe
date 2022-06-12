import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser, setUser } from "../features/user/userSlice";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const onFinish = async (data) => {
    setLoading(true);

    const { oldPassword, newPassword, confirmPassword } = data;

    if (newPassword !== confirmPassword)
      message.error("Mật khẩu xác nhận không trùng khớp");
    else if (oldPassword === newPassword) {
      message.error("Vui lòng nhập mật khẩu mới khác với mật khẩu hiện tại");
    } else {
      const token = localStorage.getItem("token");

      const res = await axios({
        method: "put",
        url: `${import.meta.env.VITE_APP_API}auth/update-password`,
        data: {
          oldPassword,
          newPassword,
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (res.data.success) {
        message.success("Đổi mật khẩu thành công");

        if (user.roleId === 1) {
          navigate("/");
        } else {
          navigate("/admin");
        }
      } else {
        form.setFields([
          {
            name: "oldPassword",
            errors: [res.data.message],
          },
        ]);
      }
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

      <div className="title mt-3">Đổi mật khẩu</div>

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
          label="Mật khẩu hiện tại"
          name="oldPassword"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu hiện tại",
            },
            {
              min: 6,
              max: 20,
              message: "Vui lòng nhập mật khẩu từ 6 - 20 ký tự",
            },
          ]}>
          <Input.Password autoFocus />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mật khẩu mới",
            },
            {
              min: 6,
              max: 20,
              message: "Vui lòng nhập mật khẩu từ 6 - 20 ký tự",
            },
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu mới"
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập lại mật khẩu mới để xác nhận",
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
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdatePassword;
