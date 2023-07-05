<template>
  <div v-if="infoUso" class="q-pa-md" style="max-width: 350px">
    <q-expansion-item>
      <template v-slot:header>
        <q-item-section avatar>
          <img
            :src="fotoUsu"
            style="border-radius: 50%; width: 50px; height: 50px"
          />
        </q-item-section>

        <q-item-section>
          <div class="text-white">{{ infoUso.nome }}</div>
        </q-item-section>
      </template>

      <q-card>
        <q-card-section>
          <div class="q-pa-sm" style="width: 100%">
            <q-input
              outlined
              dense
              v-model="cpf"
              label="Trocar usuário"
              mask="###.###.###-##"
              unmasked-value
            />
          </div>
        </q-card-section>
        <q-card-actions align="center">
          <q-btn label="Trocar" @click="carregaInfoUsu(cpf)" />
        </q-card-actions>
      </q-card>
    </q-expansion-item>
  </div>
</template>

<script>
import { useStore } from "/src/stores/store.js";
import { ref } from "vue";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
export default {
  name: "UsuarioInfo",
  created() {
    this.carregaInfoUsu(this.store.login.cpf_log);
  },
  setup() {
    const store = useStore();
    const $q = useQuasar();
    function alerta(msg) {
      $q.dialog({
        title: "Aviso",
        message: msg,
        html: true,
      }).onOk(() => {
        // console.log('OK')
      });
    }
    return {
      store,
      api,
      alerta,
      infoUso: ref(null),
      cpf: ref(null),
    };
  },
  props: {},
  computed: {
    fotoUsu() {
      return `https://getin.pc.sc.gov.br/get_files_imgUser/${this.infoUso.foto}`;
    },
  },
  methods: {
    async carregaInfoUsu(cpf) {
      const params = {
        cpf: cpf,
        codigo_sys_func: "10007",
      };

      const resposta = await api.post("/consulta", params);

      if (resposta.data) {
        this.infoUso = resposta.data[0];
        this.store.login.cpf_log = this.infoUso.cpf;
        this.store.login.id_usuario = this.infoUso.id;
        this.cpf = "";
      } else {
        this.store.alerta("Usuário não localizado  !");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
