<template>
  <q-page class="bg-grey-4">
    <div
      class="bg-white q-ma-md"
      style="border-radius: 5px; box-shadow: 1px; width: 98%"
    >
      <div class="q-pa-md row">
        <menu-acao :idCaso="dados.id" />
        <q-chip class="q-ma-sm">
          <q-avatar
            icon="fa-brands fa-whatsapp"
            color="green"
            text-color="white"
          />
          <div v-if="dados" class="q-pa-md text-h5">{{ dados.protocolo }}</div>
        </q-chip>
        <div class="q-pa-sm">
          <q-rating
            v-model="dados.qualidade_info"
            size="2em"
            :max="5"
            color="primary"
          />
        </div>
        <q-space />
        <q-btn
          color="primary"
          label="Voltar"
          icon="arrow_back"
          @click="voltar()"
        />
      </div>
      <div class="row q-pa-md" style="width: 100%">
        <div class="q-gutter-y-md" style="width: 100%">
          <q-card>
            <q-tabs
              v-model="tabInfo"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab name="1" label="Texto Denúncia" icon="description" />
              <q-tab name="6" label="Arquivos" icon="cloud_download" />
              <q-tab name="8" label="Acompanhamento" icon="edit_note" />
              <q-tab name="9" label="Mais informações" icon="info" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tabInfo" animated>
              <q-tab-panel name="1">
                <sud-info-texto-denuncia :texto="dados.relato" />
              </q-tab-panel>

              <q-tab-panel name="6">
                <sud-info-arquivos />
              </q-tab-panel>

              <q-tab-panel name="8">
                <sud-info-acompanhamento :id="dados.id" />
              </q-tab-panel>

              <q-tab-panel name="9">
                <sud-info-mais-informacoes />
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
      </div>

      <!-- <div class="q-pa-md">

      </div> -->
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import SudInfoTextoDenuncia from "src/components/SudInfoTextoDenuncia.vue";
import SudInfoMaisInformacoes from "src/components/SudInfoMaisInformacoes.vue";
import SudInfoArquivos from "src/components/SudInfoArquivos.vue";
import SudInfoAcompanhamento from "src/components/SudInfoAcompanhamento.vue";
import MenuAcao from "src/components/MenuAcao.vue";
export default {
  components: {
    SudInfoTextoDenuncia,
    SudInfoMaisInformacoes,
    SudInfoArquivos,
    SudInfoAcompanhamento,
    MenuAcao,
  },
  name: "WhatsappMaisInfo",
  created() {
    this.carregarCaso(this.$route.params.id);
  },
  setup() {
    return {
      registro: ref(null),
      qualidade_info: ref(0),
      tabInfo: ref("1"),
      idCaso: ref(null),
      dados: ref({
        id: null,
        relato: "",
      }),
    };
  },

  methods: {
    voltar() {
      this.$router.push("/");
    },
    async carregarCaso(idCaso) {
      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10005",
        id_caso: idCaso,
      };
      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params);
      this.store.telaCarregamento(false);
      this.dados = resposta.data[0];
    },
  },
};
</script>

<style></style>
