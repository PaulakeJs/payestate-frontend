import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { NewUser } from "../apicalls/users";
import { useDispatch } from "react-redux";
import { SetLoader } from "../redux/loadersSlice";

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const register = async (values) => {
    try {
      dispatch(SetLoader(true));

      const res = await NewUser(values);
     
      dispatch(SetLoader(false));

      if (res.success) {
        message.success(res.message);
        navigate('/account/signin')
      } else {
        message.error(res.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));

      message.error(error.message);
    }
  };
  const rules = [
    {
      required: true,
      message: "required",
    },
  ];

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/account/dashbord");
    }
  }, []);
  return (
    <>
      <div className="px-7 mt-7 md:max-w-[600px] mx-auto">
        <div className="">
          <p className="text-center text-lg mb-3">
            welcome to payestate. register
          </p>
          <Form onFinish={register} layout="vertical">
            <Form.Item label="Full Name" rules={rules} name={"name"}>
              <Input type="text" />
            </Form.Item>

            <Form.Item label="Enter Email Address" rules={rules} name={"email"}>
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Phone" rules={rules} name={"phone"}>
              <Input type="number" />
            </Form.Item>

            <Form.Item label="Password" rules={rules} name={"password"}>
              <Input type="password" />
            </Form.Item>

            <Button
              classNames="w-full"
              type="default"
              htmlType="submit"
              className="bg-orange-500 text-white"
              block
            >
              Sign Up
            </Button>
            <div className="mt-2">
              <span>Have an account?</span>{" "}
              <Link className="text-orange-500 mt-3" to={"/account/signin"}>
                SignIn
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Signup;
