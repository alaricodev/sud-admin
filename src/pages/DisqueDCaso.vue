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
                <q-item-section>Alterar nível de sigilo</q-item-section>
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
            icon="fa-solid fa-phone"
            color="indigo-10"
            text-color="white"
          />
          <div v-if="dados" class="q-pa-md text-h5">
            {{ dados.protocolo }}
          </div>
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
              <q-tab name="1" label="Áudio Denúncia" icon="phone_callback" />
              <q-tab name="2" label="Texto Denúncia" icon="description" />

              <q-tab name="8" label="Acompanhamento" icon="edit_note" />
              <q-tab name="9" label="Mais informações" icon="info" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tabInfo" animated>
              <q-tab-panel name="1">
                <disque-d-audio :dados="dados" />
              </q-tab-panel>

              <q-tab-panel name="2">
                <sud-info-texto-denuncia :texto="dados.relato" />
              </q-tab-panel>
              <q-tab-panel name="8">
                <sud-info-acompanhamento />
              </q-tab-panel>

              <q-tab-panel name="9">
                <disque-d-mais-informacoes :dados="dados" />
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
import SudInfoAcompanhamento from "src/components/SudInfoAcompanhamento.vue";
import DisqueDAudio from "src/components/DisqueDAudio.vue";
import { consultaDB } from "src/utils/db";
import { useStore } from "src/stores/store";
import { api } from "src/boot/axios";
import DisqueDMaisInformacoes from "src/components/DisqueDMaisInformacoes.vue";

export default {
  components: {
    SudInfoTextoDenuncia,
    SudInfoAcompanhamento,
    DisqueDAudio,
    DisqueDMaisInformacoes,
  },
  name: "DisqueDMaisInfo",
  created() {},
  setup() {
    const store = useStore();

    return {
      store,
      registro: ref(null),
      qualidade_info: ref(0),
      tabInfo: ref("1"),
      idCaso: ref(null),
      dados: ref(null),
    };
  },

  async mounted() {
    const idCaso = this.$route.params.id;

    const params = {
      cpf_log: this.store.login.cpf_log,
      codigo_sys_func: "10005",
      id_caso: idCaso,
    };

    const resposta = await api.post("/consulta", params);

    this.dados = resposta.data[0];
    console.log(this.dados);
  },
  methods: {
    voltar() {
      this.$router.push("/");
    },
  },
};
</script>

<style></style>
