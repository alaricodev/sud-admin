<template>
  <div>
    <div class="text-h5">Informações sobre o denunciante</div>
    <div class="q-my-md">
      <label-data class="q-my-sm" label="Nome:" texto="Roberval Chocolate" />
      <label-data class="q-my-sm" label="CPF:" texto="253.698.957-98" />
      <label-data class="q-my-sm" label="Telefone:" texto="(48) 99871-0912" />
      <label-data
        class="q-my-sm"
        label="Esse telefone é Whatsapp:"
        texto="SIM"
        cor="green"
      />
      <label-data
        class="q-my-sm"
        label="E-mail:"
        texto="roberval@tvcolosso.com.br"
      />
      <label-data
        class="q-my-sm"
        label="Autoriza Contato de um Policial:"
        texto="NÃO"
        cor="red"
      />
      <q-btn
        class="q-my-md"
        color="primary"
        label="Obter mais informações sobre essa pessoa"
        icon="person"
      />
    </div>
  </div>
</template>

<script>
import LabelData from "./LabelData.vue";
export default {
  components: { LabelData },
  name: "SudInfoDenunciante",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
