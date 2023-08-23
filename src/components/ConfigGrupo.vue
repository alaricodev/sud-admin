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
            <!-- <q-img src="../../public/ntsh.png" width="200px" height="200px" /> -->
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
        <div class="text-overline">{{ captionTelaCadGrupo }}</div>
        <q-space />
        <q-btn flat dense icon="close" v-close-popup />
      </q-bar>
      <q-card-section>
        <div class="full-width q-my-md">
          <q-input
            v-model="cadNomeGrupo"
            outlined
            dense
            :label="nomeSubGrupo ? 'Nome Subgrupo' : 'Nome do Grupo'"
          />
        </div>
        <div class="full-width q-my-md">
          <q-input
            v-model="cadDescGrupo"
            outlined
            dense
            :label="
              nomeSubGrupo ? 'Descrição do Subgrupo' : 'Descrição do Grupo'
            "
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
          @click="salvarGrupo()"
        />
        <q-btn flat icon="close" label="Cancelar" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Tela Principal -->
  <q-page style="min-height: 100%">
    <div class="full-width">
      <div>
        <q-splitter v-model="splitterModel" style="height: 600px">
          <template v-slot:before>
            <div class="q-pa-md">
              <div class="full-width">
                <q-bar>
                  <q-btn
                    dense
                    flat
                    icon="fa-regular fa-square-plus"
                    label="Adicionar Grupo"
                    @click="adicionarGrupo()"
                    v-if="store.login.dipc && idGrupo"
                  />
                  <q-btn
                    dense
                    flat
                    icon="fa-regular fa-pen-to-square"
                    label="Editar Grupo"
                    v-if="store.login.dipc && idGrupo"
                  />
                  <q-btn
                    dense
                    flat
                    icon="fa-regular fa-square-plus"
                    label="Adicionar Subgrupo"
                    @click="adicionarSubGrupo()"
                    v-if="(store.login.nint || store.login.dipc) && idGrupo"
                  />
                  <q-btn
                    dense
                    flat
                    icon="fa-regular fa-pen-to-square"
                    label="Editar Subgrupo"
                    v-if="(store.login.dipc || store.login.nint) && idSubGrupo"
                  />
                </q-bar>
              </div>

              <q-tree
                :nodes="grupos"
                node-key="id"
                selected-color="primary"
                v-model:selected="selecionado"
                text-color="grey-7"
                default-expand-all
              />
            </div>
          </template>

          <template v-slot:after>
            <div class="q-pa-md">
              <div>
                <q-breadcrumbs separator="/" class="text-grey-8">
                  <q-breadcrumbs-el icon="home" />
                  <q-breadcrumbs-el
                    v-if="nomeGrupo"
                    :label="nomeGrupo"
                    icon="widgets"
                  />
                  <q-breadcrumbs-el
                    v-if="nomeSubGrupo"
                    :label="nomeSubGrupo"
                    icon="navigation"
                  />
                </q-breadcrumbs>
              </div>
              <div class="q-pt-md">
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
                    <q-tab
                      name="usuarios"
                      label="Usuários"
                      icon="fa-solid fa-user"
                    />
                    <q-tab
                      name="casos"
                      label="Casos"
                      icon="fa-regular fa-newspaper"
                    />
                  </q-tabs>

                  <q-separator />

                  <q-tab-panels v-model="tab" animated>
                    <q-tab-panel name="usuarios">
                      <div class="text-h6">Mails</div>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </q-tab-panel>

                    <q-tab-panel name="casos">
                      <div class="text-h6">Alarms</div>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </q-tab-panel>
                  </q-tab-panels>
                </q-card>
              </div>
            </div>
          </template>
        </q-splitter>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useStore } from "src/stores/store";
import { api } from "src/boot/axios";
import { abreviarSobrenomes } from "src/utils/util.js";
import UsuarioCardSmall from "./UsuarioCardSmall.vue";
import { ref } from "vue";

