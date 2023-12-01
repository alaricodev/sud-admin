<template>
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
      :rows-per-page-options="[6, 10, 20, 30, 50, 100]"
      rows-per-page-label="Registros por página"
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
</template>

<script>
import { useStore } from "src/stores/store";
import { api } from "src/boot/axios";
import { formatarDataCurta } from "../utils/util.js";
export default {
  name: "TabelaCasos",
  async created() {
    if (this.tipo == 1) {
      this.casoCaption = "Casos do Usuário";
      this.retornaCasoUsuario();
    } else if (this.tipo == 2) {
      this.casoCaption = "Casos do Grupo";
      this.retornaCasoGrupo();
    } else if (this.tipo == 3) {
      this.casoCaption = "Casos do Subgrupo";
      this.retornaCasoSubGrupo();
    }
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
    tipo: {
      type: Number,
      required: true,
    },
    cpf: {
      type: String,
      required: false,
    },
    id: {
      type: Number,
      required: false,
    },
  },
  methods: {
    async retornaCasoUsuario() {
      const params = {
        cpf_log: this.cpf,
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

    async retornaCasoGrupo() {
      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10013A",
        id_grupo: this.id,
      };
      const resposta = await api.post("/consulta", params);

      resposta.data ? (this.rowsCasos = resposta.data) : (this.rowsCasos = []);
    },

    async retornaCasoSubGrupo() {
      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10013B",
        id_subgrupo: this.id,
      };
      const resposta = await api.post("/consulta", params);

      resposta.data ? (this.rowsCasos = resposta.data) : (this.rowsCasos = []);
    },
  },
};
</script>

<style lang="scss" scoped></style>
