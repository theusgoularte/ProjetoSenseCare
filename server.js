const express = require("express"); 
const mysql = require("mysql2"); 
const path = require("path"); 
const cors = require("cors"); 
const bcrypt = require("bcrypt"); 

const app = express(); 

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost", 
  user: "root", 
  password: "", 
  database: "sensecare", 
});


app.get("/enfermeiros", (req, res) => {
    db.query("SELECT nome, email FROM enfermeiros", (err, results) => { 
        if (err) {
            console.error("Erro ao consultar o banco:", err);
            return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar dados." });
        }
        res.json(results); 
    });
});



app.post("/enfermeiros", (req, res) => {
    const { nome, email, senha } = req.body; 
    const saltRounds = 10;
    
    bcrypt.hash(senha, saltRounds, (errHash, hash) => {
        if (errHash) {
            console.error("Erro ao gerar hash:", errHash);
            return res.status(500).json({ sucesso: false, mensagem: "Erro interno de segurança." });
        }
        
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



app.post('/login', (req, res) => {
    const { email, senha } = req.body; 

    db.query("SELECT * FROM enfermeiros WHERE email = ?", [email], (errDB, results) => {
        
        if (errDB) {
            console.error("Erro ao buscar usuário no DB:", errDB);
            return res.status(500).json({ sucesso: false, mensagem: "Erro interno no servidor." });
        }
        
        if (results.length === 0) {
            return res.status(401).json({ sucesso: false, mensagem: "Email ou senha incorretos." });
        }

        const enfermeiro = results[0];
        const hashSalvo = enfermeiro.senha;

        bcrypt.compare(senha, hashSalvo, (errCompare, result) => {
            if (errCompare) {
                console.error("Erro ao comparar senhas:", errCompare);
                return res.status(500).json({ sucesso: false, mensagem: "Erro interno de segurança." });
            }

            if (result) {
                if (result) {
    return res.json({
        sucesso: true,
        mensagem: "Login efetuado com sucesso!",
        nome: enfermeiro.nome,   
        email: enfermeiro.email  
    });
}
            } else {
                return res.status(401).json({ sucesso: false, mensagem: "Email ou senha incorretos." });
            }
        });
    });
});
app.post("/pacientes", (req, res) => {
    const p = req.body;

  
    db.query(
        `INSERT INTO pacientes
        (nome, cpf, telefone, enfermeiro_designado, sex_fem, sex_masc, sex_outro,
         def_auditiva, def_visual, def_motora, def_intelectual)
         VALUES (?,?,?,?,?,?,?,?,?,?,?)`,

        [
            p.nome, p.cpf, p.telefone, p.enfermeiro_designado, 
            p.sex_fem, p.sex_masc, p.sex_outro,
            p.def_auditiva, p.def_visual, p.def_motora, p.def_intelectual
        ],

        (err) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ mensagem: "Erro ao inserir paciente." });
            }
            res.json({ mensagem: "Paciente cadastrado com sucesso!" });
        }
    );
});
app.get("/pacientes", (req, res) => {
    db.query("SELECT * FROM pacientes", (err, results) => {
        if (err) return res.status(500).json({ mensagem: "Erro ao buscar pacientes." });
        res.json(results);
    });
});
app.delete("/pacientes/:cpf", (req, res) => {
    const cpf = req.params.cpf;

    db.query("DELETE FROM pacientes WHERE cpf = ?", [cpf], (err) => {
        if (err) return res.status(500).json({ mensagem: "Erro ao deletar paciente." });
        res.json({ mensagem: "Paciente deletado com sucesso!" });
    });
});



app.listen(3000, () =>
  console.log("Servidor rodando em http://localhost:3000") 
);