import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SetLoader } from "../redux/loadersSlice";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import useSelection from "antd/es/table/hooks/useSelection";
import { CurrentUser } from "../apicalls/users";

const Header = () => {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const validatetoken = async () => {
    try {
      const response = await CurrentUser();
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    validatetoken();
  }, []);
  return (
    <>
      <div className="flex justify-between p-4 items-center bg-white">
        <div className="hambuger">
          {!show && (
            <i
              className="ri-menu-2-line text-lg cursor-pointer"
              onClick={toggle}
            ></i>
          )}
          {show && (
            <i className=" text-xl cursor-pointer" onClick={toggle}>
              &times;
            </i>
          )}
        </div>
        <div className="flex">
          <Link to={"/"} className="text-lg">
            <i className="ri-home-6-line text-lg"></i>Pay
            <span className="text-orange-500">estate</span>
          </Link>
        </div>
        <div className="signin">
          {user && (
            <span
              onClick={() => {
                if (user.role === "user") {
                  navigate("/account/dashbord");
                } else {
                  navigate("/account/admin");
                }
              }}
              className="hover:text-orange-500 cursor-pointer flex gap-2"
            >
              <i className="ri-user-line"></i>
              {user.name}
            </span>
          )}
          {!user && (
            <Link
              to={"/account/signin"}
              className="hover:text-orange-500 flex gap-2"
            >
              <i className="ri-user-line"></i>
              <span>Signin</span>
            </Link>
          )}
        </div>
      </div>
      {show && (
        <div className="w3-sidebar menu shadow-md w3-animate-left flex flex-col gap-4">
          <Link className="border-b-2 border-gray-800 p-2" to={"/"}>
            Home
          </Link>
          <Link className="border-b-2 border-gray-800 p-2" to={"/explore/"}>
            Listings
          </Link>
          {!user && (
            <>
              <Link
                className="border-b-2 border-gray-800 p-2"
                to={"/account/signin"}
              >
                Login
              </Link>
              <Link
                className="border-b-2 border-gray-800 p-2"
                to={"account/signup"}
              >
                Signup
              </Link>
            </>
          )}
          {user && (
            <span
              className="border-b-2 border-gray-800 p-2 cursor-pointer "
              onClick={()=>{
                if (user.role === 'user'){
                  navigate('/account/dashbord')
                }else{
                  navigate('/account/admin')
                }
              }}
              
            >
              {user.name}
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
