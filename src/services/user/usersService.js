import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "@/util/apiMethods";

export const GetAllUsers = async (page, query) => {
  let url = "/users";

  const params = new URLSearchParams();

  if (page) {
    params.append("page", page);
  }

  if (query) {
    params.append("query", query);
  }

  const queryString = params.toString();

  if (queryString) {
    url += `?${queryString}`;
  }

  const response = await GetRequest(url);
  return response;
};

export const AddUser = async (body) => {
  const response = await PostRequest("/users", body);
  return response;
};

export const GetUserById = async (id) => {
  const response = await GetRequest(`/users/${id}`);
  return response;
};

export const UpdateUser = async (id, body) => {
  const response = await PutRequest(`/users/${id}/`, body);
  return response;
};

export const DeleteUser = async (id) => {
  await DeleteRequest(`/users/${id}`);
};

export const getAuthUser = async () => {
  const response = await GetRequest("/user");
  return response;
};

export const updateAuthUser = async (body) => {
  const response = await PutRequest("/user", body);
  return response;
};
