import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUSer } from "../apicalls/users";
import { useDispatch } from "react-redux";
import { SetLoader } from "../redux/loadersSlice";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = async (values) => {
    try {
      dispatch(SetLoader(true));
      const res = await LoginUSer(values);

      dispatch(SetLoader(false));
      if (res.success) {
        message.success(res.message);
        localStorage.setItem("token", res.data);
        navigate("/");
        window.location.reload()
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      message.error(error.message);

      dispatch(SetLoader(false));
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/account/dashbord");
    }
  }, []);
  return (
    <>
      <div className="px-7 mt-10 md:max-w-[600px] mx-auto">
        <div className="">
          <p className="text-center text-lg mb-3">
            welcome back please sign in
          </p>
          <Form onFinish={login} layout="vertical">
            <Form.Item label="Enter Email Address" name={"email"}>
              <Input type="text" />
            </Form.Item>

            <Form.Item label="Password" name={"password"}>
              <Input type="password" />
            </Form.Item>

            <Button
              classNames="w-full"
              type="default"
              htmlType="submit"
              className="bg-orange-500 text-white"
              block
            >
              Sign In
            </Button>
            <div className="mt-2">
              <span> Dont have an account?</span>{" "}
              <Link className="text-orange-500 mt-3" to={"/account/signup"}>
                create account
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Signin;
