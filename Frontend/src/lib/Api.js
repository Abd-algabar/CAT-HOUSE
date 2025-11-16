import { axiosInstance } from "./axios";
import toast from "react-hot-toast";

export const getSomeCats = async (page, limit, status) => {
  try {
    const response = await axiosInstance.get(
      `/cat/getCats?page=${page}&limit=${limit}&status=${status}`
    );
    return response.data;
  } catch (error) {
    toast.error("حدث خطأ في جلب البيانات");
    console.error("Error fetching cats:", error);
  }
};

export const getCatById = async (id) => {
  try {
    const response = await axiosInstance.get(`/cat/this/${id}`);

    console.log(response.data.cat);
    return response.data.cat;
  } catch (error) {
    toast.error("error");
  }
};

export const searchCat = async (type, status) => {
  try {
    const response = await axiosInstance.get(
      `/cat/search?type=${type}&status=${status}`
    );
    // console.log(response);

    return  {cats:response?.data?.cats ,count:response.data.count};
  } catch (error) {
    toast.error("خطاء في البحث");
  }
};


export const filterCat = async (type, mAge,lmAge,gender,city,status) => {
  try {
    const response = await axiosInstance.get(
      `/cat/filter?type=${type}&status=${status}&mAge=${mAge}&lmAge=${lmAge}&gender=${gender}&city=${city}`
    );
    console.log(response);

    return  {cats:response?.data?.cats ,count:response.data.count};
  } catch (error) {
    toast.error("خطاء في البحث");
  }
};

export const me=async()=>{
  try {
    const token = localStorage.getItem("token");
      const response=await axiosInstance.get("/user/me",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // console.log("data:",response)
      return response.data
  } catch (error) {
    console.log("me:",error)
    toast.error("خطاء")
  }
}

export const DeleteCat=async(id)=>{
  try {
    const token = localStorage.getItem("token");
      const response=await axiosInstance.delete(`cat/delete/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // console.log("data:",response)
      return response.data
  } catch (error) {
    console.log("delete:",error)
    toast.error("حدث خطاء اثناء الحذف")
  }
}