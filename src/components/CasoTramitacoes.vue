<template>
  <!-- Tela de encaminhamento / despacho -->
  <q-dialog
    v-model="telaDespacho"
    persistent
    @before-show="despacho = ''"
    style="max-width: 500px; max-height: 400px"
  >
    <q-card>
      <q-bar>
        <q-icon name="fa-solid fa-user-check" />
        <div class="text-body1">Encaminhamento</div>
        <q-space />
        <q-btn flat icon="close" size="sm" v-close-popup></q-btn>
      </q-bar>
      <q-card-section>
        <div class="text-subtitle1 text-grey-8">
          <div class="q-py-sm">
            <label-data label="DE:" :texto="origemCarga.caption" />
          </div>

          <label-data label="PARA:" :texto="destinoCarga.caption" />
        </div>
      </q-card-section>

      <q-card-section>
        <q-editor v-model="despacho" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Despachar" @click="tramitar()" />
        <q-btn flat label="Dados" @click="telaDados = true" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Escolher os grupos NINTs -->
  <q-dialog v-model="telaShareGrupo" persistent>
    <q-card>
      <q-bar>
        <q-icon name="fa-solid fa-user-check" />
        <div class="text-body1">Escolher Grupos NINTs</div>
        <q-space />
        <q-btn flat icon="close" size="sm" v-close-popup></q-btn>
      </q-bar>
      <q-card-section>
        <q-input outlined v-model="shareGrupo" label="Nome do Grupo NINT" />
      </q-card-section>
      <q-separator color="primary" />
      <q-card-section>
        <div class="q-pa-xm">
          <q-scroll-area style="height: 400px; width: 450px">
            <div
              v-for="grupo in gruposFiltrados"
              :key="grupo.id"
              class="q-pa-sm"
              @click="despachar(1, grupo.id)"
            >
              <q-item clickable v-ripple class="bg-grey-3">
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
          </q-scroll-area>
        </div>
      </q-card-section>
      <q-separator color="primary" />
      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="telaDados" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <pre>{{ origemCarga }}</pre>
      </q-card-section>
      <q-separator color="primary" />
      <q-card-section>
        <pre>{{ destinoCarga }} </pre>
      </q-card-section>
      <q-separator color="primary" />
      <q-card-actions>
        <q-btn flat label="fechar" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Bypass -->
  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">CPF</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          dense
          v-model="cpfNovoLogin"
          autofocus
          @keyup.enter="trocarLogin()"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn flat label="byPass" @click="trocarLogin()" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Franquear acesso as informações -->
  <q-dialog
    v-model="telaAcesso"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 500px">
      <q-bar>
        <q-icon name="fa-solid fa-user-check" />
        <div class="text-body1">Franquear Acesso</div>
        <q-space />
        <q-btn flat icon="close" size="sm" v-close-popup></q-btn>
      </q-bar>
      <q-card-section v-if="store.login.dipc">
        <div class="full-width">DIPC</div>
        <div class="full-width">
          <q-scroll-area style="height: 400px; max-width: 100%">
            <q-list>
              <div
                v-for="grupo in grupos.filter(
                  (item1) =>
                    !acessoGrupos.find((item2) => item1.id === item2.id)
                )"
                :key="grupo.id"
                class="q-pa-sm"
              >
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
        </div>
      </q-card-section>
      <q-card-section v-if="store.login.nint">NINT </q-card-section>
    </q-card>
  </q-dialog>

  <!-- Tela de escolha de subgrupo -->
  <q-dialog v-model="telaSubGrupo" persistent>
    <q-card>
      <q-bar>
        <q-icon name="fa-solid fa-user-check" />
        <div class="text-body1">Escolher Subgrupo</div>
        <q-space />
        <q-btn flat icon="close" size="sm" v-close-popup></q-btn>
      </q-bar>
      <q-card-section>
        <label-data label="GRUPO:" :texto="nomeGrupo" />
      </q-card-section>

      <q-separator color="primary" />

      <q-card-section>
        <q-scroll-area style="height: 400px; width: 450px">
          <div
            v-for="subGrupo in subGruposFiltrados"
            :key="subGrupo.id"
            class="q-pa-sm"
            @click="despachar(2, subGrupo.id)"
          >
            <q-item clickable v-ripple class="bg-grey-3">
              <q-item-section avatar>
                <q-icon color="primary" name="group" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  {{ subGrupo.nome_subgrupo }}
                </q-item-label>
                <q-item-label caption>
                  {{ subGrupo.desc_subgrupo }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>
        </q-scroll-area>
      </q-card-section>
      <q-separator color="primary" />
      <q-card-actions align="right">
        <q-btn
          flat
          label="Retornar para DIPC"
          color="blue-grey-9"
          @click="despachar(-1, 1)"
        >
          <q-tooltip class="bg-primary text-body2" :offset="[10, 10]">
            Retornar a carga a DIPC
          </q-tooltip>
        </q-btn>
        <q-btn flat label="Cancelar" color="red" v-close-popup></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Tela de escolha de policial -->
  <q-dialog v-model="telaPolicial" persistent>
    <q-card>
      <q-bar>
        <q-icon name="fa-solid fa-user-check" />
        <div class="text-body1">Escolha o Policial</div>
        <q-space />
        <q-btn flat icon="close" size="sm" v-close-popup></q-btn>
      </q-bar>
      <q-card-section>
        <div class="full-width">
          <q-input
            outlined
            dense
            v-model="nomePesPolicial"
            label="Nome do Policial"
            @keyup.enter="pesquisarPolicial(nomePesPolicial)"
          >
            <template v-slot:after>
              <q-btn
                round
                dense
                flat
                icon="search"
                color="black"
                @click="pesquisarPolicial(nomePesPolicial)"
              />
            </template>
            <template v-slot:hint> Field Hint</template>
          </q-input>
        </div>
      </q-card-section>
      <q-separator color="primary" />
      <q-card-section>
        <q-scroll-area style="height: 400px; width: 450px">
          <div
            class="q-pa-sm"
            v-for="policial in dadosPolicial"
            :key="policial.id"
          >
            <q-item
              clickable
              style="
                background-color: rgb(247, 246, 246);
                border-radius: 5px;
                border: 1px solid rgb(201, 198, 198);
              "
              @click="despachar(3, policial.id)"
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
        </q-scroll-area>
      </q-card-section>
      <q-separator color="primary" />
      <q-card-actions align="right">
        <q-btn
          flat
          label="Retornar para o Subgrupo"
          color="blue-grey-9"
          @click="despachar(-3, policial.id)"
        >
          <q-tooltip class="bg-primary text-body2" :offset="[10, 10]">
            Retornar a carga ao Subgrupo
          </q-tooltip>
        </q-btn>
        <q-btn flat label="Cancelar" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-page v-if="dadosCarregados">
    <div class="full-width q-mb-md" style="display: flex">
      <div style="width: 4%">
        <q-btn flat icon="fa-solid fa-ellipsis-vertical">
          <q-menu transition-show="scale" transition-hide="scale">
            <q-list style="min-width: 100px">
              <q-item clickable @click="passarCarga()">
                <q-item-section avatar>
                  <q-icon name="fa-solid fa-dolly" />
                </q-item-section>
                <q-item-section>Passar Carga</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable @click="telaFranquearAcesso()">
                <q-item-section avatar>
                  <q-icon name="fa-solid fa-user-check" />
                </q-item-section>
                <q-item-section>Franquear acesso</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable @click="prompt = true">
                <q-item-section avatar>
                  <q-icon name="fa-solid fa-user-check" />
                </q-item-section>
                <q-item-section>By pass</q-item-section>
              </q-item>
              <q-item clickable @click="telaShareGrupo = true">
                <q-item-section avatar>
                  <q-icon name="fa-solid fa-user-check" />
                </q-item-section>
                <q-item-section>Tela de grupos nint</q-item-section>
              </q-item>
              <q-item clickable @click="telaSubGrupo = true">
                <q-item-section avatar>
                  <q-icon name="fa-solid fa-user-check" />
                </q-item-section>
                <q-item-section>Tela de Subgrupo </q-item-section>
              </q-item>
              <q-item clickable @click="escolherPolicial()">
                <q-item-section avatar>
                  <q-icon name="fa-solid fa-user-check" />
                </q-item-section>
                <q-item-section>Tela Policial </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
      <div style="flex: 1">
        <label-data label="Carga atual:" :texto="cargaAtual" />
      </div>
    </div>

    <div class="full-width">
      <q-splitter v-model="divisorTela" style="height: 600px">
        <template v-slot:before>
          <div class="full-width">
            <div>
              <div>
                <q-chip>
                  <q-avatar>
                    <img :src="retornaFoto(store.login.foto_usuario)" />
                  </q-avatar>
                  {{ store.login.nome_usuario }}
                </q-chip>
              </div>
            </div>
          </div>

          <q-timeline layout="comfortable" color="primary">
            <q-timeline-entry
              title="Recebimento da Denúncia"
              subtitle="February 21, 1986"
              icon="fa-regular fa-envelope"
            >
              <div>
                <ul>
                  <li>Denúncia Anônima</li>
                </ul>
              </div>
            </q-timeline-entry>

            <q-timeline-entry
              title="Tramitação"
              subtitle="February 21, 1986"
              icon="fa-regular fa-paper-plane"
            >
              <div>
                <ul>
                  <li>DE: DINT</li>
                  <li>PARA: NINT - Grande Florianópolis</li>
                  <li>DESPACHO: Para Conhecimento</li>
                  <li>USUÁRIO: Alarico</li>
                </ul>
              </div>
            </q-timeline-entry>

            <q-timeline-entry
              title="Tramitação"
              subtitle="February 21, 1986"
              icon="fa-regular fa-paper-plane"
            >
              <div>
                <ul>
                  <li><b>DE:</b> NINT - Grande Florianópolis</li>
                  <li><b>PARA:</b> Subgrupo DECOD</li>
                  <li><b>DESPACHO:</b> Para Conhecimento</li>
                  <li><b>USUÁRIO:</b> José da Silva</li>
                </ul>
              </div>
            </q-timeline-entry>
          </q-timeline>
        </template>
        <template v-slot:after>
          <q-card style="box-shadow: none">
            <q-card-section>
              <div class="full-width">
                <div class="text-overline">Acessos:</div>
              </div>
              <q-tree
                :nodes="arvore"
                node-key="id"
                selected-color="primary"
                v-model:selected="nodoSelecionado"
                default-expand-all
              />
            </q-card-section>
          </q-card>
        </template>
      </q-splitter>
    </div>
  </q-page>
</template>

<script>
import LabelData from "./LabelData.vue";
import { api } from "src/boot/axios";
import { useStore } from "src/stores/store";
import { Dialog } from "quasar";
export default {
  name: "CasoTramitacoes",
  components: { LabelData },
  props: {
    idCaso: {
      type: Number,
      required: true,
    },
  },

  setup() {
    const store = useStore();
    return { store, api };
  },
  data() {
    return {
      // Franquear acesso
      telaAcesso: false,

      telaShareGrupo: false,
      shareGrupo: null,
      gruposFiltrados: null,
      telaDespacho: false,
      despacho: null,
      captionDespacho: null,

      cargaAtual: null,

      prompt: false,
      cpfNovoLogin: null,

      telaSubGrupo: false,
      idGrupoSelecionado: 1,

      origemCarga: {},
      destinoCarga: {},

      telaPolicial: false,
      nomePesPolicial: null,
      dadosPolicial: null,
      policialSelecionado: null,

      quemEhVc: null,
      carga: null,
      cargaDest: null,
      telaDados: false,

      divisorTela: 50,

      dadosCarregados: false,
      caso: null,
      tramitacoes: null,
      grupos: null,
      subGrupos: null,
      acessoGrupos: null,
      acessoSubGrupos: null,
      acessoUsuarios: null,
      arvore: [],
      nodoSelecionado: null,
    };
  },

  created() {
    this.carregaDados();
  },

  computed: {
    subGruposFiltrados() {
      return this.subGrupos.filter(
        (item) => item.id_grupo == this.idGrupoSelecionado
      );
    },
    nomeGrupo() {
      return this.grupos.find((item) => item.id == this.idGrupoSelecionado)
        .desc_grupo;
    },
  },

  watch: {
    shareGrupo() {
      const needle = this.shareGrupo.toLowerCase();
      if (this.shareGrupo.length == 0) {
        this.gruposFiltrados = this.grupos;
      } else {
        this.gruposFiltrados = this.grupos.filter(
          (item) => item.nome_grupo.toLowerCase().indexOf(needle) > -1
        );
      }
    },
  },

  methods: {
    retCargaAtual() {
      if (this.caso.carga_dipc) {
        return "DIPC";
      } else {
        if (this.caso.id_grupo_carga) {
          return "NINT";
        } else {
          if (this.caso.id_subgrupo_carga) {
            return "SUBGRUPO";
          } else {
            return "Usuário";
          }
        }
      }
    },

    async carregaDados() {
      this.store.telaCarregamento(true);

      // Carregar o caso
      const paramsCaso = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10023",
        id_caso: this.idCaso,
      };

      const respostaCaso = await api.post("/consulta", paramsCaso);
      this.caso = respostaCaso.data[0];

      // Carregar Acessos
      const paramsAcessoGrupo = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10027",
        id_caso: this.idCaso,
      };

      const paramsAcessoSubGrupo = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10028",
        id_caso: this.idCaso,
      };

      const paramsNomeByPass = {
        cpf_log: this.store.login.cpf_log,
        codigo_sysy_func: "10028",
        id_caso: this.idCaso,
        volume: 15,
        palavra_chave: "bolinha de golfe",
        tempo_servico: "03a11m14d",
      };

      const paramsAcessoUsuarios = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10029",
        id_caso: this.idCaso,
      };

      const resposta1 = await api.post("/consulta", paramsAcessoGrupo);
      const resposta2 = await api.post("/consulta", paramsAcessoSubGrupo);
      const resposta3 = await api.post("/consulta", paramsAcessoUsuarios);

      this.acessoGrupos = resposta1.data;
      this.acessoSubGrupos = resposta2.data;
      this.acessoUsuarios = resposta3.data;

      // Carregar Tramitações
      const paramsTramitacoes = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10024",
        id_caso: this.idCaso,
      };

      const respostaTramitacoes = await api.post(
        "/consulta",
        paramsTramitacoes
      );

      this.tramitacoes = respostaTramitacoes.data;

      // Carrega QuemEhVoce.

      // Carrega Grupos
      const paramsGrupos = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10025",
      };

      const respostaGrupos = await api.post("/consulta", paramsGrupos);

      this.grupos = respostaGrupos.data;

      // Carrega Subgrupos
      const paramsSubGrupos = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10026",
      };

      const respostaSubGrupos = await api.post("/consulta", paramsSubGrupos);

      this.subGrupos = respostaSubGrupos.data;

      this.store.telaCarregamento(false);
      this.criarArvore();
      this.dadosCarregados = true;

      this.gruposFiltrados = this.grupos;

      this.cargaAtual = this.retCargaAtual();
    },

    telaFranquearAcesso() {
      this.telaAcesso = true;
    },

    retornaFoto(foto) {
      return `https://getin.pc.sc.gov.br/get_files_imgUser/${foto}`;
    },

    async franquearAcessoGrupo(id) {
      Dialog.create({
        title: "Franquear acesso",
        message: `Deseja franquear acesso do caso ${this.caso.protocolo} a esse Grupo ? `,
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        const params = {
          codigo_sys_func: "20035",
          cpf_log: this.store.login.cpf_log,
          tipo: 1,
          tipo_crud: 1,
          id_caso: this.caso.id,
          id_grupo: id,
          tratado: false,
        };

        this.store.telaCarregamento(true);
        const resposta = await api.post("/consulta", params);

        this.store.telaCarregamento(false);

        if (resposta.data.status_ret == 0) {
          this.carregaDados();
          this.telaAcesso = false;
        } else {
          this.store.alerta(resposta.data.retorno);
        }
      });
    },

    async criarArvore() {
      let temp = [];

      temp.push({
        id: "G",
        label: "NINTS",
        icon: "fa-solid fa-people-roof",
        children: [],
      });

      if (this.acessoGrupos) {
        for (let obj_grupo of this.acessoGrupos) {
          // const temp_subgrupo_acesso = this.acessoSubGrupos.filter(
          //   (o) => o.id_grupo == obj_grupo.id
          // );

          temp[0].children.push({
            id: `G#${obj_grupo.id}`,
            id_original: obj_grupo.id,
            label: obj_grupo.nome_grupo,
            icon: "fa-solid fa-building-shield",
            children: [],
          });
        }
      }

      function adicionarN2(id, item) {
        for (let b1 of temp) {
          for (let b2 of b1.children) {
            if (b2.id == id) {
              b2.children.push(item);
            }
          }
        }
      }

      if (this.acessoSubGrupos) {
        for (let obj1 of this.acessoSubGrupos) {
          adicionarN2(`G#${obj1.id_grupo}`, {
            id: `SG#${obj1.id}`,
            id_original: obj1.id,
            label: obj1.nome_subgrupo,
            caption: obj1.desc_subgrupo,
            icon: "fa-solid fa-house-user",
          });
        }
      }

      temp.push({
        id: "U",
        label: "USUÁRIOS",
        icon: "fa-regular fa-user",
        children: [],
      });

      if (this.acessoUsuarios) {
        for (let obj_usuario of this.acessoUsuarios) {
          temp[1].children.push({
            id: `U#${obj_usuario.id}`,
            label: obj_usuario.nome,
            avatar: this.retornaFoto(obj_usuario.foto),
          });
        }
      }
      this.arvore = temp;
    },

    trocarLogin() {
      this.prompt = false;
      this.dadosUsuario(this.cpfNovoLogin);
      //this.passarCarga();
    },

    async dadosUsuario(cpf) {
      const params = {
        cpf: cpf,
        cpf_log: cpf,
        codigo_sys_func: "10007",
      };

      const resposta = await api.post("/consulta", params);

      if (resposta.data) {
        const infoUso = resposta.data[0];
        this.store.login.cpf_log = infoUso.cpf;
        this.store.login.id_usuario = infoUso.id;
        this.store.login.nome_usuario = infoUso.nome;
        this.store.login.foto_usuario = infoUso.foto;
        this.store.login.dipc = infoUso.usuario_dipc;
        this.store.login.nint = infoUso.usuario_nint;
        this.store.login.nivel = infoUso.nivel_acesso;
      } else {
        this.store.alerta("Usuário não localizado  !");
      }
    },

    async passarCarga() {
      // Passo 01: Verificar se o cara tem ou não a carga
      const params1 = {
        codigo_sys_func: "20037",
        cpf_log: this.store.login.cpf_log,
      };

      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params1);
      this.store.telaCarregamento(false);

      this.quemEhVc = resposta.data;
      this.carga = this.deQuemEhACarga();

      if (this.carga.tipo == 1) {
        // Carga DIPC
        if (this.quemEhVc.usuario[0].usuario_dipc) {
          this.origemCarga = {
            idCaso: this.caso.id,
            dipc: true,
            caption: "DIPC",
            idGrupo: null,
            idSubGrupo: null,
            idUsuario: null,
          };

          this.telaShareGrupo = true;
        } else {
          this.store.alerta("Esse usuário não está com a carga");
        }
      } else if (this.carga.tipo == 2) {
        // Grupo
        if (this.quemEhVc.grupos.id_ == this.carga.id) {
          this.origemCarga = {
            idCaso: this.caso.id,
            dipc: false,
            caption: this.grupos.filter(
              (item) => item.id == this.quemEhVc.grupo.id
            )[0].nome_grupo,
            idGrupo: this.quemEhVc.grupo.id,
            idSubGrupo: null,
            idUsuario: null,
          };
          this.telaSubGrupo = true;
        } else {
          this.store.alerta("Esse usuário não está com a carga");
        }
      } else if (this.carga.tipo == 3) {
        // SubGrupo
        if (this.quemEhVc.subgrupos.id_ == this.carga.id) {
          this.telaPolicial = true;
        } else {
          this.store.alerta("Esse usuário não está com a carga");
        }
      } else if (this.carga.tipo == 4) {
        // Usuário
        console.log("passou");
      } else {
        this.store.alerta("Caso sem carga definida !");
      }

      //this.telaDados = true;
    },

    deQuemEhACarga() {
      if (this.caso.carga_dipc) {
        return {
          nome: "DIPC",
          tipo: 1,
          id: null,
        };
      }

      if (this.caso.id_grupo_carga) {
        return {
          nome: "NINT",
          tipo: 2,
          id: this.caso.id_grupo_carga,
        };
      }

      if (this.caso.id_subgrupo_carga) {
        return {
          nome: "SUBGRUPO",
          tipo: 3,
          id: this.caso.id_subgrupo_carga,
        };
      }

      if (this.caso.id_usuario_carga) {
        return {
          nome: "USUÁRIO",
          tipo: 4,
          id: this.caso.id_usuario_carga,
        };
      }
    },

    verficarCarga() {
      var timming = 0;
    },

    async tramitar() {
      this.store.alerta(
        `Carga Atual: ${this.cargaAtual}, para: ${this.tipoDespacho}`
      );
    },

    async despachar(tipoDespacho, id) {
      /*
      tipo de despacho
      1 - DIPC para NINT
      2 - NINT para Subgrupo
      3 - Subgrupo para Usuário
      -1 - Retorno de NINT para DIPC
      -2 - Retorno de Subgrupo para NINT
      -3 - Retorno de usuário para subgrupo
       */
      switch (tipoDespacho) {
        case 1:
          this.destinoCarga = {
            tipo: tipoDespacho,
            idCaso: this.caso.id,
            dipc: false,
            caption: this.grupos.filter((item) => item.id === id)[0].nome_grupo,
            idGrupo: id,
            idSubGrupo: null,
            idUsuario: null,
          };
          break;

        case 2:
          this.destinoCarga = {
            tipo: tipoDespacho,
            idCaso: this.caso.id,
            dipc: false,
            caption: this.subGrupos.filter((item) => item.id === id)[0]
              .nome_subgrupo,
            idGrupo: null,
            idSubGrupo: id,
            idUsuario: null,
          };
          break;

        case 3:
          this.captionDespacho = `Subgrupo para Usuário, id ${id}`;
          break;

        case -1:
          break;

        case -2:
          break;

        case -3:
          break;

        default:
          break;
      }

      this.telaDespacho = true;
    },

    async pesquisarPolicial(nome) {
      if (!nome) {
        this.store.alerta("Favor informar o nome do policial");
        return false;
      }

      if (nome.length < 3) {
        this.store.alerta(
          "Favor informar pelo menos <b>3 letras</b> do nome parcial do policial"
        );
        return false;
      }

      // Limpar dados da pesquisa anterior
      this.dadosPolicial = null;
      this.nomePesPolicial = null;

      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10008",
        nome: `%${nome.toUpperCase()}%`,
      };

      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params);
      this.store.telaCarregamento(false);

      if (resposta.data) {
        this.dadosPolicial = resposta.data;
      } else {
        this.store.alerta("Nenhum nome <b> encontrado");
      }

      return true;
    },

    escolherPolicial() {
      this.dadosPolicial = null;
      this.nomePesPolicial = null;
      this.policialSelecionado = null;

      this.telaPolicial = true;
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
