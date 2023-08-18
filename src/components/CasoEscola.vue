<template>
  <div>
    <div class="text-h5">Informações sobre a Escola</div>
    <q-separator class="q-my-sm" color="primary" />
    <label-data
      class="q-my-sm"
      label="CIDADE: "
      :texto="dados.cidade"
      cor="grey-8"
    />
    <label-data
      class="q-my-sm"
      label="ESCOLA: "
      :texto="dados.escola"
      cor="grey-8"
    />
    <div style="width: 100%" v-if="mapaCarregado">
      <iframe
        :src="frameMap()"
        width="100%"
        height="600"
        style="border: 0"
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</template>

<script>
import { api } from "src/boot/axios";
import LabelData from "./LabelData.vue";
export default {
  name: "CasoEscola",
  created() {
    this.carregaDadosEscola();
  },
  data() {
    return {
      mapaCarregado: false,
      endereco: null,
    };
  },
  components: { LabelData },
  props: {
    dados: {
      type: Object,
      required: true,
    },
  },

  methods: {
    frameMap() {
      const endereco = encodeURIComponent(this.retiraCEP(this.endereco));
      return `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${endereco}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;
    },

    async carregaDadosEscola() {
      const resposta = await api.get(`/estabelecimento/${this.dados.escola}`);

      this.endereco = resposta.data[0].display_name;
      this.mapaCarregado = true;
    },

    retiraCEP(str) {
      const cepRegex = /\b\d{5}-\d{3}\b/;
      const match = str.match(cepRegex);

      if (match) {
        return match[0];
      } else {
        return null;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
