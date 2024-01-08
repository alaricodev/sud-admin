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
                <video width="900" controls class="q-pa-sm">
                  <source :src="topico.video" type="video/mp4" />
                  O seu navegador não suporta esse vídeo. Altere para o Google
                  Chrome.
                </video>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { api } from "src/boot/axios";
import { useStore } from "src/stores/store";
import tutorial from "../../public/tutorial.json";
export default {
  name: "SudAjuda",
  setup() {
    const store = useStore();
    return { store };
  },
  created() {},
  data() {
    return {
      topicos: null,
      topicoFiltrado: [],
      filtro: null,
    };
  },
  created() {
    this.carregaTopicos();
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
      //const vetor = tags.split(" ");
      let str = "";
      for (let item of tags) {
        str += `#${item} `;
      }
      return str;
    },
    async carregaTopicos() {
      // const params = {
      //   cpf_log: this.store.login.cpf_log,
      //   codigo_sys_func: "10039",
      // };

      // this.store.telaCarregamento(true);
      // const resposta = await api.post("/consulta", params);
      // this.store.telaCarregamento(false);

      // this.topicos = resposta.data.map((item) => ({
      //   ...item,
      //   tags: item.tags.split(" "), // Dividir a string de tags em um array de palavras
      // }));

      // this.topicoFiltrado = this.topicos;
      this.topicos = tutorial.map((item) => ({
        ...item,
        tags: item.tags.split(" "),
      }));
      this.topicoFiltrado = this.topicos;
    },
  },
};
</script>

<style lang="scss" scoped></style>
