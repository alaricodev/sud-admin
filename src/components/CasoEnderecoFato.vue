<template>
  <div>
    <div class="text-h5">Local dos Fatos</div>
    <div class="q-my-sm">
      <div v-show="cep" class="q-mb-sm" style="width: 100%">
        <label-data label="CEP:" :texto="cep" />
      </div>
      <div v-show="logradouro" class="q-mb-sm" style="width: 100%">
        <label-data label="Logradouro:" :texto="logradouro" />
      </div>
      <div v-show="numero" class="q-mb-sm" style="width: 100%">
        <label-data label="Número:" :texto="numero" />
      </div>
      <div v-show="complemento" class="q-mb-sm" style="width: 100%">
        <label-data label="Complemento:" :texto="complemento" />
      </div>
      <div v-show="bairro" class="q-mb-sm" style="width: 100%">
        <label-data label="Bairro:" :texto="bairro" />
      </div>
      <div v-show="ponto_referencia" class="q-mb-sm" style="width: 100%">
        <label-data label="Ponto de referência:" :texto="ponto_referencia" />
      </div>
      <div v-show="cidade" class="q-mb-sm" style="width: 100%">
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
    this.cep = this.endereco.cep
      ? this.endereco.cep.replace(/^(\d{2})(\d{3})(\d{3})$/, "$1.$2-$3")
      : null;
    this.logradouro = this.endereco.logradouro;
    this.numero = this.endereco.numero;
    this.complemento = this.endereco.complemento;
    this.bairro = this.endereco.bairro;
    this.cidade = this.endereco.cidade;
    this.uf = this.endereco.uf;
    this.ponto_referencia = this.endereco.ponto_referencia;
    this.semEndereco =
      this.cep == null && this.logradouro == null && this.bairro == null;
  },
  setup() {
    return {
      cep: ref(null),
      logradouro: ref(null),
      numero: ref(null),
      complemento: ref(null),
      bairro: ref(null),
      cidade: ref(null),
      uf: ref(null),
      semEndereco: false,
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
      let url = "";
      if (!this.semEndereco) {
        url = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodeURIComponent(
          this.logradouro
        )},${encodeURIComponent(this.numero)}-${this.bairro}-${
          this.cidade
        }&t=&z=14&ie=UTF8&iwloc=B&output=embed`;
      } else {
        url = `https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodeURIComponent(
          this.cidade
        )}-${encodeURIComponent(this.uf)}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;
      }

      return url;
    },
  },

  methods: {},
};
</script>

<style lang="scss" scoped></style>
