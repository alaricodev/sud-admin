<template>
  <q-dialog persistent v-model="telaProcuraPolicial">
    <q-card style="width: 500px">
      <q-bar>
        <q-icon name="search" />
        <div class="text-body1">Procurar Policial por nome</div>
        <q-space />
        <q-btn flat icon="close" size="sm" v-close-popup></q-btn>
      </q-bar>
      <q-card-section>
        <q-input
          outlined
          v-model="nomePolicialPesquisa"
          label="Informe o nome completo ou parcial do policial"
          color="primary"
          @keyup.enter="buscaPoliciaisPorNome(nomePolicialPesquisa)"
        >
          <template v-slot:append>
            <q-btn
              flat
              color="primary"
              icon="search"
              @click="buscaPoliciaisPorNome(nomePolicialPesquisa)"
            >
              <q-tooltip class="bg-primary text-body2" :offset="[10, 10]">
                Buscar policiais com esse nome
              </q-tooltip>
            </q-btn>
          </template>
        </q-input>
      </q-card-section>
      <q-separator color="primary" class="q-my-sm" />
      <q-card-section>
        <q-scroll-area style="height: 300px; max-width: 490px">
          <div v-if="nomesPesquisados">
            <div
              class="q-pa-sm"
              v-for="policial in nomesPesquisados"
              :key="policial.id"
            >
              <q-item
                clickable
                style="
                  background-color: rgb(247, 246, 246);
                  border-radius: 5px;
                  border: 1px solid rgb(201, 198, 198);
                "
                @click="concedeAcesso(policial)"
              >
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="retornaFoto(policial.foto)" />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ policial.nome }}</q-item-label>
                  <q-item-label caption>
                    Matricula: {{ policial.matricula }} CPF: {{ policial.cpf }}
                  </q-item-label>
                  <q-item-label caption>
                    Cargo: {{ policial.cargo }}
                  </q-item-label>
                </q-item-section>

                <q-item-section side top>
                  <q-badge
                    :color="store.corAcesso(policial.nivel_acesso)"
                    :label="policial.nivel_acesso"
                  />
                </q-item-section>
              </q-item>
            </div>
          </div>
          <div v-else class="flex flex-center">
            <q-img src="../../public/ntsh.png" width="200px" height="200px" />
          </div>
        </q-scroll-area>
      </q-card-section>
      <q-separator color="primary" class="q-my-sm" />
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Página principal começa aqui -->
  <q-page
    v-if="dadosCarregados"
    class="q-ma-md bg-white"
    style="
      border-radius: 20px;
      border: 1px solid #616161;
      width: 98%;
      height: 400px;
    "
  >
    <div class="q-ma-md row" style="width: 98%">
      <div
        class="col-11 text-h5 q-pa-sm"
        style="background-color: rgb(228, 226, 226); border-radius: 15px"
      >
        CASO: {{ dados.protocolo }}
      </div>
      <q-space />
      <div class="col q-pl-sm q-pt-sm">
        <q-btn
          color="primary"
          label="Voltar"
          icon="arrow_back"
          @click="voltar(dados.tipo, dados.id)"
        />
      </div>
    </div>
    <q-separator class="q-my-sm" />
    <div class="q-ma-md row" style="width: 98%">
      <div style="width: 30%" class="bg-white">
        <q-btn
          label="Escolher Policial"
          color="primary"
          icon="search"
          @click="telaProcuraPolicial = true"
        >
          <q-tooltip class="bg-primary text-body2" :offset="[10, 10]">
            Procurar por nome do policial
          </q-tooltip>
        </q-btn>
      </div>
      <div style="margin-top: 1px; margin-left: 15px"></div>
    </div>
    <q-separator class="q-my-md" />
    <div class="full-width q-pa-md">
      <div v-if="dadosAcesso" style="display: flex; flex-wrap: wrap">
        <usuario-card
          v-for="acesso in dadosAcesso"
          :key="acesso.id"
          :dados="acesso"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { api } from "src/boot/axios";
import { useStore } from "src/stores/store";
import UsuarioCard from "src/components/UsuarioCard.vue";
export default {
  name: "FranquearAcessoInfo",

  components: { UsuarioCard },

  created() {
    this.carregarCaso(this.$route.params.id);
  },

  setup() {
    const store = useStore();
    return {
      store,
    };
  },

  data() {
    return {
      dadosCarregados: false,
      dados: null,
      cpfPesquisa: null,
      tab: "1",
      telaProcuraPolicial: false,
      nomePolicialPesquisa: null,
      nomesPesquisados: null,
      policialSelecionado: null,
      dadosAcesso: null,
    };
  },

  watch: {
    telaProcuraPolicial() {
      // watch utilizado para quando a tela for fechada zerar os parametros de pesquisa.
      if (this.telaProcuraPolicial == false) {
        this.nomesPesquisados = null;
        this.nomePolicialPesquisa = null;
      }
    },
  },

  methods: {
    async carregarCaso(idCaso) {
      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10005",
        id_caso: idCaso,
      };

      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params);
      this.store.telaCarregamento(false);

      this.dados = resposta.data.casos[0];

      this.carregaDadosAcessos();

      if (this.dados.status_ret == 1) {
        this.store.alerta(this.dados.retorno);
      } else {
        this.dadosCarregados = true;
      }
    },
    voltar(tipo, id) {
      this.$router.push(this.store.rotaCaso(tipo, id));
    },

    async concedeAcesso(policial) {
      const params = {
        codigo_sys_func: "20005",
        tipo_crud: 1,
        cpf_log: this.store.login.cpf_log,
        id_caso: this.dados.id,
        id_usuario: policial.id,
      };

      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params);
      this.store.telaCarregamento(false);

      if (resposta.data.status_ret != 1) {
        this.store.alerta("Acesso ao caso fornecido com sucesso !");
        this.telaProcuraPolicial = false;
        this.carregaDadosAcessos();
      } else {
        console.log(resposta);
        this.store.alerta(resposta.data.retorno);
      }
    },

    async carregaDadosAcessos() {
      const params = {
        codigo_sys_func: "20005",
        tipo_crud: 4,
        cpf_log: this.store.login.cpf_log,
        id_caso: this.dados.id,
      };

      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params);
      this.store.telaCarregamento(false);

      this.dadosAcesso = resposta.data;
      console.log(dadosAcesso.length);
    },

    async buscaPoliciaisPorNome(nome) {
      if (!nome) {
        this.store.alerta("Favor informar o nome do policial");
        return false;
      }

      if (nome.length < 4) {
        this.store.alerta(
          "Favor informar pelo menos <b>4 letras</b> do nome parcial do policial"
        );
        return false;
      }

      // Limpar dados da pesquisa anterior
      this.nomesPesquisados = null;
      this.policialSelecionado = null;

      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10008",
        nome: `%${nome.toUpperCase()}%`,
      };

      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params);
      this.store.telaCarregamento(false);

      if (resposta.data) {
        this.nomesPesquisados = resposta.data;
      } else {
        this.store.alerta("Nenhum nome <b> encontrado");
      }

      return true;
    },

    retornaFoto(foto) {
      return `https://getin.pc.sc.gov.br/get_files_imgUser/${foto}`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
