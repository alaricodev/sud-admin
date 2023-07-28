<template>
  <div class="q-pa-md">
    <div class="text-h5">Relato da Denúncia</div>
  </div>
  <q-separator color="primary" />
  <div v-if="dados" class="flex flex-center">
    <div class="q-pa-md" style="max-width: 90%">
      <!-- <div v-html="dados.casos[0].relato" /> -->
      <pre class="pre-container">
        {{ dados.casos[0].relato }}
      </pre>
    </div>
    <div class="q-pa-md" style="width: 100%">
      <div class="text-h5">Palavras mais usadas</div>
    </div>
    <q-separator color="primary" class="q-my-sm" style="width: 100%" />
    <div class="q-pa-md" style="max-width: 90%">
      <q-chip
        v-for="palavra in getTopWords(this.dados.casos[0].relato, 5)"
        :key="palavra"
        outline
        :label="palavra"
        color="grey-8"
        text-color="grey-2"
        icon="tag"
      />
    </div>
  </div>
  <div class="q-pa-md">
    <div class="text-h5">Áudio da Denúncia</div>
  </div>
  <q-separator color="primary" />
  <div class="flex flex-center">
    <div class="row q-ma-xl" style="width: 100%; justify-content: center">
      <audio
        v-show="audioCarregado"
        ref="audioPlayer"
        controls
        class="audio-1"
      ></audio>
    </div>
    <!-- <div class="row q-my-md" style="width: 100%; justify-content: center">
      <q-btn
        color="primary"
        style="width: 40%"
        label="Iniciar Stream de áudio"
        icon="download"
        @click="recebeAudio"
      />
    </div> -->
  </div>
</template>

<script>
import { api } from "boot/axios";
import { ref } from "vue";
import { getTopWords } from "../utils/util";
import { useStore } from "src/stores/store";
export default {
  name: "DisqueDAudio",
  created() {
    this.recebeAudio();
  },
  data() {
    return {
      audioCarregado: false,
    };
  },
  setup() {
    const store = useStore();
    return {
      // PALAVRAS CHAVES
      palavrasChave: ref([]),
      getTopWords,
      store,
    };
  },

  props: {
    dados: {
      type: Object,
      required: true,
    },
  },

  methods: {
    async recebeAudio() {
      // Chama a rota para obter o áudio
      const dados = { nome_original: this.dados.arquivos[0].nome_original };
      const headers = { responseType: "blob" };
      const rota = "/audio181";

      try {
        this.store.telaCarregamento(true);
        const response = await api.post(rota, dados, headers);
        // Converte o blob em uma URL de objeto e define no elemento <audio>
        const audioURL = URL.createObjectURL(new Blob([response.data]));
        this.$refs.audioPlayer.src = audioURL;
        //this.$refs.audioPlayer.play();
        this.store.telaCarregamento(false);
        this.audioCarregado = true;
      } catch (error) {
        this.store.telaCarregamento(false);
        console.error(error);
      }
    },
  },
};
</script>

<style>
audio::-webkit-media-controls-panel {
  background-color: #caa648;
}
.pre-container {
  max-width: 900px;
  overflow-x: auto;
  white-space: pre-wrap;
  background-color: rgb(235, 232, 232);
  padding: 10px;
  border-radius: 10px;
}
</style>
