import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "@/util/apiMethods";

export const GetAllSavings = async (page, query) => {
  let url = "savings/savings";

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

export const GetAllPublicSavings = async (page, query) => {
  let url = "savings/savings/all";

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

export const AddSaving = async (body) => {
  const response = await PostRequest("savings/savings/store", body);
  return response;
};

export const GetSavingById = async (savings_id) => {
  const response = await GetRequest(`savings/savings/one/${savings_id}`);
  return response;
};

export const UpdateSaving = async (savings_id, body) => {
  const response = await PutRequest(
    `savings/savings/update/${savings_id}`,
    body
  );
  return response;
};

export const DeleteSaving = async (savings_id) => {
  await DeleteRequest(`savings/savings/delete/${savings_id}`);
};
