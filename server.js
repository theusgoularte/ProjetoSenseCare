// server.js - VERSÃO CORRIGIDA E COMPLETA

const express = require("express"); // Framework para criar servidor e rotas
const mysql = require("mysql2"); // Biblioteca para conectar no MySQL
const path = require("path"); // Módulo nativo do Node para lidar com caminhos
const cors = require("cors"); // Necessário para evitar o erro CORS
const bcrypt = require("bcrypt"); // Necessário para hash de senhas

const app = express(); // Cria a aplicação Express

// --- MIDDLEWARES (CORRIGIDO: Colocados antes da conexão com o DB) ---

// 1. Permite o Frontend (porta diferente) se conectar (CORS)
app.use(cors());

// 2. Middleware para servir arquivos estáticos (HTML, CSS, JS da pasta public/)
app.use(express.static(path.join(__dirname, "public")));

// 3. Middleware para interpretar JSON no corpo das requisições POST
app.use(express.json());


// Conexão com o banco MySQL
const db = mysql.createConnection({
  host: "localhost", 
  user: "root", 
  password: "", 
  database: "sensecare", 
});

// ---------- ROTAS ----------

// GET /enfermeiros → Rota de teste simples (retorna um status)
app.get("/enfermeiros", (req, res) => {
    // Retorna um status de OK. A lógica de listar todos os dados ficaria aqui.
    res.json({ mensagem: "API SenseCare funcionando. Use POST para cadastrar." });
});


// POST /enfermeiros → Rota de cadastro
app.post("/enfermeiros", (req, res) => {
    // Extrai os 3 campos (nome, email, senha)
    const { nome, email, senha } = req.body; 

    // Geração do HASH da senha para segurança
    const saltRounds = 10;
    
    bcrypt.hash(senha, saltRounds, (errHash, hash) => {
        if (errHash) {
            console.error("Erro ao gerar hash:", errHash);
            return res.status(500).json({ sucesso: false, mensagem: "Erro interno de segurança." });
        }

        // Query SQL (Inserindo na tabela enfermeiros)
        db.query(
            "INSERT INTO enfermeiros (nome, email, senha) VALUES (?,?,?)",
            [nome, email, hash], 
            (errDB, result) => {
                if (errDB) {
                    if (errDB.code === 'ER_DUP_ENTRY') {
                        return res.status(409).json({ sucesso: false, mensagem: "Este email já está cadastrado." });
                    }
                    console.error("Erro no INSERT:", errDB);
                    return res.status(500).json({ sucesso: false, mensagem: "Erro ao salvar no banco de dados." });
                }
                res.json({ sucesso: true, mensagem: "Enfermeiro(a) cadastrado(a) com sucesso!" }); 
            }
        );
    });
});
app.get("/enfermeiros", (req, res) => {
    db.query("SELECT nome, email FROM enfermeiros", (err, results) => { // NÃO inclua a senha!
        if (err) {
            console.error("Erro ao consultar o banco:", err);
            return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar dados." });
        }
        res.json(results); // Envia o resultado como JSON
    });
});


// Inicia o servidor na porta 3000
app.listen(3000, () =>
  console.log("Servidor rodando em http://localhost:3000") // URL raiz do servidor
);