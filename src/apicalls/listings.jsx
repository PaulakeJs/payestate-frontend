import { axiosManager } from "./axiosManager";

export const AddListing = async (payload) => {
  try {
    const response = await axiosManager.post("/api/listing/new", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetListings = async () => {
  try {
    const response = await axiosManager.get(`/api/listing/get-listing`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetListingsById = async (id) => {
  try {
    const response = await axiosManager.get(
      `/api/listing/get-listing-by-id/${id}`
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.error("GetListingsById error:", error);
    throw error;
  }
};

export const EditListing = async (id, payload) => {
  try {
    const response = await axiosManager.put(
      `/api/listing/edit-listing/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const DeleteListing = async (id) => {
  try {
    const response = await axiosManager.delete(
      `/api/listing/delete-listing/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const UploadProductImage = async (payload) => {
  try {
    const response = await axiosManager.post(
      "/api/listing/upload-product-image",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetListingById = async (id) => {
  try {
    const response = await axiosManager.get(
      `/api/listing/get-onelisting-by-id/${id}`
    );
    return response.data;
  } catch (error) {
    return response.data;
  }
};

export const GetListingUser = async (id) => {
  try {
    const response = await axiosManager.get(
      `/api/users/get-listing-seller/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GeneralListing = async () => {
  try {
    const response = await axiosManager.get("/api/listing/general/listing");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const AdminGeneralListing = async () => {
  try {
    const response = await axiosManager.get(
      "/api/listing/admin-general/listing"
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const UpdateListingStatus = async (id, status) => {
  try {
    const response = await axiosManager.put(
      `/api/listing/admin-update-listing-status/${id}`,
      { status }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const TourHouse = async (payload) => {
  try {
    const response = await axiosManager.post("/api/listing/tour", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const FilterSearch = async (payload) => {
  try {
    const response = await axiosManager.post(
      "/api/listing/filter-search",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const AddressSearch = async (payload) => {
  try {
    const response = await axiosManager.post(
      "/api/listing/address-search",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
