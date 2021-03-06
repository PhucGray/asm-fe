import {
  Button,
  Space,
  Table,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  InputNumber,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearCart,
  descreaseQuantity,
  increaseQuantity,
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
      setCartData(
        cart.map((i) => {
          return {
            key: i.id,
            id: i.id,
            name: i.name,
            image: `${import.meta.env.VITE_APP_IMAGE + i.image}`,
            price: i?.specialPrice || i.price,
            quantity: i.quantity,
            totalPrice: i.price * i.quantity,
          };
        }),
      );

      let tempPrice = 0;

      cart.map((i) => {
        if (i?.specialPrice) {
          tempPrice += i.specialPrice * i.quantity;
        } else {
          tempPrice += i.price * i.quantity;
        }
      });

      setTempPrice(tempPrice);
      setFinalPrice((tempPrice * (100 - vat)) / 100);
    }
  }, [cart, vat]);

  const columns = [
    {
      title: "M??",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "T??n m??n",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "H??nh ???nh",
      dataIndex: "image",
      key: "image",
      render: (value) => <img src={value} width={60} />,
    },
    {
      title: "Gi??",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "S??? l?????ng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Th??nh ti???n",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "H??nh ?????ng",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate(`/${record.key}`)}>Chi ti???t</a>

          <div className="d-flex">
            <Button
              style={{ height: 40, width: 40 }}
              onClick={() => {
                if (record.quantity === 1)
                  return dispatch(removeItem(record.key));

                dispatch(descreaseQuantity(record.id));
              }}>
              -
            </Button>
            <InputNumber
              style={{ height: 40, width: 40 }}
              size="large"
              min={1}
              value={record.quantity}
              disabled
            />
            <Button
              style={{ height: 40, width: 40 }}
              onClick={() => {
                dispatch(increaseQuantity(record.id));
              }}>
              +
            </Button>
          </div>

          <Popconfirm
            title="B???n c?? ch???c ch???n mu???n xo?? m??n ??n n??y"
            onConfirm={() => dispatch(removeItem(record.key))}
            onCancel={null}
            okText="C??"
            cancelText="Kh??ng">
            <a>Xo??</a>
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
              price: i?.specialPrice || i.price,
              quantity: i.quantity,
              totalPrice: i.quantity * i.price,
              foodId: i.id,
              orderId,
            };
          }),
        });

        if (addOrderDetailsRes.data.success) {
          message.success({ content: "?????t h??ng th??nh c??ng" });
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
        <div className="title">Gi??? h??ng</div>

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
                Thanh to??n
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div>T???m t??nh</div>
                <div>{formatMoneyVND(tempPrice)}</div>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div>VAT</div>
                <div>{vat} (%)</div>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div>T???ng</div>
                <div>{formatMoneyVND(finalPrice)}</div>
              </div>

              <Button
                onClick={() => navigate("/")}
                className="rounded"
                style={{ height: 45 }}
                type="primary">
                Ti???p t???c mua h??ng
              </Button>
              <Button
                onClick={() => {
                  if (!localStorage.getItem("token") || !user) {
                    message.error("B???n c???n ????ng nh???p ????? thanh to??n");
                    navigate("/login", { replace: true });
                  } else {
                    setIsModalCheckoutOpen(true);
                  }
                }}
                className="rounded"
                style={{ height: 45 }}
                type="ghost">
                Thanh To??n
              </Button>
            </div>
          )}
        </div>
      </div>

      <Modal
        title="??i???n th??ng tin thanh to??n"
        visible={isModalCheckoutOpen}
        footer={null}
        onCancel={handleCancel}>
        <div className="text-center">
          T???ng ti???n:{" "}
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
            label="H??? v?? t??n"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p h??? v?? t??n",
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
                message: "Vui l??ng nh???p email",
              },
              {
                type: "email",
                message: "Sai ?????nh d???ng email",
              },
            ]}>
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="S??? ??i???n tho???i"
            name="phone"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p s??? ??i???n tho???i",
              },
            ]}>
            <Input disabled />
          </Form.Item>

          <Form.Item
            label="?????a ch???"
            name="address"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p ?????a ch???",
              },
            ]}>
            <Input />
          </Form.Item>

          <Form.Item label="Ghi ch??" name="note" rules={[]}>
            <TextArea />
          </Form.Item>

          <Form.Item>
            <Button
              className="d-block w-50 mx-auto mt-2 rounded"
              type="primary"
              style={{ height: 45 }}
              htmlType="submit">
              X??c nh???n mua h??ng
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Cart;
