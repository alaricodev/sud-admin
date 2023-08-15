<template>
  <div v-if="dados" class="q-ma-sm" style="width: 300px; max-height: 300px">
    <q-card
      class="full-width"
      style="
        border: 1px solid rgb(209, 208, 208);
        box-shadow: 2px 2px 2px 1px rgb(228, 226, 226);
      "
    >
      <q-card-section>
        <div class="row">
          <div class="col-3">
            <q-avatar rounded>
              <q-img :src="retornaFoto(dados.foto)" />
              <q-badge
                rounded
                :color="store.corAcesso(dados.nivel_acesso)"
                floating
                >{{ dados.nivel_acesso }}</q-badge
              >
            </q-avatar>
          </div>
          <div class="col">
            <!-- <div class="full-width text-bold ">
              {{ dados.nome }}
            </div> -->

            <q-item-label class="full-width text-bold" :lines="1">
              {{ dados.nome }}
            </q-item-label>

            <div class="full-width text-italic">{{ dados.cargo }}</div>
            <div class="full-width text-caption text-lowercase">
              {{ dados.email_funcional }}
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator />
      <q-card-actions align="right">
        <q-btn
          dense
          flat
          :disable="desativado"
          label="Remover"
          :color="desativado ? 'grey-5' : 'red-10'"
          icon="fa-solid fa-trash"
          @click="removerUsuario()"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { useStore } from "../stores/store.js";
export default {
  name: "UsuarioCard",

  setup() {
    const store = useStore();
    return {
      store,
    };
  },
  data() {
    return {};
  },

  props: {
    dados: {
      type: Object,
      required: true,
    },
    funcao: {
      type: Function,
      required: true,
    },
    desativado: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  methods: {
    retornaFoto(foto) {
      return `https://getin.pc.sc.gov.br/get_files_imgUser/${foto}`;
    },
    removerUsuario() {
      this.funcao(this.dados.id_caso_x_usuario);
    },
  },
};
</script>

<style lang="scss" scoped></style>
