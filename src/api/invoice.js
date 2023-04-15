import http from "../axios.config";

export async function createInvoice(data) {
  return await http.post("/invoice", data);
}

export async function getInvoices(all = true) {
  if (all) {
    return await http.get("/invoice/all");
  } else {
    return await http.get("/invoice");
  }
}

export async function deleteInvoice(id) {
  return await http.delete("/invoice/" + id);
}

export async function editInvoice(data) {
  console.log("api: ", data.id);
  return await http.put("/invoice/" + data.id, data);
}
