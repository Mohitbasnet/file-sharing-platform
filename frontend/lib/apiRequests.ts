import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

const ENDPOINTS = {
  token: API_URL + "user/token/",
  user: API_URL + "user/",
  file: API_URL + "api/file/",
  favourite: API_URL + "api/favourite/",
  invitation: API_URL + "api/invitation/",
  member: API_URL + "api/member/",
  organization: API_URL + "api/organization/",
};

const getAccessToken = (): string | null => localStorage.getItem("access");

const createHeaders = () => {
  const token = getAccessToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const apiLogin = (data: any) => axios.post(ENDPOINTS.token, data);

export const apiRegister = (data: any) => axios.post(ENDPOINTS.user, data);

export const apiGetUser = () =>
  axios.get(`${ENDPOINTS.user}?own=true`, createHeaders());

export const apiAddFile = async (data: any) => {
  try {
    const formData = new FormData();
    formData.append("user_id", data.user_id);
    formData.append("file", data.file);
    formData.append("file_name", data.file_name);
    if (data.is_private) formData.append("is_private", data.is_private);
    if (data.organization_id)
      formData.append("organization_id", data.organization_id);

    const response = await axios.post(
      ENDPOINTS.file,
      formData,
      createHeaders()
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiGetFiles = () =>
  axios.get(`${ENDPOINTS.file}?own=yes`, createHeaders());

export const apiTrashedFile = () =>
  axios.get(`${ENDPOINTS.file}?is_trashed=yes`, createHeaders());

export const apiUpdateFile = (data: any) =>
  axios.patch(`${ENDPOINTS.file}${data.id}/`, data, createHeaders());

export const apiDeleteFile = (id: string) =>
  axios.delete(`${ENDPOINTS.file}${id}/`, createHeaders());

export const apiGetFavorites = () =>
  axios.get(`${ENDPOINTS.favourite}?own=yes`, createHeaders());

export const apiAddFavorite = (data: any) =>
  axios.post(ENDPOINTS.favourite, data, createHeaders());

export const apiRemoveFavorite = (id: string) =>
  axios.delete(`${ENDPOINTS.favourite}${id}/`, createHeaders());

export const apiGetOrganizations = () =>
  axios.get(`${ENDPOINTS.organization}?member=yes`, createHeaders());

export const apiGetOrganization = (slug: string) =>
  axios.get(`${ENDPOINTS.organization}${slug}/`, createHeaders());

export const getFilesOfOrganization = (org_id: string) =>
  axios.get(`${ENDPOINTS.file}?org_id=${org_id}`, createHeaders());
