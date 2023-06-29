import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({
    filtroAtivo: true,
    novasDenuncias: 0,
    login: {
      cpf_log: "01853733997",
      token: "",
    },
    denuncias: [],
  }),
  getters: {
    filtroAtivo: (state) => state.filtroAtivo,
  },
  actions: {
    mudaFiltro() {
      this.filtroAtivo = !this.filtroAtivo;
    },
  },
});
