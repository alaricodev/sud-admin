<template>
  <q-page class="bg-grey-4">
    <div
      class="bg-white q-ma-md"
      style="border-radius: 5px; box-shadow: 1px; width: 98%"
    >
      <div class="q-pa-md row">
        <q-btn flat icon="menu">
          <!-- Estrutura de menu -->
          <q-menu transition-show="flip-right" transition-hide="flip-left">
            <q-list style="min-width: 100px">
              <q-item clickable>
                <q-item-section avatar
                  ><q-icon color="orange" name="inventory_2"
                /></q-item-section>
                <q-item-section>Arquivar Denúncia</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section avatar
                  ><q-icon color="green" name="podcasts"
                /></q-item-section>
                <q-item-section>Tramitar informação</q-item-section>
              </q-item>

              <q-item clickable>
                <q-item-section avatar
                  ><q-icon color="red" name="cell_tower"
                /></q-item-section>
                <q-item-section>Receber a informação</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-chip class="q-ma-sm">
          <q-avatar
            icon="fa-solid fa-cloud"
            color="amber-10"
            text-color="white"
          />
          <div class="q-pa-md text-h5">INFO-29209/29983</div>
        </q-chip>
        <div class="q-pa-sm">
          <q-rating
            v-model="qualidade_info"
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
              <q-tab name="2" label="Perguntas" icon="help" />
              <q-tab name="3" label="Local dos Fatos" icon="map" />
              <q-tab name="4" label="Denunciante" icon="person" />
              <q-tab name="5" label="Envolvidos" icon="group" />
              <q-tab name="6" label="Arquivos" icon="cloud_download" />
              <q-tab
                name="7"
                label="Tramitações"
                icon="transfer_within_a_station"
              />
              <q-tab name="8" label="Acompanhamento" icon="edit_note" />
              <q-tab name="9" label="Mais informações" icon="info" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tabInfo" animated>
              <q-tab-panel name="1">
                <sud-info-texto-denuncia :texto="registro.relato" />
              </q-tab-panel>

              <q-tab-panel name="2">
                <sud-info-perguntas />
              </q-tab-panel>

              <q-tab-panel name="3">
                <sud-info-local-fatos />
              </q-tab-panel>

              <q-tab-panel name="4">
                <sud-info-denunciante />
              </q-tab-panel>

              <q-tab-panel name="5">
                <sud-info-envolvidos />
              </q-tab-panel>

              <q-tab-panel name="6">
                <sud-info-arquivos />
              </q-tab-panel>

              <q-tab-panel name="7">
                <sud-info-tramitacoes />
              </q-tab-panel>

              <q-tab-panel name="8">
                <sud-info-acompanhamento />
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
import dados from "../assets/dados.json";
import SudInfoTextoDenuncia from "src/components/SudInfoTextoDenuncia.vue";
import SudInfoPerguntas from "src/components/SudInfoPerguntas.vue";
import SudInfoMaisInformacoes from "src/components/SudInfoMaisInformacoes.vue";
import SudInfoLocalFatos from "src/components/SudInfoLocalFatos.vue";
import SudInfoDenunciante from "src/components/SudInfoDenunciante.vue";
import SudInfoEnvolvidos from "src/components/SudInfoEnvolvidos.vue";
import SudInfoArquivos from "src/components/SudInfoArquivos.vue";
import SudInfoTramitacoes from "src/components/SudInfoTramitacoes.vue";
import SudInfoAcompanhamento from "src/components/SudInfoAcompanhamento.vue";
export default {
  components: {
    SudInfoTextoDenuncia,
    SudInfoPerguntas,
    SudInfoMaisInformacoes,
    SudInfoLocalFatos,
    SudInfoDenunciante,
    SudInfoEnvolvidos,
    SudInfoArquivos,
    SudInfoTramitacoes,
    SudInfoAcompanhamento,
  },
  name: "sudMaisInfo",
  created() {},
  setup() {
    return {
      dados,
      registro: ref(null),
      qualidade_info: ref(0),
      tabInfo: ref("1"),
      idCaso: ref(null),
    };
  },
  beforeMount() {
    this.idCaso = this.$route.params.id;

    const temp = dados.filter((elemento) => {
      return elemento.id == this.idCaso;
    });

    this.registro = temp[0];
  },
  methods: {
    voltar() {
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
