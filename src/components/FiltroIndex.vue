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
      <q-card-section>
        <div class="text-subtitle1 text-bold text-grey-8 full-width">
          Filtro Básico
        </div>
        <div>
          <q-toggle
            v-model="exibirEncaminhados"
            label="Exibir informações encaminhadas"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-subtitle1 text-bold text-grey-8 full-width">
          Tipo de Denúncia
        </div>
        <div>
          <q-radio
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            v-model="valorTipoDenuncia"
            val="TODOS"
            label="TODOS"
          />
          <q-radio
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            v-model="valorTipoDenuncia"
            val="SUD"
            label="SUD"
          />
          <q-radio
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            v-model="valorTipoDenuncia"
            val="SOS ESCOLA"
            label="SOS_ESCOLA"
          />
          <q-radio
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            v-model="valorTipoDenuncia"
            val="DISQUE DENÚNCIA"
            label="DISQUE_DENUNCIA"
          />
        </div>
      </q-card-section>
      <q-card-section v-if="false">
        <div class="text-subtitle1 text-bold text-grey-8 full-width">Data:</div>
        <div>
          <q-radio
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            v-model="opDataDenuncia"
            val="TODOS"
            label="Todo Período"
          />
          <q-radio
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            v-model="opDataDenuncia"
            val="15"
            label="Últimos 15 dias"
          />
          <q-radio
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            v-model="opDataDenuncia"
            val="30"
            label="Último mês"
          />
          <q-radio
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            v-model="opDataDenuncia"
            val="90"
            label="Últimos três meses"
          />
          <q-radio
            checked-icon="task_alt"
            unchecked-icon="panorama_fish_eye"
            v-model="opDataDenuncia"
            val="P"
            label="Personalizado"
          />
        </div>
        <div v-if="opDataDenuncia == 'P'">
          <q-input filled v-model="data1" mask="date" :rules="['date']">
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

          <q-input filled v-model="data2" mask="date" :rules="['date']">
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
      <q-card-actions align="right">
        <q-btn flat label="Aplicar Filtros" :disable="true" />
      </q-card-actions>
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
    };
  },
  methods: {},
};
</script>

<style></style>
