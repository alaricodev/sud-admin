<template>
  <q-card class="q-ma-sm" style="width: 160px">
    <q-card-section class="q-pa-none relative">
      <q-btn
        flat
        dense
        class="absolute"
        style="right: 5px; top: 5px; z-index: 9"
        icon="close"
        color="red"
        @dblclick="
          remover(usuario.id_usuarios_x_grupo_nint, usuario.id_usuario)
        "
      >
        <q-tooltip
          :delay="500"
          class="bg-primary text-body2"
          :offset="[10, 10]"
        >
          Remover do Grupo (duplo clique)
        </q-tooltip>
      </q-btn>
      <div class="full-width text-left"></div>
      <div class="full-width text-center q-pa-sm">
        <q-img
          :src="retornaFoto(usuario.foto)"
          width="100%"
          height="100%"
          class="relative"
        >
          <q-badge
            :color="store.corAcesso(usuario.nivel_acesso)"
            class="absolute q-px-xs"
            style="left: 0px; top: 0px; padding: 6px 8px"
            transparent
            rounded
            align="center"
            >{{ usuario.nivel_acesso }}
            <q-tooltip
              :delay="500"
              class="bg-primary text-body2"
              :offset="[10, 10]"
            >
              Nível de Acesso
            </q-tooltip>
          </q-badge>
        </q-img>
      </div>

      <div class="full-width">
        <div class="text-subtitle2 text-center">
          {{ abreviarSobrenomes(usuario.nome_usuario) }}
        </div>
        <div
          class="q-pb-sm text-lowercase text-center text-caption text-grey-6"
        >
          {{ usuario.cargo }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { abreviarSobrenomes } from "src/utils/util.js";
import { useStore } from "src/stores/store";
export default {
  name: "UsuarioCardSmall",
  created() {},
  setup() {
    const store = useStore();
    return { store };
  },
  data() {
    return { abreviarSobrenomes };
  },
  props: {
    usuario: {
      type: String,
      required: true,
    },
    funcao: {
      type: Function,
      required: true,
    },
  },
  methods: {
    retornaFoto(foto) {
      return `https://getin.pc.sc.gov.br/get_files_imgUser/${foto}`;
    },
    async remover(id, id_usuario) {
      this.funcao(id, id_usuario);
    },
  },
};
</script>

<style lang="scss" scoped></style>
