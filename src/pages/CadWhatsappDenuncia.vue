<template>
  <div
    class="q-ma-md bg-white"
    style="
      border-radius: 20px;
      border: 1px solid #616161;
      width: 98%;
      height: 700px;
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
          class="q-pa-md"
          v-model="telefone"
          outlined
          mask="(##) ##### - ####"
          unmasked-value
          dense
        />
      </div>
      <div class="q-ma-md" style="width: 98%">
        <q-file
          class="q-pa-md"
          v-model="arquivos"
          label="Clique aqui para selecione os Arquivos"
          outlined
          counter
          :counter-label="counterLabelFn"
          max-files="10"
          multiple
        >
          <template v-slot:prepend>
            <q-icon name="attach_file" />
          </template>
        </q-file>
      </div>
      <div class="q-ma-md" style="width: 98%">
        <div class="q-pa-sm">
          <q-input
            ref="txtDescricaoRef"
            v-model="relato"
            outlined
            type="textarea"
          />
          <q-avatar
            color="white"
            :text-color="relato.length >= 120 ? 'blue' : 'red'"
          >
            {{ relato.length }}</q-avatar
          >
          Caracteres - {{ relato.split(" ").length }} palavras
          <q-chip color="white"> </q-chip>
        </div>
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
import { ref } from "vue";
export default {
  name: "CadWhatsappDenuncia",
  created() {},
  setup() {
    return {
      telefone: ref(null),
      arquivos: ref(null),
      relato: ref(""),
    };
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
