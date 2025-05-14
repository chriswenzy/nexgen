import { GetRequest, PostRequest, PutRequest } from "@/util/apiMethods";

export const login = async (body) => {
  const response = await PostRequest("/auth/login", body);
  return response;
};

export const kyc = async (body) => {
  const response = await PutRequest("/auth/kyc", body);
  return response;
};

export const register = async (body) => {
  const response = await PostRequest("/auth/register", body);
  return response;
};

export const forgetPassword = async (body) => {
  const response = await PostRequest("/auth/forget-password", body);
  return response;
};

export const resetPassword = async (body) => {
  const response = await PostRequest("auth/reset-password", body);
  return response;
};

export const verifyOtp = async (body) => {
  const response = await PostRequest("auth/user/otp-verification", body);
  return response;
};

export const logout = async (body) => {
  const response = await PostRequest("auth/logout", body);
  return response;
};