export default {
  //components: { UsuarioCardSmall },
  name: "ConfigGrupo",
  created() {
    this.carregaGrupo();
  },
  setup() {
    const store = useStore();
    return {
      store,
      abreviarSobrenomes,
    };
  },
  data() {
    return {
      //CADASTRO DE GRUPO
      telaCadGrupo: false,
      cadNomeGrupo: null,
      cadDescGrupo: null,
      captionTelaCadGrupo: null,
      captionSubgrupo: null,

      // USUÁRIOS
      telaProcuraPolicial: false,
      nomePolicialPesquisa: null,
      nomesPesquisados: null,
      usuariosGrupo: null,

      //GRUPOS:
      grupos: [],
      grupoSelecionado: null,

      //TREE
      selecionado: null,
      splitterModel: 40,
      idGrupo: null,
      nomeGrupo: null,
      idSubGrupo: null,
      nomeSubGrupo: null,

      // ABAS
      tab: "usuarios",
    };
  },
  watch: {
    selecionado() {
      this.grupoSelecionado = this.procuraSelecionado(
        this.selecionado,
        this.grupos
      );

      let tipo = this.selecionado.split("#")[0];

      if (tipo == "G") {
        this.idGrupo = this.selecionado.split("#")[1];
        this.nomeGrupo = this.grupoSelecionado.label;
        this.idSubGrupo = null;
        this.nomeSubGrupo = null;
      } else {
        this.idGrupo = this.grupoSelecionado.id_grupo;
        this.nomeGrupo = this.grupoSelecionado.nome_grupo;
        this.idSubGrupo = this.selecionado.split("#")[1];
        this.nomeSubGrupo = this.grupoSelecionado.label;
      }
    },
  },
  props: {},
  methods: {
    procuraSelecionado(id, array) {
      for (const item of array) {
        if (item.id === id) {
          return item;
        }

        if (item.children && item.children.length > 0) {
          const foundInChildren = this.procuraSelecionado(id, item.children);
          if (foundInChildren) {
            return foundInChildren;
          }
        }
      }

      return null;
    },
    async carregaGrupo() {
      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "20033",
        tipo: 3, // Vai retornar apenas os dados
      };

      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params);
      this.store.telaCarregamento(false);
      this.grupos = this.carregaArrayGrupo(resposta.data);
    },

    carregaArrayGrupo(vetor) {
      const gruposDistintos = Object.values(
        vetor.reduce((acc, objeto) => {
          acc[objeto.id_grupo] = objeto;
          return acc;
        }, {})
      );

      let retorno = [];

      function retornasubGrupos(idGrupo, nVetor) {
        const intermediario = nVetor.filter((obj) => obj.id_grupo == idGrupo);

        let paraRetorno = [];
        for (let obj of intermediario) {
          if (obj.id_subgrupo) {
            paraRetorno.push({
              id: `S#${obj.id_subgrupo}`,
              label: obj.nome_subgrupo,
              id_grupo: idGrupo,
              nome_grupo: obj.nome_grupo,
              tipo: "S",
              icon: "fa-solid fa-building-shield",
            });
          }
        }

        return paraRetorno;
      }

      for (let obj of gruposDistintos) {
        retorno.push({
          id: `G#${obj.id_grupo}`,
          label: obj.nome_grupo,
          children: retornasubGrupos(obj.id_grupo, vetor),
          tipo: "G",
          icon: "fa-solid fa-people-group",
        });
      }

      return retorno;
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

    adicionarGrupo() {
      if (this.nomeSubGrupo) {
        this.captionTelaCadGrupo = "Cadastrar Novo Sub Grupo";
      } else {
        this.captionTelaCadGrupo = "Cadastrar Novo Grupo";
      }

      this.telaCadGrupo = true;
    },

    adicionarSubGrupo() {
      this.captionSubgrupo = `Cadastrar Subgrupo do grupo: ${this.nomeGrupo}`;
    },

    async salvarGrupo() {
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

      const params2 = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "20015",
        tipo_crud: 3,
        id: policial.id,
        usuario_nint: true,
      };

      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params);
      const resposta2 = await api.post("/consulta", params2);
      this.store.telaCarregamento(false);

      if (resposta2.data.status_ret == 1) {
        this.store.alerta(resposta.data.retorno);
        return false;
      }

      if (resposta.data.status_ret == 0) {
        this.telaProcuraPolicial = false;
        this.carregaUsuGrupo();
        this.store.alerta(resposta.data.retorno);
      } else {
        this.store.alerta(resposta.data.retorno);
      }
    },
    async removerUsuarioGrupo(id, id_policial) {
      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "20020",
        tipo_crud: 2,
        id: id,
      };

      const params2 = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "20015",
        tipo_crud: 3,
        id: id_policial,
        usuario_nint: false,
      };

      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params);
      const resposta2 = await api.post("/consulta", params2);
      this.store.telaCarregamento(false);

      if (resposta2.data.status_ret == 1) {
        this.store.alerta(resposta.data.retorno);
        return false;
      }

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
