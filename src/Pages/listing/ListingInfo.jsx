import { Button, message } from "antd";
import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { SetLoader } from "../../redux/loadersSlice";
import { GetListingById, GetListingUser } from "../../apicalls/listings";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import Tour from "./Tour";

function ListingInfo() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [imageIndex, setImageIndex] = React.useState(0);
  const [listing, setListing] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(SetLoader(true));
        const res = await GetListingById(id);
        dispatch(SetLoader(false));
        if (res.success) {
          setListing(res?.data);
        } else {
          message.error(res.message);
        }
      } catch (error) {
        dispatch(SetLoader(false));
        message.error(error.message);
      }
    };
    getData();
  }, [id]);
  return (
    <div className="p-3 md:max-w-[600px] mx-auto">
      <div className="p-3">
        <Link onClick={() => navigate(-1)} className=" text-orange-600 mb-3">
          Go Back
        </Link>
      </div>
      <div className="bg-white rounded-md p-4">
        <h3 className="font-extrabold text-4xl"></h3>
        <div className="flex justify-between">
          <div>
            <p className="font-extrabold text-2xl">Title: {listing?.title}</p>
            <p className="text-green-700">price: $ {listing?.price}</p>
          </div>
          <div>
            {listing?.seller._id !== user._id && (
              <Button
                type="default"
                disabled={user._id === listing?.seller._id}
                onClick={() => setIsOpen(true)}
              >
                Request Tour
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="p-4 bg-white rounded-3xl mt-5">
        <img
          src={listing?.images[imageIndex]}
          alt=""
          className="w-full h-full object-cover rounded-3xl"
        />
      </div>
      <div className="bg-white flex gap-3 mt-5 rounded-3xl p-5 overflow-scroll">
        {listing?.images.map((image, index) => (
          <img
            key={index}
            src={image}
            onClick={() => {
              setImageIndex(index);
            }}
            alt={`Image ${index + 1}`}
            className={
              "w-20 h-20 p-2 rounded-xl object-cover" +
              (imageIndex === index
                ? "border border-orange-500 border-solid "
                : "")
            }
          />
        ))}
      </div>
      <div className="bg-white p-4 rounded-md w-full mt-10 flex flex-col gap-3">
        <h3 className="font-extrabold text-xl">Owner Details</h3>
        <p>Name : {listing?.seller.name}</p>
        <p>Email : {listing?.seller.email}</p>
        <p>Address : {listing?.seller.phone}</p>
      </div>
      <div className="bg-white p-4 rounded-md w-full mt-10 flex flex-col gap-3">
        <h3 className="font-extrabold text-xl">More Info</h3>
        <p>Description : {listing?.description}</p>
      </div>
      <div className="bg-white p-5 rounded-md mt-6 flex flex-col gap-4">
        <h3 className="font-extrabold">Other Details</h3>
        <p>Address: {listing?.address}</p>
        <p>Location :{listing?.location}</p>
        <p>Bathrooms: {listing?.bathrooms}</p>
        <p>Bedrooms: {listing?.bedrooms}</p>
      </div>
      {isOpen && (
        <Tour listing={listing} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
      <div className="bg-white p-4 mt-4 text-center">
        <p>Copyright &copy; 2024</p>
      </div>
    </div>
  );
}

export default ListingInfo;
