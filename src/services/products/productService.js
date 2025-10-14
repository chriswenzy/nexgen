import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "@/util/apiMethods";

export const GetAllProducts = async (page, query) => {
  let url = "products";

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

export const GetAllPublicProducts = async (page, query) => {
  let url = "product";

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

export const AddProduct = async (body) => {
  const response = await PostRequest("products", body);
  return response;
};

export const GetProductById = async (product_id) => {
  const response = await GetRequest(`product/${product_id}`);
  return response;
};

export const UpdateProduct = async (product_id, body) => {
  const response = await PutRequest(`products/${product_id}`, body);
  return response;
};

export const DeleteProduct = async (product_id) => {
  await DeleteRequest(`products/${product_id}`);
};
