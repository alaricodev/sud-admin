<template>
  <div class="q-pa-md bg-grey-4">
    <div>
      <filtro-index />
    </div>
    <div>
      <card-show
        v-for="dado in denunciasFiltrada"
        :key="dado.id"
        :dados="dado"
      />
    </div>

    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="atualPagina"
        :max="totalPaginasArray(this.denuncias, 30)"
        :max-pages="10"
        boundary-numbers
      />
    </div>
  </div>
</template>

<script>
import CardShow from "src/components/cardShow.vue";
import FiltroIndex from "src/components/FiltroIndex.vue";
import dados from "../assets/dados.json";
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import som from "../assets/notify.mp3";
import { api } from "boot/axios";
import { useStore } from "../stores/store.js";

import { consultaDB } from "../utils/db.js";
import {
  formatarDataExtenso,
  paginacao,
  totalPaginasArray,
} from "src/utils/util";

export default defineComponent({
  components: { FiltroIndex, CardShow },
  name: "IndexPage",
  setup() {
    const $q = useQuasar();
    const store = useStore();
    //const { denuncias } = storeToRefs(store);

    function showNotify(tipo, data_caso) {
      $q.notify({
        position: "top-left",
        timeout: 5500,
        message: `Acabou de cair uma denúncia no sistema ${tipo}`,
        caption: formatarDataExtenso(data_caso),
        color: this.store.corCaso(tipo),
        icon: this.store.iconeCaso(tipo),
        progress: true,
      });
    }

    return {
      //FUNÇÔES INTERNAS
      showNotify,

      // FUNÇÔES EXTERNAS
      consultaDB,
      // UTILIDADES
      dados,
      store,
      totalPaginasArray,

      // ARRAY DE DENÚNCIAS
      denuncias: ref([]),
      denunciasFiltrada: ref([]),
      // PAGINAÇÃO
      maxPagina: ref(10),
      atualPagina: ref(1),
    };
  },

  watch: {
    denuncias() {
      this.denunciasFiltrada = this.denunciasFiltrada = paginacao(
        this.denuncias,
        30,
        this.atualPagina
      );
    },
    atualPagina() {
      this.denunciasFiltrada = this.denunciasFiltrada = paginacao(
        this.denuncias,
        30,
        this.atualPagina
      );
    },
  },

  created() {
    this.carregaDenuncias();
    // Inicia a função de consulta a cada segundo quando o componente é criado
    this.iniciarConsultaPeriodica();
  },

  methods: {
    async carregaDenuncias() {
      this.store.telaCarregamento(true);

      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10002",
        id_usuario: this.store.login.id_usuario,
      };

      const resposta = await api.post("/consulta", params);
      this.denuncias = resposta.data;
      this.denunciasFiltrada = paginacao(this.denuncias, 30, 1);

      this.store.telaCarregamento(false);
    },

    async buscarDenuncias() {
      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10003",
        id_usuario: this.store.login.id_usuario,
        id_caso: this.denuncias.reduce((maior, objeto) => {
          return objeto.id > maior ? objeto.id : maior;
        }, 0),
      };

      const resposta = await api.post("/consulta", params);
      if (resposta.data) {
        const dados = resposta.data;
        for (let i = 0; i < dados.length; i++) {
          this.showNotify(dados[i].tipo, dados[i].data_caso);
          this.denuncias.unshift(dados[i]);
        }

        this.denunciasFiltrada = paginacao(this.denuncias, 30, 1);
      }
      console.log(resposta.data);
    },
    iniciarConsultaPeriodica() {
      // Use o setInterval para executar a função de consulta a cada segundo
      setInterval(this.buscarDenuncias, 30000);
    },
    reproduzirSom() {
      const audio = new Audio(som);
      audio.play();
    },
  },
});
</script>
