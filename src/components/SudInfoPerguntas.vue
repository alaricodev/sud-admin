<template>
  <div>
    <div class="text-h5 q-pb-md">Perguntas respondidas no formulário</div>
    <div>
      <q-list bordered>
        <div v-for="pergunta in perguntas" :key="pergunta.pergunta">
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
  setup() {
    return {
      perguntas: ref([
        {
          pergunta:
            "Há relação com corrupção, lavagem de dinheiro ou desvio de verbas públicas?",
          resposta: false,
        },
        {
          pergunta: "Há envolvimento de menores de idade no caso?",
          resposta: true,
        },
        {
          pergunta: "Há relação com pornografia infantil ou abuso de menores?",
          resposta: false,
        },
        { pergunta: "Há relação com maus tratos de animais?", resposta: false },
        { pergunta: "Há relação com tráfico de drogas?", resposta: true },
        { pergunta: "Houve violência doméstica?", resposta: true },
      ]),
    };
  },
  methods: {},
};
</script>
<style></style>
