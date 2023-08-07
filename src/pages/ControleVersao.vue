<template>
  <div class="flex flex-center q-pa-md" style="height: 100vh">
    <div
      class="bg-white"
      style="
        border-radius: 20px;
        border: 1px solid #616161;
        width: 100%;
        height: 100%;
      "
    >
      <div class="row" style="width: 100%">
        <div class="text-h6 q-ma-md row" style="width: 100%">
          <q-icon
            name="fa-solid fa-code-branch"
            size="md"
            color="grey-blue"
            class="q-mr-md"
          />
          <div class="text-h5">
            Controle de Versões do SUD GESTOR - {{ pack.version }}
          </div>
          <q-space />
          <div>
            <q-btn
              color="primary"
              label="Voltar"
              icon="arrow_back"
              @click="voltar()"
            />
          </div>
        </div>
      </div>
      <q-separator color="primary" />
      <div class="q-pa-md full-width">
        <q-scroll-area style="height: 650px; max-width: 100%">
          <q-timeline color="primary" class="q-pa-md">
            <q-timeline-entry
              v-for="versao in version"
              :key="versao"
              :title="versao.versao"
              :subtitle="versao.data"
              icon="fa-solid fa-code-commit"
            >
              <div v-for="texto in versao.alteracao" :key="texto">
                {{ texto }}
              </div>
            </q-timeline-entry>
          </q-timeline>
        </q-scroll-area>
      </div>
    </div>
  </div>
</template>

<script>
import pack from "../../package.json";
import version from "../../public/version.json";
export default {
  name: "ControleVersao",

  setup() {
    return {
      pack,
      version,
    };
  },
  props: {},
  methods: {
    voltar() {
      this.$router.push("/");
    },
    juntarTexto(arrayzao) {
      const tmp = arrayzao.join("\n");
      return tmp;
    },
  },
};
</script>

<style lang="scss" scoped></style>
