<template>
  <div class="q-pa-md row items-center">
    <!-- Menu lateral -->
    <menu-acao :caso="dados.casos[0]" />

    <!-- Exibição do protocolo -->
    <q-chip class="q-ma-sm">
      <q-avatar
        :icon="store.iconeCaso(dados.casos[0].tipo)"
        :color="store.corCaso(dados.casos[0].tipo)"
        text-color="white"
      />
      <div class="q-pa-md text-h5">{{ dados.casos[0].protocolo }}</div>
    </q-chip>

    <!-- Exibição do nível de sigilo -->
    <div class="flex flex-center">
      <div
        :class="`bg-${store.corAcesso(dados.casos[0].nivel_sigilo)}`"
        style="border-radius: 50%; width: 35px; height: 35px"
        class="flex flex-center"
      >
        <div class="text-h6 text-white">
          {{ dados.casos[0].nivel_sigilo }}
        </div>
      </div>
      <q-tooltip :delay="500" class="bg-primary text-body2" :offset="[10, 10]">
        Nível do Sigilo da Informação
      </q-tooltip>
    </div>

    <!-- Exibição da qualidade da informação -->
    <div class="q-ml-md flex flex-center">
      <div v-for="n in 5" :key="n">
        <q-icon
          :name="qualidadeInfo >= n ? 'fa-solid fa-star' : 'fa-regular fa-star'"
          color="amber"
          size="sm"
          class="q-mr-sm"
        />
      </div>
      <q-tooltip :delay="500" class="bg-primary text-body2" :offset="[10, 10]">
        Qualidade da informação:
        <div v-if="qualidadeInfo > 0">{{ qualidadeInfo }}/5</div>
        <div v-else>Não avaliada</div>
      </q-tooltip>
    </div>
    <label-carimbo
      v-if="dados.casos[0].data_arquivamento"
      msg="arquivado"
      :tipo="1"
    />
    <q-space />
    <q-btn
      color="primary"
      class="q-pr-lg"
      label="Voltar"
      icon="arrow_back"
      @click="voltar()"
    />
  </div>
</template>

<script>
import { useStore } from "src/stores/store";
import MenuAcao from "./MenuAcao.vue";
import LabelCarimbo from "./LabelCarimbo.vue";
export default {
  name: "HeaderCaso",
  components: { MenuAcao, LabelCarimbo },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
  computed: {
    qualidadeInfo() {
      if (this.dados.casos[0].qualidade_info) {
        return parseInt(this.dados.casos[0].qualidade_info);
      } else {
        return 0;
      }
    },
  },
  props: {
    dados: {
      type: Object,
      required: true,
    },
  },
  methods: {
    voltar() {
      this.$router.push("/");
    },
  },
};
</script>
