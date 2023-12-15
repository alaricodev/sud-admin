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
        <div v-if="modoCadGrupo == 'S'" class="full-width q-my-md">
          <div class="text-h6 grey-8">SubGrupo de {{ nomeGrupo }}</div>
        </div>
        <div class="full-width q-my-md">
          <q-input
            v-model="cadNomeGrupo"
            outlined
            dense
            :label="captionNomeGrupo"
          />
        </div>
        <div class="full-width q-my-md">
          <q-input
            v-model="cadDescGrupo"
            outlined
            dense
            :label="captionDescGrupo"
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
          @click="salvarOperacaoGrupo()"
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
                    @click="addGrupo()"
                    v-if="store.login.dipc && !idSubGrupo"
                  />
                  <q-btn
                    dense
                    flat
                    icon="fa-regular fa-pen-to-square"
                    label="Editar Grupo"
                    v-if="store.login.dipc && idGrupo && !idSubGrupo"
                    @click="editGrupo()"
                  />
                  <q-btn
                    dense
                    flat
                    icon="fa-regular fa-square-plus"
                    label="Adicionar Subgrupo"
                    @click="addSubGrupo()"
                    v-if="(store.login.nint || store.login.dipc) && idGrupo"
                  />
                  <q-btn
                    dense
                    flat
                    icon="fa-regular fa-pen-to-square"
                    label="Editar Subgrupo"
                    v-if="(store.login.dipc || store.login.nint) && idSubGrupo"
                    @click="editSubGrupo()"
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
                    icon="fa-solid fa-people-group"
                  />
                  <q-breadcrumbs-el
                    v-if="nomeSubGrupo"
                    :label="nomeSubGrupo"
                    icon="fa-solid fa-building-shield"
                  />
                </q-breadcrumbs>
              </div>
              <div class="full-width text-grey-5">
                {{ descricaoGrupo }}
              </div>

              <div class="q-pt-md">
                <q-card style="height: 510px">
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
                      <div class="full-width">
                        <q-btn
                          v-if="idGrupo || idSubGrupo"
                          label="Adicionar Usuário"
                          color="primary"
                          @click="addUsuGrupos()"
                        />
                      </div>

                      <q-scroll-area style="height: 300px; max-width: 100%">
                        <div class="flex flex-center">
                          <usuario-card-small
                            v-for="usuario in usuariosGrupo"
                            :key="usuario"
                            :funcao="removerUsuarioGrupo"
                            :usuario="usuario"
                            :idGrupo="idGrupo"
                            :idSubGrupo="idSubGrupo"
                          />
                        </div>
                      </q-scroll-area>
                    </q-tab-panel>

                    <q-tab-panel name="casos">
                      <div v-if="nomeGrupo">
                        <tabela-casos :tipo="2" :id="idGrupo" />
                      </div>
                      <div v-if="nomeSubGrupo">
                        <tabela-casos :tipo="3" :id="idSubGrupo" />
                      </div>
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
import TabelaCasos from "./TabelaCasos.vue";

