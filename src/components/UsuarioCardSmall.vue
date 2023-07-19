<template>
  <q-card class="q-ma-sm" style="max-width: 200px">
    <q-card-section>
      <div class="full-width text-left">
        <q-btn
          flat
          dense
          icon="close"
          color="red"
          @dblclick="removerUsuarioGrupo(usuario.id_usuarios_x_grupo_nint)"
        >
          <q-tooltip
            :delay="500"
            class="bg-primary text-body2"
            :offset="[10, 10]"
          >
            Remover do Grupo
          </q-tooltip>
        </q-btn>
      </div>
      <div class="full-width text-center q-py-md">
        <q-img :src="retornaFoto(usuario.foto)" width="100px" height="100%" />
      </div>

      <div class="full-width">
        <div class="text-subtitle2 text-center">
          {{ abreviarSobrenomes(usuario.nome_usuario) }}
          <q-badge
            :color="store.corAcesso(usuario.nivel_acesso)"
            floating
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
        </div>
        <div class="text-lowercase text-center text-caption text-grey-6">
          {{ usuario.cargo }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { abreviarSobrenomes } from "src/utils/util.js";
import { useStore } from "src/stores/store";
import { api } from "src/boot/axios";
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
  },
  methods: {
    retornaFoto(foto) {
      return `https://getin.pc.sc.gov.br/get_files_imgUser/${foto}`;
    },
    async removerUsuarioGrupo(id) {
      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "20020",
        tipo_crud: 2,
        id: id,
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
  },
};
</script>

<style lang="scss" scoped></style>
