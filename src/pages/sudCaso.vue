<template>
  <div class="q-pa-sm" style="height: 100vh">
    <q-page v-if="dadosCarregados" class="bg-grey-4">
      <div
        class="bg-white q-ma-md"
        style="border-radius: 5px; box-shadow: 1px; width: 98%"
      >
        <header-caso :dados="dados" :funcaoRefresh="carregarCaso" />

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
                <q-tab
                  name="9"
                  label="Mais informações"
                  icon="info"
                  v-if="store.login.dipc"
                />
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
                  <caso-mais-informacao :dados="dadosMaisInfo()" />
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </div>
        </div>

        <!-- <div class="q-pa-md">

      </div> -->
      </div>
    </q-page>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "src/stores/store";
import { api } from "src/boot/axios";
import { formatarDataExtenso, extrairIPv4 } from "src/utils/util";
import SudInfoTextoDenuncia from "src/components/SudInfoTextoDenuncia.vue";
import SudInfoPerguntas from "src/components/SudInfoPerguntas.vue";
import CasoDenunciante from "src/components/CasoDenunciante.vue";
import SudInfoAcompanhamento from "src/components/SudInfoAcompanhamento.vue";
//import MenuAcao from "src/components/MenuAcao.vue";
import CasoArquivos from "src/components/CasoArquivos.vue";
import CasoEnderecoFato from "src/components/CasoEnderecoFato.vue";
import CasoLocalEletronico from "src/components/CasoLocalEletronico.vue";
import CasoVeiculos from "src/components/CasoVeiculos.vue";
import CasoEnvolvidos from "src/components/CasoEnvolvidos.vue";
import CasoMaisInformacao from "src/components/CasoMaisInformacao.vue";
import HeaderCaso from "src/components/HeaderCaso.vue";
import CasoTramitacoes from "src/components/CasoTramitacoes.vue";
export default {
  components: {
    //MenuAcao,
    HeaderCaso,
    SudInfoTextoDenuncia,
    SudInfoPerguntas,
    CasoDenunciante,
    SudInfoAcompanhamento,
    CasoArquivos,
    CasoEnderecoFato,
    CasoLocalEletronico,
    CasoVeiculos,
    CasoEnvolvidos,
    CasoMaisInformacao,
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

      this.dadosCarregados = false;

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
    dadosMaisInfo() {
      const ret = [
        {
          label: "Data da Denúncia: ",
          valor: formatarDataExtenso(this.dados.casos[0].data_caso),
        },
        {
          label: "IP:",
          valor: extrairIPv4(this.dados.casos[0].ip),
        },
        {
          label: "Porta lógica:",
          valor: this.dados.casos[0].porta_logica,
        },
        {
          label: "Usuário Abertura:",
          valor: this.dados.casos[0].nome,
        },
        {
          label: "Nível de Sigilo:",
          valor: this.dados.casos[0].nivel_sigilo,
          cor:
            this.dados.casos[0].nivel_sigilo > 4
              ? "red"
              : this.dados.casos[0].nivel_sigilo > 3
              ? "orange"
              : "green",
        },
        {
          label: "Qualidade da informação",
          valor: this.dados.casos[0].qualidade_info
            ? `${this.dados.casos[0].qualidade_info}/5`
            : "Não avaliada",
        },
      ];

      return ret;
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
