import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { AddressSearch, FilterSearch } from "../apicalls/listings";
import { SetLoader } from "../redux/loadersSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rules = [
    {
      required: true,
      message: "required",
    },
  ];
  const [cart, setCart] = React.useState(true);
  const [dataSearch, setDataSearch] = React.useState(null);
  const toggle = () => {
    setCart(!cart);
  };
  const search = async (values) => {
    try {
      dispatch(SetLoader(true));
      const res = await FilterSearch(values);
      dispatch(SetLoader(false));
      setDataSearch(res?.data);
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const SearchAddress = async (values) => {
    try {
      dispatch(SetLoader(true));
      const res = await AddressSearch(values);
      dispatch(SetLoader(false));
      setDataSearch(res?.data);
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  const gotopage2 = () => {
    navigate("/search-results/", { state: { dataSearch } });
  };
  useEffect(() => {
    if (dataSearch) {
      gotopage2();
    }
  }, [dataSearch]);
  return (
    <div className="banner px-4 py-10 flex  flex-col">
      <div className=" md:max-w-[600px] mx-auto">
        <div>
          <h3 className="text-2xl font-extrabold md:text-6xl">
            Find Your Best Dream House for
          </h3>
          <div className="mt-4">
            <span className="text-orange-500 text-center text-2xl font-extrabold md:text-6xl ">
              {" "}
              Rental, Buy & Sell...
            </span>
          </div>
          <div className="mt-5 text-gray-800 text-center">
            <span>
              Properties for buy / rent in in your location. We have more than
              3000+ listings for you to choose
            </span>
            <div className="mt-4">
              <Link to={"/explore/listings"}>
                <Button className="bg-orange-500 text-white">
                  Buy Or Rent A Proprety
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {cart && (
          <div className="px-10 bg-white py-10 rounded-lg mt-5">
            <h3 className="mb-3 text-center text-gray-500">
              Search For Property
            </h3>
            <Form className="" layout="vertical" onFinish={search}>
              <div className="flex gap-4">
                <Form.Item label="No Of Beds" name={"beds"} rules={rules}>
                  <Input className="" type="number" placeholder="3" />
                </Form.Item>
                <Form.Item label="No Of Baths" name={"baths"} rules={rules}>
                  <Input className="" type="number" placeholder="2" />
                </Form.Item>
              </div>
              <Form.Item label="Price" name={"price"} rules={rules}>
                <Input type="number" placeholder="$2500" />
              </Form.Item>
              <Button
                type="default"
                className="bg-orange-500 text-white"
                htmlType="submit"
                block
              >
                Search
              </Button>
              <span
                className="mt-5 text-orange-500 text-center cursor-pointer"
                onClick={toggle}
              >
                Search with address instead
              </span>
            </Form>
          </div>
        )}
      </div>

      {!cart && (
        <div className="px-10 bg-white py-10 rounded-lg mt-5 md:max-w-[600px] mx-auto">
          <h3 className="mb-3 text-center text-gray-500">
            Search For Property
          </h3>
          <Form className="" layout="vertical" onFinish={SearchAddress}>
            <Form.Item label="Address" name={"address"} rules={rules}>
              <Input
                type="text"
                placeholder="12445 Example Rd, San Jose, CA , USA, 22006"
              />
            </Form.Item>
            <Button
              type="default"
              className="bg-orange-500 text-white"
              htmlType="submit"
              block
            >
              Search
            </Button>
            <span
              className="mt-5 text-orange-500 text-center cursor-pointer"
              onClick={toggle}
            >
              Search with filters instead
            </span>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Banner;
