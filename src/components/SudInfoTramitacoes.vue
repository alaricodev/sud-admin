<template>
  <div>
    <div class="q-px-lg q-pb-md">
      <div class="text-h6">Tramitações</div>
      <q-timeline
        color="secondary"
        v-for="tramitacao in tramitacoes"
        :key="tramitacao.evento"
      >
        <!-- <q-timeline-entry heading> Tramitações </q-timeline-entry> -->

        <q-timeline-entry
          :title="tramitacao.evento"
          :subtitle="tramitacao.data"
        >
          <div>
            {{ tramitacao.desc }}
          </div>
        </q-timeline-entry>
      </q-timeline>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "SudInfoTramitacoes",
  created() {},
  setup() {
    return {
      tramitacoes: ref([
        {
          evento: "Entrada no sistema SUD",
          data: "22 de Maio, 2023 às 19:36",
          desc: "Denúncia criada",
        },
        {
          evento: "Recebimento pelo agente",
          data: "24 de Maio, 2023 às 08:35",
          desc: "Denúncia recebida pela DIPC pelo Agente Alarico",
        },
        {
          evento: "Transferência",
          data: "24 de Maio, 2023 às 09:35",
          desc: "Denúncia enviada para a DINT de Chapeco",
        },
        {
          evento: "Recebimento",
          data: "24 de Maio, 2023 às 15:01",
          desc: "Denúncia recebida pelo agente Marcelo",
        },
      ]),
    };
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
