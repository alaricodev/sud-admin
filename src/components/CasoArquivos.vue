<template>
  <!-- Dialogo Vídeo -->
  <q-dialog
    persistent
    ref="dialogRef"
    @hide="onDialogHide"
    transition-show="slide-up"
    transition-hide="slide-down"
    class="dialog_video"
    v-model="telaMidiaVideo"
  >
    <div class="div_size_video">
      <div class="div_video no-shadow">
        <video width="100" controls>
          <source
            :src="`${url}/downloadmidia/${arquivoSelecionado.nome}`"
            :type="'video/' + arquivoSelecionado.extensao"
          />
        </video>
      </div>
      <q-btn
        class="btn-close"
        color="white"
        icon="close"
        size="md"
        flat
        round
        dense
        v-close-popup
      />
    </div>
  </q-dialog>

  <!-- Dialogo de Áudio -->
  <q-dialog
    persistent
    ref="dialogRef"
    @hide="onDialogHide"
    transition-show="slide-up"
    transition-hide="slide-down"
    class="dialog_audio"
    v-model="telaMidiaAudio"
  >
    <div class="div_size_audio">
      <div class="div_audio no-shadow">
        <audio controls controlsList="nodownload">
          <source
            :src="`${url}/downloadmidia/${arquivoSelecionado.nome}`"
            :type="'audio/' + arquivoSelecionado.extensao"
          />
        </audio>
      </div>
      <q-btn
        class="btn-close"
        color="white"
        icon="close"
        size="md"
        flat
        round
        dense
        v-close-popup
      />
    </div>
  </q-dialog>

  <!-- Dialogo da Imagem -->
  <q-dialog
    persistent
    ref="dialogRef"
    @hide="onDialogHide"
    transition-show="slide-up"
    transition-hide="slide-down"
    class="dialog_image"
    v-model="telaMidiaImagem"
  >
    <div class="div_size_image">
      <div class="div_image no-shadow">
        <img :src="`${url}/downloadmidia/${arquivoSelecionado.nome}`" />
      </div>
      <q-btn
        class="btn-close-img"
        color="white"
        icon="close"
        size="md"
        flat
        round
        dense
        v-close-popup
      />
    </div>
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
      telaMidiaImagem: false,
      telaMidiaVideo: false,
      telaMidiaAudio: false,
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
        case "IMAGEM":
          return "fa-regular fa-file-image";
        default:
          return "fa-regular fa-file";
      }
    },
    mostraArquivo(arquivo) {
      this.arquivoSelecionado = arquivo;

      if (this.arquivoSelecionado.tipo.toUpperCase() == "IMAGEM") {
        this.telaMidiaImagem = true;
      } else if (this.arquivoSelecionado.tipo.toUpperCase() == "AUDIO") {
        this.telaMidiaAudio = true;
      } else if (this.arquivoSelecionado.tipo.toUpperCase() == "VÍDEO") {
        this.telaMidiaVideo = true;
      }
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

<style>
.my-card {
  width: 100%;
  max-width: 250px;
  max-height: 380px;
}
.div_size_image {
  max-width: 100vw !important;
  width: max-content !important;
  height: max-content !important;
  border-radius: 10px !important;
  box-shadow: none !important;
  position: relative;
  padding: 0 40px;
}

.div_size_image .q-btn--dense.q-btn--round {
  width: auto;
  height: auto;
}

.div_image {
  height: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.div_image img {
  width: 770px;
  height: 770px;
  object-fit: contain;
  border-radius: 8px;
  max-height: 100vh;
  max-width: 100vw;
}

.div_size_audio {
  max-width: 100vw !important;
  width: max-content !important;
  height: max-content !important;
  border-radius: 10px !important;
  box-shadow: none !important;
  position: relative;
  padding: 30px;
}

.div_size_audio .q-btn--dense.q-btn--round {
  width: auto;
  height: auto;
}

.div_audio {
  height: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
}

.div_audio audio {
  width: 500px;
}

.div_size_video {
  max-width: 100vw !important;
  width: max-content !important;
  height: max-content !important;
  border-radius: 10px !important;
  box-shadow: none !important;
  position: relative;
  padding: 0 40px;
}

.div_size_video .q-btn--dense.q-btn--round {
  width: auto;
  height: auto;
}

.div_video {
  height: max-content;
  display: flex;
  align-items: center;
  justify-content: center;
}

.div_video video {
  width: 100vh;
  border-radius: 8px;
}
</style>
