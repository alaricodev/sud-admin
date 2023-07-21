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
    <q-badge v-if="!dados.data_recebimento" color="green" floating
      >NOVO</q-badge
    >

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
        <q-item-section>
          <div class="row">
            {{ avatar.nome }}
            <q-icon
              v-if="dados.encaminhado_nint"
              class="q-ml-md"
              name="fa-regular fa-share-from-square"
              color="amber-9"
            >
              <q-tooltip
                :delay="500"
                class="bg-primary text-body2"
                :offset="[10, 10]"
              >
                Informação encaminhada: NINT
              </q-tooltip>
            </q-icon>
          </div>
        </q-item-section>
        <q-item-section> {{ dados.protocolo }} </q-item-section>

        <q-item-section class="text-subtitle2">
          {{ formatarDataGrid(dados.data_caso) }}
        </q-item-section>

        <q-item-section side>
          <q-icon
            :name="dados.tem_arquivos ? 'fa-solid fa-paperclip' : 'fdfdfdd'"
            :color="dados.tem_arquivos ? 'blue-grey' : 'red'"
          >
            <q-tooltip
              :delay="500"
              class="bg-primary text-body2"
              :offset="[10, 10]"
              v-if="dados.tem_arquivos"
              >Existe arquivos anexados</q-tooltip
            >
            <q-tooltip
              :delay="500"
              class="bg-primary text-body2"
              :offset="[10, 10]"
              v-else
              >Não existe arquivos anexados</q-tooltip
            >
          </q-icon>
        </q-item-section>
      </template>
      <q-separator />
      <q-card-section>
        <div class="q-gutter-y-md" style="max-width: 100%">
          <q-card>
            <q-card-section>
              <div class="text-body1 text-grey-10 text-container">
                <div class="text-h5 text-title1 text-grey-6">Relato:</div>
                <q-separator />
                <pre class="pre-container text-center"> {{ dados.relato }}</pre>

                <!-- <p :class="abertoDesc ? '' : 'text-overflow'">
                  {{ dados.relato }}
                </p> -->
              </div>

              <!-- <div>
                <q-btn
                  flat
                  :label="abertoDesc ? 'ler menos...' : 'ler mais...'"
                  @click="abertoDesc = !abertoDesc"
                />
              </div> -->
            </q-card-section>
          </q-card>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions align="right">
        <q-btn
          flat
          icon="fa-solid fa-circle-info"
          label="Mais informações"
          color="primary"
          @click="maisInfo(dados.id, dados.tipo)"
        />
        <!-- <q-btn
          flat
          icon="fa-solid fa-box-archive"
          label="Arquivar denúncia"
          color="red-4"
          @click="janelaArquivarCaso()"
        /> -->
      </q-card-actions>
    </q-expansion-item>
  </q-card>
</template>

<script>
import { ref } from "vue";
import { formatarDataGrid } from "../utils/util.js";
export default {
  name: "cardShow",
  props: { dados: Object },
  setup() {
    return {
      // FUNÇÕES
      formatarDataGrid,
      // VARIÁVEIS
      tab: ref("resumo"),
      abertoDesc: ref(false),
      promptConfirma: ref(false),
      valorConfirma: ref(""),
    };
  },
  computed: {
    avatar() {
      if (this.dados.tipo == "WHATSAPP") {
        return {
          icon: "fa-brands fa-whatsapp",
          color: "green",
          nome: "Whatsapp",
        };
      } else if (this.dados.tipo == "SUD") {
        return {
          icon: "fa-solid fa-cloud",
          color: "amber-10",
          nome: "SUD",
        };
      } else if (this.dados.tipo == "DISQUE_DENUNCIA") {
        return {
          icon: "fa-solid fa-phone",
          color: "indigo-10",
          nome: "Disque Denúncia",
        };
      } else if (this.dados.tipo == "SOS_ESCOLA") {
        return {
          icon: "fa-solid fa-graduation-cap",
          color: "red-9",
          nome: "SOS Escola",
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
      this.promptConfirma = false;
    },
    maisInfo(id, tipo) {
      if (tipo == "WHATSAPP") {
        this.$router.push(`/whatsappmaisinfo/${id}`);
      } else if (tipo == "DISQUE_DENUNCIA") {
        this.$router.push(`/disquedenunciamaisinfo/${id}`);
      } else if (tipo == "SUD") {
        this.$router.push(`/sudmaisinfo/${id}`);
      } else if (tipo == "SOS_ESCOLA") {
        this.$router.push(`/sosescolapmaisinfo/${id}`);
      } else {
        this.$router.push(`/sudmaisinfo/${id}`);
      }
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

.pre-container {
  max-width: 900px;
  overflow-x: auto;
  white-space: pre-wrap;
  background-color: rgb(235, 232, 232);
  padding: 10px;
  border-radius: 10px;
}
</style>
