import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UserDetail = () => {
  const params = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getuserById = async (id) => {
      const res = await axios.get(`https://localhost:44328/api/users/${id}`);

      console.log(res);
      setUser(res.data);
    };

    if (params.id) {
      getuserById(params?.id);
    }
  }, []);

  return (
    <div>
      <div className="title">Thông tin người dùng</div>

      {user && (
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
              Tên:
            </div>
            <div>{user.fullName}</div>
          </div>

          <div className="d-flex gap-3">
            <div className="fw-bold" style={{ minWidth: 100 }}>
              Email:
            </div>
            <div>{user.email}</div>
          </div>

          <div className="d-flex gap-3">
            <div className="fw-bold" style={{ minWidth: 100 }}>
              Address:
            </div>
            <div>{user.address}</div>
          </div>

          <div className="d-flex gap-3">
            <div className="fw-bold" style={{ minWidth: 100 }}>
              Phone:
            </div>
            <div>{user.phone}</div>
          </div>

          <div className="d-flex gap-3">
            <div className="fw-bold" style={{ minWidth: 100 }}>
              Giới tính:
            </div>
            <div>{user.gender ? "Nam" : "Nữ"}</div>
          </div>

          <div className="d-flex gap-3">
            <div className="fw-bold" style={{ minWidth: 100 }}>
              Quyền:
            </div>
            <div>
              {user.role === 0
                ? "Nhân viên"
                : user.role === 1
                ? "Admin"
                : "Super admin"}
            </div>
          </div>

          <div className="d-flex gap-3">
            <div className="fw-bold" style={{ minWidth: 100 }}>
              Ẩn:
            </div>
            <div>{user.isDeleted ? "Có" : "Không"}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
