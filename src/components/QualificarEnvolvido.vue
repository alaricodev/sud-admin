<template>
  <q-dialog v-model="janelaVisivel" persistent>
    <q-card style="width: 400px">
      <q-bar>
        <q-icon name="person" />
        <div>Qualificar suspeito</div>

        <q-space />

        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>Cancelar Qualificação</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="q-py-sm" style="width: 100%">
          <q-input filled dense v-model="nome" label="Nome do suspeito" />
        </div>
        <div class="q-py-sm" style="width: 100%">
          <q-input filled dense v-model="alcunha" label="Alcunha" />
        </div>
        <div class="q-py-sm" style="width: 100%">
          <q-input
            filled
            dense
            v-model="paradeiro"
            label="Possível padareiro"
          />
        </div>
        <div class="q-py-sm" style="width: 100%">
          <q-input filled dense v-model="telefone" label="Telefone" />
        </div>
        <div class="q-py-sm" style="width: 100%">
          <q-input filled dense v-model="cpf" label="CPF" />
        </div>
        <div class="q-py-sm" style="width: 100%">
          <q-input filled dense v-model="rg" label="RG" />
        </div>
        <div class="q-py-sm" style="width: 100%">
          <q-input filled dense v-model="cnh" label="CNH" />
        </div>
        <div class="q-py-sm" style="width: 100%">
          <q-input filled dense v-model="oab" label="OAB" />
        </div>
        <div class="q-py-sm" style="width: 100%">
          <q-input filled dense v-model="outroDoc" label="Outro Documento" />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="red" v-close-popup />
        <q-btn flat label="Salvar" color="green" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "QualificarEnvolvido",
  created() {},
  data() {
    return {
      nome: null,
      alcunha: null,
      paradeiro: null,
      telefone: null,
      cpf: null,
      rg: null,
      cnh: null,
      oab: null,
      outroDoc: null,

      janelaVisivel: false,
    };
  },
  props: {
    showDialog: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    showDialog(newVal) {
      this.janelaVisivel = this.showDialog;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
