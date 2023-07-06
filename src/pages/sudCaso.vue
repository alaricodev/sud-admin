<template>
  <q-page v-if="dadosCarregados" class="bg-grey-4">
    <div
      class="bg-white q-ma-md"
      style="border-radius: 5px; box-shadow: 1px; width: 98%"
    >
      <div class="q-pa-md row">
        <menu-acao :idCaso="dados.casos[0].id" />
        <q-chip class="q-ma-sm">
          <q-avatar
            icon="fa-solid fa-cloud"
            color="amber-10"
            text-color="white"
          />
          <div class="q-pa-md text-h5">{{ dados.casos[0].protocolo }}</div>
        </q-chip>
        <div class="q-pa-sm">
          <q-icon
            :name="retornaIconeCor(dados.casos[0].nivel_sigilo, true)"
            :color="retornaIconeCor(dados.casos[0].nivel_sigilo, false)"
            size="md"
          >
            <q-tooltip
              >Nível de sígilo: {{ dados.casos[0].nivel_sigilo }}</q-tooltip
            >
          </q-icon>
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
              <q-tab name="2" label="Perguntas" icon="help" />
              <q-tab name="3" label="Local dos Fatos" icon="map" />
              <q-tab name="4" label="Denunciante" icon="person" />
              <q-tab name="5" label="Envolvidos" icon="group" />
              <q-tab name="6" label="Arquivos" icon="cloud_download" />

              <q-tab name="8" label="Acompanhamento" icon="edit_note" />
              <q-tab name="9" label="Mais informações" icon="info" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tabInfo" animated>
              <q-tab-panel name="1">
                <sud-info-texto-denuncia :texto="dados.casos[0].relato" />
              </q-tab-panel>

              <q-tab-panel name="2">
                <sud-info-perguntas :perguntas="dados.denuncia_geral[0]" />
              </q-tab-panel>

              <q-tab-panel name="3">
                <sud-info-local-fatos :endereco="dados.enderecos[0]" />
              </q-tab-panel>

              <q-tab-panel name="4">
                <sud-info-denunciante />
              </q-tab-panel>

              <q-tab-panel name="5">
                <sud-info-envolvidos />
              </q-tab-panel>

              <q-tab-panel name="6">
                <caso-arquivos :arquivos="dados.arquivos" />
              </q-tab-panel>

              <q-tab-panel name="8">
                <sud-info-acompanhamento :id="dados.casos[0].id" />
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
import { useStore } from "src/stores/store";
import { api } from "src/boot/axios";
import SudInfoTextoDenuncia from "src/components/SudInfoTextoDenuncia.vue";
import SudInfoPerguntas from "src/components/SudInfoPerguntas.vue";
import SudInfoMaisInformacoes from "src/components/SudInfoMaisInformacoes.vue";
import SudInfoLocalFatos from "src/components/SudInfoLocalFatos.vue";
import SudInfoDenunciante from "src/components/SudInfoDenunciante.vue";
import SudInfoEnvolvidos from "src/components/SudInfoEnvolvidos.vue";
import SudInfoAcompanhamento from "src/components/SudInfoAcompanhamento.vue";
import MenuAcao from "src/components/MenuAcao.vue";
import CasoArquivos from "src/components/CasoArquivos.vue";
export default {
  components: {
    MenuAcao,
    SudInfoTextoDenuncia,
    SudInfoPerguntas,
    SudInfoMaisInformacoes,
    SudInfoLocalFatos,
    SudInfoDenunciante,
    SudInfoEnvolvidos,
    SudInfoAcompanhamento,
    CasoArquivos,
  },
  name: "sudMaisInfo",
  created() {
    this.carregarCaso(this.$route.params.id);
  },
  setup() {
    const store = useStore();
    return {
      store,
      registro: ref(null),
      qualidade_info: ref(0),
      tabInfo: ref("1"),
      idCaso: ref(null),
      dadosCarregados: ref(false),
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
      console.log(params);
      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params);
      this.store.telaCarregamento(false);

      this.dados = resposta.data;

      if (this.dados.status_ret == 1) {
        this.store.alerta(this.dados.retorno);
      } else {
        this.dadosCarregados = true;
        console.log(this.dados);
      }
    },

    retornaIconeCor(sigilo, icone) {
      if (icone) {
        switch (sigilo) {
          case 1:
            return "fa-solid fa-1";
          case 2:
            return "fa-solid fa-2";
          case 3:
            return "fa-solid fa-3";
          case 4:
            return "fa-solid fa-4";
          case 5:
            return "fa-solid fa-5";
          default:
            return "fa-solid fa-0";
        }
      } else {
        switch (sigilo) {
          case 1:
            return "green";
          case 2:
            return "green";
          case 3:
            return "green";
          case 4:
            return "orange";
          case 5:
            return "red";
          default:
            return "grey-8";
        }
      }
    },
  },
};
</script>

<style></style>
