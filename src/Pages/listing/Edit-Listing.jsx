import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Upload, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Link, useNavigate, useParams } from "react-router-dom";
import { EditListing, GetListingsById, UploadProductImage } from "../../apicalls/listings";
import { SetLoader } from "../../redux/loadersSlice";
import { useDispatch } from "react-redux";

const EditListings = () => {
  const rules = [{ required: true, message: "Please enter a value" }];
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = React.useState('');
  const [images, setImages] = React.useState([])

  const upload = async () => {
    try {
      dispatch(SetLoader(true));
      const formData = new FormData(); // Correct the case here
      formData.append("file", file);
      formData.append("listingId", listing?.data._id);
      const res = await UploadProductImage(formData);
      dispatch(SetLoader(false));
      if (res.success) {
        message.success(res.message);
        fetchData()
        setFile(null)
      } else {
        message.error(res.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const fetchData = async () => {
    try {
      const response = await GetListingsById(id);
      if (response.success) {
        setListing(response);
        setImages(response?.data.images)
      } else {
        throw new Error(response.message);
        navigate("/account/dashbord");
      }
    } catch (error) {
      message.error(error.message);

      navigate("/account/dashbord");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const res = await EditListing(id, values);

      dispatch(SetLoader(false));
      if (res.success) {
        message.success(res.message);
        navigate("/account/dashbord");
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      message.error(error.message);

      dispatch(SetLoader(false));
    }
  };

  if (listing === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4 md:max-w-[600px] mx-auto">
      <div className="property">
        <h3 className="font-semibold text-xl text-center">
          Edit Property Information
        </h3>
        <div className="">
          <p className="text-center p-2">Fill in the following blank spaces</p>
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={listing?.data}
          >
            <div className="bg-white p-5 rounded-xl">
              <Form.Item label="Property Title" name="title" rules={rules}>
                <Input type="text" placeholder="Family Home" />
              </Form.Item>
              <div className="">
                <Form.Item
                  label="Property Category"
                  name="category"
                  rules={rules}
                >
                  <Select placeholder="Select">
                    <Select.Option value="rent">Rent</Select.Option>
                    <Select.Option value="sell">Sell</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Property Type" name="type" rules={rules}>
                  <Select placeholder="Select">
                    <Select.Option value="house">House</Select.Option>
                    <Select.Option value="apartment">Apartment</Select.Option>
                    <Select.Option value="studio">Studio</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <Form.Item rules={rules} label="Price" name="price">
                <Input type="number" placeholder="$2400" />
              </Form.Item>
            </div>
            <div className="mt-5">
              <h3 className="font-semibold text-xl text-center">
                Edit Property Details
              </h3>
              <p className="text-center p-2">The marked ones are required</p>
              <div className="bg-white rounded-xl p-5">
                <Form.Item label="Bathrooms" name="bathrooms" rules={rules}>
                  <Input type="number" placeholder="2" />
                </Form.Item>

                <Form.Item label="Bedrooms" name="bedrooms" rules={rules}>
                  <Input type="number" placeholder="4" />
                </Form.Item>

                <Form.Item label="Sqft" name="squareft">
                  <Input type="number" placeholder="2" />
                </Form.Item>

                <Form.Item label="Garage" name="garage" rules={rules}>
                  <Select placeholder="Select">
                    <Select.Option value="yes">Yes</Select.Option>
                    <Select.Option value="no">No</Select.Option>
                    <Select.Option value="unknown">Unknown</Select.Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="mt-5">
              <h3 className="font-semibold text-xl text-center">Images</h3>
              <p className="text-center p-2">You can only add up to 6 images</p>
            </div>
            <div className="bg-white rounded-xl p-5">
              <div className="flex gap-5">

              {images.map((img)=>{
                    return (
                      <div className="border border-solid border-orange-500 p-2 rounded">
                        <img src={img} className="h-20 w-20 object-cover"alt=""/>

                      </div>
                    )
                  })}
              </div>
              <div className="mt-5">
                <Upload
                  listType="picture"
                  beforeUpload={() => false}
                  onChange={(info) => {
                    setFile(info.file);
                  }}
                >
                  {" "}
                  {images.length > 5 && <p className="text-red-500 mb-3">Maximum Images Added</p>}
                  <Button disabled={images.length > 5}>Select Image</Button>
                </Upload>

                <div className="flex justify-end">
                  <Button onClick={upload} className="mt-6" disabled={!file}>
                    Upload Image
                  </Button>

                </div>
              </div>
            </div>
            <div className="mt-5">
              <h3 className="font-semibold text-xl text-center">Description</h3>
              <p className="text-center p-2">
                Enter the description for your property
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
                Some listings may go through reviewing after editing
              </p>
              <Button
                type="default"
                className="bg-orange-500 text-white"
                htmlType="submit"
                block
              >
                Update Listing
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

export default EditListings;
