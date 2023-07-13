<template>
  <div class="text-h5">Local Eletrônico</div>
  <q-separator class="q-my-sm" color="primary" />
  <div v-if="dadosCarregados">
    <label-data
      class="q-my-sm"
      label="LOCAL:"
      :texto="dados.tipo"
      cor="grey-8"
    />
    <label-data class="q-my-sm" label="REFERÊNCIA:" :texto="dados.referencia" />
    <label-data
      v-if="dados.tipo == 'Outros'"
      label="DESCRIÇÃO OUTROS:"
      :texto="dados.descricao_outros"
    />
  </div>
</template>

<script>
import { useStore } from "src/stores/store";
import { ref } from "vue";
import LabelData from "./LabelData.vue";
export default {
  components: { LabelData },
  name: "CasoLocalEletronico",
  created() {
    if (this.dados) {
      this.dadosCarregados = true;
      console.log(this.dados);
    }
  },
  setup() {
    const store = useStore();
    return {
      store,
      dadosCarregados: ref(false),
    };
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

<style lang="scss" scoped></style>
