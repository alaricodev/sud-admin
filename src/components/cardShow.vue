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

  <q-card class="q-my-sm" flat bordered style="border-radius: 10px">
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
          >
            <q-tooltip
              :delay="500"
              class="bg-primary text-body2"
              :offset="[10, 10]"
            >
              {{ avatar.nome }}
            </q-tooltip>
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <div class="row">
            {{ dados.protocolo }}
          </div>
        </q-item-section>
        <q-item-section>
          <div v-if="dados.data_arquivamento">
            <q-icon name="fa-solid fa-box-archive" size="sm" color="brown" />
          </div>
          <div v-if="dados.finalizado">
            <q-icon
              name="fa-solid fa-flag-checkered"
              size="sm"
              color="orange"
            />
          </div>
        </q-item-section>

        <q-item-section class="text-subtitle2">
          {{ formatarDataGrid(dados.data_caso) }}
        </q-item-section>

        <q-item-section>
          <div class="row">
            <div class="col-2">
              <q-icon name="fa-solid fa-dolly" size="sm" color="grey-7" />
            </div>
            <div class="col q-pt-xm text-grey-7">
              {{ labelCarga }}
            </div>
          </div>
        </q-item-section>

        <q-item-section>
          <div class="flex flex-center">
            <div v-for="n in 5" :key="n">
              <q-icon
                :name="
                  dados.qualidade_info >= n
                    ? 'fa-solid fa-star'
                    : 'fa-regular fa-star'
                "
                color="amber"
                size="xs"
                class="q-mr-sm"
              />
            </div>
            <q-tooltip
              :delay="500"
              class="bg-primary text-body2"
              :offset="[10, 10]"
            >
              <div v-if="dados.qualidade_info">
                Qualidade da informação {{ dados.qualidade_info }}/5
              </div>
              <div v-else>Qualidade da informação</div>
            </q-tooltip>
          </div>
        </q-item-section>

        <q-item-section side>
          <q-btn
            flat
            icon="fa-solid fa-arrow-right-to-bracket"
            color="primary"
            @click="maisInfo(dados.id, dados.tipo)"
          >
            <q-tooltip
              :delay="500"
              class="bg-primary text-body2"
              :offset="[10, 10]"
              v-if="dados.tem_arquivos"
            >
              Visualizar a informação
            </q-tooltip>
          </q-btn>
        </q-item-section>

        <q-item-section side>
          <q-icon
            :name="
              dados.tem_arquivos
                ? 'fa-solid fa-paperclip'
                : 'fa-solid fa-paperclip'
            "
            :color="dados.tem_arquivos ? 'blue-grey' : 'grey-3'"
          >
            <q-tooltip
              :delay="500"
              class="bg-primary text-body2"
              :offset="[10, 10]"
              v-if="dados.tem_arquivos"
            >
              Existe arquivos anexados
            </q-tooltip>
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
              <div class="text-body1 text-grey-10">
                <div class="text-h5 text-title1 text-grey-6">Relato:</div>
                <q-separator />
                <pre class="pre-container">
                  <q-scroll-area style="height: 330px; max-width: 100%;">
                    {{ dados.relato }}
                  </q-scroll-area>

                </pre>
              </div>
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
    labelCarga() {
      if (this.dados.carga_dipc) {
        return "DINT";
      }
      if (this.dados.id_grupo_carga) {
        return "NINT";
      }
      if (this.dados.id_subgrupo_carga) {
        return "Subgrupo";
      }
      if (this.dados.id_usuario_carga) {
        return "Policial";
      }
      return "";
    },
    avatar() {
      if (this.dados.tipo == "WHATSAPP") {
        return {
          icon: "fa-brands fa-whatsapp",
          color: "green",
          nome: "Whatsapp",
        };
      } else if (this.dados.tipo == "SUD") {
        return {
          icon: "fa-solid fa-desktop",
          color: "amber-10",
          nome: "Denúncia Online",
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
.text-container {
  width: 800px; /* Defina a largura do contêiner conforme necessário */
}

.text-overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; /* Reticências (...) */
}

.pre-container {
  max-width: 100%;
  overflow-x: auto;
  white-space: pre-wrap;
  background-color: rgb(235, 232, 232);
  padding: 10px;
  border-radius: 10px;
}
</style>
