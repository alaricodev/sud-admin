<template>
  <div class="bg-grey-4">
    <div>
      <filtro-index />
    </div>
    <div class="q-px-md">
      <card-show tipo="whatsapp" />
      <card-show tipo="sud" />
      <card-show tipo="disque" />
      <card-show tipo="sud" />
      <card-show tipo="whatsapp" />
      <card-show tipo="disque" />
      <card-show tipo="disque" />
      <card-show tipo="whatsapp" />
      <card-show tipo="whatsapp" />
      <card-show tipo="sud" />
      <card-show tipo="disque" />
      <card-show tipo="sud" />
      <card-show tipo="whatsapp" />
      <card-show tipo="disque" />
      <card-show tipo="disque" />
      <card-show tipo="whatsapp" />
      <card-show tipo="whatsapp" />
      <card-show tipo="sud" />
      <card-show tipo="disque" />
      <card-show tipo="sud" />
      <card-show tipo="whatsapp" />
      <card-show tipo="disque" />
      <card-show tipo="disque" />
      <card-show tipo="whatsapp" />
      <card-show tipo="whatsapp" />
      <card-show tipo="sud" />
      <card-show tipo="disque" />
      <card-show tipo="sud" />
      <card-show tipo="whatsapp" />
      <card-show tipo="disque" />
      <card-show tipo="disque" />
      <card-show tipo="whatsapp" />
      <card-show tipo="whatsapp" />
      <card-show tipo="sud" />
      <card-show tipo="disque" />
      <card-show tipo="sud" />
      <card-show tipo="whatsapp" />
      <card-show tipo="disque" />
      <card-show tipo="disque" />
      <card-show tipo="whatsapp" />
    </div>
  </div>
</template>

<script>
import CardShow from "src/components/cardShow.vue";
import FiltroIndex from "src/components/FiltroIndex.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: { FiltroIndex, CardShow },
  name: "IndexPage",
});
</script>
