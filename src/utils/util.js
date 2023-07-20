// ---------------------------------------------------------------------------------------------------------------------
//
//  FUNCÕES PARA FORMATAR STRINGS
//
// ---------------------------------------------------------------------------------------------------------------------

export function extrairIPv4(str) {
  /**
   * Função feita para extrair a parte do IPV5 do IP
   */
  // Encontra o último índice do caractere ':'
  let i = str.lastIndexOf(":");
  // Se não encontrar, retorna a string inteira
  if (i === -1) return str;
  // Senão, retorna a substring a partir do índice seguinte
  return str.substring(i + 1);
}

export function mascaraTelefone(telefone) {
  // dado esse formato: 12987651234, ele retorna esse: (12)98765-1234
  if (telefone) {
    return `(${telefone.slice(0, 2)}) ${telefone.slice(
      2,
      -4
    )} - ${telefone.slice(-4)}`;
  } else {
    return "";
  }
}

export function abreviarSobrenomes(nomeCompleto) {
  // Dividir o nome completo em partes
  const partesNome = nomeCompleto.split(" ");

  // Extrair o primeiro nome
  const primeiroNome = partesNome[0];

  // Criar uma nova array para armazenar os sobrenomes abreviados
  const sobrenomesAbreviados = [];

  // Iterar sobre as partes do nome, começando a partir do segundo elemento
  for (let i = 1; i < partesNome.length; i++) {
    const sobrenome = partesNome[i];

    // Verificar se o sobrenome é composto (possui mais de uma palavra)
    if (sobrenome.includes(" ")) {
      // Dividir o sobrenome composto em palavras
      const palavrasSobrenome = sobrenome.split(" ");

      // Abreviar cada palavra do sobrenome composto
      const abreviacoes = palavrasSobrenome.map(
        (palavra) => `${palavra.charAt(0)}.`
      );

      // Juntar as palavras abreviadas do sobrenome composto
      const sobrenomeAbreviado = abreviacoes.join(" ");

      // Adicionar o sobrenome abreviado à array de sobrenomes abreviados
      sobrenomesAbreviados.push(sobrenomeAbreviado);
    } else {
      // Caso o sobrenome não seja composto, apenas abreviar a primeira letra
      const sobrenomeAbreviado = `${sobrenome.charAt(0)}.`;

      // Adicionar o sobrenome abreviado à array de sobrenomes abreviados
      sobrenomesAbreviados.push(sobrenomeAbreviado);
    }
  }

  // Juntar o primeiro nome com os sobrenomes abreviados em uma única string
  const nomeAbreviado = [primeiroNome, ...sobrenomesAbreviados].join(" ");

  // Retornar o nome abreviado
  return nomeAbreviado;
}

export function validarPlaca(placa) {
  if (!placa) {
    return false;
  }

  placa = placa.replace("-", "");

  if (placa.length !== 7) {
    return false;
  }

  function ehLetra(caractere) {
    return /^[A-Z]$/i.test(caractere);
  }

  // Função auxiliar para verificar se um caractere é um número
  function ehNumero(caractere) {
    return /^\d$/.test(caractere);
  }

  if (!ehLetra(placa[0]) || !ehLetra(placa[1]) || !ehLetra(placa[2])) {
    return false;
  }

  if (!ehNumero(placa[3]) || !ehNumero(placa[5]) || !ehNumero(placa[6])) {
    return false;
  }

  return true;
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

  return `${leftPad(dia, 2)} ${mes} ${ano} - ${leftPad(horas, 2)}h ${leftPad(
    minutos,
    2
  )}m ${leftPad(segundos, 2)}s`;
}

export function formatarDataGridSimples(timestamp) {
  // Dado um timestamp retorna uma string nesse formato: 06 Fev 2023
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

  return `${leftPad(dia, 2)} ${mes} ${ano}`;
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

export function differenceInDays(timestamp1, timestamp2) {
  // Dado dois timestamps, calcula a diferença em dias entre as duas datas

  const oneDayMilliseconds = 24 * 60 * 60 * 1000; // Milissegundos em um dia

  // Arredondar as datas para o início do dia (0 horas)
  const date1 = new Date(timestamp1);
  date1.setHours(0, 0, 0, 0);
  const date2 = new Date(timestamp2);
  date2.setHours(0, 0, 0, 0);

  // Calcular a diferença em milissegundos
  const differenceMilliseconds = Math.abs(date2 - date1);

  // Calcular a diferença em dias
  const differenceDays = Math.round(
    differenceMilliseconds / oneDayMilliseconds
  );

  return differenceDays;
}

// ---------------------------------------------------------------------------------------------------------------------
//
//  FUNÇÕES DE UTILIDADES DIVERSAR
//
// ---------------------------------------------------------------------------------------------------------------------

function leftPad(value, totalWidth, paddingChar) {
  // preencher com zero
  var length = totalWidth - value.toString().length + 1;
  return Array(length).join(paddingChar || "0") + value;
}

export function totalPaginasArray(array, registrosPorPagina) {
  let totalPaginas = Math.floor(array.length / registrosPorPagina);

  if (array.length % registrosPorPagina > 0) {
    totalPaginas += 1;
  }

  return totalPaginas;
}

export function paginacao(array, nrRegistrosPagina, pagina) {
  let totPaginas = Math.floor(array.length / nrRegistrosPagina);

  let paginaQuebrada = false;

  if (array.length % nrRegistrosPagina > 0) {
    totPaginas++;
    paginaQuebrada = true;
  }

  let registroInicial = 0;
  let registroFinal = 0;

  if (paginaQuebrada && totPaginas == pagina) {
    registroInicial = pagina * nrRegistrosPagina - (nrRegistrosPagina - 1);
    registroFinal = registroInicial + (array.length % nrRegistrosPagina);
  } else {
    registroInicial = pagina * nrRegistrosPagina - (nrRegistrosPagina - 1);
    registroFinal = registroInicial + (nrRegistrosPagina - 1);
  }

  const indiceInicial = registroInicial - 1;
  const indiceFinal = registroFinal - 1;

  return array.filter(
    (elemento, indice) => indice >= indiceInicial && indice <= indiceFinal
  );
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
