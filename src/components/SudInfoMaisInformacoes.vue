<template>
  <div>
    <div class="text-h5 q-pt-md">Mais informações sobre o fato</div>
    <q-separator color="primary" class="q-mb-md" />
    <div class="q-mb-sm" style="width: 100%">
      <label-data label="Data da denúncia:" texto="15/01/1979" />
    </div>

    <div class="q-mb-sm" style="width: 100%">
      <label-data label="Hora da denúncia:" texto="19:36:01" />
    </div>

    <div class="q-mb-sm" style="width: 100%">
      <label-data
        label="IP / Porta Lógica:"
        texto="fff:187.55.123.56 / 46565"
      />
    </div>

    <div class="q-mb-sm" style="width: 100%">
      <label-data label="Protocolo de envio:" texto="INFO-29209/29983" />
    </div>

    <div class="q-mb-sm" style="width: 100%">
      <label-data label="Qualidade da informação:" texto="4/50" />
    </div>
  </div>
</template>

<script>
import LabelData from "./LabelData.vue";
export default {
  name: "SudInfoMaisInformacoes",
  components: { LabelData },
  setup() {
    return {};
  },
  props: {},
  methods: {},
};
</script>
<style></style>
