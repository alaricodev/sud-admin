<template>
  <q-card>
    <q-bar>
      <q-icon name="fa-solid fa-user-check" />
      <div class="text-body1">Ajuda do SUD</div>
      <q-space />
      <q-btn flat icon="close" size="sm" v-close-popup></q-btn>
    </q-bar>
    <q-card-section>
      <div>
        <q-input rounded outlined label="Filtro..." v-model="filtro" />
      </div>
    </q-card-section>

    <q-card-section>
      <div class="q-pa-md" style="max-width: 10000px">
        <q-expansion-item
          v-for="topico in topicoFiltrado"
          :key="topico.id"
          class="shadow-1 overflow-hidden q-ma-md"
          style="border-radius: 5px"
          icon="explore"
          :label="topico.titulo"
          :caption="exibeTag(topico.tags)"
          header-class="bg-primary text-grey-9"
          expand-icon-class="text-white"
        >
          <q-card>
            <q-card-section>
              <div v-if="topico.video == ''">
                <div class="text-overline">Sem vídeo disponível</div>
              </div>
              <div v-else>
                <iframe
                  width="560"
                  height="315"
                  :src="`https://www.youtube.com/embed/VIDEO_ID`"
                  frameborder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "SudAjuda",
  created() {},
  data() {
    return {
      topicos: [
        {
          id: 1,
          titulo: "Introdução ao Sistema",
          tags: ["introdução", "sistema", "iniciante"],
          video: "https://www.youtube.com/watch?v=U9w8zx49EcY",
        },
        {
          id: 2,
          titulo: "Como Criar um Novo Caso",
          tags: ["caso", "criação", "tutorial"],
          video: "https://www.youtube.com/watch?v=bXD9eVxoICg",
        },
        {
          id: 3,
          titulo: "Gestão de Usuários e Permissões",
          tags: ["gestão", "usuários", "permissões"],
          video: "https://www.youtube.com/watch?v=abc123",
        },
        {
          id: 4,
          titulo: "Relatórios de Desempenho Mensal",
          tags: ["relatório", "desempenho", "dados"],
          video: "https://www.youtube.com/watch?v=def456",
        },
        {
          id: 5,
          titulo: "Configurações de Conta e Perfil",
          tags: ["configurações", "conta", "perfil", "sistema"],
          video: "https://www.youtube.com/watch?v=ghi789",
        },
        {
          id: 6,
          titulo: "Como tramitar um caso",
          tags: ["tramitar", "tramitação", "franquear", "acesso"],
          video: "",
        },
      ],
      topicoFiltrado: [],
      filtro: null,
    };
  },
  created() {
    this.topicoFiltrado = this.topicos;
  },

  watch: {
    filtro() {
      if (this.filtro) {
        let lowerSearch = this.filtro.toLowerCase();
        let arrayPes = lowerSearch.split(" ");

        this.topicoFiltrado = this.topicos.filter((topico) => {
          return topico.tags.some((tag) => {
            return arrayPes.some((pesquisa) => tag.includes(pesquisa));
          });
        });
      } else {
        // Lidere com o caso em que o filtro está vazio
        this.topicoFiltrado = this.topicos;
      }
    },
  },
  props: {},
  methods: {
    exibeTag(tags) {
      let str = "";
      for (let item of tags) {
        str += `#${item} `;
      }
      return str;
    },
  },
};
</script>

<style lang="scss" scoped></style>
