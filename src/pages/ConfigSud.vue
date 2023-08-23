we
<template>
  <div v-if="store.login.nivel >= 3" class="flex flex-center q-pa-md">
    <div
      class="bg-white flex column"
      style="
        border-radius: 20px;
        border: 1px solid #616161;
        width: 100%;
        height: 100%;
      "
    >
      <div class="row" style="width: 100%">
        <div class="text-h6 q-ma-md row" style="width: 100%">
          <q-icon
            name="fa-solid fa-gears"
            size="md"
            color="grey-7"
            class="q-mr-md"
          />
          <div class="text-h5">Configurações</div>
          <q-space />
          <div>
            <q-btn
              color="primary"
              label="Voltar"
              icon="arrow_back"
              @click="voltar()"
            />
          </div>
        </div>
      </div>
      <q-separator color="primary" />
      <div style="flex-grow: 1">
        <div class="q-pa-md" style="height: 100%">
          <div class="q-gutter-y-md" style="max-width: 100%">
            <q-card class="" style="height: 100%">
              <q-tabs
                v-model="tab"
                dense
                class="text-grey"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                narrow-indicator
              >
                <q-tab
                  name="1"
                  label="Grupos NINT"
                  icon="fa-solid fa-sitemap"
                />
                <q-tab
                  name="2"
                  label="BlackList Telefones"
                  icon="fa-solid fa-phone-slash"
                />
                <q-tab name="3" label="Usuários" icon="fa-solid fa-user" />
              </q-tabs>

              <q-separator />

              <q-tab-panels v-model="tab" animated style="flex-grow: 1">
                <q-tab-panel name="1">
                  <!-- <config-grupo-nint /> -->
                  <config-grupo />
                </q-tab-panel>

                <q-tab-panel name="2">
                  <div class="flex flex-center">
                    <config-blacklist />
                  </div>
                </q-tab-panel>

                <q-tab-panel name="3">
                  <config-usuario />
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-center" v-else>
    <div class="flex flex-center text-h4">Nível 3 necessário</div>
  </div>
</template>

<script>
import { api } from "src/boot/axios";

import { useStore } from "src/stores/store";
//import ConfigGrupoNint from "src/components/ConfigGrupoNint.vue";
import ConfigBlacklist from "src/components/ConfigBlacklist.vue";
import ConfigUsuario from "src/components/ConfigUsuario.vue";
import ConfigGrupo from "src/components/ConfigGrupo.vue";

export default {
  components: { ConfigBlacklist, ConfigUsuario, ConfigGrupo },
  name: "ConfigSud",
  created() {},
  data() {
    return {
      tab: "1",
    };
  },
  setup() {
    const store = useStore();

    return {
      // API
      api,
      store,
    };
  },
  props: {},

  methods: {
    voltar() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped></style>
