<template>
  <!-- mostrar midias -->
  <q-dialog v-model="telaMidia" full-width full-height>
    <q-card>
      <q-card-section>
        <div class="text-h6">Full Width</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div v-if="arquivoSelecionado.tipo.toUpperCase() == 'IMAGEM'">
          <q-img
            :src="`${url}/downloadmidia/${arquivoSelecionado.nome}`"
            :ratio="4 / 3"
            class="flex flex-center"
            style="width: 40%; height: 40%"
          />
        </div>
        <div v-if="arquivoSelecionado.tipo.toUpperCase() == 'VÍDEO'">
          <video controls width="640" height="360">
            <source
              :src="`${url}/downloadmidia/${arquivoSelecionado.nome}`"
              type="video/mp4"
            />
            Seu navegador não suporta o elemento de vídeo.
          </video>
        </div>
        <div v-if="arquivoSelecionado.tipo.toUpperCase() == 'AUDIO'">
          <q-audio controls>
            <source
              :src="`${url}/downloadmidia/${arquivoSelecionado.nome}`"
              type="audio/mp3"
            />
          </q-audio>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="OK" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Tela principal -->
  <div v-if="arquivos" class="flex flex-center q-ma-md">
    <q-card
      class="my-card q-ma-md"
      v-for="arquivo in arquivos"
      :key="arquivo.id"
    >
      <q-card-section class="flex flex-center">
        <q-icon :name="retornaIcone(arquivo.tipo)" size="xl" color="primary" />
      </q-card-section>
      <q-card-section>
        <div
          class="text-subtitle1 text-center q-pa-sm"
          style="min-height: 80px"
        >
          {{ arquivo.nome_original }}
        </div>
        <div class="text-subtitle1 text-center text-bold q-pa-sm">
          {{ arquivo.tipo }}
        </div>
        <div class="text-subtitle1 text-center text-grey-8 q-pa-sm">
          Tamanho: {{ humanStorageSize(arquivo.tamanho) }}
        </div>
      </q-card-section>
      <q-separator color="primary" class="q-mb-sm" />
      <q-card-actions align="center">
        <q-btn color="primary" icon="download" @click="downloadFile(arquivo)" />
        <q-btn
          v-if="
            arquivo.tipo.toUpperCase() == 'AUDIO' ||
            arquivo.tipo.toUpperCase() == 'VÍDEO' ||
            arquivo.tipo.toUpperCase() == 'IMAGEM'
          "
          color="primary"
          icon="fa-solid fa-play"
          @click="mostraArquivo(arquivo)"
        />
      </q-card-actions>
    </q-card>
  </div>
  <div v-else class="flex flex-center q-ma-md">
    <q-img src="../../public/ntsh.png" width="300px" height="300px" />
  </div>
</template>

<script>
import { api } from "src/boot/axios";
import { format } from "quasar";

export default {
  name: "CasoArquivos",

  created() {
    console.log(this.arquivos);
    this.url = api.defaults.baseURL;
  },

  setup() {
    const { humanStorageSize } = format;
    return {
      humanStorageSize,
    };
  },

  data() {
    return {
      telaMidia: false,
      arquivoSelecionado: null,
      url: null,
    };
  },

  props: {
    arquivos: {
      type: Object,
      required: true,
    },
  },
  methods: {
    retornaIcone(tipo) {
      switch (tipo.toUpperCase()) {
        case "VÍDEO":
          return "fa-solid fa-video";
        case "DOCUMENTO":
          return "fa-regular fa-file-pdf";
        case "PLANILHA":
          return "fa-solid fa-table";
        case "AUDIO":
          return "headphones";
        default:
          return "fa-regular fa-file";
      }
    },
    mostraArquivo(arquivo) {
      this.arquivoSelecionado = arquivo;
      this.telaMidia = true;
    },
    downloadFile(arquivo) {
      if (arquivo.nome.trim() !== "") {
        const downloadUrl = `/downloadmidia/${encodeURIComponent(
          arquivo.nome
        )}`;
        const params = {
          url: downloadUrl,
          responseType: "blob", // Indica que a resposta é um arquivo binário
        };
        api
          .get(downloadUrl, params)
          .then((response) => {
            // Cria um link temporário para download e o aciona
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", arquivo.nome_original);
            document.body.appendChild(link);
            link.click();
          })
          .catch((error) => {
            console.error("Erro ao fazer o download:", error);
            // Aqui você pode tratar os erros ou exibir uma mensagem de erro para o usuário
          });
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
  max-height: 380px
</style>
