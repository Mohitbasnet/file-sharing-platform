import { deleteCookie } from "cookies-next";

export function logoutClick() {
  deleteCookie("access");
  deleteCookie("refresh");
  localStorage.removeItem("access");
  localStorage.removeItem("user_id");
  window.location.href = "/login";
}
