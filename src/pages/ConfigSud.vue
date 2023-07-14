<template>
  <div
    class="q-ma-md bg-white"
    style="
      border-radius: 20px;
      border: 1px solid #616161;
      width: 98%;
      height: 700px;
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
    <div>
      <div class="q-pa-md">
        <div class="q-gutter-y-md" style="max-width: 100%">
          <q-card>
            <q-tabs
              v-model="tab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              narrow-indicator
            >
              <q-tab name="1" label="Grupos NINT" icon="fa-solid fa-sitemap" />
              <q-tab
                name="2"
                label="BlackList Telefones"
                icon="fa-solid fa-phone-slash"
              />
              <q-tab
                name="3"
                label="Parâmetros"
                icon="fa-solid fa-stroopwafel"
              />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated style="height: 500px">
              <q-tab-panel name="1">
                <div class="text-h6">Mails</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </q-tab-panel>

              <q-tab-panel name="2">
                <div class="text-h6">Alarms</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </q-tab-panel>

              <q-tab-panel name="3">
                <div class="text-h6">Movies</div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "src/boot/axios";

import { useStore } from "src/stores/store";

export default {
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
