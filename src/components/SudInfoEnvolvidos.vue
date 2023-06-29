<template>
  <div>
    <div class="text-h5">Pessoas Envolvidas na denúncia</div>
    <div>
      <q-list bordered class="rounded-borders">
        <q-expansion-item
          v-for="envolvido in envolvidos"
          :key="envolvido.nome"
          expand-separator
          class="text-h6"
          icon="perm_identity"
          :label="envolvido.nome"
          caption="Envolvido"
        >
          <q-card>
            <q-card-section>
              <label-data
                class="q-my-sm"
                label="Telefone:"
                :texto="envolvido.telefone"
              />
              <label-data
                class="q-my-sm"
                label="Tipo do documento:"
                :texto="envolvido.tipoDoc"
              />
              <label-data
                class="q-my-sm"
                label="Documento:"
                :texto="envolvido.doc"
              />
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import LabelData from "./LabelData.vue";
export default {
  name: "SudInfoEnvolvidos",
  created() {},
  components: { LabelData },
  data() {
    return {
      envolvidos: ref([
        {
          nome: "Valdemar Noronha",
          telefone: "(48) 09823-9931",
          tipoDoc: "CPF",
          doc: "953.654.687-63",
        },
        {
          nome: "Mario Silva Noronha",
          telefone: "(48) 98563-2587",
          tipoDoc: "RG",
          doc: "635295-98",
        },
        {
          nome: "Ramireza Gonzales",
          telefone: "",
          tipoDoc: "PASSAPORTE",
          doc: "ARG-9899dd",
        },
        {
          nome: "Marcinha da Quebrada",
          telefone: "(48) 99985-1154",
          tipoDoc: "",
          doc: "",
        },
      ]),
    };
  },
  props: {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
