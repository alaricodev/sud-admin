<template>
  <q-expansion-item
    class="q-mb-md shadow-1 overflow-hidden"
    style="border-radius: 5px"
    icon="fa-solid fa-filter"
    label="FILTROS"
    header-class="bg-primary text-white text-h5"
    expand-icon-class="text-white"
  >
    <div class="q-gutter-sm" style="width: 100%">
      <q-toggle
        v-model="filtroArquivadas"
        checked-icon="check"
        color="primary"
        label="Mostrar Arquivadas"
        unchecked-icon="clear"
      />
      <div class="q-ma-md">
        <label class="text-subtitle1">Quanto ao</label>
        <q-btn-toggle
          v-model="model"
          color="black"
          text-color="primary"
          spread
          no-caps
          glossy
          :options="[
            { label: 'Somente arquivados', value: 'one' },
            { label: 'Todos do ano', value: 'two' },
            { label: 'Período de tempo', value: 'three' },
            { label: 'Busca por protocolo', value: 'four' },
          ]"
        />
      </div>
    </div>
  </q-expansion-item>
</template>

<script>
import { useStore } from "src/stores/store";
import { ref } from "vue";
export default {
  name: "filtroIndex",
  setup() {
    const store = useStore();
    return {
      store,
      filtroArquivadas: ref(false),
      model: ref("one"),
    };
  },
  methods: {},
};
</script>

<style></style>
