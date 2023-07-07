<template>
  <div>
    <div class="text-h5">Informações sobre o denunciante</div>
    <div class="q-my-md">
      <label-data class="q-my-sm" label="Nome:" :texto="denunciante.nome" />
      <label-data class="q-my-sm" label="CPF:" :texto="denunciante.cpf" />
      <label-data
        class="q-my-sm"
        label="Telefone:"
        :texto="mascaraTelefone(denunciante.telefone)"
      />
      <label-data
        class="q-my-sm"
        label="Esse telefone é Whatsapp:"
        :texto="denunciante.telefone_whatsapp ? 'SIM' : 'NÃO'"
        :cor="denunciante.telefone_whatsapp ? 'green' : 'red'"
      />
      <label-data class="q-my-sm" label="E-mail:" :texto="denunciante.email" />
      <label-data
        class="q-my-sm"
        label="Autoriza Contato de um Policial:"
        :texto="denunciante.permite_contato ? 'SIM' : 'NÃO'"
        :cor="denunciante.permite_contato ? 'green' : 'red'"
      />
      <q-btn
        class="q-my-md"
        color="primary"
        label="Obter mais informações sobre essa pessoa"
        icon="person"
        @click="store.alerta('Função em desenvolvimento')"
      />
    </div>
  </div>
</template>

<script>
import { mascaraTelefone } from "src/utils/util";
import LabelData from "./LabelData.vue";
import { useStore } from "src/stores/store";
export default {
  components: { LabelData },
  name: "SudInfoDenunciante",
  created() {},
  setup() {
    const store = useStore();
    return {
      store,
      mascaraTelefone,
    };
  },
  props: {
    denunciante: {
      type: Object,
      required: true,
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
