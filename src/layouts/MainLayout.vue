<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-4">
    <!-- <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-black"> -->
    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="store.layout.miniState"
      :breakpoint="500"
      bordered
      class="bg-black relative"
    >
      <!-- <usuario-info /> -->
      <div
        style="width: 100%"
        class="q-mt-md q-px-sm"
        :class="store.layout.miniState ? 'text-center' : 'text-right'"
      >
        <q-btn
          flat
          color="primary"
          :icon="
            store.layout.miniState
              ? 'fa-solid fa-arrow-right'
              : 'fa-solid fa-arrow-left'
          "
          outline
          size="xs"
          clickable
          v-ripple
          @click="store.layout.miniState = !store.layout.miniState"
        />
      </div>
      <div v-if="!store.layout.miniState">
        <div class="flex flex-center column" style="height: 150px">
          <img
            src="../assets/logo.png"
            spinner-color="white"
            style="height: 100%"
          />
        </div>
        <div class="flex flex-center text-h6 text-grey-5 column">
          <span class="text-grey-8">PCSC</span>
          <span class="text-primary">ADMINISTRADOR SUD</span>
        </div>
        <q-list>
          <q-item-label header class="text-primary text-bold text-center">
            MENU</q-item-label
          >
        </q-list>
      </div>
      <div v-else>
        <div style="padding-top: 30px"></div>
        <div class="flex flex-center column" style="height: 50px">
          <img
            src="../assets/logo.png"
            spinner-color="white"
            style="height: 100%"
          />
        </div>

        <div class="text-primary text-bold text-center q-my-sm">SUD</div>
        <div style="padding-top: 147px"></div>
      </div>

      <div v-if="!store.layout.miniState">
        <q-list style="min-width: 100px">
          <q-separator color="primary" />
          <div v-if="store.login.dipc">
            <div v-for="item in itemsMenu" :key="item">
              <q-item clickable @click="$router.push(item.rota)">
                <q-item-section avatar>
                  <q-icon :color="item.corIcone" :name="item.icone" />
                </q-item-section>

                <q-item-section class="text-white">
                  {{ item.texto }}
                </q-item-section>
              </q-item>

              <q-separator v-if="item.separador" color="primary" />
            </div>
          </div>
          <div v-else>
            <div v-for="item in itemsMenu" :key="item">
              <q-item
                clickable
                @click="$router.push(item.rota)"
                v-if="liberaMenu(item.rota, item.liberado)"
              >
                <q-item-section avatar>
                  <q-icon :color="item.corIcone" :name="item.icone" />
                </q-item-section>

                <q-item-section class="text-white">
                  {{ item.texto }}
                </q-item-section>
              </q-item>

              <q-separator
                v-if="item.separador && liberaMenu(item.rota, item.liberado)"
                color="primary"
              />
            </div>
          </div>
        </q-list>
      </div>
      <div v-else>
        <q-list>
          <div v-if="store.login.dipc">
            <div v-for="item in itemsMenu" :key="item">
              <q-item clickable @click="$router.push(item.rota)">
                <q-item-section avatar>
                  <q-icon :color="item.corIcone" :name="item.icone" />
                  <q-tooltip :delay="500" class="bg-primary" :offset="[10, 10]">
                    {{ item.texto }}
                  </q-tooltip>
                </q-item-section>
              </q-item>
            </div>
          </div>
          <div v-else>
            <div v-for="item in itemsMenu" :key="item">
              <q-item
                clickable
                @click="$router.push(item.rota)"
                v-if="liberaMenu(item.rota, item.liberado)"
              >
                <q-item-section avatar>
                  <q-icon :color="item.corIcone" :name="item.icone" />
                  <q-tooltip :delay="500" class="bg-primary" :offset="[10, 10]">
                    {{ item.texto }}
                  </q-tooltip>
                </q-item-section>
              </q-item>
            </div>
          </div>
        </q-list>
      </div>
      <div
        class="text-grey-7 text-center q-ma-sm"
        v-if="!store.layout.miniState"
      >
        <div @click="store.alerta(`<pre>${this.store.login}</pre>`)">
          {{ this.store.login.nome_usuario }}
        </div>
      </div>
      <div
        class="text-grey-7 text-center flex flex-center column"
        style="
          position: absolute;
          margin-bottom: 10px;
          bottom: 0px;
          width: 100%;
          gap: 10px;
        "
      >
        <div class="flex flex-center" style="opacity: 0.5">
          <q-img
            src="../../public/getin_logo.png"
            :width="store.layout.miniState ? '30px' : '40px'"
            height="100%"
          >
            <q-tooltip
              v-if="store.layout.miniState"
              :delay="500"
              class="bg-primary text-body2"
              :offset="[10, 10]"
            >
              GETIN
            </q-tooltip>
          </q-img>
        </div>
        <div v-if="!store.layout.miniState">
          <div class="q-px-lg" style="font-size: 0.8rem">
            Desenvolvido por GETIN
          </div>
          <div class="q-px-lg" style="font-size: 0.8rem">
            <!-- <a :href="$router.push('/version')"> Versão: {{ pack.version }} </a> -->
            <q-btn flat :label="versao()" @click="$router.push('/version')" />
          </div>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import { useStore } from "src/stores/store";
import { api } from "boot/axios";
import axios from "axios";
import pack from "../../package.json";

