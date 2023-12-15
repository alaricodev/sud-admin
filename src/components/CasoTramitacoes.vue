<template>
  <!-- Tela de Finalização do Caso -->
  <q-dialog
    v-model="telaFinalizacao"
    persistent
    @before-show="motivoFinalizacao = ''"
    style="max-width: 500px; max-height: 400px"
  >
    <q-card>
      <q-bar>
        <q-icon name="fa-solid fa-user-check" />
        <div class="text-body1">Finalização do Caso</div>
        <q-space />
        <q-btn flat icon="close" size="sm" v-close-popup></q-btn>
      </q-bar>
      <q-card-section>
        <div class="text-overline">Finalização do Caso</div>
      </q-card-section>
      <q-card-section>
        <q-select
          outlined
          dense
          v-model="motivoFinaliza"
          :options="motivoLista"
          label="Conclusão do caso"
        />
      </q-card-section>

      <q-card-section>
        <q-editor v-model="motivoFinalizacao" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Finalizar Caso" @click="finalizarCaso()" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Tela de encaminhamento / despacho -->
  <q-dialog
    v-model="telaDespacho"
    persistent
    @before-show="despacho = ''"
    full-width
    full-height
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

      <q-card-section style="height: 70%">
        <q-editor
          v-model="despacho"
          :toolbar="editorFunc"
          :fonts="fonts"
          style="height: 95%"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          label="Tramitar"
          color="primary"
          icon="send"
          @click="tramitar()"
        />
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
              @click="
                grupoSelecionado = grupo;
                despachar(1, grupo.id);
              "
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
        <div class="text-overline">USUÁRIO</div>
        <pre>{{ quemEhVc }}</pre>
      </q-card-section>
      <q-separator color="primary" />
      <q-card-section>
        <div class="text-overline">CARGA</div>
        <pre>{{ carga }}</pre>
      </q-card-section>
      <q-separator color="primary" />
      <q-card-section>
        <div class="text-overline">ORIGEM</div>
        <pre>{{ origemCarga }}</pre>
      </q-card-section>
      <q-separator color="primary" />
      <q-card-section>
        <div class="text-overline">DESTINO</div>
        <pre>{{ destinoCarga }} </pre>
      </q-card-section>
      <q-separator color="primary" />
      <q-card-actions>
        <q-btn flat label="fechar" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Tela Erro -->
  <q-dialog v-model="telaErro" persistent>
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-overline">Dados</div>
        <pre>{{ dadosErro }}</pre>
      </q-card-section>
      <q-separator color="primary" />
      <q-card-section>
        <div class="text-overline">REPOSTA</div>
        <pre>{{ respostaErro }}</pre>
      </q-card-section>
      <q-separator color="primary" />
      <q-card-actions>
        <q-btn flat label="fechar" v-close-popup />
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
        <div class="full-width">DINT</div>
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
        <label-data label="GRUPO:" :texto="carga.nome" />
      </q-card-section>

      <q-separator color="primary" />

      <q-card-section>
        <q-scroll-area style="height: 400px; width: 450px">
          <div v-if="subGruposFiltrados.length == 0">
            <div class="flex flex-center">
              Não existe subgrupos cadastrados para esse NINT
            </div>
          </div>
          <div
            v-for="subGrupo in subGruposFiltrados"
            :key="subGrupo.id"
            class="q-pa-sm"
            @click="
              subGrupoSelecionado = subGrupo;
              despachar(2, subGrupo.id);
            "
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
              @click="
                policialSelecionado = policial;
                despachar(3, policial.id);
              "
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
        <q-btn flat label="Cancelar" color="red" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Tela de escolha de policial para acesso -->
  <q-dialog v-model="telaPolicialAcesso" persistent>
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
              @click="
                policialSelecionado = policial;
                acessoAvulso(policial);
              "
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
              <q-item clickable @click="passarCarga()" v-if="viewPassarCarga()">
                <q-item-section avatar>
                  <q-icon name="fa-solid fa-dolly" />
                </q-item-section>
                <q-item-section>Passar Carga</q-item-section>
              </q-item>

              <q-item
                clickable
                @click="retornarCarga()"
                v-if="viewRetornaCarga()"
              >
                <q-item-section avatar>
                  <q-icon name="fa-solid fa-rotate-left" />
                </q-item-section>
                <q-item-section>Devolver a carga</q-item-section>
              </q-item>
              <q-item
                clickable
                @click="telaMotivoFinalizacao()"
                v-if="viewFinalizarCaso()"
              >
                <q-item-section avatar>
                  <q-icon name="fa-regular fa-calendar-xmark" />
                </q-item-section>
                <q-item-section>Finalizar Caso</q-item-section>
              </q-item>
              <q-item
                clickable
                @click="franquearAcesso()"
                v-if="viewPermitirVisualizacao()"
              >
                <q-item-section avatar>
                  <q-icon name="fa-solid fa-person" />
                </q-item-section>
                <q-item-section>Permitir visualização</q-item-section>
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
          <div class="full-width q-pa-md" v-if="!tramitacoes">
            <q-banner class="bg-grey-3">
              <template v-slot:avatar>
                <q-icon
                  name="fa-solid fa-arrow-down-up-across-line"
                  color="red-8"
                />
              </template>
              Nenhuma Tramitação efetuada
              <template v-slot:action>
                <q-btn
                  flat
                  icon="fa-solid fa-dolly"
                  color="primary"
                  label="Passar a Carga"
                  @click="passarCarga()"
                />
              </template>
            </q-banner>
          </div>
          <timeline-tramitacao
            :tramitacoes="tramitacoes"
            :grupos="grupos"
            :subgrupos="subGrupos"
            :usuarios="usuarios"
          />
        </template>
        <template v-slot:after>
          <div class="q-ml-md">
            <q-toolbar dense class="grey">
              <div class="text-overline">Acessos</div>

              <q-space />

              <q-btn
                dense
                icon="delete"
                label="remover acesso"
                color="primary"
                class="text-grey-3"
                v-if="validarBtnRemover() && store.login.dipc"
                @click="removerAcesso()"
              />
            </q-toolbar>

            <q-tree
              class="q-mt-md"
              :nodes="arvore"
              node-key="id"
              selected-color="primary"
              v-model:selected="nodoSelecionado"
              default-expand-all
            />
          </div>
          <div class="q-pa-md q-gutter-sm" v-if="caso.finalizado">
            <q-banner rounded class="bg-red-6 text-white">
              <template v-slot:avatar>
                <q-icon name="fa-regular fa-calendar-xmark" color="white" />
              </template>
              ESSE CASO ESTÁ <b>FINALIZADO</b>!
              <!-- <div class="full-width bg-red-3 q-ma-sm q-pa-sm">
                <div v-html="this.caso.motivo_finalizado"></div>
              </div> -->

              <template v-slot:action>
                <q-btn color="red-4" label="Ler Motivo" @click="lerMotivo()" />
                <q-btn
                  color="red-4"
                  label="Reabrir o Caso"
                  @click="reabrirCaso()"
                />
              </template>
            </q-banner>
          </div>
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
import TimelineTramitacao from "./TimelineTramitacao.vue";
import { editorFunc, fonts } from "../utils/variaveis.js";

