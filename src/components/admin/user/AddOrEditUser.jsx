import { Button, Col, Form, Input, message, Radio, Row, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const { Option } = Select;

const AddOrEditUser = ({ page = "add" }) => {
  const [form] = Form.useForm();
  const [userId, setUserId] = useState(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  const onFinish = async (data) => {
    if (page === "add") {
      const res = await axios({
        method: "post",
        url: "https://localhost:44328/api/users",
        data: data,
      });

      if (res.data) {
        message.success("Thêm người dùng thành công");
        form.resetFields();
      }
    }

    if (page === "edit") {
      const res = await axios({
        method: "put",
        url: `https://localhost:44328/api/users/${userId}`,
        data: data,
      });

      if (res.data) {
        message.success("Sửa người dùng thành công");
      }
    }
  };

  // EDIT

  const params = useParams();

  useEffect(() => {
    const getUserById = async (id) => {
      const res = await axios.get(`https://localhost:44328/api/users/${id}`);

      const {
        id: userId,
        fullName,
        gender,
        email,
        address,
        phone,
        role,
        isDeleted,
        password,
      } = res.data;

      setUserId(userId);

      form.setFieldsValue({
        fullName,
        gender,
        email,
        address,
        phone,
        role,
        isDeleted,
        password,
      });

      setIsSuperAdmin(role === 2);
    };

    if (params.id) {
      getUserById(params?.id);
    }
  }, []);

  return (
    <div>
      <div className="title">{page === "edit" ? "Sửa" : "Thêm"} người dùng</div>

      <Form
        style={{ maxWidth: 450, marginInline: "auto" }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        initialValues={{
          status: true,
          role: 0,
          isDeleted: false,
        }}
        form={form}>
        <Row gutter={24}>
          <Col flex="auto">
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
          </Col>

          <Col flex="none">
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

        <Row gutter={24}>
          <Col flex="auto">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email",
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>

          {(!page === "edit" || !isSuperAdmin) && (
            <Col flex="none">
              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                ]}>
                <Input.Password />
              </Form.Item>
            </Col>
          )}
        </Row>

        <Row gutter={24}>
          <Col span={12}>
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
          </Col>

          <Col span={12}>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại",
                },
                {
                  pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                  message: "Số điện thoại không hợp lệ",
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="status" label="Trạng thái">
          <Radio.Group>
            <Radio value={true}>Còn hoạt động</Radio>
            <Radio value={false}>Ngưng hoạt động</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="role" label="Quyền">
          <Radio.Group>
            <Radio value={0}>Nhân viên</Radio>
            <Radio value={1}>Admin</Radio>
            <Radio value={2}>Super admin</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="isDeleted" label="Ẩn">
          <Radio.Group>
            <Radio value={false}>Không</Radio>
            <Radio value={true}>Có</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button
            className="d-block w-50 mx-auto rounded"
            style={{ height: 40 }}
            type="primary"
            htmlType="submit">
            {page === "edit" ? "Sửa" : "Thêm"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddOrEditUser;
