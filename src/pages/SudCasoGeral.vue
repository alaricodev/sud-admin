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
            :icon="retornaIconeTopo(dados.caso[0].tipo)"
            :color="retornaCorTopo(dados.caso[0].tipo)"
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
              <q-tab
                name="1"
                label="Texto Denúncia"
                icon="description"
                v-if="!dados.denuncia_disque_denuncia"
              />

              <q-tab
                name="2"
                label="Perguntas"
                icon="help"
                v-if="dados.denuncia_geral"
              />
              <q-tab
                name="3"
                label="Local dos Fatos"
                icon="map"
                v-if="dados.enderecos"
              />
              <q-tab
                name="31"
                label="Local Eletrônico"
                icon="memory"
                v-if="dados.locais_eletronicos"
              />
              <q-tab
                name="4"
                label="Denunciante"
                icon="person"
                v-if="dados.denunciantes"
              />
              <q-tab
                name="5"
                label="Envolvidos"
                icon="group"
                v-if="dados.envolvidos"
              />
              <q-tab
                name="51"
                label="Veículos"
                icon="fa-solid fa-car"
                v-if="dados.veiculos"
              />
              <q-tab
                name="6"
                label="Arquivos"
                icon="cloud_download"
                v-if="dados.arquivos"
              />

              <q-tab name="8" label="Acompanhamento" icon="edit_note" />
              <q-tab
                name="81"
                label="Tramitações"
                icon="fa-solid fa-signs-post"
              />

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

              <q-tab-panel name="3" v-if="dados.enderecos">
                <caso-endereco-fato :endereco="dados.enderecos[0]" />
              </q-tab-panel>

              <q-tab-panel name="31">
                <caso-local-eletronico :dados="dados.locais_eletronicos[0]" />
              </q-tab-panel>

              <q-tab-panel name="4">
                <caso-denunciante :denunciante="dados.denunciantes[0]" />
              </q-tab-panel>

              <q-tab-panel name="5">
                <caso-envolvidos :dados="dados.envolvidos" />
              </q-tab-panel>

              <q-tab-panel name="51">
                <caso-veiculos :dados="dados.veiculos" />
              </q-tab-panel>

              <q-tab-panel name="6">
                <caso-arquivos :arquivos="dados.arquivos" />
              </q-tab-panel>

              <q-tab-panel name="8">
                <sud-info-acompanhamento :id="dados.casos[0].id" />
              </q-tab-panel>

              <q-tab-panel name="81">
                <caso-tramitacoes :idCaso="dados.casos[0].id" />
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
import CasoDenunciante from "src/components/CasoDenunciante.vue";
import SudInfoAcompanhamento from "src/components/SudInfoAcompanhamento.vue";
import MenuAcao from "src/components/MenuAcao.vue";
import CasoArquivos from "src/components/CasoArquivos.vue";
import CasoEnderecoFato from "src/components/CasoEnderecoFato.vue";
import CasoLocalEletronico from "src/components/CasoLocalEletronico.vue";
import CasoVeiculos from "src/components/CasoVeiculos.vue";
import CasoEnvolvidos from "src/components/CasoEnvolvidos.vue";
import CasoTramitacoes from "src/components/CasoTramitacoes.vue";
export default {
  components: {
    MenuAcao,
    SudInfoTextoDenuncia,
    SudInfoPerguntas,
    SudInfoMaisInformacoes,
    CasoDenunciante,
    SudInfoAcompanhamento,
    CasoArquivos,
    CasoEnderecoFato,
    CasoLocalEletronico,
    CasoVeiculos,
    CasoEnvolvidos,
    CasoTramitacoes,
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

      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params);
      this.store.telaCarregamento(false);

      this.dados = resposta.data;

      if (this.dados.status_ret == 1) {
        this.store.alerta(this.dados.retorno);
      } else {
        this.dadosCarregados = true;
      }
    },
    retornaIconeTopo(tipo) {
      switch (tipo) {
        case "SUD":
          return "fa-solid fa-desktop";
        case "WHATSAPP":
          return "fa-brand fa-whatsapp";
        case "SOS_ESCOLA":
          return "fa-solid fa-graduation-cap";
        case "DISQUE_DENUNCIA":
          return "fa-solid fa-phone";
        default:
          return "";
      }
    },
    retornaCorTopo(tipo) {
      switch (tipo) {
        case "SUD":
          return "amber-10";
        case "WHATSAPP":
          return "green";
        case "SOS_ESCOLA":
          return "red";
        case "DISQUE_DENUNCIA":
          return "indigo-10";
        default:
          return "";
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
