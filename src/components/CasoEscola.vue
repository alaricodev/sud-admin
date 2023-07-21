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
      lat: null,
      lon: null,
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
    frameMap(lat, lon) {
      return `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodeURIComponent(
        lat
      )},${encodeURIComponent(lon)}`;
    },

    async carregaDadosEscola() {
      const resposta = await api.get(`/estabelecimento/${this.dados.escola}`);
      console.log(resposta.data);
      this.lat = resposta.data[0].lat;
      this.lon = resposta.data[0].lon;
      this.mapaCarregado = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
