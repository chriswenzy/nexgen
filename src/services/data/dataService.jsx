import { GetRequest } from "@/util/apiMethods";

export const Roles = async () => {
  const response = await GetRequest("/auth/role");
  return response;
};

export const Permission = async () => {
  const response = await GetRequest("/auth/permission");
  return response;
};
