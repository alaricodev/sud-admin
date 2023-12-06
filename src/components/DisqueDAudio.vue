<template>
  <q-dialog persistent v-model="telaEditarRelato" style="width: 600px">
    <q-card>
      <q-card-section>
        <q-item>
          <q-item-section top avatar>
            <q-avatar>
              <img :src="store.retornaFoto(store.login.foto_usuario)" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label
              ><b>{{ store.login.nome_usuario }}</b></q-item-label
            >
            <q-item-label
              >Alteração da transcrição original:
              <b> {{ dataAtual }} </b>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-separator color="primary" />
      <q-card-section>
        <div class="q-pa-md" style="width: 500px; height: 450px">
          <textarea
            id="story"
            v-model="relato"
            name="story"
            rows="20"
            cols="62"
            class="q-pa-sm"
          >
          </textarea>
        </div>
      </q-card-section>
      <q-separator color="primary" />
      <q-card-actions align="right">
        <q-btn flat label="Atualizar" @click="atualizaRelato()" />
        <q-btn flat label="Cancelar" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <div class="q-pa-md">
    <div class="text-h5">Relato da Denúncia</div>
  </div>
  <q-separator color="primary" />
  <div v-if="dados" class="flex flex-center">
    <div class="q-pa-md" style="max-width: 90%">
      <!-- <div v-html="dados.casos[0].relato" /> -->
      <pre class="pre-container">
        {{ relatoView }}
      </pre>
      <q-btn flat icon="edit" label="editar" @click="telaEditarRelato = true" />
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
import { formatarDataExtenso } from "src/utils/util";
export default {
  name: "DisqueDAudio",
  created() {
    this.recebeAudio();
    this.relatoView = this.dados.casos[0].relato;
  },
  computed: {
    dataAtual() {
      var dataAtual = new Date();
      var timestamp = dataAtual.getTime();
      return formatarDataExtenso(timestamp);
    },
  },
  data() {
    return {
      audioCarregado: false,
      telaEditarRelato: false,
      relato: null,
      relatoView: null,
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

  watch: {
    telaEditarRelato() {
      if (this.telaEditarRelato) {
        this.relato = this.dados.casos[0].relato;
      }
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

    async atualizaRelato() {
      const params = {
        codigo_sys_func: "20042",
        cpf_log: this.store.login.cpf_log,
        id_caso: this.dados.casos[0].id,
        relato: this.relato,
        relato_antigo: this.dados.casos[0].relato,
      };

      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params);
      this.store.telaCarregamento(false);

      if (resposta.data.status_ret == 0) {
        // Recarregar os dados
        this.telaEditarRelato = false;
        this.relatoView = this.relato;
        this.store.alerta(resposta.data.retorno);
      } else {
        console.error(resposta);
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
