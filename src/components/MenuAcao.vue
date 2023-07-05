<template>
  <div>
    <q-btn flat icon="menu">
      <!-- Estrutura de menu -->
      <q-menu transition-show="flip-right" transition-hide="flip-left">
        <q-list style="min-width: 100px">
          <q-item clickable>
            <q-item-section avatar
              ><q-icon color="grey-8" name="inventory_2"
            /></q-item-section>
            <q-item-section>Arquivar Denúncia</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable>
            <q-item-section avatar
              ><q-icon color="grey-8" name="fa-solid fa-user-secret"
            /></q-item-section>
            <q-item-section>Alterar nível de sigilo</q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar
              ><q-icon color="grey-8" name="fa-regular fa-star"
            /></q-item-section>
            <q-item-section
              >Classificar a informação {{ idCaso }}
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable>
            <q-item-section avatar
              ><q-icon color="grey-8" name="fa-solid fa-user-check"
            /></q-item-section>
            <q-item-section>Franquear acesso à informação</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script>
export default {
  name: "MenuAcao",
  created() {},
  data() {
    return {};
  },
  props: {
    idCaso: {
      type: Number,
      required: true,
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
