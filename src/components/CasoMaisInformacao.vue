<template>
  <div>
    <div class="text-h5 q-pt-md">Mais informações sobre o fato</div>
    <q-separator color="primary" class="q-mb-md" />
    <div v-for="dado in dados" :key="dado" class="q-mb-sm" style="width: 100%">
      <label-data
        :label="dado.label"
        :texto="dado.valor"
        :cor="dado.cor ? dado.cor : 'grey-10'"
      />
    </div>
  </div>
</template>

<script>
import LabelData from "./LabelData.vue";
export default {
  name: "CasoMaisInformacoes",

  components: { LabelData },
  setup() {
    return {};
  },
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
