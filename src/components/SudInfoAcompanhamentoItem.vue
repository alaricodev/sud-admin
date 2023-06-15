<template>
  <div>
    <q-card class="q-ma-md bg-grey-3" style="min-height: 150px">
      <q-card-section>
        <div class="row">
          <q-btn flat icon="menu">
            <q-menu transition-show="flip-right" transition-hide="flip-left">
              <q-list style="min-width: 100px">
                <q-item clickable>
                  <q-item-section avatar
                    ><q-icon color="blue" name="edit"
                  /></q-item-section>
                  <q-item-section>Editar anotação</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section avatar
                    ><q-icon color="red" name="delete"
                  /></q-item-section>
                  <q-item-section>Apagar</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <div class="text-subtitle1 text-grey-8 q-my-sm">
            {{ dados.data }} - {{ dados.usuario }}
          </div>
          <q-space />
          <div>
            <q-badge
              rounded
              :color="retornaCor(dados.nivelAcesso)"
              :label="dados.nivelAcesso"
            />
          </div>
        </div>
      </q-card-section>
      <q-separator color="primary" />
      <q-card flat bordered class="bg-grey-3">
        <div class="q-ma-md q-pa-sm" v-html="dados.descricao" />
      </q-card>
    </q-card>
  </div>
</template>

<script>
export default {
  name: "SudInfoAcompanhamentoItem",
  created() {},
  data() {
    return {};
  },
  props: {
    dados: {
      type: Object,
      required: true,
    },
  },
  methods: {
    apagar(id) {
      console.log(id);
    },
    retornaCor(nr) {
      if (nr == 1 || nr == 2) {
        return "green";
      }
      if (nr == 3) {
        return "orange";
      }
      if (nr == 4 || nr == 5) {
        return "red";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
