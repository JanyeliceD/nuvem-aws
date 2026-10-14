const mysql = require("mysql2/promise");
const { getConnection } = require("connection");
// Lambda function é o endpoint para criar um novo aluno
exports.handler = async (event) => {
try {
const body = JSON.parse(event.body || "{}");
const { Nome, Email } = body;
if (!Nome || !Email) {
return {
statusCode: 400,
headers: {
"Content-Type": "application/json",
"Access-Control-Allow-Origin": "*"
},
body: JSON.stringify({
error: "Nome e Email são obrigatórios"
})
};
}
const db = await getConnection();
const [result] = await db.execute(
"INSERT INTO Aluno (Nome, Email) VALUES (?, ?)",
[Nome, Email]
);
return {
statusCode: 201,
headers: {
"Content-Type": "application/json",
"Access-Control-Allow-Origin": "*"
},
body: JSON.stringify({
id: result.insertId,
Nome,
Email
})
};
} catch (error) {
console.error(error);
return {
statusCode: 500,
headers: {
"Content-Type": "application/json",
"Access-Control-Allow-Origin": "*"
},
body: JSON.stringify({
error: "Erro ao cadastrar aluno"
})
};
}
};