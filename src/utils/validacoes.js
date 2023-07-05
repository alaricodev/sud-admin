export function validarCEP(cep) {
  // Remove todos os caracteres não numéricos
  cep = cep.replace(/\D/g, "");

  // Verifica se o CEP tem 8 dígitos
  if (cep.length !== 8) {
    return false;
  }

  return true;
}

export function validarEmail(email) {
  // Regex para verificar o formato do email
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validarCPF(cpf) {
  // Remove todos os caracteres não numéricos

  if (cpf == null) {
    return false;
  }

  cpf = cpf.replace(/\D/g, "");

  // Verifica se o CPF tem 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Verifica se todos os dígitos são iguais (e.g., 111.111.111-11)
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  // Calcula o primeiro dígito verificador
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  let digito1 = resto > 9 ? 0 : resto;

  // Calcula o segundo dígito verificador
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  let digito2 = resto > 9 ? 0 : resto;

  // Verifica se os dígitos verificadores calculados são iguais aos fornecidos
  if (
    parseInt(cpf.charAt(9)) !== digito1 ||
    parseInt(cpf.charAt(10)) !== digito2
  ) {
    return false;
  }

  return true;
}

export function validarTelefone(telefone) {
  // Verifica se o valor chegou nulo
  if (!telefone) {
    return false;
  }

  // Remove todos os caracteres não numéricos do número de telefone
  const numero = telefone.replace(/\D/g, "");

  // Verifica se o número de telefone tem um comprimento válido
  if (numero.length !== 10 && numero.length !== 11) {
    return false;
  }

  // Verifica se o DDD é válido
  const ddd = numero.substr(0, 2);
  const dddValidos = [
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "21",
    "22",
    "24",
    "27",
    "28",
    "31",
    "32",
    "33",
    "34",
    "35",
    "37",
    "38",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "51",
    "53",
    "54",
    "55",
    "61",
    "62",
    "63",
    "64",
    "65",
    "66",
    "67",
    "68",
    "69",
    "71",
    "73",
    "74",
    "75",
    "77",
    "79",
    "81",
    "82",
    "83",
    "84",
    "85",
    "86",
    "87",
    "88",
    "89",
    "91",
    "92",
    "93",
    "94",
    "95",
    "96",
    "97",
    "98",
    "99",
  ];
  if (!dddValidos.includes(ddd)) {
    return false;
  }

  // Verifica se o número de telefone começa com os dígitos corretos
  if (numero.length === 10 && !/^([1-9]{2})\d{8}$/.test(numero)) {
    return false;
  } else if (numero.length === 11 && !/^([1-9]{2})\d{9}$/.test(numero)) {
    return false;
  }

  // Se passou pelas verificações anteriores, o número de telefone é válido
  return true;
}

export function validarCampoTexto(campoTexto) {
  // Remove espaços em branco no início e no fim do texto
  const textoSemEspacos = campoTexto.trim();

  // Divide o texto em palavras, considerando espaços, pontos e quebras de linha como separadores
  const palavras = textoSemEspacos.split(/[\s\n.]+/);

  // Conta o número de palavras e caracteres no texto
  const numPalavras = palavras.length;
  const numCaracteres = textoSemEspacos.length;

  // Verifica se o texto atende às condições
  if (numPalavras < 20) {
    return "O relato deve ter pelo menos 20 palavras.";
  } else if (numCaracteres < 120) {
    return "O relato deve ter pelo menos 120 caracteres.";
  } else {
    return "True";
  }
}

export function validarUF(sigla) {
  // Expressão regular que verifica se a sigla é composta por 2 letras maiúsculas
  const regex = /^[A-Z]{2}$/;

  // Verifica se a sigla passada como parâmetro é válida
  if (regex.test(sigla)) {
    // Lista de siglas válidas de UFs do Brasil
    const ufs = [
      "AC",
      "AL",
      "AM",
      "AP",
      "BA",
      "CE",
      "DF",
      "ES",
      "GO",
      "MA",
      "MG",
      "MS",
      "MT",
      "PA",
      "PB",
      "PE",
      "PI",
      "PR",
      "RJ",
      "RN",
      "RO",
      "RR",
      "RS",
      "SC",
      "SE",
      "SP",
      "TO",
    ];

    // Verifica se a sigla é uma das UFs válidas
    if (ufs.includes(sigla)) {
      return true; // a sigla é válida
    } else {
      return false; // a sigla é inválida
    }
  } else {
    return false; // a sigla é inválida
  }
}

export function avoidRandomTyping(str) {
  // converte a string para letras minúsculas e remove espaços em branco
  const letters = str.toLowerCase().replace(/\s/g, "");

  // conta o número de vezes que cada letra aparece na string
  const count = {};
  for (let i = 0; i < letters.length; i++) {
    const letter = letters.charAt(i);
    count[letter] = count[letter] ? count[letter] + 1 : 1;
  }

  // calcula a proporção de cada letra na string
  const proportion = {};
  const total = letters.length;
  Object.keys(count).forEach((letter) => {
    proportion[letter] = count[letter] / total;
  });

  // verifica se a distribuição é uniforme
  const threshold = 0.01; // valor arbitrário que indica o quanto a distribuição pode variar
  const uniform = Object.values(proportion).every(
    (p) => Math.abs(p - 1 / 26) < threshold
  );

  return !uniform;
}

export function validaDesc(descricoes, tamanho) {
  // Remove espaços em branco no início e no final do descricoes

  if (descricoes == null) {
    return false;
  }

  descricoes = descricoes.trim();

  // Verifica se o descricoes está dentro do limite de caracteres
  if (tamanho > 0) {
    if (descricoes.length <= tamanho) {
      return false;
    }
  }

  // descricoes válido
  return true;
}
