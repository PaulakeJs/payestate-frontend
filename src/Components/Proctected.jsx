import { message } from "antd";
import React, { useEffect } from "react";
import { CurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../redux/loadersSlice";
import { SetUser } from "../redux/usersSlice";

function Proctected({ children }) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validatetoken = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await CurrentUser();
      dispatch(SetLoader(false));
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        localStorage.removeItem("token");
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));

      localStorage.removeItem("token");
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validatetoken();
    } else {
      localStorage.removeItem("token");
      navigate("/account/signin");
    }
  }, []);

  return <div>{user && <div className="p-0">{children}</div>}</div>;
}

export default Proctected;
