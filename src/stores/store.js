import { defineStore } from "pinia";
import { Dialog, Loading } from "quasar";

export const useStore = defineStore("store", {
  state: () => ({
    filtroAtivo: true,
    novasDenuncias: 0,
    login: {
      cpf_log: "27830137897",
      id_usuario: 133,
      nome_usuario: "Alarico Modinez de Castro",
      foto_usuario: "alarico_modinez_de_castro.jpg",
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
    rotaCaso(tipo, id) {
      switch (tipo) {
        case "WHATSAPP":
          return `/whatsappmaisinfo/${id}`;

        case "DISQUE_DENUNCIA":
          return `/disquedenunciamaisinfo/${id}`;

        case "SUD":
          return `/sudmaisinfo/${id}`;

        case "SOS_ESCOLA":
          return `/sosescolapmaisinfo/${id}`;

        default:
          return "/";
      }
    },

    corAcesso(nivel) {
      switch (nivel) {
        case 1:
          return "green";
        case 2:
          return "green";
        case 3:
          return "green";
        case 4:
          return "orange";
        case 5:
          return "red";
        default:
          return "grey-8";
      }
    },
    iconeCaso(tipo) {
      switch (tipo) {
        case "SUD":
          return "fa-solid fa-cloud";
        case "WHATSAPP":
          return "fa-brands fa-whatsapp";
        case "DISQUE_DENUNCIA":
          return "fa-solid fa-phone";
        case "SOS_ESCOLA":
          return "fa-solid fa-graduation-cap";
        default:
          return "fa-solid fa-pencil";
      }
    },
    corCaso(tipo) {
      switch (tipo) {
        case "SUD":
          return "amber-10";
        case "WHATSAPP":
          return "green";
        case "DISQUE_DENUNCIA":
          return "indigo-10";
        case "SOS_ESCOLA":
          return "red";
        default:
          return "black";
      }
    },
  },
});
