import { defineStore } from "pinia";
import { Dialog, Loading } from "quasar";

export const useStore = defineStore("store", {
  state: () => ({
    filtroAtivo: true,
    novasDenuncias: 0,
    login: {
      cpf_log: "27830137897",
      id_usuario: 133,
      token: "",
    },
    denuncias: [],
  }),
  getters: {
    //filtroAtivo: (state) => state.filtroAtivo,
  },
  actions: {
    alerta(msg) {
      Dialog.create({
        title: "Aviso",
        message: msg,
        html: true,
      });
    },

    telaCarregamento(exibe) {
      exibe
        ? Loading.show({
            message: `
            <div class="column">
              <span>
                <img src="brasao_PCSC.png" alt="Brasão Polícia Civil de Santa Catarina" style="width: 60px; ">
              </span>
              <span class="q-mt-lg">Carregando dados</span>
            </div>
            `,
            html: true,
            spinnerColor: "primary",
            spinnerSize: 150,
            customClass: "dialogBrasaoClass",
          })
        : Loading.hide();
    },
  },
});
