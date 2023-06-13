import { CreateUser, LoginUser } from "@/utils/types";
import { axiosInstance } from "../base.service";

export const registerUserAPI = async (user: CreateUser) => {
  const res = await axiosInstance.post("/auth/register", user);
  return res.data;
};

export const loginUserAPI = async (user: LoginUser) => {
  const res = await axiosInstance.post("/auth/login", user);
  return res.data;
};
