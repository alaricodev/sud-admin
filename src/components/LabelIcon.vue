<template>
  <div class="bg-grey-3 display1">
    <div class="row">
      <div class="q-pa-sm"><q-icon :name="icone" :color="corIcone" /></div>
      <div class="q-pa-sm">{{ texto }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LabelIcon",
  created() {},
  data() {
    return {};
  },
  props: {
    texto: {
      type: String,
      require: true,
    },
    icone: {
      type: String,
      required: false,
      default: "fa-solid fa-check",
    },
    corIcone: {
      type: String,
      required: false,
      default: "primary",
    },
    corTexto: {
      type: String,
      required: false,
      default: "grey-7",
    },
  },
  methods: {},
};
</script>

<style>
.display1 {
  border-radius: 5px;
  border-left: 4px solid grey;
}
</style>
