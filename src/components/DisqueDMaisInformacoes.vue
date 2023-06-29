<template>
  <div>
    <div class="text-h5 q-pb-md">Mais informações sobre o fato</div>
    <div class="q-mb-sm" style="width: 100%">
      <label-data label="Data da denúncia:" :texto="dataCaso" />
    </div>

    <div class="q-mb-sm" style="width: 100%">
      <label-data label="Telefone:" :texto="mascaraTelefone(dados.telefone)" />
    </div>

    <div class="q-mb-sm" style="width: 100%">
      <label-data label="Usuário abertura:" :texto="dados.nome_usuario" />
    </div>
    <div class="q-mb-sm" style="width: 100%">
      <label-data label="Nível de Sigilo:" :texto="dados.nivel_sigilo" />
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
      var timestamp = Date.parse(this.dados.data_caso);
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