export default defineComponent({
  name: "MainLayout",

  components: {},

  methods: {
    voltar() {
      this.$router.push("/");
    },
    versao() {
      return `Versão ${this.pack.version}`;
    },
    liberaMenu(rota, liberado) {
      if (rota == "/cadwhatsapp" && this.store.login.dipc) {
        return true;
      }
      if (rota == "/denunciasarquivadas" && this.store.login.dipc) {
        return true;
      }

      if (rota == "/configsud" && this.store.login.nint) {
        return true;
      }

      return liberado;
    },
  },

  data() {
    return {
      menuCarregado: false,
      itemsMenu: [
        {
          icone: "record_voice_over",
          corIcone: "primary",
          texto: "Denúncias",
          corTexto: "white",
          rota: "/",
          separador: true,
          liberado: true,
        },
        {
          icone: "fa-brands fa-whatsapp",
          corIcone: "green",
          texto: "Nova denúncia whatsapp",
          corTexto: "white",
          rota: "/cadwhatsapp",
          separador: true,
          liberado: false,
        },
        // {
        //   icone: "fa-solid fa-box-archive",
        //   corIcone: "primary",
        //   texto: "Denúncias Arquivadas",
        //   corTexto: "white",
        //   rota: "/denunciasarquivadas",
        //   separador: true,
        //   liberado: true,
        // },
        {
          icone: "fa-solid fa-gears",
          corIcone: "primary",
          texto: "Configurações",
          corTexto: "white",
          rota: "/configsud",
          separador: true,
          liberado: false,
        },
      ],
      drawer: false,
    };
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const store = useStore();

    async function dadosUsuario(cpf) {
      const params = {
        cpf: cpf,
        cpf_log: cpf,
        codigo_sys_func: "10007",
      };

      const resposta = await api.post("/consulta", params);

      if (resposta.data) {
        const infoUso = resposta.data[0];
        store.login.cpf_log = infoUso.cpf;
        store.login.id_usuario = infoUso.id;
        store.login.nome_usuario = infoUso.nome;
        store.login.foto_usuario = infoUso.foto;
        store.login.dipc = infoUso.usuario_dipc;
        store.login.nint = infoUso.usuario_nint;
        store.login.nivel = infoUso.nivel_acesso;
      } else {
        store.alerta("Usuário não localizado  !");
      }
    }

    watch(
      () => store.userData,
      async (newValue, oldValue) => {
        // Ação a ser executada quando o valor de isLoggedIn mudar
        dadosUsuario(newValue.cpf);

        // Você pode executar outras ações aqui, como redirecionar o usuário ou exibir mensagens
      },

      () => store.token,
      async (newValue, oldValue) => {
        store.login.token = newValue;
      }
    );

    window.addEventListener("message", async function (event) {
      //Faz um pedido para o integra dos dados do usuário através de uma mensagem de iframe pai-filho
      if (event.data?.userData) {
        //esse If verifica se retornou algum dado
        let object = JSON.parse(event.data.userData);
        //cria um Objeto chamado userData que desestrutura os dados do Objeto recebido
        //o Objeto userData será passado para o "standard store"
        let userData = (({
          cpf,
          nome,
          foto,
          matricula,
          email,
          cargo,
          classe,
          ingresso_pc,
          ingresso_cargo,
          lotacao_nome,
          lotacao_municipio,
          lotacao_ibge,
        }) => ({
          cpf,
          nome,
          foto,
          matricula,
          email,
          cargo,
          classe,
          ingresso_pc,
          ingresso_cargo,
          lotacao_nome,
          lotacao_municipio,
          lotacao_ibge,
        }))(object);

        dadosUsuario(userData.cpf);

        //Registra o token wizard na api para validação do backend, sem esse token o backend irá recusar a requisição.
        if (event.data.tokenWizard) {
          store.tokenWizard = event.data.tokenWizard;
          store.token = await checkToken(store.tokenWizard);
          api.defaults.headers.common["authorization"] = `${store.token}`;
          api.defaults.headers.common["cpf"] = `${userData.cpf}`;
          // Refresh no token a cada 10 minutos (10 minutos * 60 segundos * 1000 milisegundos)
          setInterval(async () => {
            store.token = await checkToken(store.tokenWizard);
            api.defaults.headers.common["authorization"] = `${store.token}`;
          }, 10 * 60 * 1000);
        }
      }
    });

    async function checkToken(tokenWizard) {
      try {
        let result = await axios({
          method: "POST",
          url: "https://getin.pc.sc.gov.br/api_usuarios/graphql",
          data: {
            query: `
        {
          getTokenWizard_Usuarios(
            tokenwizard: "${tokenWizard}"
          ) {
            status
            msn
            token
            tokenwizard
            iat
            exp
            iswizard
            #FIELDS
            id
            cpf
            nome
          }
        }
        `,
          },
        });
        if (
          !result.data.data.getTokenWizard_Usuarios ||
          result.data.data.getTokenWizard_Usuarios?.status !== "Sucesso"
        ) {
        } else {
          return result.data.data.getTokenWizard_Usuarios.token;
        }
      } catch (error) {
        console.log(error);
      }
    }

    ////

    return {
      store,
      leftDrawerOpen,
      //homologacao,
      pack,

      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },

  computed: {
    nrDenuncia() {
      return this.store.novasDenuncias;
    },
    homologacao() {
      return process.env.DEV;
    },
  },
  beforeMount() {
    window.parent.postMessage("ask for credentials", "*");
  },
});
</script>

<style lang="scss">
.dialogBrasaoClass {
  .q-loading__message {
    margin: 0px 0px 0;
    transform: translateY(-115px);
  }
}
</style>
