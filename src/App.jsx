import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import CustomerDetail from "./components/admin/customer/CustomerDetail";
import ManageCustomer from "./components/admin/customer/ManageCustomer";
import AddOrEditFood from "./components/admin/food/AddOrEditFood";
import FoodDetail from "./components/admin/food/FoodDetail";
//
import ManageFood from "./components/admin/food/ManageFood";
import ManageOrder from "./components/admin/order/ManageOrder";
import OrderDetail from "./components/admin/order/OrderDetail";
import AddOrEditUser from "./components/admin/user/AddOrEditUser";
import ManageUser from "./components/admin/user/ManageUser";
import UserDetail from "./components/admin/user/UserDetail";
import Cart from "./components/customer/Cart";
import CheckoutInfo from "./components/customer/CheckoutInfo";
import FoodInfo from "./components/customer/FoodInfo";
import FoodList from "./components/customer/FoodList";
import OrderDetailHistory from "./components/customer/OrderDetailHistory";
import OrderHistory from "./components/customer/OrderHistory";
import Login from "./components/Login";
import Register from "./components/Register";
import { logout, selectUser, setUser } from "./features/user/userSlice";
import Admin from "./pages/Admin";
import Customer from "./pages/Customer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const getProfile = async (token) => {
      try {
        const res = await axios.get(
          "https://localhost:44328/api/auth/profile",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          },
        );

        if (res.data.success) {
          const user = res.data.data;
          dispatch(setUser(user));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.log("app error: " + error);
      }
    };

    const token = localStorage.getItem("token");

    if (token && !user) {
      getProfile(token);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Customer />}>
        <Route index element={<FoodList />} />
        <Route path="history" element={<OrderHistory />} />
        <Route path="history/:id" element={<OrderDetailHistory />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout-info" element={<CheckoutInfo />} />
        <Route path=":id" element={<FoodInfo />} />
      </Route>

      <Route path="admin" element={<Admin />}>
        <Route path="food">
          <Route index element={<ManageFood />} />
          <Route path="add" element={<AddOrEditFood page="add" />} />
          <Route path="edit/:id" element={<AddOrEditFood page="edit" />} />
          <Route path=":id" element={<FoodDetail />} />
        </Route>

        <Route path="user">
          <Route index element={<ManageUser />} />
          <Route path="add" element={<AddOrEditUser page="add" />} />
          <Route path="edit/:id" element={<AddOrEditUser page="edit" />} />
          <Route path=":id" element={<UserDetail />} />
        </Route>

        <Route path="customer">
          <Route index element={<ManageCustomer />} />
          <Route path=":id" element={<CustomerDetail />} />
        </Route>

        <Route path="order">
          <Route index element={<ManageOrder />} />
          <Route path=":id" element={<OrderDetail />} />
        </Route>
      </Route>

      <Route
        path="register"
        element={
          user ? (
            <Navigate to={user.role === 0 ? "/" : "/admin"} />
          ) : (
            <Register />
          )
        }
      />
      <Route
        path="login"
        element={
          user ? <Navigate to={user.role === 0 ? "/" : "/admin"} /> : <Login />
        }
      />
    </Routes>
  );
};

export default App;
