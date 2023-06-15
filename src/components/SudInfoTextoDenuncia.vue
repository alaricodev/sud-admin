<template>
  <div class="text-h5 q-pa-md">Texto da Denúncia</div>
  <div class="q-pa-sm"><q-separator color="primary" /></div>
  <div class="q-pa-md" style="max-width: 90%">
    {{ texto }}
  </div>
  <div class="q-pa-sm"><q-separator color="primary" /></div>
  <div class="text-h6 q-pa-md">Top 10 palavras mais repetidas no texto</div>
  <div class="row">
    <div v-for="palavra in palavrasChave" :key="palavra" class="q-pa-sm">
      <q-chip icon="tag" :label="palavra" />
    </div>
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
