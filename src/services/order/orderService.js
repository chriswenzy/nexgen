import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "@/util/apiMethods";

export const GetAllOrders = async (page, query) => {
  let url = "/orders";

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

export const GetAllPublicOrders = async (page, query) => {
  let url = "/orders";

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

export const AddOrder = async (body) => {
  const response = await PostRequest("/orders", body);
  return response;
};

export const GetOrderById = async (order_id) => {
  const response = await GetRequest(`/orders/${order_id}`);
  return response;
};

export const UpdateOrder = async (order_id, body) => {
  const response = await PutRequest(`/orders/${order_id}`, body);
  return response;
};

export const DeleteOrder = async (order_id) => {
  await DeleteRequest(`/orders/${order_id}`);
};
