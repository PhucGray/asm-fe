import { Button, Col, Form, Input, Radio, Row, Select } from "antd";
import React from "react";

const { Option } = Select;

const AddUser = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <div>
      <div className="title">Thêm người dùng</div>

      <Form
        style={{ maxWidth: 450, marginInline: "auto" }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        initialValues={{
          status: true,
          role: 0,
          isDeleted: false,
        }}>
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
              <Input />
            </Form.Item>
          </Col>

          <Col flex="none">
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}>
              <Select placeholder="Chọn giới tính">
                <Option value="male">male</Option>
                <Option value="female">female</Option>
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

        <Form.Item name="role" label="Ẩn">
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
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddUser;
