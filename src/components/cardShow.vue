<template>
  <q-dialog v-model="promptConfirma" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">
          Para dar prosseguimento ao arquivamento, favor escrever abaixo a
          palavra "CONFIRMA"
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="valorConfirma"
          autofocus
          @keyup.enter="prompt = false"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn
          flat
          label="Cancelar"
          @click="valorConfirma = ''"
          v-close-popup
        />
        <q-btn
          flat
          label="Confirmar"
          @click="arquivarCaso()"
          :disable="valorConfirma.toUpperCase() != 'CONFIRMA'"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Código principal começa aqui   -->

  <q-card class="my-card q-my-sm" flat bordered style="border-radius: 10px">
    <q-badge v-if="!dados.aberto" color="green" floating>NOVO</q-badge>

    <q-expansion-item
      expand-separator
      icon="radio_button_checked"
      label=""
      caption="John Doe"
    >
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar
            :icon="avatar.icon"
            :color="avatar.color"
            text-color="white"
          />
        </q-item-section>
        <q-item-section>{{ avatar.nome.toUpperCase() }}</q-item-section>
        <q-item-section> {{ dados.codigo }} </q-item-section>

        <q-item-section class="text-subtitle2">
          {{ dados.data }}
        </q-item-section>

        <q-item-section side>
          <q-icon
            v-show="dados.arquivos.length > 0"
            name="fa-solid fa-paperclip"
            color="blue-grey"
          >
            <q-tooltip>Existe arquivos anexados</q-tooltip>
          </q-icon>
        </q-item-section>
      </template>
      <q-separator />
      <q-card-section>
        <div class="q-gutter-y-md" style="max-width: 100%">
          <q-tabs
            v-model="tab"
            dense
            class="bg-grey-4 text-grey-10"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="resumo" label="Resumo" />
            <q-tab name="tramitacao" label="Tramitação" />
          </q-tabs>

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="resumo">
              <div class="text-body1 text-grey-10 text-container">
                <p :class="abertoDesc ? '' : 'text-overflow'">
                  {{ dados.descricao }}
                </p>
              </div>
              <q-separator color="primary" />
              <div>
                <q-btn
                  flat
                  :label="abertoDesc ? 'ler menos...' : 'ler mais...'"
                  @click="abertoDesc = !abertoDesc"
                />
              </div>
            </q-tab-panel>

            <q-tab-panel name="tramitacao">
              <q-timeline color="secondary">
                <q-timeline-entry heading>Tramitações</q-timeline-entry>
                <q-timeline-entry
                  v-for="info in dados.tramitacao"
                  :key="info.id"
                >
                  <template v-slot:title> {{ info.caption }}</template>
                  <template v-slot:subtitle> {{ info.data }} </template>
                </q-timeline-entry>
              </q-timeline>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn
          flat
          icon="fa-solid fa-circle-info"
          label="Mais informações"
          color="primary"
          @click="maisInfo(dados.id)"
        />
        <q-btn
          flat
          icon="fa-solid fa-box-archive"
          label="Arquivar denúncia"
          color="secondary"
          @click="janelaArquivarCaso()"
        />
      </q-card-actions>
    </q-expansion-item>
  </q-card>
</template>

<script>
import { ref } from "vue";
export default {
  name: "cardShow",
  props: { dados: Object },
  setup() {
    return {
      tab: ref("resumo"),
      abertoDesc: ref(false),
      promptConfirma: ref(false),
      valorConfirma: ref(""),
    };
  },
  computed: {
    avatar() {
      if (this.dados.tipo == 1) {
        return {
          icon: "fa-brands fa-whatsapp",
          color: "green",
          nome: "Whatsapp",
        };
      } else if (this.dados.tipo == 3) {
        return {
          icon: "fa-solid fa-cloud",
          color: "amber-10",
          nome: "SUD",
        };
      } else if (this.dados.tipo == 2) {
        return {
          icon: "fa-solid fa-phone",
          color: "indigo-10",
          nome: "Dique Denúncia",
        };
      } else {
        return {};
      }
    },
  },
  methods: {
    janelaArquivarCaso() {
      this.promptConfirma = true;
    },
    arquivarCaso() {
      console.log(`Arquivou o caso ${this.dados.id}`);
      this.promptConfirma = false;
    },
    maisInfo(id) {
      console.log(id);
      this.$router.push(`/sudmaisinfo/${id}`);
    },
  },
};
</script>

<style>
.my-card {
  width: 100%;
  max-width: 100%;
}

.text-container {
  width: 800px; /* Defina a largura do contêiner conforme necessário */
}

.text-overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* Reticências (...) */
}
</style>
