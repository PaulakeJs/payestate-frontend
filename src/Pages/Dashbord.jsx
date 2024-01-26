import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Listing from "./listing/Listing";


const Dashbord = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/account/signin");
    window.location.reload();
  };
  
  const { user } = useSelector((state) => state.users);

  return (
    <div className="p-3 md:max-w-[600px] mx-auto">
      <div className="account-details p-4 bg-white rounded-lg">
        <div className="flex justify-between">
          <p className="font-extrabold">Account Details </p>
          <Link to={`/account/dashbord/edit-account/${user._id}`} className="flex items-center gap-3 text-orange-500">
            <span className=" font-bold"
            >Edit</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path d="M6.41421 15.89L16.5563 5.74785L15.1421 4.33363L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6473L14.435 2.21231C14.8256 1.82179 15.4587 1.82179 15.8492 2.21231L18.6777 5.04074C19.0682 5.43126 19.0682 6.06443 18.6777 6.45495L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z"></path>
            </svg>
          </Link>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <p>Name:</p>
            <p>Email:</p>
            <p>Phone:</p>
          </div>
          <div className="flex flex-col gap-2">
            <p>{user.name}</p>
            <p> {user.email}</p>
            <p>{user.phone}</p>
          </div>
        </div>
      </div>
      <div className="account-details p-4 bg-white rounded-lg mt-5">
        <div className="flex justify-between">
          <p className="font-extrabold">Your Listings </p>
          <Link
            to={"/account/dashbord/new-listing"}
            className="flex items-center gap-3 text-orange-500"
          >
            <span className=" font-bold">Add New Listing</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"></path>
            </svg>
          </Link>
        </div>
        <div className="products">
          <Listing />
        </div>
      </div>
      <div className="account-details p-4 bg-white rounded-lg mt-5">
        <div className="flex justify-between">
          <p className="font-extrabold">Settings </p>
          <p className="flex items-center gap-3 text-orange-500">
            <span className=" font-bold"></span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path d="M8.68637 4.00008L11.293 1.39348C11.6835 1.00295 12.3167 1.00295 12.7072 1.39348L15.3138 4.00008H19.0001C19.5524 4.00008 20.0001 4.4478 20.0001 5.00008V8.68637L22.6067 11.293C22.9972 11.6835 22.9972 12.3167 22.6067 12.7072L20.0001 15.3138V19.0001C20.0001 19.5524 19.5524 20.0001 19.0001 20.0001H15.3138L12.7072 22.6067C12.3167 22.9972 11.6835 22.9972 11.293 22.6067L8.68637 20.0001H5.00008C4.4478 20.0001 4.00008 19.5524 4.00008 19.0001V15.3138L1.39348 12.7072C1.00295 12.3167 1.00295 11.6835 1.39348 11.293L4.00008 8.68637V5.00008C4.00008 4.4478 4.4478 4.00008 5.00008 4.00008H8.68637ZM6.00008 6.00008V9.5148L3.5148 12.0001L6.00008 14.4854V18.0001H9.5148L12.0001 20.4854L14.4854 18.0001H18.0001V14.4854L20.4854 12.0001L18.0001 9.5148V6.00008H14.4854L12.0001 3.5148L9.5148 6.00008H6.00008ZM12.0001 16.0001C9.79094 16.0001 8.00008 14.2092 8.00008 12.0001C8.00008 9.79094 9.79094 8.00008 12.0001 8.00008C14.2092 8.00008 16.0001 9.79094 16.0001 12.0001C16.0001 14.2092 14.2092 16.0001 12.0001 16.0001ZM12.0001 14.0001C13.1047 14.0001 14.0001 13.1047 14.0001 12.0001C14.0001 10.8955 13.1047 10.0001 12.0001 10.0001C10.8955 10.0001 10.0001 10.8955 10.0001 12.0001C10.0001 13.1047 10.8955 14.0001 12.0001 14.0001Z"></path>
            </svg>
          </p>
        </div>
        <div className="setttings flex justify-between items-center p-4">
          <p>{user.name}</p>
          <p>
            <span
              className=" cursor-pointer text-orange-500 font-bold"
              onClick={logout}
            >
              Logout
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashbord;
