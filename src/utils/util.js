// ---------------------------------------------------------------------------------------------------------------------
//
//  FUNCÕES PARA FORMATAR STRINGS
//
// ---------------------------------------------------------------------------------------------------------------------

export function mascaraTelefone(telefone) {
  // dado esse formato: 12987651234, ele retorna esse: (12)98765-1234
  return `(${telefone.slice(0, 2)}) ${telefone.slice(2, -4)} - ${telefone.slice(
    -4
  )}`;
}

// ---------------------------------------------------------------------------------------------------------------------
//
//  FUNCÕES PARA TRATAR DATAS
//
// ---------------------------------------------------------------------------------------------------------------------

export function formatarDataGrid(timestamp) {
  // Dado um timestamp retorna uma string nesse formato: 06 Fev 2023 - 15h16m
  const meses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  const data = new Date(timestamp);
  const dia = data.getDate();
  const mes = meses[data.getMonth()];
  const ano = data.getFullYear();
  const horas = data.getHours();
  const minutos = data.getMinutes();
  const segundos = data.getSeconds();

  const dataFormatada =
    dia >= 10
      ? `${dia} ${mes} ${ano} - ${horas}h ${minutos}m ${segundos}s`
      : `0${dia} ${mes} ${ano} - ${horas}h ${minutos}m ${segundos}s`;

  return dataFormatada;
}

export function formatarDataExtenso(timestamp) {
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  const data = new Date(timestamp);
  const dataFormatada = data.toLocaleString("pt-BR", options);

  return dataFormatada;
}

// ---------------------------------------------------------------------------------------------------------------------
//
//  FUNÇÕES DE UTILIDADES DIVERSAR
//
// ---------------------------------------------------------------------------------------------------------------------

export function paginacaoJson(array, registrosPorPagina) {
  /*
  Essa função pega um objeto e cria um campo com o
  número da página.
  */
  let pagina = 0;
  for (var i = 0; i < array.length; i++) {
    pagina = Math.floor(i / registrosPorPagina) + 1;
    array[i].pagina = pagina;
  }
  return array;
}

export function getTopWords(text, top) {
  // Lista de palavras comuns a serem excluídas
  const commonWords = [
    "ante",
    "após",
    "contra",
    "desde",
    "entre",
    "para",
    "perante",
    "sobre",
    "durante",
    "trás",
    "porém",
    "contudo",
    "entretanto",
    "qualquer",
    "quaisquer",
    "tanto",
    "quanto",
    "todavia",
    "logo",
    "portanto",
    "porque",
    "pois",
    "como",
    "caso",
    "embora",
    "ainda",
    "assim",
    "quando",
    "enquanto",
    "então",
    "outra",
    "outras",
    "outro",
    "outros",
    "somos",
    "sois",
    "eras",
    "éramos",
    "éreis",
    "eram",
    "fomos",
    "fostes",
    "foram",
    "serei",
    "serás",
    "será",
    "seremos",
    "sereis",
    "serão",
    "seria",
    "serias",
    "seríamos",
    "seríeis",
    "seriam",
    "seja",
    "sejas",
    "sejamos",
    "sejais",
    "sejam",
    "fosse",
    "fosses",
    "fôssemos",
    "fôsseis",
    "fossem",
    "sejais",
    "você",
    "hoje",
    "mim",
    "mesmo",
    "não",
    "sim",
    "acho",
    "queria",
    "tantas",
    "tanto",
    "tantos",
  ];

  // Caso não tenha sido passado
  if (!text) {
    return [];
  }

  // Remove caracteres especiais e converte para letras minúsculas
  const cleanText = text.toLowerCase();

  // Divide o texto em palavras individuais
  const palavras = cleanText.split(/\s+/);

  // Retiro as palavras com menos de 4 caracteres
  const words = palavras.filter((palavra) => palavra.length >= 4);

  //retiro caracteres especiais do final de cada palavra ou do inicio
  words.forEach((palavra, index) => {
    words[index] = palavra.replace(/^[.,;]+|[.,;]+$/g, "");
  });

  // Contagem das palavras
  const wordCount = {};

  words.forEach((word) => {
    if (!commonWords.includes(word)) {
      if (wordCount[word]) {
        wordCount[word]++;
      } else {
        wordCount[word] = 1;
      }
    }
  });

  // Converte o objeto de contagem em um array de pares [palavra, contagem]
  const wordCountArray = Object.entries(wordCount);

  // Ordena o array com base na contagem de forma decrescente
  wordCountArray.sort((a, b) => b[1] - a[1]);

  // Retorna as palavras mais usadas
  return wordCountArray.slice(0, top).map((pair) => pair[0]);
}
