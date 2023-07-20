<template>
  <!-- Buscar policial por nome -->
  <q-dialog persistent v-model="telaProcuraPolicial">
    <q-card style="width: 500px">
      <q-bar>
        <q-icon name="search" />
        <div class="text-body1">Procurar Policial por nome</div>
        <q-space />
        <q-btn flat icon="close" size="sm" v-close-popup></q-btn>
      </q-bar>
      <q-card-section>
        <divc
          >Adicionar ao grupo:
          <span class="text-grey-8">{{ grupoSelecionado.nome }}</span></divc
        >
      </q-card-section>
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
                @click="AddPolicialGrupo(policial)"
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

  <!-- Cadastro de Grupo -->
  <q-dialog persistent v-model="telaCadGrupo">
    <q-card style="min-width: 500px">
      <q-bar class="bg-primary text-white">
        <q-icon name="group" />
        <div class="text-overline">Cadastrar Grupo</div>
        <q-space />
        <q-btn flat dense icon="close" v-close-popup />
      </q-bar>
      <q-card-section>
        <div class="full-width q-my-md">
          <q-input
            v-model="cadNomeGrupo"
            outlined
            dense
            label="Nome do Grupo"
          />
        </div>
        <div class="full-width q-my-md">
          <q-input
            v-model="cadDescGrupo"
            outlined
            dense
            label="Descrição do Grupo"
          />
        </div>
      </q-card-section>
      <q-separator color="primary" />
      <q-card-actions align="right">
        <q-btn
          flat
          icon="save"
          label="Salvar"
          color="green"
          @click="salvarNovoGrupo()"
        />
        <q-btn flat icon="close" label="Cancelar" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Tela Principal -->
  <q-page style="min-height: 100%">
    <div class="full-width">
      <div class="row justify-between" style="gap: 5px 0; height: 100%">
        <div style="width: 49.5%">
          <q-bar>
            <q-icon name="group" size="xs" />
            <div>GRUPO DE USUÁRIOS NINT</div>
            <q-space />
            <q-btn
              flat
              dense
              icon="fa-solid fa-circle-plus"
              color="grey-10"
              @click="telaCadGrupo = true"
            >
              <q-tooltip
                :delay="500"
                class="bg-primary text-body2"
                :offset="[10, 10]"
              >
                Adicionar novo grupo
              </q-tooltip>
            </q-btn>
          </q-bar>
          <q-scroll-area style="height: 450px; max-width: 100%">
            <q-item
              class="q-my-md bg-grey-3"
              v-for="grupo in grupos"
              :key="grupo"
              clickable
              @click="selecionarGrupo(grupo)"
            >
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
        </div>
        <q-separator vertical />
        <div style="width: 49.5%">
          <q-bar>
            <q-icon name="people" size="xs" />
            <div v-if="grupoSelecionado">
              USUÁRIOS DO GRUPO: {{ grupoSelecionado.nome }}
            </div>
            <div v-else>USUÁRIOS DO GRUPO</div>
            <q-space />
            <q-btn
              v-if="grupoSelecionado"
              flat
              dense
              icon="fa-solid fa-user-plus"
              color="grey-10"
              @click="telaProcuraPolicial = true"
            >
              <q-tooltip
                :delay="500"
                class="bg-primary text-body2"
                :offset="[10, 10]"
              >
                Adicionar usuário ao Grupo
              </q-tooltip>
            </q-btn>
          </q-bar>
          <q-scroll-area style="height: 450px; max-width: 100%">
            <div class="flex flex-center">
              <usuario-card-small
                v-for="usuario in usuariosGrupo"
                :key="usuario"
                :funcao="removerUsuarioGrupo"
                :usuario="usuario"
              />
            </div>
          </q-scroll-area>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useStore } from "src/stores/store";
import { api } from "src/boot/axios";
import { abreviarSobrenomes } from "src/utils/util.js";
import UsuarioCardSmall from "./UsuarioCardSmall.vue";

export default {
  components: { UsuarioCardSmall },
  name: "ConfigGrupoNint",
  created() {
    this.carregaGrupo();
  },
  setup() {
    const store = useStore();
    return { store, abreviarSobrenomes };
  },
  data() {
    return {
      //CADASTRO DE GRUPO
      telaCadGrupo: false,
      cadNomeGrupo: null,
      cadDescGrupo: null,

      // USUÁRIOS
      telaProcuraPolicial: false,
      nomePolicialPesquisa: null,
      nomesPesquisados: null,
      usuariosGrupo: null,

      //GRUPOS:
      grupos: null,
      grupoSelecionado: null,
    };
  },
  props: {},
  methods: {
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
    },

    async carregaUsuGrupo() {
      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "20020",
        tipo_crud: 4,
        id_grupo: this.grupoSelecionado.id,
      };

      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params);
      this.store.telaCarregamento(false);

      this.usuariosGrupo = resposta.data;
    },

    async salvarNovoGrupo() {
      if (!this.cadNomeGrupo || this.cadNomeGrupo.lenght < 5) {
        this.store.alerta("Informar um nome de GRUPO válido");
        return false;
      }

      if (!this.cadDescGrupo || this.cadDescGrupo.lenght < 10) {
        this.store.alerta("Favor informar uma descrição Válida para o Grupo");
        return false;
      }

      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "20019",
        tipo_crud: 1,
        nome: this.cadNomeGrupo,
        descricao: this.cadDescGrupo,
      };

      try {
        const resposta = await api.post("/consulta", params);
        console.log(resposta);
        if (resposta.data.status_ret == 0) {
          this.cadNomeGrupo = null;
          this.cadDescGrupo = null;
          this.telaCadGrupo = false;
          this.store.alerta(resposta.data.retorno);
          this.carregaGrupo();
        } else {
          this.telaCadGrupo = false;
          this.store.alerta(resposta.data.retorno);
          this.cadNomeGrupo = null;
          this.cadDescGrupo = null;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async selecionarGrupo(grupo) {
      if (!this.grupoSelecionado || this.grupoSelecionado !== grupo) {
        this.grupoSelecionado = grupo;
        this.carregaUsuGrupo();
      }
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
    async AddPolicialGrupo(policial) {
      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "20020",
        tipo_crud: 1,
        id_grupo: this.grupoSelecionado.id,
        id_usuario: policial.id,
        cpf_atribuicao: this.store.login.cpf_log,
      };

      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params);
      this.store.telaCarregamento(false);

      if (resposta.data.status_ret == 0) {
        this.telaProcuraPolicial = false;
        this.carregaUsuGrupo();
        this.store.alerta(resposta.data.retorno);
      } else {
        this.store.alerta(resposta.data.retorno);
      }
    },
    async removerUsuarioGrupo(id) {
      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "20020",
        tipo_crud: 2,
        id: id,
      };
      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params);
      this.store.telaCarregamento(false);

      if (resposta.data.status_ret == 0) {
        this.telaProcuraPolicial = false;
        this.carregaUsuGrupo();
        this.store.alerta(resposta.data.retorno);
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

<style></style>
