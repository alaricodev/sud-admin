const express = require("express");
const { pool } = require("../config.js");

const router = express.Router();

router.post("/query", async (req, res) => {
  //Primeira coisa que eu faço é obter a conexão
  const conn = await pool.connect();

  try {
    const { query, array } = req.body;

    // Executa a primeira consulta para obter a expressão SQL e o valor de "tem_param"
    const { rows } = await conn.query(
      "SELECT query_text, tem_param FROM sys_consultas WHERE codigo = $1",
      [query]
    );
    const { query_text, tem_param } = rows[0];

    // Executa a segunda consulta, passando o parâmetro "array" se "tem_param" for verdadeiro
    const result = tem_param
      ? await conn.query(query_text, array)
      : await conn.query(query_text);

    res.status(200).json(result.rows);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({
      erro: true,
      msg: "Aconteceu um erro ao se executar a consulta",
      backend_msg: erro.message,
    });
  } finally {
    conn.release();
  }
});

router.post("/function", async (req, res) => {
  //Primeira coisa que eu faço é obter a conexão
  const conn = await pool.connect();

  try {
    const params = req.body;

    try {
      function_name = params["function_name"];
    } catch (erro) {
      console.error(erro);
      res.status(500).json({
        erro: true,
        msg: "Aconteceu um erro ao receber o nome da function",
        backend_msg: erro.message,
      });
    }

    // Executa a primeira consulta para obter a expressão SQL e o valor de "tem_param"
    const { rows } = await conn.query(`SELECT ${function_name} ($1)`, [params]);
    const result = rows[0];

    res.status(200).json([result[function_name]]);
  } catch (erro) {
    console.error(erro);
    json_error = JSON.stringify(erro);
    console.log(json_error);
    res.status(500).json({
      erro: true,
      msg: "Aconteceu um erro ao se executar a function",
      backend_msg: `Code: ${json_error.code} Where: ${json_error.where} InternalQuery: ${json_error.internalQuery} `,
    });
  } finally {
    conn.release();
  }
});

module.exports = router;
