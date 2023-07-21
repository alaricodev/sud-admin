<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-4">
    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-black"> -->
    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="store.layout.miniState"
      :breakpoint="500"
      bordered
      class="bg-black"
    >
      <!-- <usuario-info /> -->
      <div
        style="width: 100%"
        class="q-mt-md q-px-sm"
        :class="store.layout.miniState ? 'text-center' : 'text-right'"
      >
        <q-btn
          flat
          color="primary"
          :icon="
            store.layout.miniState
              ? 'fa-solid fa-arrow-right'
              : 'fa-solid fa-arrow-left'
          "
          outline
          size="xs"
          clickable
          v-ripple
          @click="store.layout.miniState = !store.layout.miniState"
        />
      </div>
      <div v-if="!store.layout.miniState">
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
      </div>
      <div v-else>
        <div style="padding-top: 30px"></div>
        <div class="flex flex-center column" style="height: 50px">
          <img
            src="../assets/logo.png"
            spinner-color="white"
            style="height: 100%"
          />
        </div>

        <div class="text-primary text-bold text-center q-my-sm">SUD</div>
        <div style="padding-top: 147px"></div>
      </div>

      <div v-if="!store.layout.miniState">
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
      </div>
      <div v-else>
        <q-list>
          <div v-for="item in itemsMenu" :key="item">
            <q-item clickable @click="$router.push(item.rota)">
              <q-item-section avatar>
                <q-icon :color="item.corIcone" :name="item.icone" />
                <q-tooltip :delay="500" class="bg-primary" :offset="[10, 10]">
                  {{ item.texto }}
                </q-tooltip>
              </q-item-section>
            </q-item>
          </div>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useStore } from "src/stores/store";

export default defineComponent({
  name: "MainLayout",

  components: {},

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
        // {
        //   icone: "dashboard",
        //   corIcone: "primary",
        //   texto: "Dashboard",
        //   corTexto: "white",
        //   rota: "/",
        //   separador: true,
        // },
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
          rota: "/denunciasarquivadas",
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
      drawer: false,
    };
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const store = useStore();

    //const homologacao = process.env.DEV

    return {
      store,
      leftDrawerOpen,
      //homologacao,

      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  computed: {
    nrDenuncia() {
      return this.store.novasDenuncias;
    },
    homologacao() {
      return process.env.DEV;
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
