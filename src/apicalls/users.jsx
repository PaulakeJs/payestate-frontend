import { axiosManager } from "./axiosManager";

export const NewUser = async (payload) => {
  try {
    const response = await axiosManager.post("/api/users/new", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const LoginUSer = async (payload) => {
  try {
    const response = await axiosManager.post("/api/users/signin", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const CurrentUser = async () => {
  try {
    const response = await axiosManager.get("/api/users/current-user");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetUser = async (id) => {
  try {
    const response = await axiosManager.get(`/api/users/current-user-id/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const UpdateAccount = async (id, payload) => {
  try {
    const response = await axiosManager.put(
      `/api/users/update-user/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};


export const GetUsersAll = async () =>{
  try {
    const response = await axiosManager.get('/api/users/get-users-all')
    return response.data
  } catch (error) {
    return error.message
  }
}


export const  UpdateUserStatus = async (id,status) => {
  try {
    const response = await axiosManager.put(`/api/users/update-user-status/${id}`,{status})
    return response.data
  } catch (error) {
    return error.message
  }
}