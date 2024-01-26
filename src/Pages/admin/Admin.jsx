import React, { useEffect } from "react";
import { Tabs, message } from "antd";
import Listing from "./AdminListing";
import AdminUsers from "./Users";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/account/dashbord");
      message.error('play keep playing')
    }
  }, [user, navigate]);

  return (
    <div className="p-3 md:max-w-[800px] mx-auto">
      <Tabs>
        <Tabs.TabPane tab="Listings" key={"1"}>
          <Listing />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Users" key={"2"}>
          <AdminUsers />
        </Tabs.TabPane>
      </Tabs>
      <Link to={"/account/dashbord"} className="text-orange-500">
        Go to dashboard
      </Link>
    </div>
  );
};

export default Admin;
