import { defineStore } from "pinia";
import { Dialog, Loading } from "quasar";
import { api } from "src/boot/axios";

export const useStore = defineStore("store", {
  state: () => ({
    filtroAtivo: true,
    novasDenuncias: 0,
    userData: null,
    token: null,
    tokenWizard: null,
    login: {
      logado: false,
      cpf_log: null,
      id_usuario: null,
      nome_usuario: null,
      foto_usuario: null,
      dipc: null,
      nint: null,
      token: null,
      nivel: null,
    },
    denuncias: [],
    layout: {
      miniState: false,
    },
    filtros: {
      exibirEncaminhados: true,
      encaminhados: true,
      tipo: "TODOS",
    },
  }),
  getters: {
    //filtroAtivo: (state) => state.filtroAtivo,
  },
  actions: {
    filtroCasos(array) {
      if (!array) {
        return array;
      }

      // Primeiro Filtro: Exibir as informações compartilhadas
      if (!this.login.dipc) {
        this.filtros.encaminhados = false;
      }

      if (this.filtros.encaminhados) {
        array = array.filter((item) => {
          return item.encaminhado_nint !== true;
        });
      }

      // Segundo Filtro: Tipo do
      if (this.filtros.tipo !== "TODOS") {
        array = array.filter((item) => {
          return item.tipo === this.filtros.tipo;
        });
      }
      return array;
    },
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
          return "orange";
        case 3:
          return "red";
        default:
          return "grey-8";
      }
    },
    iconeCaso(tipo) {
      switch (tipo) {
        case "SUD":
          return "fa-solid fa-desktop";
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
    displayCaso(tipo) {
      switch (tipo) {
        case "SUD":
          return "Denúncia Online";
        case "WHATSAPP":
          return "Whatsapp";
        case "DISQUE_DENUNCIA":
          return "Disque Denúncia";
        case "SOS_ESCOLA":
          return "SOS Escola";
        default:
          return "<sem nome>";
      }
    },
    retornaFoto(foto) {
      return `https://getin.pc.sc.gov.br/get_files_imgUser/${foto}`;
    },
  },
});
