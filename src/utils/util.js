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
  ];

  // Remove caracteres especiais e converte para letras minúsculas
  const cleanText = text.toLowerCase();

  // Divide o texto em palavras individuais
  const palavras = cleanText.split(/\s+/);

  // Retiro as palavras com menos de 4 caracteres
  const words = palavras.filter((palavra) => palavra.length >= 4);

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
