import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "@/util/apiMethods";

export const GetAllInvestments = async (page, query) => {
  let url = "investment/investments";

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

export const GetAllPublicInvestments = async (page, query) => {
  let url = "investment/investments/all";

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

export const AddInvestment = async (body) => {
  const response = await PostRequest("investment/investments/store", body);
  return response;
};

export const GetInvestmentById = async (investments_id) => {
  const response = await GetRequest(
    `investment/investments/public/${investments_id}`
  );
  return response;
};

export const UpdateInvestment = async (investments_id, body) => {
  const response = await PutRequest(
    `investment/investments/update/${investments_id}`,
    body
  );
  return response;
};

export const DeleteInvestment = async (investments_id) => {
  await DeleteRequest(`investment/investments/delete/${investments_id}`);
};