export default {
  components: { UsuarioCardSmall, TabelaCasos },
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
      captionNomeGrupo: null,
      captionDescGrupo: null,
      modoCadGrupo: null,
      acaoCadGrupo: null,

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
      descGrupo: null,
      idSubGrupo: null,
      nomeSubGrupo: null,
      descSubGrupo: null,
      descricaoGrupo: "   ",
      filter: null,

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
        this.descGrupo = this.grupoSelecionado.desc_grupo;
        this.idSubGrupo = null;
        this.nomeSubGrupo = null;
        this.descSubGrupo = null;
        this.descricaoGrupo = this.descGrupo;
      } else {
        this.idGrupo = this.grupoSelecionado.id_grupo;
        this.nomeGrupo = this.grupoSelecionado.nome_grupo;
        this.descGrupo = this.grupoSelecionado.desc_grupo;
        this.idSubGrupo = this.selecionado.split("#")[1];
        this.nomeSubGrupo = this.grupoSelecionado.label;
        this.descSubGrupo = this.grupoSelecionado.desc_subgrupo;
        this.descricaoGrupo = this.descSubGrupo;
      }

      this.carregaCasosGrupos();
    },
  },
  props: {},
  methods: {
    carregaCasosGrupos() {
      this.carregaUsuGrupo();
    },
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
      //10025 (grupos), 10026 subgrupos
      const paramG = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10025",
      };

      const paramS = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10026",
      };

      const paramNint = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10034",
      };

      this.store.telaCarregamento(true);

      const respostaG = await api.post("/consulta", paramG);
      const respostaS = await api.post("/consulta", paramS);
      const respostaNint = await api.post("/consulta", paramNint);

      this.store.telaCarregamento(false);

      this.grupos = this.montarArvore(
        respostaG.data,
        respostaS.data,
        this.store.login.nint ? respostaNint.data[0] : 0
      );
    },

    montarArvore(rGrupos, rSubGrupos, infoNint) {
      let grupos = [];

      let masterGrupos = [];

      if (this.store.login.nint) {
        masterGrupos = rGrupos.filter((el) => el.id == infoNint.id);
      } else {
        masterGrupos = rGrupos;
      }

      for (let grupo of masterGrupos) {
        let subgrupos = rSubGrupos.filter((el) => el.id_grupo == grupo.id);

        let filho = [];

        if (subgrupos) {
          for (let subgrupo of subgrupos) {
            filho.push({
              id: `S#${subgrupo.id}`,
              label: subgrupo.nome_subgrupo,
              id_grupo: grupo.id,
              nome_grupo: subgrupo.nome_grupo,
              desc_subgrupo: subgrupo.desc_subgrupo,
              tipo: "S",
              icon: "fa-solid fa-building-shield",
            });
          }
        }

        grupos.push({
          id: `G#${grupo.id}`,
          label: grupo.nome_grupo,
          desc_grupo: grupo.desc_grupo,
          children: filho,
          tipo: "G",
          icon: "fa-solid fa-people-group",
        });
      }

      return grupos;
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
              desc_subgrupo: obj.desc_subgrupo,
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
          desc_grupo: obj.desc_grupo,
          children: retornasubGrupos(obj.id_grupo, vetor),
          tipo: "G",
          icon: "fa-solid fa-people-group",
        });
      }

      return retorno;
    },

    async carregaUsuGrupo() {
      const tipo = this.idSubGrupo ? 21 : 11;

      const params = {
        codigo_sys_func: "20034",
        cpf_log: this.store.login.cpf_log,
        tipo: tipo,
        id_grupo: this.idGrupo,
        id_subgrupo: this.idSubGrupo,
      };

      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params);
      this.store.telaCarregamento(false);

      this.usuariosGrupo = resposta.data;
    },

    addGrupo() {
      this.captionTelaCadGrupo = "Cadastrar novo Grupo";
      this.captionNomeGrupo = "Nome do Grupo";
      this.captionDescGrupo = "Descrição do Grupo";
      this.modoCadGrupo = "G";
      this.acaoCadGrupo = "C";
      this.cadNomeGrupo = null;
      this.cadDescGrupo = null;
      this.telaCadGrupo = true;
    },

    editGrupo() {
      this.captionTelaCadGrupo = "Editar Grupo";
      this.captionNomeGrupo = "Nome do Grupo";
      this.cadNomeGrupo = this.nomeGrupo;
      this.captionDescGrupo = "Descrição do Grupo";
      this.cadDescGrupo = this.descGrupo;
      this.modoCadGrupo = "G";
      this.acaoCadGrupo = "E";
      this.telaCadGrupo = true;
    },

    addSubGrupo() {
      this.captionTelaCadGrupo = "Cadastrar novo Subgrupo";
      this.captionDescGrupo = "Descrição do Subgrupo";
      this.modoCadGrupo = "S";
      this.acaoCadGrupo = "C";
      this.cadNomeGrupo = null;
      this.cadDescGrupo = null;
      this.telaCadGrupo = true;
    },

    editSubGrupo() {
      this.captionTelaCadGrupo = "Editar Subgrupo";
      this.captionNomeGrupo = "Nome do Subgrupo";
      this.cadNomeGrupo = this.nomeSubGrupo;
      this.captionDescGrupo = "Descrição do Subgrupo";
      this.cadDescGrupo = this.descSubGrupo;
      this.modoCadGrupo = "S";
      this.acaoCadGrupo = "E";
      this.telaCadGrupo = true;
    },

    addUsuGrupos() {
      if (!this.idSubGrupo && this.store.login.nint) {
        this.store.alerta("Somente DINT");
        return false;
      }

      this.nomePolicialPesquisa = null;
      this.nomesPesquisados = null;
      this.telaProcuraPolicial = true;
    },

    addPolicial() {
      this.nomePolicialPesquisa = "";
      this.telaProcuraPolicial = true;
    },

    async salvarOperacaoGrupo() {
      // Passo 01: Validação do dados

      if (!this.cadNomeGrupo || this.cadNomeGrupo.lenght < 5) {
        this.store.alerta("Informar um nome de GRUPO válido");
        return false;
      }

      if (!this.cadDescGrupo || this.cadDescGrupo.lenght < 10) {
        this.store.alerta("Favor informar uma descrição Válida para o Grupo");
        return false;
      }

      // Passo 02: montar os parâmetros conforme as opções

      let params = {};

      if (this.modoCadGrupo == "G") {
        // Caso for um  Grupo
        if (this.acaoCadGrupo == "C") {
          // Caso seja um insert
          params = {
            cpf_log: this.store.login.cpf_log,
            codigo_sys_func: "20033",
            tipo: 1, // Operações com Grupos
            tipo_crud: 1, // Insert
            nome_grupo: this.cadNomeGrupo,
            desc_grupo: this.cadDescGrupo,
          };
        } else {
          // Caso seja um update
          params = {
            cpf_log: this.store.login.cpf_log,
            codigo_sys_func: "20033",
            tipo: 1, // Operações com Grupos
            tipo_crud: 3, // Update
            nome_grupo: this.cadNomeGrupo,
            desc_grupo: this.cadDescGrupo,
            id: this.idGrupo,
          };
        }
      } else {
        // Caso for um sub grupo
        if (this.acaoCadGrupo == "C") {
          // Caso seja um insert
          params = {
            cpf_log: this.store.login.cpf_log,
            codigo_sys_func: "20033",
            tipo: 2, // Operações com Grupos
            tipo_crud: 1, // Insert
            nome_subgrupo: this.cadNomeGrupo,
            desc_subgrupo: this.cadDescGrupo,
            id: this.idGrupo,
          };
        } else {
          // Caso seja um update
          params = {
            cpf_log: this.store.login.cpf_log,
            codigo_sys_func: "20033",
            tipo: 2, // Operações com Grupos
            tipo_crud: 3, // Insert
            nome_subgrupo: this.cadNomeGrupo,
            desc_subgrupo: this.cadDescGrupo,
            id_subgrupo: this.idSubGrupo,
          };
        }
      }

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
      let params = {};

      if (this.idSubGrupo) {
        // Caso seja um subgrupo selecionado
        params = {
          codigo_sys_func: "20034",
          cpf_log: this.store.login.cpf_log,
          tipo: 2,
          tipo_crud: 1,
          id_usuario: policial.id,
          id_subgrupo: this.idSubGrupo,
        };
      } else {
        // Caso seja um grupo selecionado
        params = {
          codigo_sys_func: "20034",
          cpf_log: this.store.login.cpf_log,
          tipo: 1,
          tipo_crud: 1,
          id_usuario: policial.id,
          id_grupo: this.idGrupo,
        };
      }

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
    async removerUsuarioGrupo(id_policial, id_grupo, id_subgrupo) {
      const tipo = id_subgrupo ? 2 : 1;

      const params = {
        codigo_sys_func: "20034",
        cpf_log: this.store.login.cpf_log,
        tipo: tipo,
        tipo_crud: 2,
        id_usuario: id_policial,
        id_grupo: id_grupo,
        id_subgrupo: id_subgrupo,
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
