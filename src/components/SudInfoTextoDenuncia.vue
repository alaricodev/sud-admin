<template>
  <div class="text-h5 q-pa-md">Texto da Denúncia</div>
  <q-separator color="primary" />
  <div class="q-pa-md" style="max-width: 90%">
    {{ texto }}
  </div>
  <div class="text-h5 q-pa-md">Palavras mais usadas</div>
  <q-separator color="primary" />
  <div class="q-pa-md" style="max-width: 90%">
    <q-chip
      v-for="palavra in getTopWords(texto, 5)"
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
  beforeMount() {
    this.palavrasChave = this.getTopWords(this.texto, 10);
  },
  setup() {
    return {
      getTopWords,
      palavrasChave: ref(null),
    };
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

<style></style>
