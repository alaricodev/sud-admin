<template>
  <div>
    <div class="text-h5 q-pb-md">Perguntas respondidas no formulário</div>
    <div>
      <q-list bordered>
        <div v-for="pergunta in modeloPerguntas" :key="pergunta.pergunta">
          <q-item v-ripple>
            <q-item-section>{{ pergunta.pergunta }}</q-item-section>
            <q-item-section avatar>
              <q-icon
                :color="pergunta.resposta ? 'green' : 'red'"
                :name="pergunta.resposta ? 'check_circle' : 'close'"
              />
            </q-item-section>
          </q-item>
          <q-separator />
        </div>
      </q-list>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "SudInfoPerguntas",
  components: {},
  props: {
    perguntas: {
      type: Array,
      required: true,
    },
  },
  setup() {
    return {
      modeloPerguntas: ref([]),
    };
  },
  created() {
    this.modeloPerguntas = [
      {
        pergunta:
          "Há relação com corrupção, lavagem de dinheiro ou desvio de verbas públicas?",
        resposta: this.perguntas.per_relacao_corrupcao,
      },
      {
        pergunta: "Há envolvimento de menores de idade no caso?",
        resposta: this.perguntas.per_envolvimento_menores,
      },
      {
        pergunta: "Há relação com pornografia infantil ou abuso de menores?",
        resposta: this.perguntas.per_pornografia_infantil,
      },
      {
        pergunta: "Há relação com maus tratos de animais?",
        resposta: this.perguntas.per_maus_tratos_animais,
      },
      {
        pergunta: "Há relação com tráfico de drogas?",
        resposta: this.perguntas.per_trafico,
      },
      {
        pergunta: "Houve violência doméstica?",
        resposta: this.perguntas.per_violencia_domestica,
      },
    ];
  },
  methods: {},
};
</script>
<style></style>
