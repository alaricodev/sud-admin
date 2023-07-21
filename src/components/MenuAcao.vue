<template>
  <!-- Qualidade da informação  -->
  <q-dialog persistent v-model="telaClassificaco">
    <q-card>
      <q-bar>
        <q-icon name="fa-regular fa-star" />
        <div>Classificar qualidade da informação</div>
        <q-space />
        <q-icon name="close" @click="cancelar(3)" />
      </q-bar>

      <q-card-section>
        <q-item>
          <q-item-section top avatar>
            <q-avatar>
              <img :src="retornaFoto(store.login.foto_usuario)" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label
              ><b>{{ store.login.nome_usuario }}</b></q-item-label
            >
            <q-item-label
              >Alteração da classificação da qualidade da informação:
              <b> {{ dataAtual }} </b>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="flex flex-center">
          <q-rating
            v-model="classificacao"
            size="3.5em"
            color="yellow"
            icon="star_border"
            icon-selected="star"
          />
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          flat
          label="Alterar"
          v-if="classificacao"
          @click="alterarClassificacao()"
        />
        <q-btn flat label="Cancelar" @click="cancelar(3)" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Mudar Sigilo  -->
  <q-dialog persistent v-model="telaSigilo">
    <q-card>
      <q-bar>
        <q-icon name="fa-solid fa-user-secret" />
        <div>Nível de Sigilo da informação</div>
        <q-space />
        <q-icon name="close" @click="cancelar(2)" />
      </q-bar>

      <q-card-section>
        <q-item>
          <q-item-section top avatar>
            <q-avatar>
              <img :src="retornaFoto(store.login.foto_usuario)" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label
              ><b>{{ store.login.nome_usuario }}</b></q-item-label
            >
            <q-item-label
              >Alteração do nível de sigilo da informação:
              <b> {{ dataAtual }} </b>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="flex flex-center">
          <div
            :class="`bg-${store.corAcesso(nivelSigiloInfo)}`"
            style="border-radius: 50%; width: 120px; height: 120px"
            class="flex flex-center"
          >
            <div class="text-h1 text-white">
              {{ nivelSigiloInfo }}
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row flex flex-center">
          <q-btn icon="fa-solid fa-minus" @click="valorNivelSigilo('-')" />
          <q-btn icon="fa-solid fa-plus" @click="valorNivelSigilo('+')" />
        </div>
      </q-card-section>

      <q-separator />
      <q-card-section>
        <div class="text-subtitle1 full-width">
          Para alterar no <b>nível de sigilo da informação</b>, escreva abaixo:
          <b>CONFIRMO</b> e após o botão aparecer, clique nele.
        </div>
        <div class="full-width q-pa-md">
          <q-input
            outlined
            v-model="confirmaSigilo"
            mask="AAAAAAAA"
            ref="refConfirmo2"
          />
        </div>
      </q-card-section>

      <q-separator class="q-my-sm" />
      <q-card-actions align="right">
        <q-btn
          label="Alterar"
          color="red"
          v-if="confirmaSigilo.toUpperCase() == 'CONFIRMO'"
          @click="alterarNivelSigilo()"
        />
        <q-btn flat label="Cancelar" @click="cancelar(2)" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Arquivamento da denúncia -->
  <q-dialog persistent v-model="telaArquivamento">
    <q-card>
      <q-bar>
        <q-icon name="fa-solid fa-box-archive" />
        <div>Arquivamento de denúncia</div>
        <q-space />
        <q-icon name="close" @click="cancelar(1)" />
      </q-bar>
      <q-card-section>
        <q-item>
          <q-item-section top avatar>
            <q-avatar>
              <img :src="retornaFoto(store.login.foto_usuario)" />
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
        <q-btn flat label="Cancelar" @click="cancelar(1)" />
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
          <q-item clickable @click="telaSigilo = true">
            <q-item-section avatar
              ><q-icon color="grey-8" name="fa-solid fa-user-secret"
            /></q-item-section>
            <q-item-section>Alterar nível de sigilo</q-item-section>
          </q-item>

          <q-item clickable @click="telaClassificaco = true">
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
  created() {
    this.nivelSigiloInfo = this.caso.nivel_sigilo;
    this.classificacao = this.caso.qualidade_info;
  },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
  data() {
    return {
      telaArquivamento: false,
      telaSigilo: false,
      telaClassificaco: false,
      confirma: "",
      confirmaSigilo: "",
      confirmaClassificacao: "",
      classificacao: null,
      nivelSigiloInfo: null,
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

      if (resposta.data.status_ret == 0) {
        this.telaArquivamento = false;
        this.$router.go();
        this.confirma = "";
        this.store.alerta(resposta.data.retorno);
      } else {
        this.store.alerta(resposta.data.retorno);
      }
    },
    async alterarNivelSigilo() {
      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "20002",
        tipo_crud: 3,
        id: this.caso.id,
        nivel_sigilo: this.nivelSigiloInfo,
      };

      const resposta = await api.post("/consulta", params);

      if (resposta.data.status_ret == 0) {
        this.telaArquivamento = false;
        this.$router.go();
        this.confirma = "";
        this.store.alerta(resposta.data.retorno);
      } else {
        this.store.alerta(resposta.data.retorno);
      }
    },

    async alterarClassificacao() {
      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "20002",
        tipo_crud: 3,
        id: this.caso.id,
        qualidade_info: this.classificacao,
      };

      const resposta = await api.post("/consulta", params);

      if (resposta.data.status_ret == 0) {
        this.telaArquivamento = false;
        this.$router.go();
        this.confirma = "";
        this.store.alerta(resposta.data.retorno);
      } else {
        this.store.alerta(resposta.data.retorno);
      }
    },

    valorNivelSigilo(oper) {
      if (oper == "+") {
        if (this.nivelSigiloInfo < 3) {
          this.nivelSigiloInfo += 1;
        }
      } else {
        if (this.nivelSigiloInfo > 1) {
          this.nivelSigiloInfo -= 1;
        }
      }
    },

    retornaFoto(foto) {
      return `https://getin.pc.sc.gov.br/get_files_imgUser/${foto}`;
    },

    cancelar(tipo) {
      if (tipo == 1) {
        //Arquivamento de denúncia
        this.confirma = "";
        this.telaArquivamento = false;
      } else if (tipo == 2) {
        // Mudar nível de sigilo da informação
        this.confirmaSigilo = "";
        this.telaSigilo = false;
      } else {
        // Mudar a classificação da informação
        this.confirmaClassificacao = "";
        this.telaClassificaco = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
