import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Token ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);
api.defaults.headers.post["Content-Type"] = "application/json";
api.defaults.headers.put["Content-Type"] = "application/json";
api.defaults.headers.patch["Content-Type"] = "application/json";
api.defaults.headers.patch["Content-Type"] = "application/multipart-form-data";

export const GetRequest = async (url) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    toast.warn("Unauthorized");
    if (error?.response?.status === 401) {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("auth-user");
        sessionStorage.removeItem("loading");
        window.location.href = "/";
      }
    }
    throw error;
  }
};

export const PostRequest = async (url, data) => {
  try {
    const response = await api.post(url, data);

    return response.data;
  } catch (error) {
    console.error("Error:", error);
    toast.warn("Unauthorized");
    // if (error?.response?.status === 401) {
    //   if (typeof window !== "undefined") {
    //     sessionStorage.removeItem("token");
    //     sessionStorage.removeItem("auth-user");
    //     sessionStorage.removeItem("loading");
    //     window.location.href = "/";
    //   }
    // }
    throw error;
  }
};

export const PutRequest = async (url, data) => {
  try {
    const response = await api.put(url, data);
    console.log("response from util", response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    toast.warn("Unauthorized");
    // if (error?.response?.status === 401) {
    //   if (typeof window !== "undefined") {
    //     sessionStorage.removeItem("token");
    //     sessionStorage.removeItem("auth-user");
    //     sessionStorage.removeItem("loading");
    //     window.location.href = "/";
    //   }
    // }
    throw error;
  }
};

export const PatchRequest = async (url, data) => {
  try {
    const response = await api.patch(url, data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    toast.warn("Unauthorized");
    // if (error?.response?.status === 401) {
    //   if (typeof window !== "undefined") {
    //     sessionStorage.removeItem("token");
    //     sessionStorage.removeItem("auth-user");
    //     sessionStorage.removeItem("loading");
    //     window.location.href = "/";
    //   }
    // }
    throw error;
  }
};

export const DeleteRequest = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    toast.warn("Unauthorized");
    if (error?.response?.status === 401) {
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("auth-user");
        sessionStorage.removeItem("loading");
        window.location.href = "/";
      }
    }
    throw error;
  }
};
