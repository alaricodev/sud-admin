<template>
  <div class="bg-grey-4">
    <div>
      <filtro-index />
    </div>
    <div class="q-px-md">
      <card-show v-for="dado in dados" :key="dado.id" :dados="dado" />
    </div>
  </div>
</template>

<script>
import CardShow from "src/components/cardShow.vue";
import FiltroIndex from "src/components/FiltroIndex.vue";
import dados from "../assets/dados.json";
import { defineComponent } from "vue";

export default defineComponent({
  components: { FiltroIndex, CardShow },
  name: "IndexPage",
  setup() {
    return {
      dados,
    };
  },
});
</script>
