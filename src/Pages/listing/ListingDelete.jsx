import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SetLoader } from "../../redux/loadersSlice";
import { DeleteListing } from "../../apicalls/listings";
import { message } from "antd";

const ListingDelete = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const deletelisting = async () => {  // Removed the 'id' parameter from the function definition
      try {
        dispatch(SetLoader(true));
        const res = await DeleteListing(id);
        dispatch(SetLoader(false));
        if (res.success) {
          message.success(res.message);
          navigate("/account/dashbord");
        } else {
          throw new Error(res.message);
        }
      } catch (error) {
        dispatch(SetLoader(false));
        console.error(error.message);
      }
    };
    deletelisting();  // Removed the 'id' argument here
  }, [id]);

  return <div></div>;
};

export default ListingDelete;
