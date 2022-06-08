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
  const [file, setFile] = useState(null);
  const [form] = Form.useForm();

  const onFinish = async (data) => {
    try {
      const formData = new FormData();

      // console.log(data);
      formData.append("file", data.Image.file.originFileObj);
      formData.append("foodData", JSON.stringify({ ...data, Image: null }));

      const res = await axios({
        method: "post",
        url: "https://localhost:44328/api/foods",
        data: formData,

        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data) {
        console.log(res.data);
        form.resetFields();
        message.success("Thêm món thành công");
      }
    } catch (error) {
      console.log("onFinishError: " + error);
    }
  };

  async function handleUploadChange(e) {
    setFile(e.target.files[0]);
  }

  // EDIT
  const [fileList, setFileList] = useState([]);
  const params = useParams();

  const onChange = ({ fileList: newFileList }) => {
    if (fileList.length === 1) {
      form.setFieldsValue({ Image: null });
      setFileList([]);
      return;
    }

    setFileList(newFileList);
  };

  useEffect(() => {
    const getFoodById = async (id) => {
      const res = await axios.get(`https://localhost:44328/api/foods/${id}`);

      const {
        id: foodId,
        name,
        price,
        specialPrice,
        image,
        status,
        isDeleted,
        description,
      } = res.data;

      form.setFieldsValue({
        Name: name,
        Price: price,
        SpecialPrice: specialPrice,
        Status: status,
        IsDeleted: isDeleted,
        Description: description,
        Image: image,
      });

      setFileList([{ url: `https://localhost:44328/Images/${image}` }]);
    };

    if (params.id) {
      getFoodById(params?.id);
      //  axios.get('')
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

          <Col flex="102px">
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
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                onChange={onChange}
                listType="picture"
                maxCount={1}>
                <Button>Upload</Button>
              </Upload>
            </FormItem>
            {/* <input type="file" onChange={handleUploadChange} /> */}
            {/* <Form.Item
              name="image"
              label="Ảnh"
              valuePropName="fileList"
              getValueFromEvent={normFile}>
              <Upload
                maxCount={1}
                listType="picture"
               
                onChange={handleUploadChange}>
                <Button>Thêm ảnh</Button>
              </Upload>
            </Form.Item> */}
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
              <InputNumber className="w-100" />
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
