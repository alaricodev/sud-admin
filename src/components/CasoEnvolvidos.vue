<template>
  <qualificar-envolvido :showDialog="qualificaEnvolvidoJanela" />
  <div class="text-h5">Veículos envolvidos na denúncia</div>
  <q-separator color="primary" class="q-my-sm" />
  <q-list bordered class="rounded-borders">
    <q-expansion-item
      v-for="dado in dados"
      :key="dado.id"
      expand-separator
      class="text-h6"
      style="border: 1px solid rgb(241, 237, 237)"
      icon="fa-solid fa-person"
      :label="dado.nome"
      caption="Pessoa Envolvida"
    >
      <q-card>
        <q-card-section>
          <label-data class="q-my-sm" label="Nome:" :texto="dado.nome" />
          <label-data
            v-if="dado.alcunha"
            class="q-my-sm"
            label="Alcunha:"
            :texto="dado.alcunha"
          />
          <label-data
            v-if="dado.cnh"
            class="q-my-sm"
            label="CNH:"
            :texto="dado.cnh"
          />
          <label-data
            v-if="dado.cpf"
            class="q-my-sm"
            label="CPF:"
            :texto="dado.cpf"
          />
          <label-data
            v-if="dado.local_paradeiro"
            class="q-my-sm"
            label="Último Local de avistamento:"
            :texto="dado.local_paradeiro"
          />
          <label-data
            v-if="dado.oab"
            class="q-my-sm"
            label="OAB:"
            :texto="dado.oab"
          />
          <label-data
            v-if="dado.outro_documento"
            class="q-my-sm"
            label="Outro Documento:"
            :texto="dado.outro_documento"
          />
          <label-data
            v-if="dado.rg"
            class="q-my-sm"
            label="RG:"
            :texto="dado.rg"
          />
          <label-data
            v-if="dado.telefone"
            class="q-my-sm"
            label="Telefone:"
            :texto="dado.telefone"
          />
          <q-btn
            v-if="dado.cpf"
            outlined
            class="q-my-sm"
            icon="fa-solid fa-brain"
            label="Pesquisar dados da Pessoa no cortex"
            color="primary"
            @click="pesquisarPessoa()"
          />
          <q-btn
            outlined
            class="q-my-sm"
            icon="fa-solid fa-person"
            label="Qualificar o suspeito"
            color="primary"
            @click="qualificaEnvolvidoJanela = true"
          />
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script>
import LabelData from "./LabelData.vue";
import { useStore } from "src/stores/store";
import QualificarEnvolvido from "./QualificarEnvolvido.vue";

export default {
  name: "CasoEnvolvidos",
  data() {
    return {
      qualificaEnvolvidoJanela: false,
    };
  },
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
  components: { LabelData, QualificarEnvolvido },
  props: {
    dados: {
      type: Object,
      required: true,
    },
  },
  methods: {
    pesquisarPessoa() {
      this.store.alerta("Função em desenvolvimento");
    },
  },
};
</script>

<style lang="scss" scoped></style>
