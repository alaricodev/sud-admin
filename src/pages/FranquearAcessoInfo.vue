<template>
  <!-- Lista Grupos e franquear acesso -->
  <q-dialog persistent v-model="telaGrupo">
    <q-card style="min-width: 500px">
      <q-bar class="bg-primary text-white">
        <q-icon name="group" />
        <div>Franquear acesso ao Grupo</div>
        <q-space />
        <q-btn flat icon="close" v-close-popup />
      </q-bar>
      <q-card-section>
        <q-scroll-area style="height: 450px; max-width: 100%">
          <q-item
            class="q-my-md bg-grey-3"
            v-for="(grupo, i) in grupos"
            :key="grupo"
          >
            <q-item-section side top>
              <q-checkbox v-model="checkNints[i]" />
            </q-item-section>
            <q-item-section avatar>
              <q-icon color="primary" name="group" />
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ grupo.nome }}</q-item-label>
              <q-item-label caption>{{ grupo.descricao }}</q-item-label>
            </q-item-section>
            <q-item-section side top v-if="grupo == grupoSelecionado">
              <q-icon name="check" color="green" />
            </q-item-section>
          </q-item>
        </q-scroll-area>
      </q-card-section>
      <q-separator color="primary" />
      <q-card-actions align="right">
        <q-btn
          flat
          icon="add"
          color="green"
          label="Franquear acesso"
          @click="franquearAcesso()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Buscar policial por nome -->
  <q-dialog persistent v-model="telaProcuraPolicial">
    <q-card style="width: 500px">
      <q-bar>
        <q-icon name="search" />
        <div class="text-body1">Procurar Delegado por nome</div>
        <q-space />
        <q-btn flat icon="close" size="sm" v-close-popup></q-btn>
      </q-bar>
      <q-card-section>
        <q-input
          outlined
          v-model="nomePolicialPesquisa"
          label="Informe o nome completo ou parcial do Delegado"
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
                Buscar delegados com esse nome
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
            <!-- <q-img src="../../public/ntsh.png" /> -->
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
        class="col-11 text-h5 q-pa-sm text-grey-6"
        style="background-color: rgb(243, 241, 241); border-radius: 15px"
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
      <div
        v-if="store.login.nint || store.login.dipc"
        style="width: 15%"
        class="bg-white"
      >
        <q-btn
          label="Escolher Delegado"
          color="primary"
          icon="search"
          @click="telaProcuraPolicial = true"
        >
          <q-tooltip class="bg-primary text-body2" :offset="[10, 10]">
            Procurar por nome do policial
          </q-tooltip>
        </q-btn>
      </div>
      <div v-if="store.login.dipc" style="width: 15%" class="bg-white">
        <q-btn
          label="Escolher Grupo"
          color="primary"
          icon="fa-solid fa-people-group"
          @click="telaGrupo = true"
        >
          <q-tooltip class="bg-primary text-body2" :offset="[10, 10]">
            Selecionar grupo
          </q-tooltip>
        </q-btn>
      </div>
      <q-space />
      <!-- <div style="width: 35%" class="bg-white text-h6 q-pt-sm text-right">
        <span class="text-grey-8"> Acesso ao caso:</span>
        <span v-if="dadosCarregados" class="text-grey-10 text-italic"
          >{{ dadosAcesso.length }} policiais</span
        >.
      </div> -->
      <div style="margin-top: 1px; margin-left: 15px"></div>
    </div>
    <q-separator class="q-my-md" />
    <div class="full-width q-pa-md">
      <div v-if="dadosAcesso">
        <q-scroll-area style="height: 650px; width: 100%">
          <div
            class="full-width"
            v-for="nomeGrupo in nomeGrupos"
            :key="nomeGrupo.id"
          >
            <q-expansion-item
              class="shadow-1 overflow-hidden q-my-md"
              style="border-radius: 10px"
              icon="fa-solid fa-people-group"
              :label="nomeGrupo.nome"
              :caption="nomeGrupo.descricao"
              header-class="bg-primary text-grey-3 text-overline"
              expand-icon-class="text-white"
            >
              <q-card>
                <q-card-section>
                  <div class="flex flex-nowrap">
                    <usuario-card
                      v-for="dado in userNint(nomeGrupo.id)"
                      :key="dado.id"
                      :dados="dado"
                      :funcao="removerAcessoUsuario"
                    />
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </div>
          <div class="full-width">
            <q-expansion-item
              class="shadow-1 overflow-hidden q-my-md"
              style="border-radius: 10px"
              icon="fa-solid fa-person-walking"
              label="Policiais"
              caption="Policiais que tem acesso ao caso"
              header-class="bg-blue-grey text-white text-overline"
              expand-icon-class="text-white"
            >
              <q-card>
                <q-card-section>
                  <div class="flex flex-nowrap">
                    <usuario-card
                      v-for="acesso in dadosAcesso"
                      :key="acesso.id"
                      :dados="acesso"
                      :funcao="removerAcessoUsuario"
                    />
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </div>
        </q-scroll-area>
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
    this.carregaGrupo();
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
      dadosAcessoGrupo: null,
      nomeGrupos: null,

      telaGrupo: false,
      grupos: null,
      gruposFiltrados: null,
      checkNints: [],
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

    telaGrupo() {
      if (this.telaGrupo) {
        this.limpaChecksNint();
      }
    },
  },

  methods: {
    userNint(id) {
      const temp = this.dadosAcessoGrupo.filter(
        (item) => item.id_grupo_nint == id
      );

      return temp;
    },

    limpaChecksNint() {
      for (let i = 0; i < this.grupos.length; i++) {
        this.checkNints.push(false);
      }
    },

    montarArrayGrupo() {
      const ret = [];

      for (let i = 0; i < this.checkNints.length; i++) {
        if (this.checkNints[i]) {
          ret.push({
            id_grupo: this.grupos[i].id,
            nome: this.grupos[i].nome,
          });
        }
      }

      return ret;
    },

    parametroEmail(dados) {
      let to = "";
      let cc = "";
      if (dados.length > 0) {
        to = dados[0].email_funcional;
        dados.shift();
        const emails = dados.map((item) => item.email_funcional);

        cc = emails.join(",");
      } else {
        to = dados[0].email_funcional;
        cc = "";
      }
      return { to: to, cc: cc };
    },

    montarArrayGrupoID() {
      const ret = [];

      for (let i = 0; i < this.checkNints.length; i++) {
        if (this.checkNints[i]) {
          ret.push(this.grupos[i].id);
        }
      }

      return `array${JSON.stringify(ret)}`;
    },

    async franquearAcesso() {
      const params = {
        codigo_sys_func: "20021",
        cpf_log: this.store.login.cpf_log,
        id_caso: this.dados.id,
        array_grupo: this.montarArrayGrupo(),
      };

      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params);
      this.store.telaCarregamento(false);

      if (resposta.data.status_ret == 0) {
        this.limpaChecksNint();
        this.telaGrupo = false;

        const params2 = {
          codigo_sys_func: "10009",
          cpf_log: this.store.login.cpf_log,
          id_grupos: this.montarArrayGrupoID(),
        };

        const resposta2 = await api.post("/consulta", params2);

        if (!process.env.DEV) {
          let params3 = this.parametroEmail(resposta2.data);
          params3["protocolo"] = this.dados.protocolo;
          params3["tipo"] = this.dados.tipo;
          const resposta3 = await api.post("/sendmail", params3);
        }

        this.carregaDadosAcessos();
        this.store.alerta(resposta.data.retorno);
      } else {
        this.store.alerta(resposta.data.retorno);
      }
    },

    async carregaGrupo() {
      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "20019",
        tipo_crud: 4,
      };

      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params);
      this.store.telaCarregamento(false);
      this.grupos = resposta.data;
      this.gruposFiltrados = resposta.data;
    },

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
        const params2 = {
          codigo_sys_func: "10009",
          cpf_log: this.store.login.cpf_log,
          id_grupos: this.montarArrayGrupoID(),
        };

        const resposta2 = await api.post("/consulta", params2);

        if (!process.env.DEV) {
          let params3 = this.parametroEmail(resposta2.data);
          params3["protocolo"] = this.dados.protocolo;
          params3["tipo"] = this.dados.tipo;

          const resposta3 = await api.post("/sendmail", params3);
        }

        this.telaProcuraPolicial = false;
        this.carregaDadosAcessos();
      } else {
        this.store.alerta(resposta.data.retorno);
      }
    },

    async carregaDadosAcessos() {
      const params1 = {
        codigo_sys_func: "10010",
        cpf_log: this.store.login.cpf_log,
        id_caso: this.dados.id,
      };

      const params2 = {
        codigo_sys_func: "10011",
        cpf_log: this.store.login.cpf_log,
        id_caso: this.dados.id,
      };

      this.store.telaCarregamento(true);
      const resposta1 = await api.post("/consulta", params1);
      const resposta2 = await api.post("/consulta", params2);
      this.store.telaCarregamento(false);

      this.dadosAcesso = resposta1.data;
      this.dadosAcessoGrupo = resposta2.data;

      const objTemp = this.dadosAcessoGrupo.filter(
        (obj, index, self) =>
          index === self.findIndex((o) => o.id_grupo_nint === obj.id_grupo_nint)
      );

      this.nomeGrupos = objTemp.map((item) => {
        return {
          id: item.id_grupo_nint,
          nome: item.nome_grupo_nint,
          descricao: item.nint_descricao,
        };
      });

      console.log(this.dadosAcesso);
      console.log(this.dadosAcessoGrupo);
    },

    async buscaPoliciaisPorNome(nome) {
      if (!nome) {
        this.store.alerta("Favor informar o nome do Delegado");
        return false;
      }

      if (nome.length < 4) {
        this.store.alerta(
          "Favor informar pelo menos <b>4 letras</b> do nome parcial do Delegado"
        );
        return false;
      }

      // Limpar dados da pesquisa anterior
      this.nomesPesquisados = null;
      this.policialSelecionado = null;

      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10008A",
        nome: `%${nome.toUpperCase()}%`,
        cargo: "DELEGADO DE POLICIA CIVIL",
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

    async removerAcessoUsuario(id) {
      const params = {
        codigo_sys_func: "20005",
        tipo_crud: 2,
        cpf_log: this.store.login.cpf_log,
        id: id,
      };

      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params);
      this.store.telaCarregamento(false);

      if (resposta.data.status_ret != 1) {
        this.carregaDadosAcessos();
      } else {
        this.store.alerta(resposta.data.retorno);
      }
    },

    retornaFoto(foto) {
      return `https://getin.pc.sc.gov.br/get_files_imgUser/${foto}`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
