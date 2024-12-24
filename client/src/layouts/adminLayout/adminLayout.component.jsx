import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header/header.component";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    } else {
      if (pathname === "/") {
        if (user.isAdmin) {
          navigate("/admin/home");
        } else {
          navigate("/employee/home");
        }
      } else {
        navigate(pathname);
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/");
    }
  }, [user]);
  
  return (
    <div className="w-screen h-screen flex flex-col">
      <Header />
      <div className="w-screen flex-1 p-5 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
