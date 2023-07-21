<template>
  <div class="flex flex-center q-ma-md">
    <q-card
      class="my-card q-ma-md"
      v-for="arquivo in arquivos"
      :key="arquivo.nome"
    >
      <q-card-section class="flex flex-center">
        <q-icon :name="arquivo.icone" size="xl" color="primary" />
      </q-card-section>
      <q-card-section>
        <div
          class="text-subtitle1 text-center q-pa-sm"
          style="min-height: 80px"
        >
          {{ arquivo.nome }}
        </div>
        <div class="text-subtitle1 text-center text-bold q-pa-sm">
          {{ arquivo.tipo }}
        </div>
        <div class="text-subtitle1 text-center text-grey-8 q-pa-sm">
          Tamanho: {{ arquivo.tamanho }}
        </div>
      </q-card-section>
      <q-separator color="primary" class="q-mb-sm" />
      <q-card-actions align="center">
        <q-btn color="primary" label="Download" icon="download" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "SudInfoArquivos",
  created() {},
  setup() {
    return {
      arquivos: ref([
        {
          nome: "Planilha de custos.xlsx",
          tipo: "Planilha",
          tamanho: "1.2MB",
          icone: "newspaper",
        },
        {
          nome: "Relatório mensal.pdf",
          tipo: "Documento",
          tamanho: "4.1MB",
          icone: "picture_as_pdf",
        },
        {
          nome: "Câmera de segurança 12-09-22.mp4",
          tipo: "Vídeo",
          tamanho: "44.21MB",
          icone: "videocam",
        },
        {
          nome: "Audio Whatsapp.mp3",
          tipo: "Audio",
          tamanho: "850KB",
          icone: "headphones",
        },
      ]),
    };
  },
  props: {},
  methods: {
    downloadFile(nomeArquivo) {
      if (nomeArquivo.trim() !== "") {
        const downloadUrl = `/downloadmidia/${encodeURIComponent(nomeArquivo)}`;
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
            link.setAttribute("download", nomeArquivo);
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
</style>
