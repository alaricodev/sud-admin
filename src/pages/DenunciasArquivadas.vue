<template>
  <div class="q-pa-md bg-grey-4">
    <div>
      <div class="row" style="width: 100%">
        <div class="text-h6 q-ma-md row" style="width: 100%">
          <q-icon
            name="fa-solid fa-box-archive"
            size="md"
            color="primary"
            class="q-mr-md"
          />
          <div class="text-h5">Denúncias Arquivadas</div>
          <div><label-carimbo v-if="false" msg="arquivado" :tipo="1" /></div>
          <q-space />
        </div>
      </div>
      <q-separator color="primary" class="q-mb-md" />
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
import LabelCarimbo from "src/components/LabelCarimbo.vue";
import dados from "../assets/dados.json";
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { api } from "boot/axios";
import { useStore } from "../stores/store.js";

import { consultaDB } from "../utils/db.js";
import { paginacao, totalPaginasArray } from "src/utils/util";

export default defineComponent({
  components: { FiltroIndex, CardShow, LabelCarimbo },
  name: "DenunciasArquivadas",
  setup() {
    const $q = useQuasar();
    const store = useStore();
    //const { denuncias } = storeToRefs(store);

    return {
      //FUNÇÔES INTERNAS

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
    // Somente envia notificações caso o sistema esteja em produção
    // e o usuário seja da DIPC
  },

  methods: {
    async carregaDenuncias() {
      this.store.telaCarregamento(true);

      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10001",
        id_usuario: this.store.login.id_usuario,
        caso_arquivado: true,
      };

      const resposta = await api.post("/consulta", params);
      this.denuncias = resposta.data;
      this.denunciasFiltrada = paginacao(this.denuncias, 30, 1);

      this.store.telaCarregamento(false);
    },
  },
});
</script>
