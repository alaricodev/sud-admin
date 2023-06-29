<template>
  <div
    class="q-ma-md bg-white"
    style="
      border-radius: 20px;
      border: 1px solid #616161;
      width: 98%;
      height: 400px;
    "
  >
    <div class="row" style="width: 100%">
      <div class="text-h6 q-ma-md row" style="width: 100%">
        <q-icon
          name="fa-brands fa-whatsapp"
          size="md"
          color="green"
          class="q-mr-md"
        />
        <div class="text-h5">Cadastro de denúncia feita pelo Whatsapp</div>
      </div>
    </div>
    <q-separator color="primary" />
    <div>
      <div class="q-ma-md" style="width: 98%">
        <q-input
          label="TELEFONE"
          v-model="telefone"
          outlined
          mask="(##) ##### - ####"
          unmasked-value
          dense
        />
      </div>
      <div class="q-ma-md" style="width: 98%">
        <q-file
          label="CLIQUE AQUI PARA INSERIR ARQUIVOS ANEXOS"
          v-model="arquivos"
          icon="file"
          outlined
          dense
        />
      </div>
      <div class="q-ma-md" style="width: 98%">
        <q-input type="text" outlined v-model="relato" class="height: 300px" />
      </div>
      <div
        class="q-ma-md"
        style="width: 98%; display: flex; justify-content: center"
      >
        <q-btn
          outlined
          class="q-mt-xl"
          style="width: 30%"
          color="primary"
          label="Salvar"
          icon="fa-solid fa-floppy-disk"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CadWhatsappDenuncia",
  created() {},
  data() {
    return {
      telefone: null,
      arquivos: null,
      relato: null,
    };
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
