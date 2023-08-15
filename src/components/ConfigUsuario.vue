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
                @click="SelecionaPolicial(policial)"
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

  <!-- Tela Principal começa aqui -->
  <div class="full-width">
    <q-btn
      label="Selecionar Usuário"
      icon="fa-regular fa-user"
      color="primary"
      class="q-mx-md"
      @click="telaProcuraPolicial = true"
    />
  </div>
  <q-separator color="primary" class="q-my-sm" />
  <div
    v-if="usuarioSelecionado"
    class="full-width q-ma-sm"
    style="height: 550px"
  >
    <div class="row">
      <div class="col-6">
        <div class="full-width q-pa-md text-center">
          <q-avatar size="150px">
            <img :src="retornaFoto(policialSelecionado.foto)" />
          </q-avatar>
        </div>
        <div class="full-width text-center text-subtitle1 text-grey-8">
          {{ policialSelecionado.nome }}
        </div>
        <div
          class="full-width text-center text-subtitle2 text-italic text-grey-7"
        >
          {{ policialSelecionado.cargo }}
        </div>

        <q-separator color="primary" class="q-ma-md" />
        <div>
          <label-data
            class="q-ma-sm"
            label="DIPC:"
            :texto="policialSelecionado.usuario_dipc ? 'SIM' : 'NÃO'"
            :cor="policialSelecionado.usuario_dipc ? 'green' : 'red'"
          />

          <label-data
            class="q-ma-sm"
            label="Nível de Acesso:"
            :texto="policialSelecionado.nivel_acesso"
            :cor="store.corAcesso(policialSelecionado.nivel_acesso)"
          />

          <label-data
            class="q-ma-sm"
            label="Matricula:"
            :texto="policialSelecionado.matricula"
          />
          <label-data
            class="q-ma-sm"
            label="Email:"
            :texto="policialSelecionado.email_funcional"
          />
          <label-data
            v-if="policialSelecionado.nome_grupo"
            class="q-ma-sm"
            label="GRUPO:"
            :texto="policialSelecionado.nome_grupo"
          />
        </div>
      </div>
      <div class="col">
        <div class="q-gutter-y-md" style="max-width: 600px">
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
              <q-tab name="1" label="Casos" icon="fa-regular fa-newspaper" />
              <q-tab name="2" label="Acesso" icon="fa-solid fa-list-ol" />
              <q-tab name="3" label="DIPC" icon="fa-solid fa-building-shield" />
            </q-tabs>
            <q-separator color="primary" />
            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="1" style="height: 450px">
                <!-- <div class="text-h6">CASOS</div> -->

                <div>
                  <q-table
                    flat
                    title="Casos"
                    :rows="rowsCasos"
                    :columns="columnsCasos"
                    row-key="protocolo"
                    :filter="filtro"
                    hide-header
                    bordered="false"
                    no-data-label="Sem casos disponíveis"
                    :rows-per-page-options="[6, 10, 20, 30, 50, 100]"
                    rows-per-page-label="Registros por página"
                  >
                    <template v-slot:top-right>
                      <q-input
                        outlined
                        dense
                        debounce="300"
                        v-model="filtro"
                        placeholder="Filtro"
                      >
                        <template v-slot:append>
                          <q-icon name="search" />
                        </template>
                      </q-input>
                    </template>
                    <template v-slot:body-cell-tipo="props">
                      <q-td :props="props">
                        <div class="row">
                          <q-icon
                            class="q-pt-sm q-pr-sm"
                            :name="store.iconeCaso(props.value)"
                            :color="store.corCaso(props.value)"
                          />
                          <span
                            class="q-pt-xs"
                            :class="`text-bold text-${store.corCaso(
                              props.value
                            )}`"
                            >{{ store.displayCaso(props.value) }}</span
                          >
                        </div>
                      </q-td>
                    </template>
                    <!-- <template v-slot:body-cell-action="props">
                      <q-td :props="props">
                        <q-btn
                          dense
                          color="primary"
                          icon="delete"
                          @click="removeAcesso(props.row)"
                        />
                      </q-td>
                    </template> -->
                  </q-table>
                </div>
              </q-tab-panel>

              <q-tab-panel name="2" style="height: 450px">
                <div class="text-h6">NÍVEL DE ACESSO</div>
                Aqui você pode mudar o nível de acesso às informações que esse
                usuário tem.
                <div class="full-width text-center q-ma-xl">
                  <div class="flex flex-center">
                    <div
                      :class="`bg-${store.corAcesso(
                        policialSelecionado.nivel_acesso
                      )}`"
                      style="border-radius: 50%; width: 120px; height: 120px"
                      class="flex flex-center"
                    >
                      <div class="text-h1 text-white">
                        {{ policialSelecionado.nivel_acesso }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="full-width text-center q-ma-xl">
                  <div class="row flex flex-center">
                    <q-btn
                      icon="fa-solid fa-minus"
                      @click="valorNivelSigilo('-')"
                    />
                    <q-btn
                      icon="fa-solid fa-plus"
                      @click="valorNivelSigilo('+')"
                    />
                  </div>
                </div>
              </q-tab-panel>

              <q-tab-panel name="3" style="height: 450px">
                <div class="text-h6">DIPC</div>
                Aqui você pode tornar ou retirar o usuário como membro DIPC.

                <div
                  v-if="!policialSelecionado.usuario_dipc"
                  class="flex flex-center"
                  style="height: 90%"
                >
                  <q-btn
                    unelevated
                    rounded
                    class="width: 100%"
                    color="primary"
                    label="Tornar Esse usuário membro da DIPC"
                    @click="membroDIPC(true, policialSelecionado)"
                  />
                </div>
                <div v-else class="flex flex-center" style="height: 90%">
                  <q-btn
                    unelevated
                    rounded
                    class="width: 100%"
                    color="red"
                    label="Retirar esse usuário da DIPC"
                    @click="membroDIPC(false, policialSelecionado)"
                  />
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
          <!-- <div class="full-width q-pa-sm">
            <q-btn
              unelevated
              rounded
              class="width: 100%"
              color="primary"
              label="Salvar Alterações"
            />
          </div> -->
        </div>
      </div>
    </div>
  </div>
  <div v-else class="full-width q-ma-sm flex flex-center" style="height: 550px">
    <q-icon name="fa-regular fa-user" size="xl" class="" />
    <span class="text-subtitle1 q-ml-md">Nenhum Usuário Selecionado</span>
  </div>
</template>

<script>
import { api } from "src/boot/axios";
import { useStore } from "src/stores/store";
import LabelData from "./LabelData.vue";
import { formatarDataCurta } from "../utils/util.js";
import { Dialog } from "quasar";
export default {
  name: "ConfigUsuario",
  components: { LabelData },
  created() {},
  setup() {
    const store = useStore();
    return { store };
  },
  data() {
    return {
      tab: "1",
      usuarioSelecionado: false,
      telaProcuraPolicial: false,
      nomePolicialPesquisa: null,
      nomesPesquisados: null,
      policialSelecionado: null,
      filtro: "",
      rowsCasos: [],
      columnsCasos: [
        {
          name: "protocolo",
          required: true,
          label: "Protocolo",
          align: "left",
          field: (row) => row.protocolo,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "tipo",
          align: "center",
          label: "Tipo",
          field: "tipo",
          sortable: true,
        },
        {
          name: "data",
          label: "Data",
          field: "data_caso",
          sortable: true,
          format: (val) => `${formatarDataCurta(val)}`,
        },
        { name: "action", label: "Aceso", align: "right", field: "id_acesso" },
      ],
    };
  },

  methods: {
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
      //this.policialSelecionado = null;

      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10008B",
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

    async retornaCasoUsuario(cpf) {
      const params = {
        cpf_log: cpf,
        codigo_sys_func: "10013",
        ativo: true,
        arquivado: true,
      };

      const resposta = await api.post("/consulta", params);

      resposta.data ? (this.rowsCasos = resposta.data) : (this.rowsCasos = []);
    },

    retornaFoto(foto) {
      return `https://getin.pc.sc.gov.br/get_files_imgUser/${foto}`;
    },

    SelecionaPolicial(policial) {
      this.policialSelecionado = policial;
      this.retornaCasoUsuario(policial.cpf);
      this.nomePolicialPesquisa = null;
      this.nomesPesquisados = null;
      this.telaProcuraPolicial = false;
      this.usuarioSelecionado = true;
    },

    async membroDIPC(vlr, policial) {
      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "20025",
        tipo_crud: vlr ? 1 : 2,
        id: policial.id,
        cpf_usuario: policial.cpf,
      };

      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params);
      this.store.telaCarregamento(false);

      if (resposta.data.status_ret == 0) {
        this.policialSelecionado.usuario_dipc = vlr;
        let nivel = 0;
        vlr ? (nivel = 2) : (nivel = 1);
        this.policialSelecionado.nivel_acesso = nivel;
      }

      this.retornaCasoUsuario(policial.cpf);

      this.store.alerta(resposta.data.retorno);

      return true;
    },

    removeAcesso(coluna) {
      Dialog.create({
        title: "Apagar registro",
        message: "Deseja remover esse acesso do usuário ? ",
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        const params = {
          cpf_log: this.store.login.cpf_log,
          codigo_sys_func: "20026",
          id_acesso: coluna.id_acesso,
        };
        this.store.telaCarregamento(true);
        const resposta = await api.post("/consulta", params);
        this.store.telaCarregamento(false);
        if (resposta.data.status_ret == 0) {
          this.retornaCasoUsuario(this.policialSelecionado.cpf);
        }

        this.store.alerta(resposta.data.retorno);
      });
    },

    async valorNivelSigilo(oper) {
      let nivel = this.policialSelecionado.nivel_acesso;
      let podeAtualizar = false;

      if (oper == "+") {
        if (nivel < 3) {
          nivel++;
          podeAtualizar = true;
        }
      } else {
        if (nivel > 1) {
          nivel--;
          podeAtualizar = true;
        }
      }

      if (podeAtualizar) {
        const params = {
          cpf_log: this.store.login.cpf_log,
          codigo_sys_func: "20015",
          tipo_crud: 3,
          id: this.policialSelecionado.id,
          nivel_acesso: nivel,
        };

        this.store.telaCarregamento(true);
        const resposta = await api.post("/consulta", params);
        this.store.telaCarregamento(false);

        if (resposta.data.status_ret == 0) {
          this.policialSelecionado.nivel_acesso = nivel;
        } else {
          this.store.alerta(resposta.data.retorno);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
