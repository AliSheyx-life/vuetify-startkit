import { getAccessToken } from "../utils/localStorage";
import http from "../axios.config";

export async function refreshToken() {
  await http.post("auth/refresh", { token: getAccessToken() });
}

export async function fetchUserInfo() {
  const res = await http.post("auth/me");
  return res?.data
}
