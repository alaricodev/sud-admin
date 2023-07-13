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
    <div style="width: 100%">
      <iframe
        :src="getGoogleMapsUrl(dados.escola)"
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
import LabelData from "./LabelData.vue";
export default {
  name: "CasoEscola",
  created() {},
  data() {
    return {};
  },
  components: { LabelData },
  props: {
    dados: {
      type: Object,
      required: true,
    },
  },

  methods: {
    getGoogleMapsUrl(schoolName) {
      // Codifica o nome da escola para uso no URL
      var encodedSchoolName = encodeURIComponent(schoolName);

      // Constrói a URL do Google Maps
      var url = "https://www.google.com/maps/search/" + encodedSchoolName;

      return url;
    },
  },
};
</script>

<style lang="scss" scoped></style>
