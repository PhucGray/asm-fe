import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  message,
  Upload,
} from "antd";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";
import FormItem from "antd/lib/form/FormItem";

const { TextArea } = Input;

const AddOrEditFood = ({ page = "add" }) => {
  const [form] = Form.useForm();
  const [foodId, setfoodId] = useState(null);
  const [loading, setLoading] = useState(false);

  const onFinish = async (data) => {
    setLoading(true);

    try {
      const formData = new FormData();

      let file;
      let foodData = data;

      if (typeof data.Image === "object") {
        file = data.Image.file.originFileObj;
        foodData = { ...data, Image: null };
      } else {
        file = null;
      }

      formData.append("file", file);
      formData.append("foodData", JSON.stringify(foodData));

      if (page === "add") {
        const res = await axios({
          method: "post",
          url: `${import.meta.env.VITE_APP_API}foods`,
          data: formData,

          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.data.success) {
          form.resetFields();
          setFileList([]);
          message.success("Thêm món thành công");
        }
      }

      if (page === "edit") {
        const res = await axios({
          method: "put",
          url: `${import.meta.env.VITE_APP_API}foods/${foodId}`,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (res.data.success) {
          message.success("Sửa món thành công");
        }
      }
    } catch (error) {
      console.log("onFinishError: " + error);
    } finally {
      setLoading(false);
    }
  };

  // EDIT
  const [fileList, setFileList] = useState([]);
  const params = useParams();

  const onUploadChange = ({ fileList: newFileList }) => {
    if (newFileList.length === 0) {
      form.setFieldsValue({ Image: null });
      setFileList([]);
    }
    if (newFileList.length === 1) {
      setFileList(
        newFileList.map((i) => {
          i.name = null;

          return i;
        }),
      );
    }
  };

  useEffect(() => {
    const getFoodById = async (id) => {
      const res = await axios.get(`${import.meta.env.VITE_APP_API}foods/${id}`);

      if (res.data.success) {
        const {
          id: foodId,
          name,
          price,
          specialPrice,
          image,
          status,
          isDeleted,
          description,
        } = res.data.data;

        setfoodId(foodId);

        form.setFieldsValue({
          Name: name,
          Price: price,
          SpecialPrice: specialPrice,
          Status: status,
          IsDeleted: isDeleted,
          Description: description,
          Image: image,
        });

        setFileList([{ url: `${import.meta.env.VITE_APP_IMAGE}${image}` }]);
      }
    };

    if (params.id) {
      getFoodById(params?.id);
    }
  }, []);
  return (
    <div>
      <div className="title">{page === "edit" ? "Sửa" : "Thêm"} món</div>

      <Form
        style={{ maxWidth: 450, marginInline: "auto" }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        initialValues={{
          Status: true,
          IsDeleted: false,
        }}
        form={form}>
        <Row gutter={24}>
          <Col flex="auto">
            <Form.Item
              label="Tên món"
              name="Name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên món ăn",
                },
              ]}>
              <Input autoFocus />
            </Form.Item>
          </Col>

          <Col flex="200px">
            <FormItem
              name="Image"
              label="Ảnh"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ảnh",
                },
              ]}>
              <Upload
                fileList={fileList}
                onChange={onUploadChange}
                listType="picture"
                multiple={false}
                maxCount={1}>
                <Button>Upload</Button>
              </Upload>
            </FormItem>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              label="Giá"
              name="Price"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giá",
                },
              ]}>
              <InputNumber className="w-100" precision={0} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Giá đặc biệt" name="SpecialPrice">
              <InputNumber className="w-100" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Mô tả"
          name="Description"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập mô tả",
            },
          ]}>
          <TextArea rows={4} />
        </Form.Item>

        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="Status" label="Trạng thái">
              <Radio.Group>
                <Radio value={true}>Còn hàng</Radio>
                <Radio value={false}>Hết hàng</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="IsDeleted" label="Ẩn">
              <Radio.Group>
                <Radio value={false}>Không</Radio>
                <Radio value={true}>Có</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            loading={loading}
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
