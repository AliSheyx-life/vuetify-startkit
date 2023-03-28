import http from "../axios.config";

export async function fetchAllUsers() {
    return await http.get("users");
}

export async function createUser(data) {
    return await http.post("users", data);
}