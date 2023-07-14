<template>
  <q-page v-if="dadosCarregados" class="bg-grey-4">
    <div
      class="bg-white q-ma-md"
      style="border-radius: 5px; box-shadow: 1px; width: 98%"
    >
      <header-caso :dados="dados" />
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

              <q-tab-panel name="6">
                <caso-arquivos :arquivos="dados.arquivos" />
              </q-tab-panel>

              <q-tab-panel name="8">
                <sud-info-acompanhamento :id="dados.casos[0].id" />
              </q-tab-panel>

              <q-tab-panel name="9">
                <caso-mais-informacao :dados="dadoInfo" />
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
import { useStore } from "src/stores/store.js";
import { api } from "src/boot/axios.js";
import { mascaraTelefone, formatarDataExtenso } from "src/utils/util";
import SudInfoTextoDenuncia from "src/components/SudInfoTextoDenuncia.vue";
import SudInfoAcompanhamento from "src/components/SudInfoAcompanhamento.vue";
import CasoMaisInformacao from "src/components/CasoMaisInformacao.vue";
import CasoArquivos from "src/components/CasoArquivos.vue";
import HeaderCaso from "src/components/HeaderCaso.vue";

export default {
  components: {
    SudInfoTextoDenuncia,
    SudInfoAcompanhamento,
    CasoMaisInformacao,
    CasoArquivos,
    HeaderCaso,
  },
  name: "WhatsappMaisInfo",
  created() {
    this.carregarCaso(this.$route.params.id);
  },

  setup() {
    const store = useStore();
    return {
      mascaraTelefone,
      formatarDataExtenso,
      store,
      registro: ref(null),
      qualidade_info: ref(0),
      tabInfo: ref("1"),
      idCaso: ref(null),
      dados: ref({
        id: null,
        relato: "",
      }),
      dadoInfo: ref([]),
      dadosCarregados: ref(false),
    };
  },
  watch: {
    dados() {
      this.dadoInfo.push(
        {
          label: "Protocolo:",
          valor: this.dados.casos[0].protocolo,
        },
        {
          label: "Data:",
          valor: this.formatarDataExtenso(this.dados.casos[0].data_caso),
        },
        {
          label: "Quem Criou:",
          valor: this.dados.casos[0].nome,
        },
        {
          label: "Telefone:",
          valor: this?.mascaraTelefone(
            this.dados.denuncia_whatsapp[0].telefone
          ),
        }
      );
    },
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
