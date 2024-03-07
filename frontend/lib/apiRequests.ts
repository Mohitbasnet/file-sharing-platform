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
