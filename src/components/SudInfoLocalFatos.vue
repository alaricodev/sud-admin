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
  mounted() {
    console.log(this.endereco);
    this.cep = this.endereco.cep;
    this.logradouro = this.endereco.logradouro;
    this.numero = this.endereco.numero;
    this.complemento = this.endereco.complemento;
    this.bairro = this.endereco.bairro;
    this.cidade = this.endereco.cidade;
  },
  props: {
    endereco: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      cep: ref(null),
      logradouro: ref(null),
      numero: ref(null),
      complemento: ref(null),
      bairro: ref(null),
      cidade: ref(null),
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
