import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Upload,
} from "antd";
import React from "react";

const { TextArea } = Input;

const AddOrEditFood = ({ page = "add" }) => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList;
  };

  return (
    <div>
      <div className="title">{page === "edit" ? "Sửa" : "Thêm"} món</div>

      <Form
        style={{ maxWidth: 450, marginInline: "auto" }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        initialValues={{
          status: true,
          isDeleted: false,
        }}>
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
              <Input autoFocus />
            </Form.Item>
          </Col>

          <Col flex="102px">
            <Form.Item
              name="upload"
              label="Upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}>
              <Upload name="logo" listType="picture">
                <Button>Click to upload</Button>
              </Upload>
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
            <Form.Item label="Giá đặc biệt" name="specialPrice">
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
                <Radio value={true}>Còn hàng</Radio>
                <Radio value={false}>Hết hàng</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="isDeleted" label="Ẩn">
              <Radio.Group>
                <Radio value={false}>Không</Radio>
                <Radio value={true}>Có</Radio>
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
            {page === "edit" ? "Sửa" : "Thêm"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddOrEditFood;
