import axios from "axios";

const API_URL = " http://127.0.0.1:8000/";

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

export const getUserByEmail = (email: string) =>
  axios.get(`${ENDPOINTS.user}?email=${email}`, createHeaders());

export const apiAddFile = async (data: any) => {
  try {
    const formData = new FormData();
    formData.append("user_id", data.user_id);
    formData.append("file", data.file);
    formData.append("file_name", data.file_name);
    if (data.is_private) formData.append("is_private", data.is_private);

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

export const apiAddOrganizationFile = async (data: any) => {
  try {
    const formData = new FormData();
    formData.append("user_id", data.user_id);
    formData.append("file_name", data.file_name);
    formData.append("organization_id", data.org_id);
    formData.append("file", data.file);

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

export const apiDeleteFile = (id: string | undefined) =>
  axios.delete(`${ENDPOINTS.file}${id}/`, createHeaders());

export const apiGetFavorites = () =>
  axios.get(`${ENDPOINTS.favourite}?own=yes`, createHeaders());

export const apiAddFavorite = (data: any) =>
  axios.post(ENDPOINTS.favourite, data, createHeaders());

export const apiRemoveFavorite = (id: string | undefined) =>
  axios.delete(`${ENDPOINTS.favourite}${id}/`, createHeaders());

export const apiGetOrganizations = () =>
  axios.get(`${ENDPOINTS.organization}?member=yes`, createHeaders());

export const apiGetOrganization = (slug: string) =>
  axios.get(`${ENDPOINTS.organization}${slug}/`, createHeaders());

export const apiCreateOrganization = (data: any) =>
  axios.post(ENDPOINTS.organization, data, createHeaders());

export const apiDeleteOrganization = (slug: string) =>
  axios.delete(`${ENDPOINTS.organization}${slug}/`, createHeaders());

export const getFilesOfOrganization = (org_id: string) =>
  axios.get(
    `${ENDPOINTS.file}?org_id=${org_id}&org_trashed=no`,
    createHeaders()
  );

export const getTrashedFilesOfOrganization = (org_id: string) =>
  axios.get(
    `${ENDPOINTS.file}?org_id=${org_id}&org_trashed=yes`,
    createHeaders()
  );

export const getOrganizationMembers = (org_id: string) =>
  axios.get(`${ENDPOINTS.member}?org_id=${org_id}`, createHeaders());

export const apiKickMember = (id: string) =>
  axios.delete(`${ENDPOINTS.member}${id}/`, createHeaders());

export const apiInviteUser = (data: any) =>
  axios.post(ENDPOINTS.invitation, data, createHeaders());

export const apiGetInvitations = () =>
  axios.get(`${ENDPOINTS.invitation}?my_invitations=true`, createHeaders());

export const apiUpdateInvitation = (data: any) =>
  axios.patch(
    `${ENDPOINTS.invitation}${data.id}/`,
    {
      status: data.status,
    },
    createHeaders()
  );

export const apiDeleteInvitation = (id: string) =>
  axios.delete(`${ENDPOINTS.invitation}${id}/`, createHeaders());
