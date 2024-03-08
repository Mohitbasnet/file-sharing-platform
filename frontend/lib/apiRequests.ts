import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

const ENDPOINTS = {
  token: API_URL + "user/token/",
  user: API_URL + "user/",
  file: API_URL + "api/file/",
  favorite: API_URL + "api/favorite/",
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
    formData.append("is_private", "false");

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
  axios.get(`${ENDPOINTS.file}?own=true`, createHeaders());

export const apiUpdateFile = (data: any) =>
  axios.patch(`${ENDPOINTS.file}${data.id}/`, data, createHeaders());
