import http from "../axios.config";

export async function createStatus(data) {
  return await http.post("status", data);
}

export async function getStatuses() {
  return await http.get("status");
}

export async function deleteStatus(id) {
  return await http.delete("status/" + id);
}
