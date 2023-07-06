<template>
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
        <q-btn color="primary" icon="download" />
        <q-btn
          v-if="
            arquivo.tipo.toUpperCase() == 'AUDIO' ||
            arquivo.tipo.toUpperCase() == 'VÍDEO'
          "
          color="primary"
          icon="fa-solid fa-play"
        />
      </q-card-actions>
    </q-card>
  </div>
  <div v-else class="flex flex-center q-ma-md">
    <q-img src="../../public/ntsh.png" width="300px" height="300px" />
  </div>
</template>

<script>
import { ref } from "vue";
import { format } from "quasar";

export default {
  name: "CasoArquivos",
  created() {
    console.log(this.arquivos);
  },
  setup() {
    const { humanStorageSize } = format;
    return {
      humanStorageSize,
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
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
  max-height: 380px
</style>
