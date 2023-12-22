<template>
  <q-card>
    <q-bar>
      <q-icon name="fa-solid fa-user-check" />
      <div class="text-body1">PESQUISA DE CASOS</div>
      <q-space />
      <q-btn flat icon="close" size="sm" v-close-popup></q-btn>
    </q-bar>
    <q-card-section>
      <div>
        <q-table
          flat
          :title="casoCaption"
          :rows="rowsCasos"
          :columns="columnsCasos"
          row-key="protocolo"
          :filter="filtro"
          hide-header
          bordered="false"
          no-data-label="Sem casos disponíveis"
          :rows-per-page-options="[10, 20, 30, 50, 100]"
          rows-per-page-label="Registros por página"
          @row-click="eventoGrid"
        >
          <template v-slot:top-right>
            <q-input
              outlined
              dense
              debounce="300"
              v-model="filtro"
              placeholder="Filtro"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:body-cell-tipo="props">
            <q-td :props="props">
              <div class="row">
                <q-icon
                  class="q-pt-sm q-pr-sm"
                  :name="store.iconeCaso(props.value)"
                  :color="store.corCaso(props.value)"
                />
                <span
                  class="q-pt-xs"
                  :class="`text-bold text-${store.corCaso(props.value)}`"
                  >{{ store.displayCaso(props.value) }}</span
                >
              </div>
            </q-td>
          </template>
        </q-table>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { useStore } from "src/stores/store";
import { api } from "src/boot/axios";
import { formatarDataCurta } from "../utils/util.js";
export default {
  name: "PesquisaCasos",
  async created() {
    this.casoCaption = "Casos";
    this.retornaCasos();
  },
  setup() {
    const store = useStore();
    return { store, formatarDataCurta };
  },
  data() {
    return {
      filtro: "",
      rowsCasos: [],
      casoCaption: null,
      columnsCasos: [
        {
          name: "protocolo",
          required: true,
          label: "Protocolo",
          align: "left",
          field: (row) => row.protocolo,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "tipo",
          align: "center",
          label: "Tipo",
          field: "tipo",
          sortable: true,
        },
        {
          name: "data",
          label: "Data",
          field: "data_caso",
          sortable: true,
          format: (val) => `${formatarDataCurta(val)}`,
        },
        { name: "action", label: "Aceso", align: "right", field: "id_acesso" },
      ],
    };
  },
  props: {
    funcao: {
      type: Function,
      required: true,
    },
  },
  methods: {
    async retornaCasos() {
      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10013",
        ativo: true,
        arquivado: true,
        somente_carga: false,
        finalizado: 3,
        tipo: "TODOS",
        data_caso_inicio: "1970-01-01",
        data_caso_fim: "2050-01-01",
      };

      const resposta = await api.post("/consulta", params);

      resposta.data ? (this.rowsCasos = resposta.data) : (this.rowsCasos = []);
    },

    maisInfo(id, tipo) {
      this.funcao();

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

    eventoGrid(evt, row, index) {
      this.maisInfo(row.id, row.tipo);
    },
  },
};
</script>

<style lang="scss" scoped></style>
