import http from "../axios.config";
import { httpForFiles } from "../axios.config";

export async function fetchAllUsers() {
  return await http.get("users");
}

export async function createUser(data) {
  return await http.post("users", data);
}

export async function deleteUser(id) {
  return await http.delete(`users/${id}`);
}

export async function editUser(data) {
  return await http.put(`users/${data._id}`, data);
}

export async function changePassword(data) {
  return await http.patch("users/password", data);
}

export async function changeProfilePhoto(data) {
  return await httpForFiles.patch("users/photo", data);
}