export default {
  name: "CasoTramitacoes",
  components: { LabelData, TimelineTramitacao },
  props: {
    idCaso: {
      type: Number,
      required: true,
    },
  },

  setup() {
    const store = useStore();

    return { store, api, editorFunc, fonts };
  },
  data() {
    return {
      // Franquear acesso
      telaAcesso: false,

      motivoFinalizacao: null,
      motivoFinaliza: null,
      idMotivoFinaliza: null,
      motivoLista: null,
      telaFinalizacao: false,

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

      telaPolicialAcesso: false,
      telaPolicial: false,
      nomePesPolicial: null,
      dadosPolicial: null,
      policialSelecionado: null,
      grupoSelecionado: null,
      subGrupoSelecionado: null,
      usuarios: null,

      quemEhVc: null,
      carga: null,
      motivos: null,
      cargaDest: null,
      telaDados: false,

      divisorTela: 50,

      telaErro: false,
      dadosErro: null,
      respostaErro: null,

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
      if (this.carga.tipo == 2) {
        return this.subGrupos.filter((item) => item.id_grupo == this.carga.id);
      } else {
        return [];
      }
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

    motivoFinaliza() {
      const temp = this.motivos.find((mo) => mo.motivo == this.motivoFinaliza);
      this.idMotivoFinaliza = temp.id;
    },
  },

  methods: {
    async carregaDados() {
      this.store.telaCarregamento(true);

      const the_param = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "20040",
        id_caso: this.idCaso,
      };

      this.store.telaCarregamento(true);

      const resposta = await api.post("/consulta", the_param);

      this.store.telaCarregamento(false);

      this.caso = resposta.data.caso[0];
      this.acessoGrupos = resposta.data.acessoGrupos;
      this.acessoSubGrupos = resposta.data.acessoSubGrupos;
      this.acessoUsuarios = resposta.data.acessoUsuarios;

      if (resposta.data.tramitacoes) {
        // Caso haja tramitações
        this.tramitacoes = resposta.data.tramitacoes.sort((a, b) => {
          return b.id - a.id; // Colocar em ordem decrescente
        });
      }

      this.quemEhVc = resposta.data.quemehvc;
      this.carga = resposta.data.carga;
      this.grupos = resposta.data.grupos;
      this.subGrupos = resposta.data.subgrupos;
      this.usuarios = resposta.data.usuarios;

      this.gruposFiltrados = this.grupos;
      this.cargaAtual = this.carga.nome;

      this.criarArvore();

      this.motivos = resposta.data.motivos;
      this.motivoLista = this.motivos.map((el) => el.motivo);

      this.dadosCarregados = true;
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

    criarArvore() {
      let temp = [];
      let temp_subgrupo_acesso = [];

      // if (!this.acessosubGrupos) {
      //   this.acessoSubGrupos = [];
      // }

      temp.push({
        id: "G",
        label: "NINTS",
        icon: "fa-solid fa-people-roof",
        children: [],
      });

      if (this.acessoGrupos) {
        for (let obj_grupo of this.acessoGrupos) {
          if (this.acessoSubGrupos) {
            temp_subgrupo_acesso = this.acessoSubGrupos.filter(
              (o) => o.id_grupo == obj_grupo.id_grupo
            );
          }

          let filho = [];

          if (this.acessoSubGrupos) {
            for (let obj of temp_subgrupo_acesso) {
              filho.push({
                id: `SG#${obj.id}`,
                id_original: obj.id,
                label: this.labelCarga(obj.nome_subgrupo),
                caption: obj.desc_subgrupo,
                icon: "fa-solid fa-house-user",
              });
            }
          }

          temp[0].children.push({
            id: `G#${obj_grupo.id}`,
            id_original: obj_grupo.id,
            //label: obj_grupo.nome_grupo,
            label: this.labelCarga(obj_grupo.nome_grupo),

            icon: "fa-solid fa-building-shield",
            children: filho,
          });
        }
      }

      if (this.acessoUsuarios) {
        let filhosUser = [];

        for (let obj_usuario of this.acessoUsuarios) {
          filhosUser.push({
            id: `U#${obj_usuario.id}`,
            label: this.labelCarga(obj_usuario.nome),
            avatar: this.retornaFoto(obj_usuario.foto),
          });
        }

        temp.push({
          id: "U",
          label: "USUÁRIOS",
          icon: "fa-regular fa-user",
          children: filhosUser,
        });
      }

      this.arvore = temp;
    },

    labelCarga(nome) {
      const emoji = "📦";

      if (this.carga.nome == nome) {
        return `${nome} ${emoji}`;
      } else {
        return nome;
      }
    },

    estaComACarga() {
      if (this.carga.tipo == 1) {
        if (this.quemEhVc.usuario_dipc) {
          return true;
        } else {
          return false;
        }
      }

      if (this.carga.tipo == 2) {
        if (this.quemEhVc.id_grupo) {
          if (this.quemEhVc.id_grupo == this.carga.id) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }

      if (this.carga.tipo == 3) {
        if (this.quemEhVc.id_subgrupo) {
          if (this.quemEhVc.id_subgrupo == this.carga.id) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }

      if (this.carga.tipo == 4) {
        if (this.quemEhVc.id == this.carga.id) {
          return true;
        } else {
          return false;
        }
      }
    },

    async passarCarga() {
      if (!this.estaComACarga()) {
        this.store.alerta("Esse usuário não está com a carga");
        return false;
      }

      switch (this.carga.tipo) {
        case 1:
          if (this.quemEhVc.usuario_dipc) {
            this.origemCarga = {
              idCaso: this.caso.id,
              dipc: true,
              caption: "DINT",
              idGrupo: null,
              idSubGrupo: null,
              idUsuario: null,
            };

            this.telaShareGrupo = true;
          } else {
            this.store.alerta("Esse usuário não está com a carga");
          }
          break;

        case 2: // Grupo
          const idGrupo = this.quemEhVc.id_grupo;
          const nomeGrupo = this.quemEhVc.nome_grupo;

          if (this.carga.id == this.quemEhVc.id_grupo) {
            this.origemCarga = {
              idCaso: this.caso.id,
              dipc: false,
              caption: nomeGrupo,
              idGrupo: idGrupo,
              idSubGrupo: null,
              idUsuario: null,
            };
            this.telaSubGrupo = true;
          } else {
            this.store.alerta("Esse usuário não está com a carga");
          }
          break;

        case 3: // SubGrupo
          const idSubGrupo = this.quemEhVc.id_subgrupo;
          const nomeSubGrupo = this.quemEhVc.nome_subgrupo;

          if (idSubGrupo == this.carga.id) {
            this.origemCarga = {
              idCaso: this.caso.id,
              dipc: false,
              caption: nomeSubGrupo,
              idGrupo: null,
              idSubGrupo: idSubGrupo,
              idUsuario: null,
            };
            this.telaPolicial = true;
          } else {
            this.store.alerta("Esse usuário não está com a carga");
          }
          break;

        case 4: // Usuário
          const idSubGrupoLast = await this.retornaLastTramitacao(
            this.caso.id,
            this.quemEhVc.id
          );

          this.origemCarga = {
            idCaso: this.caso.id,
            dipc: false,
            caption: this.quemEhVc.nome,
            idGrupo: null,
            idSubGrupo: null,
            idUsuario: this.quemEhVc.id,
          };

          this.despachar(4, idSubGrupoLast.id_subgrupo_origem);
          break;

        default:
          this.store.alerta("Caso sem carga definida !");
          break;
      }
    },

    async retornaLastTramitacao(idCaso, idUsuario) {
      const param = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10033",
        idcaso: idCaso,
        idusuario: idUsuario,
      };

      const resposta = await api.post("/consulta", param);

      return resposta.data[0];
    },

    async tramitar() {
      if (this.despacho == "") {
        this.store.alerta("Favor preencher o motivo da tramitação.");
        return false;
      }

      //1: DINT para NINT; 2: NINT para subgrupo; 3: Subgrupo para usuário
      // -1: NINT para DINT; -2: Subgrupo para NINT; -3: usuário para subgrupo

      const params = {
        codigo_sys_func: "20038",
        cpf_log: this.store.login.cpf_log,

        id_caso: this.caso.id,
        id_usuario_dest: this.destinoCarga.idUsuario,
        id_usuario_origem: this.origemCarga.idUsuario,
        id_grupo_dest: this.destinoCarga.idGrupo,
        id_grupo_origem: this.origemCarga.idGrupo,
        id_subgrupo_dest: this.destinoCarga.idSubGrupo,
        id_subgrupo_origem: this.origemCarga.idSubGrupo,
        tipo: this.destinoCarga.tipo,
        motivo: this.despacho,
      };

      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params);
      this.store.telaCarregamento(false);

      if (resposta.data.status_ret == 0) {
        // Recarregar os dados
        this.carregaDados();

        // Fechar todas as telas
        this.telaDespacho = false;
        this.telaShareGrupo = false;
        this.telaSubGrupo = false;
        this.telaPolicial = false;

        // Limpar o motivo
        this.despacho = "";
      } else {
        this.dadosErro = params;
        this.respostaErro = resposta;
        this.telaErro = true;
      }
    },

    async despachar(tipoDespacho, id) {
      /*
      tipo de despacho
      1 - DINT para NINT
      2 - NINT para Subgrupo
      3 - Subgrupo para Usuário
      -1 - Retorno de NINT para DINT
      -2 - Retorno de Subgrupo para NINT
      -3 - Retorno de usuário para subgrupo
       */

      switch (tipoDespacho) {
        case 1:
          const nomeGrupo = this.grupos.filter((item) => item.id === id)[0]
            .nome_grupo;
          this.destinoCarga = {
            tipo: tipoDespacho,
            idCaso: this.caso.id,
            dipc: false,
            caption: nomeGrupo,
            idGrupo: id,
            idSubGrupo: null,
            idUsuario: null,
          };
          break;

        case 2:
          const nomeSubgrupo = this.subGrupos.filter(
            (item) => item.id === id
          )[0].nome_subgrupo;
          this.destinoCarga = {
            tipo: tipoDespacho,
            idCaso: this.caso.id,
            dipc: false,
            caption: nomeSubgrupo,
            idGrupo: null,
            idSubGrupo: id,
            idUsuario: null,
          };
          break;

        case 3:
          this.destinoCarga = {
            tipo: tipoDespacho,
            idCaso: this.caso.id,
            dipc: false,
            caption: this.policialSelecionado.nome,
            idGrupo: null,
            idSubGrupo: null,
            idUsuario: this.policialSelecionado.id,
          };
          break;

        case 4:
          this.destinoCarga = {
            tipo: -3,
            idCaso: this.caso.id,
            dipc: false,
            caption: this.subGrupos.find((s) => s.id == id).nome_subgrupo,
            idGrupo: null,
            idSubGrupo: id,
            idUsuario: null,
          };
          break;

        case -1:
          this.destinoCarga = {
            tipo: -1,
            idCaso: this.caso.id,
            dipc: true,
            caption: "DINT",
            idGrupo: id,
            idSubGrupo: null,
            idUsuario: null,
          };
          break;

        case -2:
          this.destinoCarga = {
            tipo: -2,
            idCaso: this.caso.id,
            dipc: false,
            caption: this.grupos.find((s) => s.id == id).nome_grupo,
            idGrupo: id,
            idSubGrupo: null,
            idUsuario: null,
          };
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

    retornarCarga() {
      if (!this.tramitacoes) {
        this.store.alerta("Ainda não há tramitações para esse caso ");
        return false;
      }

      if (!this.estaComACarga()) {
        this.store.alerta("Esse usuário não está com a carga");
        return false;
      }

      if (this.podeRetornarCarga()) {
        let id;
        let tipo;

        if (this.carga.tipo == 2) {
          tipo = -1;

          id = null;

          this.origemCarga = {
            idCaso: this.caso.id,
            dipc: false,
            caption: this.quemEhVc.nome_grupo,
            idGrupo: this.carga.id,
            idSubGrupo: null,
            idUsuario: null,
          };
        } else {
          tipo = -2;

          const tramit = this.tramitacoes.reduce((mId, obj) => {
            return obj.id > mId ? obj : mId;
          });

          id = tramit.id_grupo_origem;

          this.origemCarga = {
            idCaso: this.caso.id,
            dipc: false,
            caption: this.quemEhVc.nome_subgrupo,
            idGrupo: null,
            idSubGrupo: this.carga.id,
            idUsuario: null,
          };
        }

        this.despachar(tipo, id);
      } else {
        this.store.alerta(
          "Somente NINTs e seus Subgrupos podem retornar cargas que ainda não foram tramitadas"
        );
      }
    },

    podeRetornarCarga() {
      const tramit = this.tramitacoes.reduce((maiorId, objetoAtual) => {
        return objetoAtual.id > maiorId.id ? objetoAtual : maiorId;
      });

      if ([2, 3].includes(this.carga.tipo)) {
        if (this.carga.tipo == 3) {
          if (tramit.id_usuario_origem) {
            return false;
          } else if (tramit.id_grupo_origem) {
            return true;
          } else {
            return false;
          }
        } else {
          if (tramit.dipc_origem) {
            return true;
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
    },

    telaMotivoFinalizacao() {
      if (![2, 3].includes(this.carga.tipo)) {
        this.store.alerta(
          "Somente NINTs e seus respectivos subgrupos podem finalizar um caso."
        );
        return false;
      }

      if (!this.estaComACarga()) {
        this.store.alerta("Esse usuário não está com a carga");
        return false;
      }

      this.telaFinalizacao = true;
    },

    async finalizarCaso() {
      if (!this.idMotivoFinaliza) {
        this.store.alerta("Escolha um tipo de conclusão para o caso !");
        return false;
      }

      if (!this.motivoFinalizacao || this.motivoFinalizacao == "") {
        this.store.alerta("Favor preencher o motivo");
        return false;
      }

      const params = {
        codigo_sys_func: "20041",
        cpf_log: this.store.login.cpf_log,
        tipo_crud: 1,
        id_caso: this.caso.id,
        motivo: this.motivoFinalizacao,
        id_motivo: this.idMotivoFinaliza,
      };

      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params);
      this.store.telaCarregamento(false);

      if (resposta.data.status_ret == 0) {
        // Recarregar os dados
        this.carregaDados();
        this.telaFinalizacao = false;
      } else {
        this.dadosErro = params;
        this.respostaErro = resposta;
        this.telaErro = true;
      }
    },

    async reabrirCaso() {
      if (!this.estaComACarga()) {
        this.store.alerta(
          "Somente o NINT ou subgrupo que está com a carga pode reabrir o caso"
        );
        return false;
      }
      Dialog.create({
        title: "Reabrir o Caso",
        message: "Deseja reabrir o caso ? ",
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        const params = {
          codigo_sys_func: "20041",
          cpf_log: this.store.login.cpf_log,
          tipo_crud: 2,
          id_caso: this.caso.id,
          motivo: null,
        };

        this.store.telaCarregamento(true);
        const resposta = await api.post("/consulta", params);
        this.store.telaCarregamento(false);

        if (resposta.data.status_ret == 0) {
          // Recarregar os dados
          this.carregaDados();
        } else {
          this.dadosErro = params;
          this.respostaErro = resposta;
          this.telaErro = true;
        }
      });
    },

    validarBtnRemover() {
      if (this.nodoSelecionado) {
        return this.nodoSelecionado.slice(0, 2) == "U#";
      } else {
        return false;
      }
    },

    async removerAcesso() {
      const idUsuario = this.nodoSelecionado.split("#")[1];

      if (this.carga.id == idUsuario) {
        this.store.alerta(
          "Não se pode revogar o acesso do usuário que está com a carga !"
        );
        return false;
      }

      Dialog.create({
        title: "Revogar Acesso",
        message: `Deseja remover o acesso  ? `,
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        const params = {
          codigo_sys_func: "20043",
          cpf_log: this.store.login.cpf_log,
          id_caso: this.caso.id,
          id_usuario: idUsuario,
        };

        this.store.telaCarregamento(true);
        const resposta = await api.post("/consulta", params);
        this.store.telaCarregamento(false);

        if (resposta.data.status_ret == 0) {
          // Recarregar os dados
          this.carregaDados();
          this.store.alerta(resposta.data.retorno);
        } else {
          this.store.alerta(resposta.data.retorno);
        }
      });
    },

    async franquearAcesso() {
      if (!this.store.login.dipc) {
        const paramC = {
          codigo_sys_func: "10035",
          cpf_log: this.store.login.cpf_log,
          id_caso: this.caso.id,
        };

        this.store.telaCarregamento(true);
        const respostaC = await api.post("/consulta", paramC);
        this.store.telaCarregamento(false);

        const acesso = respostaC.data;

        const result = acesso.find((el) => el.cpf == this.store.login.cpf_log);

        if (!result) {
          this.store.alerta("Esse usuário não pode permitir a visualização");
          return false;
        }
      }

      this.telaPolicialAcesso = true;
    },

    async acessoAvulso(policial) {
      const params = {
        codigo_sys_func: "20044",
        cpf_log: this.store.login.cpf_log,
        id_caso: this.caso.id,
        id_usuario: policial.id,
      };

      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params);
      this.store.telaCarregamento(false);

      if (resposta.data.status_ret == 0) {
        // Recarregar os dados
        this.carregaDados();
        this.telaPolicialAcesso = false;
        this.store.alerta(resposta.data.retorno);
      } else {
        this.store.alerta(resposta.data.retorno);
      }
    },

    lerMotivo() {
      const temp = this.motivos.find(
        (el) => el.id == this.caso.id_motivo_finalizacao
      );
      let str = `<p><b><u>Caso</u></b>: ${temp.motivo}</p>`;
      if (this.caso.motivo_finalizado) {
        str += `<hr><br><b><u>Motivação</b></u><br>${this.caso.motivo_finalizado}`;
      }
      this.store.alerta(str);
    },

    viewPassarCarga() {
      if (this.caso.finalizado) {
        return false;
      }

      if (!this.estaComACarga()) {
        return false;
      }

      return true;
    },

    viewRetornaCarga() {
      if (this.caso.finalizado) {
        return false;
      }

      if (!this.tramitacoes) {
        return false;
      }

      if (!this.estaComACarga()) {
        return false;
      }

      if (this.quemEhVc.usuario_dipc) {
        return false;
      }

      if (!this.quemEhVc.usuario_nint && !this.quemEhVc.nome_subgrupo) {
        return false;
      }

      return true;
    },

    viewFinalizarCaso() {
      if (![2, 3].includes(this.carga.tipo)) {
        return false;
      }

      if (!this.estaComACarga()) {
        return false;
      }

      return true;
    },

    viewPermitirVisualizacao() {
      return (
        this.quemEhVc.usuario_dipc ||
        this.quemEhVc.usuario_nint ||
        this.quemEhVc.nome_subgrupo
      );
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
