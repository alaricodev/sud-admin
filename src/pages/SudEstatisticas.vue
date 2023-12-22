<template>
  <div class="flex flex-center q-pa-md" style="height: 100vh">
    <div
      class="bg-white"
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
            name="fa-solid fa-chart-line"
            size="md"
            color="primary"
            class="q-mr-md"
          />
          <div class="text-h5">Estatísticas</div>
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
        <div class="full-width flex flex-center q-pt-md">
          <q-avatar size="130px">
            <img :src="store.retornaFoto(store.login.foto_usuario)" />
          </q-avatar>
        </div>
        <div class="full-width flex flex-center q-pt-md">
          <span class="text-h5 text-grey-8">
            {{ store.login.nome_usuario }}
          </span>
        </div>
        <q-separator color="primary" class="q-my-md" />
        <div class="full-width">
          <div class="flex flex-center">
            <div class="q-pa-md" style="max-width: 300px">
              <q-input outlined label="Data Inicial" v-model="dtIni">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="dtIni" mask="DD/MM/YYYY">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Fechar"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="q-pa-md" style="max-width: 300px">
              <q-input outlined label="Data Inicial" v-model="dtFim">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="dtFim" mask="DD/MM/YYYY">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Fechar"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="q-pa-md" style="max-width: 300px">
              <q-btn label="Processar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "src/boot/axios";
import { useStore } from "src/stores/store";
import moment from "moment";

export default {
  name: "SudEstatisticas",
  setup() {
    const store = useStore();
    return { store, api };
  },
  created() {
    this.dtIni = moment().format("DD/MM/YYYY");
    this.dtFim = moment().format("DD/MM/YYYY");
    this.carregaEstatisticas();
  },
  data() {
    return {
      dtIni: null,
      dtFim: null,
      dados: null,
    };
  },
  props: {},
  methods: {
    voltar() {
      this.$router.push("/");
    },
    async carregaEstatisticas() {
      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "20046",
        dt_ini: this.dtIni,
        dt_fim: this.dtFim,
      };
      this.store.telaCarregamento(true);

      const resposta = await api.post("/consulta", params);
      this.dados = resposta.data;

      this.store.telaCarregamento(false);
    },
  },
};
</script>

<style lang="scss" scoped></style>
