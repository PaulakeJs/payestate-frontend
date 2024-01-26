import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import {
  AdminGeneralListing,
  GeneralListing,
  GetListings,
  UpdateListingStatus,
} from "../../apicalls/listings";
import { message, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { DeleteListing } from "../../apicalls/listings";

const Listing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [listings, setListings] = useState(null);

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const res = await AdminGeneralListing();
      dispatch(SetLoader(false));
      if (res.success) {
        setListings(res?.data);
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(SetLoader(true));
      const res = await UpdateListingStatus(id, status);
      dispatch(SetLoader(false));
      if (res.success) {
        message.success(res.message)
        getData();
      }else{
        throw new Error(res.message)
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className=" p-4">
      {listings &&
        listings.map((listing) => (
          <div
            key={listing?.id}
            className="bg-white rounded-3xl mb-4 p-4 flex justify-between items-center"
          >
            <div>
              <h3>Title: {listing?.title}</h3>
              <p className="text-green-500">Price ${listing?.price}</p>
              <div className="flex gap-2">
                <p>Bedrooms: {listing?.bedrooms}</p>
                <p>Bathrooms: {listing?.bathrooms}</p>
              </div>
              <p>Address: {listing?.address}</p>
              <p>
                Status:{" "}
                {listing?.status === "active" ? (
                  <span className="text-green-600">{listing?.status}</span>
                ) : (
                  <span className="text-red-700">{listing?.status}</span>
                )}
              </p>{" "}
              <p>Owner: {listing?.seller.name}</p>
            </div>
            <div className="flex gap-5">
              <div>
                <p className="text-center mb-2">Actions</p>

                <div className="flex gap-3">
                  {listing?.status === "pending" && (
                    <span
                      onClick={() => onStatusUpdate(listing?._id, "active")}
                      className="underline cursor-pointer text-green-600"
                    >
                      Approve
                    </span>
                  )}
                  {listing?.status === "pending" && (
                    <span
                      onClick={() => onStatusUpdate(listing?._id, "rejected")}
                      className="underline cursor-pointer text-red-700"
                    >
                      Reject
                    </span>
                  )}

                  {listing?.status === "active" && (
                    <span
                      onClick={() => onStatusUpdate(listing?._id, "blocked")}
                      className="underline cursor-pointer text-red-600"
                    >
                      Block
                    </span>
                  )}

                  {listing?.status === "blocked" && (
                    <span
                      onClick={() => onStatusUpdate(listing?._id, "active")}
                      className="underline cursor-pointer text-green-600"
                    >
                      Unblock
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Listing;
