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
              <q-tab name="1" label="Denúncia" icon="phone_callback" />

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
                <div>
                  <disque-d-audio :dados="dados" />
                </div>
              </q-tab-panel>

              <q-tab-panel name="8">
                <div>
                  <sud-info-acompanhamento :id="dados.casos[0].id" />
                </div>
              </q-tab-panel>

              <q-tab-panel name="9">
                <div>
                  <disque-d-mais-informacoes :dados="dados" />
                </div>
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

import SudInfoAcompanhamento from "src/components/SudInfoAcompanhamento.vue";
import DisqueDAudio from "src/components/DisqueDAudio.vue";
import { useStore } from "src/stores/store";
import { api } from "src/boot/axios";
import DisqueDMaisInformacoes from "src/components/DisqueDMaisInformacoes.vue";
import HeaderCaso from "src/components/HeaderCaso.vue";

export default {
  components: {
    HeaderCaso,
    SudInfoAcompanhamento,
    DisqueDAudio,
    DisqueDMaisInformacoes,
  },
  name: "DisqueDMaisInfo",
  created() {
    this.carregarCaso(this.$route.params.id);
  },
  setup() {
    const store = useStore();

    return {
      store,
      dadosCarregados: ref(false),
      registro: ref(null),
      qualidade_info: ref(0),
      tabInfo: ref("1"),
      idCaso: ref(null),
      dados: ref({
        id: null,
      }),
      qualidadeInfo: ref(null),
    };
  },

  watch: {
    dados() {
      this.dados.casos[0].qualidade_info !== null
        ? (this.qualidadeInfo = this.dados.casos[0].qualidade_info)
        : 0;
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
