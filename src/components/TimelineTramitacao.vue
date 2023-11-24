<template>
  <q-dialog
    v-model="telaMotivo"
    persistent
    style="max-width: 500px; max-height: 400px"
  >
    <q-card>
      <q-bar>
        <q-icon name="fa-solid fa-user-check" />
        <div class="text-body1">Motivo / Despacho</div>
        <q-space />
        <q-btn flat icon="close" size="sm" v-close-popup></q-btn>
      </q-bar>

      <q-card-section>
        <pre><div v-html="despacho"></div> </pre>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="fechar" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <div v-if="dadosCarregados">
    <q-timeline color="primary" class="q-px-lg q-pb-md">
      <q-timeline-entry
        v-for="(tramitacao, index) in tramitacoes"
        :key="index"
        :subtitle="`${formatarDataCurta(tramitacao.data_tramitacao)} -  ${
          tramitacoes.length - index
        }ª Tramitação`"
        icon="fa-regular fa-envelope"
      >
        <div>
          <ul style="list-style: none">
            <li class="q-ma-xs">
              <label-data label="DE:" :texto="retornaOrigem(tramitacao)" />
            </li>

            <li class="q-ma-xs">
              <label-data label="PARA:" :texto="retornaDestino(tramitacao)" />
            </li>
            <li class="q-ma-xs">
              <q-btn
                color="primary"
                label="Motivação"
                @click="lerMotivo(tramitacao)"
              />
              <q-chip>
                <q-avatar>
                  <img
                    :src="retornaFoto(dadosUsuario(tramitacao.id_usuario, 2))"
                  />
                </q-avatar>
                {{ dadosUsuario(tramitacao.id_usuario, 1) }}
              </q-chip>
              <!-- <div>
                <div class="limitar-texto" v-html="tramitacao.motivo" />
              </div>
              <q-btn flat label="Ler mais..." color="black" /> -->
            </li>
          </ul>
        </div>
      </q-timeline-entry>
    </q-timeline>
  </div>
</template>

<script>
import { formatarDataCurta } from "src/utils/util";
import { api } from "src/boot/axios";
import { useStore } from "src/stores/store";
import LabelData from "./LabelData.vue";

export default {
  components: { LabelData },
  name: "TimelineTramitacao",
  async created() {
    if (this.tramitacoes) {
      this.usuarios = await this.carregaUsuarios();
      console.log("====-=-=-=-=-=-=");
      console.log(this.usuarios);
      this.dadosCarregados = true;
    }
  },
  data() {
    return {
      usuarios: null,
      telaMotivo: false,
      despacho: null,
      dadosCarregados: false,
    };
  },
  setup() {
    const store = useStore();
    return { formatarDataCurta, store };
  },
  props: {
    tramitacoes: {
      type: Object,
      required: true,
    },
    grupos: {
      type: Object,
      required: false,
    },
    subgrupos: {
      type: Object,
      required: false,
    },
  },
  methods: {
    retornaOrigem(tramitacao) {
      let id;

      if (tramitacao.dipc_origem) {
        return "DIPC";
      }

      if (tramitacao.id_grupo_origem) {
        id = tramitacao.id_grupo_origem;
        const grupo = this.grupos.find((g) => g.id == id);
        return grupo.nome_grupo;
      }

      if (tramitacao.id_subgrupo_origem) {
        id = tramitacao.id_subgrupo_origem;
        const subgrupo = this.subgrupos.find((sg) => sg.id == id);
        return subgrupo.nome_subgrupo;
      }

      if (tramitacao.id_usuario_origem) {
        id = tramitacao.id_usuario_origem;
        console.log("---------");
        console.log(id);
        console.log(this.usuarios);
        console.log("---------");
        const user = this.usuarios.find((ud) => ud.id == id);
        return user.nome;
      }

      return "Passou reto pai !";
    },

    retornaDestino(tramitacao) {
      let id;

      console.log(tramitacao);

      if (tramitacao.dipc_destino) {
        return "DIPC";
      }

      if (tramitacao.id_grupo_destino) {
        id = tramitacao.id_grupo_destino;
        const grupo = this.grupos.find((g) => g.id == id);
        return grupo.nome_grupo;
      }

      if (tramitacao.id_subgrupo_destino) {
        id = tramitacao.id_subgrupo_destino;
        const subgrupo = this.subgrupos.find((sg) => sg.id == id);
        return subgrupo.nome_subgrupo;
      }

      if (tramitacao.id_usuario_destino) {
        id = tramitacao.id_usuario_destino;
        if (this.usuarios) {
          const user = this.usuarios.find((ud) => ud.id == id);
          return user.nome;
        } else {
          return null;
        }
      }

      return "Passou reto pai !";
    },

    montaArrayUser() {
      let arr = [];

      this.tramitacoes.forEach((el) => {
        if (el.id_usuario) {
          arr.push(el.id_usuario);
        }
        if (el.id_usuario_origem) {
          arr.push(el.id_usuario_origem);
        }
        if (el.id_usuario_destino) {
          arr.push(el.id_usuario_destino);
        }
      });

      return `array${JSON.stringify([...new Set(arr)])}`;
    },

    async carregaUsuarios() {
      const params = {
        codigo_sys_func: "10031",
        cpf_log: this.store.login.cpf_log,
        arr_ids: this.montaArrayUser(),
      };

      const resposta = await api.post("/consulta", params);

      return resposta.data;
    },

    dadosUsuario(id, tipo) {
      if (this.usuarios) {
        const temp = this.usuarios.find((us) => us.id == id);
        console.log(temp);
        if (temp) {
          if (tipo == 1) {
            return temp.nome;
          } else {
            return temp.foto;
          }
        }
      } else {
        return null;
      }
    },

    retornaFoto(foto) {
      if (foto) {
        return `https://getin.pc.sc.gov.br/get_files_imgUser/${foto}`;
      } else {
        console.log("foto nula");
        return null;
      }
    },

    lerMotivo(tramitacao) {
      this.despacho = tramitacao.motivo;
      this.telaMotivo = true;
    },
  },
};
</script>

<style>
.limitar-texto {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; /* Adiciona reticências (...) para indicar que há mais texto além do limite */
  max-width: 200px; /* Defina a largura máxima desejada para o contêiner */
}
</style>
