import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GetUser, UpdateAccount } from "../apicalls/users";
import { SetLoader } from "../redux/loadersSlice";

// ... (import statements)

// Assuming your GetUser response looks like this:
// { success: true, data: { createdAt, email, name, password, phone, role, status, updatedAt, __v, _id } }

// ... (import statements)

const EditAccount = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetUser(id);
        if (response.success) {
          setUser(response.data); // Set the user data directly, assuming it's the object containing user details
        } else {
          throw new Error(response.message);
          navigate("/account/dashboard");
        }
      } catch (error) {
        message.error(error.message);
        navigate("/account/dashboard");
      }
    };

    fetchData();
  }, [id, navigate]);

  useEffect(() => {
    // Set form fields with the fetched user data
    form.setFieldsValue(user);
  }, [user, form]);

  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const res = await UpdateAccount(id, values);
      dispatch(SetLoader(false));
      if (res.success) {
        message.success(res.message);
        navigate("/account/dashbord");

        window.location.reload();
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      message.error(error.message);
      navigate("/account/dashbord");
    }
  };

  return (
    <div className="p-3 md:max-w-[600px] mx-auto">
      <h3 className="font-extrabold text-2xl text-center">
        Edit Account Details
      </h3>
      <p className="font-semibold text-center">
        Update the fields to update your account
      </p>
      <div className="bg-white p-7 rounded-3xl mt-5">
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Form.Item label="Full Name" name="name">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Phone Number" name="phone">
            <Input type="text" />
          </Form.Item>
          <p className="text-red-500">Contact Admin To Change Your Password</p>
          <div className="mt-5">
            <Button
              type="default"
              htmlType="submit"
              className="bg-orange-500 text-white"
              block
            >
              Update
            </Button>
            <Link to="/account/dashboard" className="text-orange-500">
              Go Back
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditAccount;
