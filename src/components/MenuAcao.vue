<template>
  <!-- Arquivamento da denúncia -->
  <q-dialog persistent v-model="telaArquivamento">
    <q-card>
      <q-bar>
        <q-icon name="fa-solid fa-box-archive" />
        <div>Arquivamento de denúncia</div>
        <q-space />
        <q-icon name="close" v-close-popup />
      </q-bar>
      <q-card-section>
        <q-item>
          <q-item-section top avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label
              ><b>{{ store.login.nome_usuario }}</b></q-item-label
            >
            <q-item-label
              >Arquivará a informação em: <b> {{ dataAtual }} </b>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-separator class="q-my-sm" />

      <q-card-section>
        <div class="text-subtitle1 full-width">
          Para arquivar a informação, escreva abaixo: <b>CONFIRMO</b> e após o
          botão aparecer, clique nele.
        </div>
        <div class="full-width q-pa-md">
          <q-input
            outlined
            v-model="confirma"
            mask="AAAAAAAA"
            ref="refConfirmo"
          />
        </div>
      </q-card-section>
      <q-separator class="q-my-sm" />
      <q-card-actions align="right">
        <q-btn
          label="Confirmar"
          color="red"
          v-if="confirma.toUpperCase() == 'CONFIRMO'"
          @click="arquivarInformacao()"
        />
        <q-btn flat label="Cancelar" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Menu Principal começa aqui -->
  <div>
    <q-btn flat icon="menu">
      <!-- Estrutura de menu -->
      <q-menu transition-show="flip-right" transition-hide="flip-left">
        <q-list style="min-width: 100px">
          <q-item clickable @click="telaArquivamento = true">
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
            <q-item-section>Classificar a informação </q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable @click="franquearAcesso()">
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
import { useStore } from "src/stores/store";
import { api } from "src/boot/axios";
import { formatarDataExtenso } from "src/utils/util";
export default {
  name: "MenuAcao",
  created() {},
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
  data() {
    return {
      telaArquivamento: false,
      confirma: "",
    };
  },

  computed: {
    dataAtual() {
      var dataAtual = new Date();
      var timestamp = dataAtual.getTime();
      return formatarDataExtenso(timestamp);
    },
  },
  props: {
    caso: {
      type: Object,
      required: true,
    },
  },
  methods: {
    franquearAcesso() {
      this.$router.push(`/franquearacessoinfo/${this.caso.id}`);
    },
    async arquivarInformacao() {
      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "20002",
        tipo_crud: 3,
        id: this.caso.id,
        arquivamento: true,
      };

      const resposta = await api.post("/consulta", params);

      console.log(resposta);

      if (resposta.data.status_ret == 0) {
        this.telaArquivamento = false;
        this.$router.go();
        this.confirma = "";
        this.store.alerta(resposta.data.retorno);
      } else {
        this.store.alerta(resposta.data.retorno);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
