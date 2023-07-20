<template>
  <div class="flex flex-center q-pa-md" style="height: 100vh">
    <div
      class="bg-white"
      style="
        border-radius: 20px;
        border: 1px solid #616161;
        width: 100%;
        height: 100%;
      "
    >
      <div class="row" style="width: 100%">
        <div class="text-h6 q-ma-md row" style="width: 100%">
          <q-icon
            name="fa-brands fa-whatsapp"
            size="md"
            color="green"
            class="q-mr-md"
          />
          <div class="text-h5">Cadastro de denúncia feita pelo Whatsapp</div>
          <q-space />
          <div>
            <q-btn
              color="primary"
              label="Voltar"
              icon="arrow_back"
              @click="voltar()"
            />
          </div>
        </div>
      </div>
      <q-separator color="primary" />
      <div>
        <div class="q-ma-md" style="width: 98%">
          <q-input
            label="TELEFONE"
            class="q-pa-md"
            v-model="telefone"
            outlined
            mask="(##) ##### - ####"
            unmasked-value
            dense
          />
        </div>
        <div class="q-ma-md" style="width: 98%">
          <q-file
            class="q-pa-md"
            v-model="files"
            label="Clique aqui para selecione os Arquivos"
            outlined
            counter
            :counter-label="counterLabelFn"
            max-files="10"
            multiple
          >
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
        </div>
        <div class="q-ma-md" style="width: 98%">
          <div class="q-pa-sm">
            <q-input
              ref="txtDescricaoRef"
              v-model="relato"
              outlined
              type="textarea"
            />
            <q-avatar
              color="white"
              :text-color="relato.length >= 120 ? 'blue' : 'red'"
            >
              {{ relato.length }}</q-avatar
            >
            Caracteres - {{ relato.split(" ").length }} palavras
            <q-chip color="white"> </q-chip>
          </div>
        </div>
        <div
          class="q-ma-md"
          style="width: 98%; display: flex; justify-content: center"
        >
          <q-btn
            outlined
            class="q-mt-xl"
            style="width: 30%"
            color="primary"
            label="Salvar"
            icon="fa-solid fa-floppy-disk"
            @click="salvarDados"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { api } from "src/boot/axios";
import { validarTelefone } from "src/utils/validacoes.js";
import { useStore } from "src/stores/store";
import { useQuasar } from "quasar";

export default {
  name: "CadWhatsappDenuncia",
  created() {},
  setup() {
    const store = useStore();
    const $q = useQuasar();
    function alerta(msg) {
      $q.dialog({
        title: "Aviso",
        message: msg,
        html: true,
      }).onOk(() => {
        // console.log('OK')
      });
    }

    return {
      // API
      api,
      store,
      alerta,
      // CAMPOS
      telefone: ref(null),
      files: ref(null),
      relato: ref(""),
    };
  },
  props: {},

  methods: {
    gerarParams() {
      const ret = {
        //FUNC
        codigo_sys_func: "20001",
        sys_func: "20001",
        tipo_crud: 1,
        tipo: "WHATSAPP",
        cpf_log: this.store.cpf_log,
        //INFO
        telefone: this.telefone,
        // RELATO
        relato: this.relato,
      };
      return ret;
    },

    validarDados() {
      if (!validarTelefone(this.telefone)) {
        this.alerta("O <b>TELEFONE</b> informado parece ser inválido");
        return false;
      }
      if (this.relato.length < 120) {
        this.alerta("O <b>RELATO</b> tem que ter no mínimo 120 caracteres");
        return false;
      }
      return true;
    },
    voltar() {
      this.$router.push("/");
    },
    async salvarDados() {
      if (this.validarDados()) {
        // Headers

        const headers = {
          "Content-Type": "multipart/form-data",
        };

        let formData = new FormData();

        // Arquivos
        if (this.files) {
          for (let arquivo of this.files) {
            formData.append("files", arquivo);
          }
        }

        // Dados da denúncia dentro do formdata
        formData.append("data", JSON.stringify(this.gerarParams()));

        try {
          const res = await api.post(
            "/denuncias", // url
            formData, // arquivos e dados
            { headers } // headers
          );
          console.log(res.data);
          this.alerta("REGISTRO FEITO COM SUCESSO !");
          this.files = null;
          this.telefone = null;
          this.relato = "";
        } catch (erro) {
          console.log(res.data);
          console.error(erro);
        }

        return true;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
