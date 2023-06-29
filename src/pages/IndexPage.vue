<template>
  <div class="bg-grey-4">
    <div>
      <filtro-index />
    </div>
    <div class="q-px-md">
      <card-show
        v-for="dado in denunciasFiltrada"
        :key="dado.id"
        :dados="dado"
      />
    </div>
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="atualPagina"
        :max="maxPagina"
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
import { storeToRefs } from "pinia";

import { consultaDB } from "../utils/db.js";
import { paginacaoJson } from "src/utils/util";

export default defineComponent({
  components: { FiltroIndex, CardShow },
  name: "IndexPage",
  setup() {
    const $q = useQuasar();
    const store = useStore();
    const { denuncias } = storeToRefs(store);

    function showNotify() {
      $q.notify({
        position: "top-left",
        timeout: 3500,
        message: "Acabou de cair uma denúncia no sistema sobre o SOS_ESCOLA",
        caption: "às 10:27:15",
        color: "red",
        avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
        progress: true,
      });
    }

    function telaCarrega(carrega, msg) {
      if (carrega) {
        $q.loading.show({
          message: msg,
        });
      } else {
        $q.loading.hide();
      }
    }

    return {
      //FUNÇÔES INTERNAS
      showNotify,
      telaCarrega,
      // FUNÇÔES EXTERNAS
      consultaDB,
      // UTILIDADES
      dados,
      store,
      // ARRAY DE DENÚNCIAS
      denuncias,
      denunciasFiltrada: ref([]),
      // PAGINAÇÃO
      maxPagina: ref(0),
      atualPagina: ref(1),
    };
  },

  watch: {
    denuncias() {
      this.maxPagina = this.denuncias.reduce((maiorPagina, objeto) => {
        return objeto.pagina > maiorPagina ? objeto.pagina : maiorPagina;
      }, 0);
      this.denunciasFiltrada = this.denuncias.filter(
        (el) => el.pagina === this.atualPagina
      );
    },
    atualPagina() {
      this.denunciasFiltrada = this.denuncias.filter(
        (el) => el.pagina === this.atualPagina
      );
    },
  },

  async created() {
    this.telaCarrega(true, "Buscando denúnicas");

    this.store.denuncias = await consultaDB({
      cpf_log: this.store.login.cpf_log,
      codigo_sys_func: "10002",
      data_caso_inicio: null,
      data_caso_fim: null,
    });

    this.store.denuncias = paginacaoJson(this.store.denuncias, 10);

    this.telaCarrega(false, "");

    // Inicia a função de consulta a cada segundo quando o componente é criado
    //this.iniciarConsultaPeriodica();
  },
  methods: {
    async buscarDenuncias() {
      const resultado = await consultaDB({
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10003",
        id: 1,
      });
      // const resposta = await api.get("/aleatorio");
      // console.log(resposta.data.msg);
      // if (resposta.data.msg > 80) {
      //   this.store.novasDenuncias += 1;
      //   this.showNotify();
      // }
    },
    iniciarConsultaPeriodica() {
      // Use o setInterval para executar a função de consulta a cada segundo
      setInterval(this.buscarDenuncias, 60000);
    },
    reproduzirSom() {
      const audio = new Audio(som);
      audio.play();
    },
  },
});
</script>
