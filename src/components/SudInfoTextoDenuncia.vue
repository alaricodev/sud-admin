<template>
  <div class="text-h5 q-pa-md">Texto da Denúncia</div>
  <q-separator color="primary" />
  <div class="q-pa-md flex flex-center" style="max-width: 90%">
    <pre class="pre-container">{{ texto }}</pre>
  </div>
  <div class="text-h5 q-pa-md">Palavras mais usadas</div>
  <q-separator color="primary" />
  <div class="q-pa-md" style="max-width: 90%">
    <q-chip
      v-for="palavra in getTopWords(texto, nrPalavras)"
      :key="palavra"
      outline
      :label="palavra"
      color="grey-8"
      text-color="grey-2"
      icon="tag"
    />
  </div>
</template>

<script>
import { getTopWords } from "../utils/util";
import { ref } from "vue";
export default {
  name: "SudInfotextoDenuncia",
  data() {
    return {};
  },
  setup() {
    return {
      getTopWords,
      nrPalavras: ref(10),
    };
  },
  computed: {
    textoFormatado() {
      return this.texto;
    },
  },
  props: {
    texto: {
      type: String,
      required: true,
    },
  },
  methods: {},
};
</script>

<style>
.pre-container {
  max-width: 900px;
  overflow-x: auto;
  white-space: pre-wrap;
  background-color: rgb(235, 232, 232);
  padding: 10px;
  border-radius: 10px;
}
</style>
