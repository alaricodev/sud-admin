import { api } from "boot/axios";

export async function consultaDB(params) {
  const resposta = await api.post("/consulta", params);
  return resposta.data;
}
