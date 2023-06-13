import { Student, UpdateStudent } from "@/utils/types";
import { axiosInstance } from "../base.service";

export const fetchAllStudentFromAPI = async () => {
  const res = await axiosInstance.get("/students");
  return res.data;
};

export const fetchStudentByIdFromAPI = async (id: string) => {
  const res = await axiosInstance.get(`/students/${id}`);
  return res.data;
};

export const createStudentFromAPI = async (student: Student) => {
  const res = await axiosInstance.post("/students", student);
  return res.data;
};

export const updateStudentFromAPI = async (student: UpdateStudent) => {
  const res = await axiosInstance.put(`/students/${student.id}`, student);
  return res.data;
};

export const deleteStudentFromAPI = async (id: number) => {
  const res = await axiosInstance.delete(`/students/${id}`);
  return res.data;
};

/* 
import { AnyAction, EnhancedStore } from "@reduxjs/toolkit";
import axios from "axios";
import { ThunkMiddleware } from "redux-thunk";
import { AuthState } from "../types/reduxState";
import { useSelector } from "react-redux";

// import { store } from "../app/store";

let apiBaseUrl: string | undefined = "";


const env: string = process.env.NODE_ENV;

switch (env) {
  case "local":
    apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    break;

  case "development":
    apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    break;
  case "production":
    apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    break;
  default:
    apiBaseUrl = "";
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export const dashboardApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export const allTaggedLivestockApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export const allTaggedLivestockByStateApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});



let store: EnhancedStore<
  {
    auth: AuthState;
  },
  AnyAction,
  [
    ThunkMiddleware<
      {
        auth: AuthState;
      },
      AnyAction,
      undefined
    >
  ]
>;

export const injectStore = (
  _store: EnhancedStore<
    {
      auth: AuthState;
    },
    AnyAction,
    [
      ThunkMiddleware<
        {
          auth: AuthState;
        },
        AnyAction,
        undefined
      >
    ]
  >
) => {
  store = _store;
};


// Interceptor to attach authkey to request headers
apiClient.interceptors.request.use(
  (config: any) => {
    const userToken = store.getState().auth.token;
    console.log("user token", userToken);
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);


dashboardApiClient.interceptors.request.use(
  (config: any) => {
    const userToken = store.getState().auth.token;
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);


allTaggedLivestockApiClient.interceptors.request.use(
  (config: any) => {
    const userToken = store.getState().auth.token;
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);


allTaggedLivestockByStateApiClient.interceptors.request.use(
  (config: any) => {
    const userToken = store.getState().auth.token;
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default apiClient; */
