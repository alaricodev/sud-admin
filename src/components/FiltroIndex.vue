<template>
  <q-expansion-item
    class="q-mb-md shadow-1 overflow-hidden"
    style="border-radius: 5px"
    icon="fa-solid fa-filter"
    label="FILTROS"
    header-class="bg-primary text-white text-h5"
    expand-icon-class="text-white"
  >
    <q-card>
      <q-card-section v-if="store.login.dipc">
        <div class="text-subtitle1 text-bold text-grey-8 full-width">
          Casos Arquivados
        </div>
        <q-separator color="primary" />
        <div>
          <q-toggle
            v-model="store.filtros.arquivados"
            label="Exibir casos arquivados"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-subtitle1 text-bold text-grey-8 full-width">
          Filtro Básico
        </div>
        <q-separator color="primary" />
        <div>
          <q-toggle
            v-model="store.filtros.somenteCarga"
            label="Exibir somente a minha carga"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-subtitle1 text-bold text-grey-8 full-width">
          Casos finalizados
        </div>
        <q-separator color="primary" />
        <div>
          <q-radio
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            v-model="store.filtros.finalizados"
            :val="2"
            label="Abertos"
          />
          <q-radio
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            v-model="store.filtros.finalizados"
            :val="1"
            label="finalizados"
          />
          <q-radio
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            v-model="store.filtros.finalizados"
            :val="3"
            label="TODOS"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-subtitle1 text-bold text-grey-8 full-width">
          Tipo de Denúncia
        </div>
        <q-separator color="primary" />
        <div>
          <q-radio
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            v-model="store.filtros.tipo"
            val="TODOS"
            label="TODOS"
          />
          <q-radio
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            v-model="store.filtros.tipo"
            val="SUD"
            label="Denúncia Anônima"
          />
          <q-radio
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            v-model="store.filtros.tipo"
            val="SOS_ESCOLA"
            label="SOS ESCOLA"
          />
          <q-radio
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            v-model="store.filtros.tipo"
            val="DISQUE_DENUNCIA"
            label="DISQUE DENÚNCIA"
          />
          <q-radio
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            v-model="store.filtros.tipo"
            val="WHATSAPP"
            label="WHATSAPP"
          />
        </div>
      </q-card-section>
      <q-card-section v-if="false">
        <div class="text-subtitle1 text-bold text-grey-8 full-width">Data:</div>
        <q-separator color="primary" />
        <div>
          <q-radio
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            v-model="store.filtros.opDiasData"
            :val="-365"
            label="Último ano"
          />
          <q-radio
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            v-model="store.filtros.opDiasData"
            :val="-15"
            label="Últimos 15 dias"
          />
          <q-radio
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            v-model="store.filtros.opDiasData"
            :val="-30"
            label="Último mês"
          />
          <q-radio
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            v-model="store.filtros.opDiasData"
            :val="-90"
            label="Últimos três meses"
          />
          <q-radio
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            v-model="store.filtros.opDiasData"
            :val="0"
            :disable="true"
            label="Personalizado"
          />
        </div>
        <div v-if="store.filtros.opDiasData == 'P'">
          <q-input
            filled
            v-model="store.filtros.data_inicial"
            mask="date"
            :rules="['date']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            filled
            v-model="store.filtros.data_final"
            mask="date"
            :rules="['date']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-date v-model="date">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </q-card-section>
      <!-- <q-card-actions align="right">
        <q-btn flat label="Aplicar Filtros" @click="aplicarFiltros()" />
      </q-card-actions> -->
    </q-card>
  </q-expansion-item>
</template>

<script>
import { useStore } from "src/stores/store";
export default {
  name: "filtroIndex",
  created() {
    this.exibirEncaminhados = !this.store.login.dipc;
  },
  props: {
    funcaoRefresh: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
  data() {
    return {
      valorTipoDenuncia: "TODOS",
      opDataDenuncia: "TODOS",
      data1: "2023-01-01",
      data2: "2023-12-31",
      exibirEncaminhados: false,
      finalizado_todos: false,
      finalizados_sim: false,
      finalizados_nao: true,
    };
  },

  methods: {
    aplicarFiltros() {
      this.funcaoRefresh();
    },
    filtroFinalizado(tipo) {
      if (tipo == 0) {
        this.finalizados_sim = false;
        this.finalizados_nao = false;

        this.store.filtros.finalizados = 3;
      } else if (tipo == 1) {
        this.finalizado_todos = false;
        this.finalizados_nao = false;

        this.store.filtros.finalizados = 1;
      } else if (tipo == -1) {
        this.finalizado_todos = false;
        this.finalizados_sim = false;

        this.store.filtros.finalizados = 2;
      }
    },
  },
};
</script>

<style></style>
