

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
 
    res.json({ mensagem: "API SenseCare funcionando. Use POST para cadastrar." });
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
app.get("/enfermeiros", (req, res) => {
    db.query("SELECT nome, email FROM enfermeiros", (err, results) => { 
        if (err) {
            console.error("Erro ao consultar o banco:", err);
            return res.status(500).json({ sucesso: false, mensagem: "Erro ao buscar dados." });
        }
        res.json(results); 
    });
});



app.listen(3000, () =>
  console.log("Servidor rodando em http://localhost:3000") 
);