import React from "react";
import { Button, Col, Form, Input, InputNumber, Radio, Row } from "antd";
import UploadImage from "../UploadImage";

const { TextArea } = Input;

const AddFood = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <div>
      <div className="title">Thêm món</div>

      <Form
        style={{ maxWidth: 500, marginInline: "auto" }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical">
        <Row gutter={24}>
          <Col flex="auto">
            <Form.Item
              label="Tên món"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên món ăn",
                },
              ]}>
              <Input />
            </Form.Item>
          </Col>

          <Col flex="102px">
            <Form.Item layout="Ảnh" name="image">
              <UploadImage />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Giá"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giá",
                },
              ]}>
              <InputNumber className="w-100" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Giá đặc biệt" name="special-price">
              <InputNumber className="w-100" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Mô tả" name="description">
          <TextArea rows={4} />
        </Form.Item>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="status" label="Trạng thái">
              <Radio.Group>
                <Radio value="1">Còn hàng</Radio>
                <Radio value="0">Hết hàng</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="isDeleted" label="Ẩn">
              <Radio.Group>
                <Radio value="0">Không</Radio>
                <Radio value="1">Có</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

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

export default AddFood;
