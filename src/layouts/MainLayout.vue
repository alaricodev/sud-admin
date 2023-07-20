<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-4">
    <!-- <q-header elevated>
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
    </q-header> -->

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-black">
      <usuario-info />
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
        <span>SUD - Administrador</span>
      </div>
      <q-list>
        <q-item-label header class="text-primary text-bold text-center">
          MENU</q-item-label
        >
      </q-list>

      <q-list style="min-width: 100px">
        <q-separator color="primary" />
        <div v-for="item in itemsMenu" :key="item">
          <q-item clickable @click="$router.push(item.rota)">
            <q-item-section avatar>
              <q-icon :color="item.corIcone" :name="item.icone" />
            </q-item-section>

            <q-item-section class="text-white">
              {{ item.texto }}
            </q-item-section>
          </q-item>

          <q-separator v-if="item.separador" color="primary" />
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "src/stores/store";
import UsuarioInfo from "src/components/UsuarioInfo.vue";

export default defineComponent({
  name: "MainLayout",

  components: { UsuarioInfo },
  methods: {
    voltar() {
      this.$router.push("/");
    },
  },

  data() {
    return {
      itemsMenu: [
        {
          icone: "record_voice_over",
          corIcone: "primary",
          texto: "Denúncias",
          corTexto: "white",
          rota: "/",
          separador: true,
        },
        {
          icone: "dashboard",
          corIcone: "primary",
          texto: "Dashboard",
          corTexto: "white",
          rota: "/",
          separador: true,
        },
        {
          icone: "fa-brands fa-whatsapp",
          corIcone: "green",
          texto: "Nova denúncia whatsapp",
          corTexto: "white",
          rota: "/cadwhatsapp",
          separador: true,
        },
        {
          icone: "fa-solid fa-box-archive",
          corIcone: "primary",
          texto: "Denúncias Arquivadas",
          corTexto: "white",
          rota: "/",
          separador: true,
        },
        {
          icone: "fa-solid fa-gears",
          corIcone: "primary",
          texto: "Configurações",
          corTexto: "white",
          rota: "/configsud",
          separador: true,
        },
      ],
      miniState: true,
      drawer: false,
    };
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const store = useStore();

    return {
      store,
      leftDrawerOpen,

      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  computed: {
    nrDenuncia() {
      return this.store.novasDenuncias;
    },
  },
});
</script>

<style lang="scss">
.dialogBrasaoClass {
  .q-loading__message {
    margin: 0px 0px 0;
    transform: translateY(-115px);
  }
}
</style>
