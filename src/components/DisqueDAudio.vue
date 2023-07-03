<template>
  <div class="q-pa-md">
    <div class="text-h5">Relato da Denúncia</div>
  </div>
  <q-separator color="primary" />
  <div class="flex flex-center">
    <div class="q-pa-md" style="max-width: 90%">
      {{ dados.relato }}
    </div>
  </div>
  <div class="q-pa-md">
    <div class="text-h5">Áudio da Denúncia</div>
  </div>
  <q-separator color="primary" />
  <div class="flex flex-center">
    <div class="row q-ma-xl" style="width: 100%; justify-content: center">
      <audio ref="audioPlayer" controls class="audio-1"></audio>
    </div>
    <div class="row q-my-md" style="width: 100%; justify-content: center">
      <q-btn
        color="primary"
        style="width: 40%"
        label="Iniciar Stream de áudio"
        icon="download"
        @click="recebeAudio"
      />
    </div>
  </div>
</template>

<script>
import { api } from "boot/axios";
export default {
  name: "DisqueDAudio",

  data() {
    return {};
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
      const dados = { nome_original: this.dados.nome_original };
      const headers = { responseType: "blob" };
      const rota = "/audio181";

      try {
        const response = await api.post(rota, dados, headers);
        // Converte o blob em uma URL de objeto e define no elemento <audio>
        const audioURL = URL.createObjectURL(new Blob([response.data]));
        this.$refs.audioPlayer.src = audioURL;
        //this.$refs.audioPlayer.play();
      } catch (error) {
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
</style>
