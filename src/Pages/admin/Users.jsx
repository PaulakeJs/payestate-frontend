import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import {
  AdminGeneralListing,
  GeneralListing,
  GetListings,
  UpdateListingStatus,
} from "../../apicalls/listings";
import { message, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { DeleteListing } from "../../apicalls/listings";
import { GetUsersAll, UpdateUserStatus } from "../../apicalls/users";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const res = await GetUsersAll();
      dispatch(SetLoader(false));
      if (res.success) {
        setUsers(res?.data);
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(SetLoader(true));
      const res = await UpdateUserStatus(id, status);
      dispatch(SetLoader(false));
      if (res.success) {
        message.success(res.message);
        getData();
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className=" p-4">
      {users &&
        users.map((user) => (
          <div
            key={user?.id}
            className="bg-white rounded-3xl mb-4 p-4 flex justify-between items-center"
          >
            <div className="flex flex-col gap-3">
              <h3>Name: {user?.name}</h3>
              <p className="">Email: {user?.email}</p>
              <div className="flex flex-col gap-3">
                <p>Phone: {user?.phone}</p>
                <p>Role: {user?.role}</p>
              </div>
              
              <p>
                Status:{" "}
                {user?.status === "active" ? (
                  <span className="text-green-600">{user?.status}</span>
                ) : (
                  <span className="text-red-700">{user?.status}</span>
                )}
              </p>{" "}
            </div>
            <div className="flex gap-5">
              <div>
                <p className="text-center mb-2">Actions</p>

                <div className="flex gap-3">
                  {user?.status === "active" && (
                    <span
                      onClick={() => onStatusUpdate(user?._id, "blocked")}
                      className="underline cursor-pointer text-red-600"
                    >
                      Block
                    </span>
                  )}

                  {user?.status === "blocked" && (
                    <span
                      onClick={() => onStatusUpdate(user?._id, "active")}
                      className="underline cursor-pointer text-green-600"
                    >
                      Unblock
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AdminUsers;
