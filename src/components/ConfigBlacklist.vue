<template>
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
    <q-btn color="primary" label="Adicionar Número" icon="fa-solid fa-phone" />
  </div>
  <div class="full-width q-py-md">
    <div>
      <q-scroll-area style="height: 290px; max-width: 600px">
        <div v-for="n in 100" :key="n" class="q-py-xs">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfigBlacklist",
  created() {},
  data() {
    return {};
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
