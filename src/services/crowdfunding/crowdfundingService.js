import {
  DeleteRequest,
  GetRequest,
  PostRequest,
  PutRequest,
} from "@/util/apiMethods";

export const GetAllCrowdfunding = async (page, query) => {
  let url = "crowdfunding/crowdfunding";

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

export const GetAllPublicCrowdfunding = async (page, query) => {
  let url = "crowdfunding/crowdfunding/all";

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

export const AddCrowdfunding = async (body) => {
  const response = await PostRequest("crowdfunding/crowdfunding/store", body);
  return response;
};

export const GetCrowdfundingById = async (crowdfunding_id) => {
  const response = await GetRequest(
    `crowdfunding/crowdfunding/one/${crowdfunding_id}`
  );
  return response;
};

export const UpdateCrowdfunding = async (crowdfunding_id, body) => {
  const response = await PutRequest(
    `crowdfunding/crowdfunding/update/${crowdfunding_id}`,
    body
  );
  return response;
};

export const DeleteCrowdfunding = async (crowdfunding_id) => {
  await DeleteRequest(`crowdfunding/crowdfunding/delete/${crowdfunding_id}`);
};
