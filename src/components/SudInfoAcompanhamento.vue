<template>
  <div>
    <div class="text-h6">Acompanhamentos</div>
    <div class="q-pa-md q-gutter-sm" style="width: 100%">
      <q-editor
        v-model="editor"
        :definitions="{
          bold: { label: 'Negrito', icon: null, tip: 'Negrito' },
        }"
      />
    </div>
    <div class="q-ma-md">
      <q-btn label="Inserir Anotação" color="primary" @click="inserir()" />
    </div>
    <div class="q-my-sm">
      <sud-info-acompanhamento-item
        v-for="acompanhamento in acompanhamentos.slice().reverse()"
        :key="acompanhamento.id"
        :dados="acompanhamento"
      />
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { formatarDataExtenso } from "../utils/util";
import SudInfoAcompanhamentoItem from "./SudInfoAcompanhamentoItem.vue";
export default {
  components: { SudInfoAcompanhamentoItem },
  name: "SudInfoAcompanhamento",
  created() {},
  setup() {
    return {
      editor: ref(""),
      acompanhamentos: ref([
        {
          id: 1,
          data: "12 de Junho de 2023 às 14:21",
          usuario: "Marcelo",
          nivelAcesso: 1,
          descricao:
            "<strong>Anotação 1:</strong> Descoberta de uma nova rota de contrabando através do porto de <em>Santos</em>. Possível envolvimento de funcionários portuários. Investigar conexões locais e estrangeiras.",
        },
        {
          id: 2,
          data: "13 de Junho de 2023 às 16:21",
          usuario: "Marcelo",
          nivelAcesso: 5,
          descricao:
            "<strong>Anotação 2:</strong> <em>Pessoa-chave:</em> Pablo Ruiz. Suspeito de liderar uma organização de narcotráfico. Obter informações sobre seus contatos e movimentações financeiras.",
        },
        {
          id: 3,
          data: "14 de Junho de 2023 às 17:55",
          usuario: "Adriana",
          nivelAcesso: 2,
          descricao:
            "<strong>Anotação 3:</strong> Operação <em>'Caminho Seguro'</em> prevista para próxima semana. Montar equipe de agentes experientes para realizar interceptações e apreensões em rotas conhecidas.",
        },
        {
          id: 4,
          data: "16 de Junho de 2023 às 12:10",
          usuario: "Fabiano",
          nivelAcesso: 4,
          descricao:
            "<strong>Anotação 4:</strong> Informante confiável mencionou um possível laboratório clandestino de drogas na região rural de <em>Valencia</em>. Coordenar com a polícia local para investigar e obter mandado de busca.",
        },
        {
          id: 5,
          data: "16 de Junho de 2023 às 18:00",
          usuario: "Gilmar",
          nivelAcesso: 5,
          descricao:
            "<strong>Anotação 5:</strong> Apreensão de grande quantidade de cocaína no aeroporto internacional. Rastrear a origem e os destinatários da carga. Possível envolvimento de cartéis colombianos.",
        },
        {
          id: 6,
          data: "16 de Junho de 2023 às 12:30",
          usuario: "Marcelo",
          nivelAcesso: 3,
          descricao:
            "<strong>Anotação 6:</strong> Investigar transações financeiras suspeitas em bancos offshore. <em>Banco X</em> sob suspeita de facilitar lavagem de dinheiro para organizações de narcotráfico.",
        },
        {
          id: 7,
          data: "17 de Junho de 2023 às 13:10",
          usuario: "Adriana",
          nivelAcesso: 3,
          descricao:
            "<strong>Anotação 7:</strong> <em>Operação Disfarce:</em> Disfarçar agentes como trabalhadores de <b>construção civil</b> para obter informações dentro de comunidades controladas pelo tráfico. Avaliar riscos e garantir a segurança da equipe.",
        },
        {
          id: 8,
          data: "17 de Junho de 2023 às 15:02",
          usuario: "Fabiano",
          nivelAcesso: 1,
          descricao:
            "<strong>Anotação 8:</strong> Infiltrar agente especializado em tecnologia em fóruns online de drogas. Monitorar conversas e identificar possíveis compradores e fornecedores. Garantir anonimato do agente.",
        },
      ]),
    };
  },
  props: {},
  methods: {
    inserir() {
      let maiorId = -1;
      this.acompanhamentos.forEach((objeto) => {
        if (objeto.id > maiorId) {
          maiorId = objeto.id;
        }
      }),
        this.acompanhamentos.push({
          id: maiorId + 1,
          data: formatarDataExtenso(Date.now()),
          usuario: "ADMIN",
          descricao: this.editor,
        });
      this.editor = "";
    },
  },
};
</script>

<style lang="scss" scoped></style>
