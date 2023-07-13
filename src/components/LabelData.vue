<template>
  <div class="display1 bg-grey-3">
    <div class="row">
      <div class="q-pa-sm text-subtitle1 bg-grey-4">{{ label }}</div>
      <div
        :class="`q-pa-sm text-subtitle1 text-bold ${
          cor !== '' ? corTexto : ''
        }`"
      >
        {{ texto }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LabelData",

  setup() {
    return {};
  },

  methods: {},
  computed: {
    corTexto() {
      return `text-${this.cor}`;
    },
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    texto: {
      type: String,
      required: true,
    },
    cor: {
      type: String,
      required: false,
      default: "grey-10",
    },
  },
};
</script>

<style>
.display1 {
  border-radius: 5px;
  border-left: 4px solid orange;
}
</style>
