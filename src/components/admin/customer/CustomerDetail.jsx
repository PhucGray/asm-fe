import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CustomerDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const getCustomerById = async (id) => {
      const res = await axios.get(`${import.meta.env.VITE_APP_API}users/${id}`);

      if (res.data.success) {
        setCustomer(res.data.data);
      }
    };

    if (params.id) {
      getCustomerById(params?.id);
    }
  }, []);

  return (
    <div>
      <Button
        className="mt-3 ms-5 d-flex align-items-center"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/admin/customer")}>
        Quay lại
      </Button>

      <div className="title">Thông tin người dùng</div>

      {customer && (
        <div
          style={{
            width: "fit-content",
            marginInline: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}>
          <div className="d-flex gap-3">
            <div className="fw-bold" style={{ minWidth: 100 }}>
              Id:
            </div>
            <div>{customer.id}</div>
          </div>

          <div className="d-flex gap-3">
            <div className="fw-bold" style={{ minWidth: 100 }}>
              Tên:
            </div>
            <div>{customer.fullName}</div>
          </div>

          <div className="d-flex gap-3">
            <div className="fw-bold" style={{ minWidth: 100 }}>
              Email:
            </div>
            <div>{customer.email}</div>
          </div>

          <div className="d-flex gap-3">
            <div className="fw-bold" style={{ minWidth: 100 }}>
              Address:
            </div>
            <div>{customer.address}</div>
          </div>

          <div className="d-flex gap-3">
            <div className="fw-bold" style={{ minWidth: 100 }}>
              Phone:
            </div>
            <div>{customer.phone}</div>
          </div>

          <div className="d-flex gap-3">
            <div className="fw-bold" style={{ minWidth: 100 }}>
              Giới tính:
            </div>
            <div>{customer.gender ? "Nam" : "Nữ"}</div>
          </div>

          <div className="d-flex gap-3">
            <div className="fw-bold" style={{ minWidth: 100 }}>
              Ẩn:
            </div>
            <div>{customer.isDeleted ? "Có" : "Không"}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDetail;
