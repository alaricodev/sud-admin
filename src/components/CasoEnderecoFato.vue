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
        <label-data label="Ponto de referência:" :texto="ponto_referencia" />
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
  </div>
</template>

<script>
import LabelData from "./LabelData.vue";
import { ref } from "vue";
export default {
  components: { LabelData },
  name: "CasoEnderecoFato",
  created() {
    this.cep = this.endereco.cep.replace(/^(\d{2})(\d{3})(\d{3})$/, "$1.$2-$3");
    this.logradouro = this.endereco.logradouro;
    this.numero = this.endereco.numero;
    this.complemento = this.endereco.complemento;
    this.bairro = this.endereco.bairro;
    this.cidade = this.endereco.cidade;
    this.ponto_referencia = this.endereco.ponto_referencia;
  },
  setup() {
    return {
      cep: ref(null),
      logradouro: ref(null),
      numero: ref(null),
      complemento: ref(null),
      bairro: ref(null),
      cidade: ref(null),
    };
  },

  props: {
    endereco: {
      type: Object,
      required: true,
    },
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

  methods: {},
};
</script>

<style lang="scss" scoped></style>
