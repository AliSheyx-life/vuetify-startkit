import http from "../axios.config";

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
