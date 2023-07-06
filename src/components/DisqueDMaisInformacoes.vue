<template>
  <div>
    <div class="text-h5 q-pb-md">Mais informações sobre o fato</div>
    <div class="q-mb-sm" style="width: 100%">
      <label-data label="Data da denúncia:" :texto="dataCaso" />
    </div>

    <div
      v-if="dados.casos[0].data_arquivamento"
      class="q-mb-sm"
      style="width: 100%"
    >
      <label-data label="Data do arquivamento:" :texto="dataArq" />
    </div>

    <div class="q-mb-sm" style="width: 100%">
      <label-data
        label="Telefone:"
        :texto="mascaraTelefone(dados.denuncia_disque_denuncia[0].telefone)"
      />
    </div>

    <div class="q-mb-sm" style="width: 100%">
      <label-data label="Usuário abertura:" :texto="dados.casos[0].nome" />
    </div>
    <div class="q-mb-sm" style="width: 100%">
      <label-data
        label="Nível de Sigilo:"
        :texto="dados.casos[0].nivel_sigilo"
      />
    </div>
  </div>
</template>

<script>
import { mascaraTelefone, formatarDataExtenso } from "src/utils/util";
import LabelData from "./LabelData.vue";
export default {
  name: "DisqueDMaisInformacoes",
  components: { LabelData },
  setup() {
    return {
      mascaraTelefone,
      formatarDataExtenso,
    };
  },

  computed: {
    dataCaso() {
      var timestamp = Date.parse(this.dados.casos[0].data_caso);
      return formatarDataExtenso(timestamp);
    },
    dataArq() {
      var timestamp = Date.parse(this.dados.casos[0].data_arquivamento);
      return formatarDataExtenso(timestamp);
    },
  },
  mounted() {},
  props: {
    dados: {
      type: Object,
      required: true,
    },
  },
  methods: {},
};
</script>
<style></style>
