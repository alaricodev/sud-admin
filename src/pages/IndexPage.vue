<template>
  <div class="q-pa-md bg-grey-4">
    <div>
      <div>
        <div class="row" style="width: 100%">
          <div class="text-h6 q-ma-md row" style="width: 100%">
            <q-icon
              name="record_voice_over"
              size="md"
              color="primary"
              class="q-mr-md"
            />
            <div class="text-h5">Denúncias</div>
            <q-space />
          </div>
        </div>
        <q-separator color="primary" class="q-mb-md" />
      </div>
      <filtro-index :funcaoRefresh="provoca" />
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
import { defineComponent, ref, watchEffect } from "vue";
import { useQuasar } from "quasar";
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
    const denuncias = ref([]);
    const denunciasFiltrada = ref([]);
    const maxPagina = ref(10);
    const atualPagina = ref(1);
    //const { denuncias } = storeToRefs(store);

    function showNotify(tipo, data_caso) {
      $q.notify({
        position: "top-left",
        timeout: 5500,
        message: `Acabou de cair uma denúncia no sistema ${tipo}`,
        caption: formatarDataExtenso(data_caso),
        color: store.corCaso(tipo),
        icon: store.iconeCaso(tipo),
        progress: true,
      });
    }

    async function carregaDenuncias() {
      store.telaCarregamento(true);

      const params = {
        cpf_log: store.login.cpf_log,
        codigo_sys_func: "10001",
        id_usuario: store.login.id_usuario,
        caso_arquivado: false,
      };

      const resposta = await api.post("/consulta", params);

      // if (resposta.data.status_ret) {
      //   this.store.alerta(resposta.data.retorno);
      // } else {

      // }

      denuncias.value = store.filtroCasos(resposta.data);
      denunciasFiltrada.value = paginacao(denuncias.value, 30, 1);

      store.telaCarregamento(false);
    }

    watchEffect(() => {
      if (store.token) {
        carregaDenuncias();
      }
    });

    return {
      //FUNÇÔES INTERNAS
      showNotify,

      // FUNÇÔES EXTERNAS
      consultaDB,
      // UTILIDADES
      dados,
      store,
      totalPaginasArray,
      carregaDenuncias,
      // ARRAY DE DENÚNCIAS
      denuncias,
      denunciasFiltrada,
      // PAGINAÇÃO
      maxPagina,
      atualPagina,
    };
  },

  watch: {
    denuncias() {
      this.denunciasFiltrada = paginacao(this.denuncias, 30, this.atualPagina);
    },
    atualPagina() {
      this.denunciasFiltrada = paginacao(this.denuncias, 30, this.atualPagina);
    },
  },

  created() {
    // Inicia a função de consulta a cada segundo quando o componente é criado
    // Somente envia notificações caso o sistema esteja em produção
    // e o usuário seja da DIPC
    if (!process.env.DEV && this.store.login.dipc) {
      this.iniciarConsultaPeriodica();
    }
  },

  methods: {
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
    },
    iniciarConsultaPeriodica() {
      // Use o setInterval para executar a função de consulta a cada segundo
      setInterval(this.buscarDenuncias, 30000);
    },
    provoca() {
      this.carregaDenuncias();
    },
  },
});
</script>
