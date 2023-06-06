<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-4">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>Administrador SUD </q-toolbar-title>

        <div>Algum dado vai aqui</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-black">
      <div style="width: 100%" class="q-mt-md q-px-sm text-right">
        <q-btn
          round
          color="primary"
          icon="arrow_back"
          outline
          size="xs"
          clickable
          v-ripple
          @click="toggleLeftDrawer"
        />
      </div>
      <div class="flex flex-center column" style="height: 150px">
        <img
          src="../assets/logo.png"
          spinner-color="white"
          style="height: 100%"
        />
      </div>
      <div class="flex flex-center text-h6 text-grey-5 column">
        <span>PCSC</span>
        <span>SUD - Adminitrador</span>
      </div>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
