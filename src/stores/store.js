import { defineStore } from "pinia";

export const useStore = defineStore("store", {
  state: () => ({
    filtroAtivo: true,
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
