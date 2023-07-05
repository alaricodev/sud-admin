<template>
  <!-- confirmação de exclusao -->
  <q-dialog v-model="confirmDelete" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar
          icon="fa-regular fa-comments"
          color="primary"
          text-color="white"
        />
        <span class="q-ml-sm">Deseja apagar a anotação ?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" v-close-popup />
        <q-btn
          flat
          label="Apagar"
          color="red"
          @click="apagarAcompanhamento()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- Tela de edição anotações -->
  <q-dialog v-model="janelaEdit" persistent>
    <q-card>
      <q-bar>
        <q-icon name="info" />
        <div>Editar informação</div>

        <q-space />

        <q-btn dense flat icon="close" v-close-popup>
          <q-tooltip>Fechar</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <q-editor
          v-model="editorEdit"
          :definitions="{
            bold: { label: 'Negrito', icon: null, tip: 'Negrito' },
          }"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Salvar" icon="save" @click="salvarEdicao()" />
        <q-btn label="Cancelar" icon="close" @click="janelaEdit = false" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <div>
    <div class="text-h6">Acompanhamentos</div>
    <div class="q-pa-md q-gutter-sm" style="width: 100%">
      <q-editor
        v-model="editor"
        :definitions="{
          bold: { label: 'Negrito', icon: null, tip: 'Negrito' },
        }"
      />
    </div>
    <div class="q-ma-md">
      <q-btn label="Inserir Anotação" color="primary" @click="inserir()" />
    </div>
    <div v-if="acompanhamentos" class="q-my-sm">
      <div v-for="acompanhamento in acompanhamentos" :key="acompanhamento">
        <q-card class="q-ma-md bg-grey-3" style="min-height: 150px">
          <q-card-section>
            <div class="row">
              <div>
                <q-btn flat icon="menu" class="q-pt-sm">
                  <q-menu
                    transition-show="flip-right"
                    transition-hide="flip-left"
                  >
                    <q-list style="min-width: 100px">
                      <q-item
                        clickable
                        @click="
                          editarAcompanhamento(
                            acompanhamento.id,
                            acompanhamento.texto,
                            acompanhamento.iduso
                          )
                        "
                      >
                        <q-item-section avatar
                          ><q-icon color="blue" name="edit"
                        /></q-item-section>
                        <q-item-section>Editar anotação</q-item-section>
                      </q-item>
                      <q-separator />
                      <q-item
                        clickable
                        @click="
                          apagaComp(acompanhamento.id, acompanhamento.iduso)
                        "
                      >
                        <q-item-section avatar
                          ><q-icon color="red" name="delete"
                        /></q-item-section>
                        <q-item-section>Apagar</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
              <div class="text-subtitle1 q-pt-sm" style="text-align: left">
                {{ formatarDataExtenso(acompanhamento.data_acomp) }}
              </div>
              <q-space />
              <div class="text-subtitle1 q-pt-sm" style="text-align: right">
                <q-item>
                  <q-item-section avatar>
                    <q-avatar>
                      <img :src="retornaFoto(acompanhamento.foto)" />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section>
                    <q-item-label>{{ acompanhamento.nome }}</q-item-label>
                  </q-item-section>
                </q-item>
              </div>
            </div>
          </q-card-section>
          <q-separator color="primary" />
          <q-card flat bordered class="bg-grey-3">
            <div class="q-ma-md q-pa-sm" v-html="acompanhamento.texto" />
          </q-card>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { api } from "src/boot/axios";
import { useStore } from "../stores/store.js";
import { formatarDataExtenso } from "../utils/util";

export default {
  name: "SudInfoAcompanhamento",

  setup() {
    const store = useStore();

    return {
      formatarDataExtenso,
      store,
      api,
      editor: ref(""),
      // Edição
      editorEdit: ref(""),
      idEdit: ref(null),
      janelaEdit: ref(false),

      acompanhamentos: ref([]),

      confirmDelete: ref(false),
      idApagar: ref(null),
    };
  },
  mounted() {
    this.carregaAcompanhamentos();
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    retornaFoto(foto) {
      return `https://getin.pc.sc.gov.br/get_files_imgUser/${foto}`;
    },
    async carregaAcompanhamentos() {
      const idCaso = this.id;

      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "10006",
        idCaso: idCaso,
      };

      const resposta = await api.post("/consulta", params);

      this.acompanhamentos = resposta.data;
    },
    gerarParams() {
      const ret = {
        //FUNC
        codigo_sys_func: "20003",
        sys_func: "20003",
        tipo_crud: 1,
        cpf_log: this.store.login.cpf_log,
        id_usuario: this.store.login.id_usuario,
        id_caso: this.id,
        visivel: true,
        texto: this.editor,
      };
      return ret;
    },
    validarDados() {
      if (this.editor == "") {
        this.store.alerta("Preencha algum valor");
        return false;
      }
      return true;
    },
    async inserir() {
      if (this.validarDados()) {
        try {
          const res = await api.post(
            "/consulta", // url
            this.gerarParams() // arquivos e dados
          );

          this.store.alerta("REGISTRO FEITO COM SUCESSO !");
          this.editor = "";
          this.carregaAcompanhamentos();
        } catch (erro) {
          console.error(erro);
        }

        return true;
      } else {
        return false;
      }
    },
    editarAcompanhamento(id, nota, usuario) {
      if (usuario == this.store.login.id_usuario) {
        this.editorEdit = nota;
        this.idEdit = id;
        this.janelaEdit = true;
      } else {
        this.store.alerta("Somente o próprietário da nota pode editá-la");
      }
    },
    apagaComp(idAcompanhamento, usuario) {
      if (usuario == this.store.login.id_usuario) {
        this.idApagar = idAcompanhamento;
        this.confirmDelete = true;
      } else {
        this.store.alerta("Somente o próprietário da nota pode apagá-la");
      }
    },
    async apagarAcompanhamento() {
      try {
        const res = await api.post(
          "/consulta", // url
          {
            codigo_sys_func: "20003",
            sys_func: "20003",
            tipo_crud: 3,
            cpf_log: this.store.login.cpf_log,
            id_usuario: this.store.login.id_usuario,
            id: this.idApagar,
            visivel: false,
          } // arquivos e dados
        );
        this.confirmDelete = false;
        this.carregaAcompanhamentos();
      } catch (erro) {
        console.error(erro);
      }

      return true;
    },
    async salvarEdicao() {
      try {
        const res = await api.post(
          "/consulta", // url
          {
            codigo_sys_func: "20003",
            sys_func: "20003",
            tipo_crud: 3,
            cpf_log: this.store.login.cpf_log,
            id_usuario: this.store.login.id_usuario,
            id: this.idEdit,
            visivel: true,
            texto: this.editorEdit,
          } // arquivos e dados
        );
        this.janelaEdit = false;
        this.store.alerta("Edição concluída");

        this.carregaAcompanhamentos();
      } catch (erro) {
        console.error(erro);
      }

      return true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
