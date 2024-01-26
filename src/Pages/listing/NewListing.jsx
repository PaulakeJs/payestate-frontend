import { Button, Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { AddListing } from "../../apicalls/listings";

const NewListing = () => {

  const rules = [
    { required: true, message: "Please enter a value" },
  ];
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const publish = async (values) => {
    try {
      values.seller = user._id;
      values.status = "active";
      dispatch(SetLoader(true));
      const res = await AddListing(values);
      dispatch(SetLoader(false));
      if (res.success) {
        message.success(res.message);
        navigate("/account/dashbord");
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  return (
    <div className="p-4 md:max-w-[600px] mx-auto">
      <div className="property">
        <h3 className="font-semibold text-xl text-center">
          Property Information
        </h3>
        <div className="">
          <p className="text-center p-2">Fill in the following blank spaces</p>
          <Form layout="vertical" onFinish={publish}>
            <div className="bg-white p-5 rounded-xl">
              <Form.Item label="Property Title" name={"title"} rules={rules}>
                <Input type="text" placeholder="Family Home" />
              </Form.Item>
              <div className="">
                <Form.Item
                  label="Property Category"
                  name={"category"}
                  rules={rules}
                >
                  <select name="" id="">
                    <option value="">Select</option>
                    <option value="rent">Rent</option>
                    <option value="sell">Sell</option>
                  </select>
                </Form.Item>
                <Form.Item label="Property Type" name={"type"} rules={rules}>
                  <select name="" id="">
                    <option value="">Select</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                    <option value="studio">Studio</option>
                  </select>
                </Form.Item>
              </div>
              <Form.Item rules={rules} label="Price" name={"price"}>
                <Input type="number" placeholder="$2400" />
              </Form.Item>
            </div>
            <div className="mt-5">
              <h3 className="font-semibold text-xl text-center">
                Property Details
              </h3>
              <p className="text-center p-2">The marked ones are required</p>
              <div className=" bg-white rounded-xl p-5 ">
                <Form.Item label="Bathrooms" name={"bathrooms"} rules={rules}>
                  <Input type="number" placeholder="2" />
                </Form.Item>

                <Form.Item label="Bedrooms" name={"bedrooms"} rules={rules}>
                  <Input type="number" placeholder="4" />
                </Form.Item>

                <Form.Item label="Sqft" name={"squareft"} rules={rules}>
                  <Input type="number" placeholder="2" />
                </Form.Item>

                <Form.Item label="Garage" name={"garage"} rules={rules}>
                  <select name="" id="">
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </Form.Item>
              </div>
            </div>
            <div className="mt-5">
              <h3 className="font-semibold text-xl text-center">Images</h3>
              <p className="text-center p-2"> You can add up to 10 images</p>
            </div>
            <div className="bg-white rounded-xl p-5">
              <p className="p-5">
                Save the listing go to edit listing to add images{" "}
              </p>
            </div>
            <div className="mt-5">
              <h3 className="font-semibold text-xl text-center">Description</h3>
              <p className="text-center p-2">
                {" "}
                Enter The Description For Your Property
              </p>
            </div>
            <div className="bg-white rounded-xl p-3">
              <Form.Item label="Location" name={"location"} rules={rules}>
                <Input type="text" placeholder="Brevely Hills, Ca" />
              </Form.Item>
              <Form.Item label="Address" name={"address"} rules={rules}>
                <Input type="text" placeholder="1234 Abc Rd." />
              </Form.Item>
              <Form.Item label="Description" name="description" rules={rules}>
                <TextArea placeholder="Very Nice Apartment" />
              </Form.Item>
            </div>
            <div className="mt-5 p-4">
              <p className="text-gray-700 text-sm">
                Some listings may go trough reviewing
              </p>
              <Button
                type="default"
                className="bg-orange-500 text-white"
                htmlType="submit"
                block
              >
                Publish Listing
              </Button>
              <Link to={"/account/dashbord"} className="mt-3 text-orange-500">
                Go Back
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NewListing;
