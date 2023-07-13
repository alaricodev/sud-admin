<template>
  <div class="text-h5">Veículos envolvidos na denúncia</div>
  <q-separator color="primary" class="q-my-sm" />
  <q-list bordered class="rounded-borders">
    <q-expansion-item
      v-for="dado in dados"
      :key="dado.id"
      expand-separator
      class="text-h6"
      style="border: 1px solid rgb(241, 237, 237)"
      icon="fa-solid fa-car"
      :label="dado.modelo"
      caption="Carro de Passeio"
    >
      <q-card>
        <q-card-section>
          <label-data class="q-my-sm" label="Placa:" :texto="dado.placa" />
          <label-data
            class="q-my-sm"
            label="Cor Predominante:"
            :texto="dado.cor"
          />
          <label-data
            class="q-my-sm"
            label="Descrição:"
            :texto="dado.descricao"
          />
          <q-btn
            v-if="placaValida(dado.placa)"
            outlined
            class="q-my-sm"
            icon="fa-solid fa-brain"
            label="Pesquisar dados do veículo no cortex"
            color="primary"
            @click="pesquisarVeiculo()"
          />
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script>
import LabelData from "./LabelData.vue";
import { useStore } from "src/stores/store";
import { validarPlaca } from "../utils/util";
export default {
  created() {
    console.log(this.dados);
  },
  name: "CasoVeiculos",
  setup() {
    const store = useStore();
    return {
      store,
      validarPlaca,
    };
  },
  components: { LabelData },
  props: {
    dados: {
      type: Object,
      required: true,
    },
  },
  methods: {
    pesquisarVeiculo() {
      this.store.alerta("Função em desenvolvimento");
    },
    placaValida(placa) {
      return this.validarPlaca(placa);
    },
  },
};
</script>

<style lang="scss" scoped></style>
