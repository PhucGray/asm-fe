import {
  Button,
  Space,
  Table,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
} from "antd";
import { useForm } from "antd/lib/form/Form";
// import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearCart,
  removeItem,
  selectCart,
} from "../../features/cart/cartSlice";
import { selectUser } from "../../features/user/userSlice";
import { formatMoneyVND } from "../../utils/formatMoney";

const { TextArea } = Input;

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isModalCheckoutOpen, setIsModalCheckoutOpen] = useState(false);
  const [form] = useForm();

  //
  const cart = useSelector(selectCart);
  const [cartData, setCartData] = useState([]);
  const [tempPrice, setTempPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [vat, setVat] = useState(0);

  useEffect(() => {
    const getVAT = async () => {
      const res = await axios.get(`${import.meta.env.VITE_APP_API}orders/vat`);

      if (res.data.success) {
        setVat(res.data.data);
      }
    };

    getVAT();
  }, []);

  useEffect(() => {
    if (user && cart) {
      form.setFieldsValue({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        address: user.address,
      });
    }
  }, [user, cart]);

  useEffect(() => {
    if (cart && vat !== 0) {
      console.log(cart);
      setCartData(
        cart.map((i) => {
          return {
            key: i.id,
            name: i.name,
            image: `${import.meta.env.VITE_APP_IMAGE + i.image}`,
            price: i.price,
            quantity: i.quantity,
            totalPrice: i.price * i.quantity,
          };
        }),
      );

      let tempPrice = 0;

      cart.map((i) => {
        tempPrice += i.price * i.quantity;
      });

      setTempPrice(tempPrice);
      setFinalPrice((tempPrice * (100 - vat)) / 100);
    }
  }, [cart, vat]);

  const columns = [
    {
      title: "Tên món",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (value) => <img src={value} width={60} />,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Thành tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate(`/${record.key}`)}>Chi tiết</a>

          <Popconfirm
            title="Bạn có chắc chắn muốn xoá món ăn này"
            onConfirm={() => dispatch(removeItem({ id: record.key }))}
            onCancel={null}
            okText="Có"
            cancelText="Không">
            <a>Xoá</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onFinish = async (values) => {
    try {
      const { address, note } = values;

      const addOrderRes = await axios({
        method: "post",
        url: `${import.meta.env.VITE_APP_API}orders/order`,
        data: {
          price: finalPrice,
          vat,
          address,
          note,
          userId: user.id,
        },
      });

      if (addOrderRes.data.success) {
        const orderId = addOrderRes.data.data.id;

        const addOrderDetailsRes = await axios({
          method: "post",
          url: `${import.meta.env.VITE_APP_API}orders/orderDetails`,
          data: cart.map((i) => {
            return {
              foodName: i.name,
              price: i.price,
              quantity: i.quantity,
              totalPrice: i.quantity * i.price,
              foodId: i.id,
              orderId,
            };
          }),
        });

        if (addOrderDetailsRes.data.success) {
          message.success({ content: "Đặt hàng thành công" });
          setIsModalCheckoutOpen(false);
          dispatch(clearCart());
          form.setFieldsValue(null);
        }
      }
    } catch (error) {
      setIsModalCheckoutOpen(false);
      message.error(error);
    }
  };

  const handleCancel = () => {
    setIsModalCheckoutOpen(false);
  };

  return (
    <>
      <div className="py-4 px-5">
        <div className="title">Giỏ hàng</div>

        <div className="d-flex gap-5">
          <Table
            className="flex-grow-1"
            columns={columns}
            dataSource={cartData}
          />

          {cart.length > 0 && (
            <div
              className="bg-white rounded px-4 py-2 d-flex flex-column gap-2"
              style={{ width: 400 }}>
              <div className="fw-bold" style={{ fontSize: 30 }}>
                Thanh toán
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div>Tạm tính</div>
                <div>{formatMoneyVND(tempPrice)}</div>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div>VAT</div>
                <div>{vat} (%)</div>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div>Tổng</div>
                <div>{formatMoneyVND(finalPrice)}</div>
              </div>

              <Button
                onClick={() => navigate("/")}
                className="rounded"
                style={{ height: 45 }}
                type="primary">
                Tiếp tục mua hàng
              </Button>
              <Button
                onClick={() => setIsModalCheckoutOpen(true)}
                className="rounded"
                style={{ height: 45 }}
                type="ghost">
                Thanh Toán
              </Button>
            </div>
          )}
        </div>
      </div>

      <Modal
        title="Điền thông tin thanh toán"
        visible={isModalCheckoutOpen}
        footer={null}
        onCancel={handleCancel}>
        <div className="text-center">
          Tổng tiền:{" "}
          <span className="fw-bold">{formatMoneyVND(finalPrice)}</span>
        </div>

        <Form
          form={form}
          name="checkout"
          initialValues={{}}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          style={{ maxWidth: 450, marginInline: "auto", marginTop: 20 }}>
          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập họ và tên",
              },
            ]}>
            <Input autoFocus disabled />
          </Form.Item>

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
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại",
              },
            ]}>
            <Input disabled />
          </Form.Item>

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

          <Form.Item label="Ghi chú" name="note" rules={[]}>
            <TextArea />
          </Form.Item>

          <Form.Item>
            <Button
              className="d-block w-50 mx-auto mt-2 rounded"
              type="primary"
              style={{ height: 45 }}
              htmlType="submit">
              Xác nhận mua hàng
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Cart;
