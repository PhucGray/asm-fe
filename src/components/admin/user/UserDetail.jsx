import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/user/userSlice";

const UserDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserById = async (id) => {
      const res = await axios.get(`${import.meta.env.VITE_APP_API}users/${id}`);

      if (res.data.success) {
        setUserData(res.data.data);
      } else {
        message.error("Không tồn tại người dùng này.");
        navigate("/admin/user");
      }
    };

    if (params.id) {
      getUserById(params?.id);
    }
  }, [user]);

  return (
    <div>
      <Button
        className="mt-3 ms-5 d-flex align-items-center"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate("/admin/user")}>
        Quay lại
      </Button>

      <div className="title">Thông tin người dùng</div>

      {userData && (
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
            <div>{userData.id}</div>
          </div>

          <div className="d-flex gap-3">
            <div className="fw-bold" style={{ minWidth: 100 }}>
              Tên:
            </div>
            <div>{userData.fullName}</div>
          </div>

          <div className="d-flex gap-3">
            <div className="fw-bold" style={{ minWidth: 100 }}>
              Email:
            </div>
            <div>{userData.email}</div>
          </div>

          <div className="d-flex gap-3">
            <div className="fw-bold" style={{ minWidth: 100 }}>
              Address:
            </div>
            <div>{userData.address}</div>
          </div>

          <div className="d-flex gap-3">
            <div className="fw-bold" style={{ minWidth: 100 }}>
              Phone:
            </div>
            <div>{userData.phone}</div>
          </div>

          <div className="d-flex gap-3">
            <div className="fw-bold" style={{ minWidth: 100 }}>
              Giới tính:
            </div>
            <div>{userData.gender ? "Nam" : "Nữ"}</div>
          </div>

          <div className="d-flex gap-3">
            <div className="fw-bold" style={{ minWidth: 100 }}>
              Quyền:
            </div>
            <div>
              {userData.role === 0
                ? "Nhân viên"
                : userData.role === 1
                ? "Admin"
                : "Super admin"}
            </div>
          </div>

          <div className="d-flex gap-3">
            <div className="fw-bold" style={{ minWidth: 100 }}>
              Ẩn:
            </div>
            <div>{userData.isDeleted ? "Có" : "Không"}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
