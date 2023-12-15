<template>
  <!-- Tela de compartilhamento de GRUPOS -->
  <q-dialog persistent v-model="telaGrupos">
    <q-card style="width: 500px">
      <q-bar>
        <q-icon name="search" />
        <div class="text-body1">Escolher GRUPO para franquear acesso</div>
        <q-space />
        <q-btn flat icon="close" size="sm" v-close-popup></q-btn>
      </q-bar>
      <q-card-section>
        <div class="full-width q-pa-md">
          <q-input
            outlined=""
            label="Filtro..."
            icon="search"
            v-model="editfiltro"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <q-scroll-area style="height: 400px; max-width: 4500px">
          <q-list>
            <div v-for="grupo in gruposFilter" :key="grupo.id" class="q-pa-sm">
              <q-item
                clickable
                v-ripple
                class="bg-grey-3"
                @click="franquearAcessoGrupo(grupo.id)"
              >
                <q-item-section avatar>
                  <q-icon color="primary" name="group" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    {{ grupo.nome_grupo }}
                  </q-item-label>
                  <q-item-label caption>
                    {{ grupo.desc_grupo }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-scroll-area>
      </q-card-section>
      <q-separator color="primary" />
      <q-card-actions align="right">
        <q-checkbox label="Informação Tratada" v-model="infoTratada" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Tela de compartilhamento de Subgrupos -->
  <q-dialog persistent v-model="telaSubGrupos">
    <q-card style="width: 500px">
      <q-bar>
        <q-icon name="search" />
        <div class="text-body1">Escolher SUBGRUPO para franquear acesso</div>
        <q-space />
        <q-btn flat icon="close" size="sm" v-close-popup></q-btn>
      </q-bar>
      <q-card-section>
        <div class="full-width q-pa-md">
          <q-input
            outlined=""
            label="Filtro..."
            icon="search"
            v-model="editfiltroSub"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <q-scroll-area style="height: 400px; max-width: 4500px">
          <q-list>
            <div
              v-for="grupo in selectSubGrupoFilter"
              :key="grupo.id"
              class="q-pa-sm"
            >
              <q-item
                clickable
                v-ripple
                class="bg-grey-3"
                @click="franquearAcessoSubGrupo(grupo.id)"
              >
                <q-item-section avatar>
                  <q-icon color="primary" name="group" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    {{ grupo.nome_subgrupo }}
                  </q-item-label>
                  <q-item-label caption>
                    {{ grupo.desc_subgrupo }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-scroll-area>
      </q-card-section>
      <q-separator color="primary" />
      <q-card-actions align="right">
        <q-checkbox label="Informação Tratada" v-model="infoTratadaSub" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Buscar policial por nome -->
  <q-dialog persistent v-model="telaProcuraPolicial">
    <q-card style="width: 500px">
      <q-bar>
        <q-icon name="search" />
        <div class="text-body1">Procurar Policiais por nome</div>
        <q-space />
        <q-btn flat icon="close" size="sm" v-close-popup></q-btn>
      </q-bar>
      <q-card-section>
        <q-input
          outlined
          v-model="nomePolicialPesquisa"
          label="Informe o nome completo ou parcial do Policial"
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
            <!-- <q-img src="../../public/ntsh.png" /> -->
          </div>
        </q-scroll-area>
      </q-card-section>
      <q-separator color="primary" class="q-my-sm" />
      <q-card-section>
        <div class="full-width">
          <span class="text-grey-8 text-h5"> Despacho </span>
        </div>
        <div class="full-width">
          <q-editor v-model="editorDespacho" min-height="5rem" />
        </div>
      </q-card-section>
      <q-separator color="primary" class="q-my-sm" />
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Página Principal -->
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
      <div>
        <q-chip class="q-ma-sm">
          <q-avatar
            :icon="store.iconeCaso(dados.tipo)"
            :color="store.corCaso(dados.tipo)"
            text-color="white"
          />
          <div class="q-pa-md text-h5">
            Franquear acesso: {{ dados.protocolo }}
          </div>
        </q-chip>
      </div>

      <q-space />
      <div class="col q-pl-sm q-pt-sm" style="text-align: right">
        <q-btn
          color="primary"
          label="Voltar"
          icon="arrow_back"
          @click="voltar(dados.tipo, dados.id)"
        />
      </div>
    </div>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="acessos" label="Acessos" icon="fa-solid fa-user-group" />
      <q-tab
        name="tramitacoes"
        label="Tramitacoes"
        icon="fa-solid fa-signs-post"
      />
    </q-tabs>

    <q-separator />
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="acessos">
        <q-splitter v-model="divisao" style="height: 700px">
          <template v-slot:before>
            <div class="q-pa-md">
              <div class="q-ma-md row" style="width: 98%">
                <q-btn
                  label="NINT"
                  flat
                  icon="fa-solid fa-plus"
                  @click="escolherGrupo()"
                  class="q-mx-sm"
                />
                <q-btn
                  label="NINT"
                  flat
                  color="red"
                  icon="fa-solid fa-minus"
                  @click="removerAcessoGrupo(grupoSelecionado)"
                  class="q-mx-sm"
                />
                <q-btn
                  label="TRAMITAR"
                  flat
                  color="grey-8"
                  icon="fa-regular fa-share-from-square"
                  @click="telaDespacharDenuncia()"
                  class="q-mx-sm"
                />
              </div>
              <q-separator color="primary" />
              <div
                class="q-ma-sm row"
                style="width: 98%"
                v-for="grupo in casosGrupo"
                :key="grupo.id"
              >
                <div class="q-pa-sm" style="width: 500px">
                  <q-expansion-item
                    class="shadow-1 overflow-hidden"
                    style="border-radius: 10px"
                    icon="fa-solid fa-building-shield"
                    :label="grupo.nome_grupo"
                    :caption="grupo.desc_grupo"
                    header-class="bg-primary text-white"
                    expand-icon-class="text-white"
                    @click="selecionar(grupo, null)"
                  >
                    <q-card>
                      <q-card-section>
                        <q-list>
                          <div
                            v-for="item of subGruposDoGrupo(grupo.id)"
                            :key="item.id"
                          >
                            <q-item
                              clickable
                              v-ripple
                              @click="selecionar(grupo, item)"
                            >
                              <q-item-section avatar>
                                <q-avatar
                                  rounded
                                  color="grey-6"
                                  text-color="white"
                                  icon="fa-solid fa-user-group"
                                />
                              </q-item-section>
                              <q-item-section>
                                <q-item-label>
                                  {{ item.nome_subgrupo }}
                                </q-item-label>
                                <q-item-label caption>
                                  {{ item.desc_subgrupo }}
                                </q-item-label>
                              </q-item-section>
                              <q-item-section side top>
                                <q-icon
                                  v-if="
                                    grupo.id == grupoSelecionado &&
                                    item.id == subGrupoSelecionado
                                  "
                                  name="check"
                                  color="green"
                                />
                              </q-item-section>
                            </q-item>
                          </div>
                        </q-list>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </div>
              </div>
            </div>
          </template>

          <template v-slot:after>
            <div class="q-pa-md">
              <div class="q-ma-md row" style="width: 98%">
                <q-btn
                  label="Subgrupo"
                  flat
                  icon="fa-solid fa-plus"
                  @click="escolherSubGrupo(grupoSelecionado)"
                  class="q-mx-sm"
                />
                <q-btn
                  label="subgrupo"
                  flat
                  color="red"
                  icon="fa-solid fa-minus"
                  @click="escolherGrupo()"
                  class="q-mx-sm"
                />
              </div>
              <q-separator color="primary" />
              <div class="q-ma-md row" style="width: 98%">
                <q-breadcrumbs class="text-green">
                  <template v-slot:separator>
                    <q-icon size="1.5em" name="chevron_right" color="primary" />
                  </template>

                  <q-breadcrumbs-el icon="home" />
                  <q-breadcrumbs-el
                    v-if="dadosGrupoSel"
                    :label="dadosGrupoSel.nome_grupo"
                    icon="fa-solid fa-building-shield"
                  />
                  <q-breadcrumbs-el
                    v-if="dadosSubGrupoSel"
                    :label="dadosSubGrupoSel.nome_subgrupo"
                    icon="fa-solid fa-user-group"
                  />
                </q-breadcrumbs>
              </div>
              <div class="q-ma-md row" style="width: 98%"></div>
              <div class="q-ma-md row" style="width: 98%">
                <div
                  v-if="dadosCarregado"
                  class="full-width text-h5 text-grey-8"
                >
                  {{ dadosGrupoSel?.nome_grupo }}
                </div>

                <div v-for="uso in usuariosGrupo" :key="uso.id">
                  <usuario-card-small-show :usuario="uso" />
                </div>
              </div>
              <div class="q-ma-md row" style="width: 98%">
                <div
                  v-if="dadosCarregado"
                  class="full-width text-h5 text-grey-8"
                >
                  {{ dadosSubGrupoSel?.nome_subgrupo }}
                </div>
                <div v-for="uso in usuariosSubGrupo" :key="uso.id">
                  <usuario-card-small-show :usuario="uso" />
                </div>
              </div>
            </div>
          </template>
        </q-splitter>
      </q-tab-panel>

      <q-tab-panel name="tramitacoes">
        <div>
          <caso-tramitacoes :idCaso="id" />
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import UsuarioCardSmallShow from "src/components/UsuarioCardSmallShow.vue";
import CasoTramitacoes from "src/components/CasoTramitacoes.vue";
import { useStore } from "src/stores/store";
import { api } from "src/boot/axios";
import { Dialog } from "quasar";
export default {
  name: "FranquearAcessoCaso",
  components: { UsuarioCardSmallShow, CasoTramitacoes },
  created() {
    this.id = this.$route.params.id;
    this.carregarCaso(this.id);
    this.carregaCasosGrupo(this.id);
    this.carregaAcessos(this.id);
  },
  setup() {
    const store = useStore();
    return { store };
  },
  data() {
    return {
      //POPUPS
      telaGrupos: false,
      telaSubGrupos: false,
      telaDespacho: false,
      telaProcuraPolicial: false,

      nomePolicialPesquisa: null,
      nomesPesquisados: null,

      editorDespacho: null,

      dadosCarregado: false,

      dadosCarregados: false,
      dados: null,
      grupos: null,
      subGrupos: null,
      gruposFilter: null,
      subGruposFilter: null,
      selectSubGrupo: null,
      selectSubGrupoFilter: null,
      editfiltro: null,
      editfiltroSub: null,
      id: null,
      infoTratada: true,
      infoTratadaSub: true,
      divisao: 50, // porcentagem

      grupoSelecionado: null,
      subGrupoSelecionado: null,

      casosGrupo: null,
      casosSubGrupo: null,
      dadosGrupoSel: null,
      dadosSubGrupoSel: null,

      usuariosGrupo: null,
      usuariosSubGrupo: null,

      //TREE
      expanded: null,
      nodos: [],

      // TABS
      tab: "acessos",
    };
  },
  props: {},
  watch: {
    editfiltro() {
      this.gruposFilter = this.grupos.filter((group) => {
        const searchTerm = this.editfiltro.toLowerCase();
        const groupName = group.nome_grupo.toLowerCase();
        return groupName.includes(searchTerm);
      });
    },
    editfiltroSub() {
      this.selectSubGrupoFilter = this.selectSubGrupo.filter((group) => {
        const searchTerm = this.editfiltroSub.toLowerCase();
        const groupName = group.nome_subgrupo.toLowerCase();
        return groupName.includes(searchTerm);
      });
    },
    telaProcuraPolicial() {
      // watch utilizado para quando a tela for fechada zerar os parametros de pesquisa.
      if (this.telaProcuraPolicial == false) {
        this.nomesPesquisados = null;
        this.nomePolicialPesquisa = null;
      }
    },
  },
  methods: {
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
        codigo_sys_func: "10008C",
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

    async carregaAcessos(idCaso) {
      const params1 = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10018",
        id_caso: idCaso,
      };
      const params2 = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10019",
        id_caso: idCaso,
      };
      this.store.telaCarregamento(true);
      const resposta1 = await api.post("/consulta", params1);
      const resposta2 = await api.post("/consulta", params2);
      this.store.telaCarregamento(false);

      this.casosGrupo = resposta1.data;
      this.casosSubGrupo = resposta2.data;
    },

    async carregaCasosGrupo(idCaso) {
      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10017",
        id_caso: idCaso,
      };
      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params);

      this.store.telaCarregamento(false);

      this.grupos = resposta.data;

      if (this.grupos.status_ret == 1) {
        this.store.alerta(this.grupos.retorno);
      }
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

      if (this.dados.status_ret == 1) {
        this.store.alerta(this.dados.retorno);
      } else {
        this.dadosCarregados = true;
      }
    },

    async franquearAcessoSubGrupo(id) {
      Dialog.create({
        title: "Franquear acesso",
        message: `Deseja franquear acesso do caso ${this.dados.protocolo} a esse Grupo ? `,
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        const params = {
          codigo_sys_func: "20035",
          cpf_log: this.store.login.cpf_log,
          tipo: 2,
          tipo_crud: 1,
          id_caso: this.dados.id,
          id_subgrupo: id,
          tratado: this.infoTratadaSub,
        };

        this.store.telaCarregamento(true);
        const resposta = await api.post("/consulta", params);

        this.store.telaCarregamento(false);

        if (resposta.data.status_ret == 0) {
          this.carregarCaso(this.id);
          this.carregaCasosGrupo(this.id);
          this.carregaAcessos(this.id);
          this.telaSubGrupos = false;
        } else {
          this.store.alerta(resposta.data.retorno);
        }
      });
    },

    async franquearAcessoGrupo(id) {
      Dialog.create({
        title: "Franquear acesso",
        message: `Deseja franquear acesso do caso ${this.dados.protocolo} a esse Grupo ? `,
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        const params = {
          codigo_sys_func: "20035",
          cpf_log: this.store.login.cpf_log,
          tipo: 1,
          tipo_crud: 1,
          id_caso: this.dados.id,
          id_grupo: id,
          tratado: true,
        };

        this.store.telaCarregamento(true);
        const resposta = await api.post("/consulta", params);

        this.store.telaCarregamento(false);

        if (resposta.data.status_ret == 0) {
          this.carregarCaso(this.id);
          this.carregaCasosGrupo(this.id);
          this.carregaAcessos(this.id);
          this.telaGrupos = false;
        } else {
          this.store.alerta(resposta.data.retorno);
        }
      });
    },

    async removerAcessoGrupo(id) {
      Dialog.create({
        title: "Remover acesso",
        message: `Deseja Remover acesso do caso ${this.dados.protocolo} a esse Grupo ? `,
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        const params = {
          codigo_sys_func: "20035",
          cpf_log: this.store.login.cpf_log,
          tipo: 1,
          tipo_crud: 2,
          id_caso: this.dados.id,
          id_grupo: id,
          tratado: true,
        };

        this.store.telaCarregamento(true);
        const resposta = await api.post("/consulta", params);

        this.store.telaCarregamento(false);

        if (resposta.data.status_ret == 0) {
          this.carregarCaso(this.id);
          this.carregaCasosGrupo(this.id);
          this.carregaAcessos(this.id);
          this.telaGrupos = false;
        } else {
          this.store.alerta(resposta.data.retorno);
        }
      });
    },

    escolherGrupo() {
      this.gruposFilter = this.grupos;
      this.telaGrupos = true;
    },

    telaDespacharDenuncia() {
      this.telaProcuraPolicial = true;
    },

    async escolherSubGrupo(id) {
      const params = {
        codigo_sys_func: "10020",
        cpf_log: this.store.login.cpf_log,
        id_caso: this.dados.id,
        id_grupo: id,
      };

      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params);
      this.store.telaCarregamento(false);

      this.selectSubGrupo = resposta.data;
      this.selectSubGrupoFilter = this.selectSubGrupo;
      if (this.selectSubGrupo) {
        this.telaSubGrupos = true;
      } else {
        this.store.alerta(
          "Não há subgrupos cadastrados para esse Grupo ou todos já foram compartilhados"
        );
      }
    },

    selecionar(grupo, subgrupo) {
      this.dadosGrupoSel = grupo;
      this.dadosSubGrupoSel = subgrupo;

      this.grupoSelecionado = grupo.id;

      if (subgrupo) {
        this.subGrupoSelecionado = subgrupo.id;
      } else {
        this.subGrupoSelecionado = null;
      }

      this.carregarUsuariosGrupoSubGrupo();
      this.dadosCarregado = true;
    },

    voltar(tipo, id) {
      this.$router.push(this.store.rotaCaso(tipo, id));
    },

    subGruposDoGrupo(id) {
      let retorno = [];

      if (this.casosSubGrupo) {
        retorno = this.casosSubGrupo.filter((a) => a.id_grupo === id);
      } else {
        retorno = [];
      }
      return retorno;
    },

    async carregarUsuariosGrupoSubGrupo() {
      this.usuariosGrupo = null;
      this.usuariosSubGrupo = null;

      const params1 = {
        codigo_sys_func: "10021",
        cpf_log: this.store.login.cpf_log,
        id_caso: this.dados.id,
        id_grupo: this.grupoSelecionado,
      };

      this.store.telaCarregamento(true);
      const resposta1 = await api.post("/consulta", params1);
      this.store.telaCarregamento(false);

      this.usuariosGrupo = resposta1.data;

      if (this.dadosSubGrupoSel) {
        const params2 = {
          codigo_sys_func: "10022",
          cpf_log: this.store.login.cpf_log,
          id_caso: this.dados.id,
          id_subgrupo: this.subGrupoSelecionado,
        };

        this.store.telaCarregamento(true);
        const resposta2 = await api.post("/consulta", params2);
        this.store.telaCarregamento(false);

        this.usuariosSubGrupo = resposta2.data;
      }
    },
    retornaFoto(foto) {
      return `https://getin.pc.sc.gov.br/get_files_imgUser/${foto}`;
    },
  },
};
</script>

<style>
.display1 {
  border-radius: 5px;
  border-left: 4px solid orange;
}
</style>
