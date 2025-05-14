import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "@/util/apiMethods";

export const GetAllCategories = async () => {
  const response = await GetRequest("configuration/category");
  return response;
};

export const GetCategories = async () => {
  const response = await GetRequest("configuration/category/all");
  return response;
};
export const AddCategory = async (body) => {
  const response = await PostRequest("configuration/category/store", body);
  return response;
};

export const GetCategoryById = async (category_id) => {
  const response = await GetRequest(`configuration/category/${category_id}`);
  return response;
};

export const UpdateCategory = async (category_id, body) => {
  const response = await PutRequest(
    `configuration/category/update/${category_id}`,
    body
  );
  return response;
};

export const DeleteCategory = async (category_id) => {
  await DeleteRequest(`configuration/category/${category_id}`);
};
