<template>
  <div>
    <div class="text-h5">Local dos Fatos</div>
    <div class="q-my-sm">
      <div class="q-mb-sm" style="width: 100%">
        <label-data label="CEP:" :texto="cep" />
      </div>
      <div class="q-mb-sm" style="width: 100%">
        <label-data label="Logradouro:" :texto="logradouro" />
      </div>
      <div class="q-mb-sm" style="width: 100%">
        <label-data label="Número:" :texto="numero" />
      </div>
      <div class="q-mb-sm" style="width: 100%">
        <label-data label="Complemento:" :texto="complemento" />
      </div>
      <div class="q-mb-sm" style="width: 100%">
        <label-data label="Bairro:" :texto="bairro" />
      </div>
      <div class="q-mb-sm" style="width: 100%">
        <label-data label="Cidade:" :texto="cidade" />
      </div>
    </div>
    <q-separator color="primary" class="q-my-md" />
  </div>
  <div style="width: 100%">
    <iframe
      :src="frameMap"
      width="100%"
      height="600"
      style="border: 0"
      allowfullscreen=""
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
    <!-- <iframe
      width="100%"
      height="600"
      frameborder="0"
      scrolling="no"
      marginheight="0"
      marginwidth="0"
      :src="frameMap"
    /> -->
  </div>
</template>

<script>
import { ref } from "vue";
import LabelData from "./LabelData.vue";
export default {
  components: { LabelData },
  name: "SudInfoLocalFatos",
  created() {},
  data() {
    return {
      cep: ref("88.095-700"),
      logradouro: ref("Avenida Atlântica, 623"),
      numero: ref("623"),
      complemento: ref(""),
      bairro: ref("Jardim Atlântico"),
      cidade: ref("Florianópolis"),
    };
  },
  computed: {
    frameMap() {
      return `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodeURIComponent(
        this.logradouro
      )},${encodeURIComponent(this.numero)}-${this.bairro}-${
        this.cidade
      }&t=&z=14&ie=UTF8&iwloc=B&output=embed`;
    },
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
