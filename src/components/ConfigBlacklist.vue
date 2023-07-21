<template>
  <q-dialog persistent v-model="telaAdiciona">
    <q-card style="width: 500px">
      <q-bar class="bg-primary text-white">
        <q-icon name="fa-solid fa-phone" />
        <div>Incluir telefone na blackist</div>
        <q-space />
        <q-btn flat dense icon="close" v-close-popup />
      </q-bar>
      <q-card-section>
        <div class="q-ma-md">
          <q-input
            outlined
            v-model="numeroTelefone"
            mask="(##) #####-####"
            unmasked-value
            label="Insira o número do telefone"
          />
        </div>
        <div class="q-ma-md">
          <div class="text-subtitle1 full-width">Por qual Período ?</div>
          <div class="full-width">
            <q-radio
              v-model="diasLista"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="15"
              label="15 dias"
            />
            <q-radio
              v-model="diasLista"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="30"
              label="Um mês"
            />
            <q-radio
              v-model="diasLista"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="90"
              label="Três meses"
            />
            <q-radio
              v-model="diasLista"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="180"
              label="Seis Meses"
            />
            <q-radio
              v-model="diasLista"
              checked-icon="task_alt"
              unchecked-icon="panorama_fish_eye"
              val="365"
              label="Um ano"
            />
          </div>
          <div class="q-ma-md">
            <div class="text-subtitle1 full-width">Entre com um motivo</div>
            <div class="full-with">
              <q-input v-model="motivo" outlined />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-separator color="primary" />
      <q-card-actions align="right">
        <q-btn
          flat
          color="green"
          label="Adicionar"
          @click="adicionarTelBlackList()"
        />
        <q-btn flat color="red" label="cancelar" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Tela Principal -->
  <div class="full-width">
    <div class="row">
      <q-icon
        name="fa-solid fa-phone-slash"
        size="xl"
        class="q-pa-md"
        color="red"
      />
      <div class="text-h4 q-pa-md text-grey-8">Blacklist Disque-Denúncia</div>
    </div>
    <q-separator color="primary" />
  </div>

  <div class="full-width q-py-md">
    <q-btn
      color="primary"
      label="Adicionar Número"
      icon="fa-solid fa-phone"
      @click="telaAdiciona = true"
    />

    <q-chip v-if="dadosCarregados" class="q-ml-xl">
      <q-avatar color="green" text-color="white">{{ dados?.length }}</q-avatar>
      Telefones na Blacklist
    </q-chip>
  </div>

  <div class="full-width q-py-md">
    <div>
      <q-scroll-area style="height: 450px; max-width: 100%">
        <q-item
          v-for="dado in dados"
          :key="dado"
          class="bg-grey-3 q-my-sm"
          style="border-radius: 5px"
        >
          <q-item-section avatar>
            <q-icon name="fa-solid fa-phone" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-subtitle1 text-bold">
              {{ mascaraTelefone(dado.telefone) }}
            </q-item-label>
            <q-item-label caption>Motivo: {{ dado.motivo }}</q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-center"> Qtd de Chamadas </q-item-label>
            <q-item-label class="text-center text-bold">
              {{ dado.quantidade_denuncias }}
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-center"> Data de Cadastro </q-item-label>
            <q-item-label class="text-overline text-center">
              {{ formatarDataGridSimples(dado.data_cadastro) }}
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-center"> Expira em: </q-item-label>
            <q-item-label class="text-overline text-center">
              {{ formatarDataGridSimples(dado.data_expira) }} -
              {{ differenceInDays(dado.data_cadastro, dado.data_expira) }} dias
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-center"> Cadastrado por: </q-item-label>
            <q-item-label class="text-overline text-center">
              {{ abreviarSobrenomes(dado.nome) }}
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-btn
              flat
              icon="fa-solid fa-trash-can"
              color="red"
              @click="apagarTelBlacklist(dado)"
            >
              <q-tooltip class="bg-primary text-body2" :offset="[10, 10]">
                Remover da Blacklist
              </q-tooltip>
            </q-btn>
          </q-item-section>
        </q-item>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
import { useStore } from "src/stores/store";
import { api } from "src/boot/axios";
import {
  mascaraTelefone,
  formatarDataGridSimples,
  differenceInDays,
  abreviarSobrenomes,
} from "src/utils/util";
import { validarTelefone } from "src/utils/validacoes";
import { Dialog } from "quasar";
export default {
  name: "ConfigBlacklist",
  created() {
    this.carregaDados();
  },
  setup() {
    const store = useStore();

    return {
      store,

      mascaraTelefone,
      formatarDataGridSimples,
      differenceInDays,
      abreviarSobrenomes,
    };
  },
  data() {
    return {
      dados: null,
      dadosCarregados: false,
      telaAdiciona: false,
      // Cadastro
      numeroTelefone: null,
      diasLista: null,
      motivo: null,
    };
  },
  props: {},
  methods: {
    async carregaDados() {
      const params = {
        cpf_log: this.store.login.cpf_log,
        codigo_sys_func: "20022",
        tipo_crud: 4,
      };
      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params);
      this.store.telaCarregamento(false);
      this.dados = resposta.data;
      this.dadosCarregados = true;
    },

    async adicionarTelBlackList() {
      // Validar os dados primeiro
      if (!validarTelefone(this.numeroTelefone)) {
        this.store.alerta("O número do Telefone parece ser inválido !");
        return false;
      }

      if (!this.diasLista) {
        this.store.alerta(
          "Favor selecionar um período para o telefone vai ficar bloqueado !"
        );
        return false;
      }

      if (!this.motivo) {
        this.store.alerta(
          "Favor descrever um motivo para bloquear o telefone !"
        );
        return false;
      }

      const params = {
        codigo_sys_func: "20022",
        tipo_crud: 1,
        cpf_log: this.store.login.cpf_log,
        dias: parseInt(this.diasLista),
        telefone: this.numeroTelefone,
        motivo: this.motivo,
        quantidade_denuncias: 0,
        id_usuario: this.store.login.id_usuario,
      };

      this.store.telaCarregamento(true);
      const resposta = await api.post("/consulta", params);
      this.store.telaCarregamento(false);

      if (resposta.data.status_ret == 0) {
        this.numeroTelefone = null;
        this.diasLista = null;
        this.motivo = null;
        this.telaAdiciona = false;
        this.carregaDados();
        this.store.alerta(resposta.data.retorno);
      } else {
        this.store.alerta(resposta.data.retorno);
      }
    },

    apagarTelBlacklist(dado) {
      Dialog.create({
        title: "Apagar registro",
        message: "Deseja remover o telefone da Blacklist ",
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        const params = {
          codigo_sys_func: "20022",
          tipo_crud: 2,
          cpf_log: this.store.login.cpf_log,
          id: dado.id,
        };

        this.store.telaCarregamento(true);
        const resposta = await api.post("/consulta", params);
        this.store.telaCarregamento(false);

        if (resposta.data.status_ret == 0) {
          this.carregaDados();
          this.store.alerta(resposta.data.retorno);
        } else {
          this.store.alerta(resposta.data.retorno);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
