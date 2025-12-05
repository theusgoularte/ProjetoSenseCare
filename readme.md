# SenseCare - Sistema de Gerenciamento de Pacientes

Este repositório contém o código-fonte do SenseCare, um sistema Full-Stack projetado para autenticação e gerenciamento de pacientes por enfermeiros. O projeto está completo em seu Produto Mínimo Viável (MVP), abrangendo o ciclo de vida completo do paciente (Criar, Ler e Deletar) e um sistema de autenticação de usuários seguro.


Com base nas últimas alterações (correção de erros, adição de campos de paciente, estilização CSS), aqui está a versão final e atualizada do seu README.md, refletindo todas as funcionalidades e melhorias implementadas.

✨ SenseCare - Sistema de Gerenciamento de Pacientes
Este repositório contém o código-fonte do SenseCare, um sistema Full-Stack projetado para autenticação e gerenciamento de pacientes por enfermeiros. O projeto está completo em seu Produto Mínimo Viável (MVP), abrangendo o ciclo de vida completo do paciente (Criar, Ler e Deletar) e um sistema de autenticação de usuários seguro.

🎯 Funcionalidades Concluídas (MVP)
O SenseCare oferece as seguintes funcionalidades principais:

1. 🧑‍⚕️ Autenticação de Enfermeiros
• Registro (Cadastro): Permite que novos enfermeiros se cadastrem com nome, email e senha.

• Login: Permite acesso ao sistema com verificação segura de senha (bcrypt).

• Segurança: As senhas são armazenadas como hashes no banco de dados.

• Estilização: As telas de Login e Cadastro foram estilizadas para um visual compacto e centralizado em verde e branco.

2. 📝 Gerenciamento de Pacientes (CRUD Principal)
• Criar (Create): Cadastro de novos pacientes, com os seguintes dados:

• Dados demográficos e informações sobre deficiências.

• Inclusão dos campos Número de Telefone e Enfermeiro Designado (automaticamente preenchido pelo usuário logado).

• Ler (Read): Listagem e visualização de todos os pacientes. A tabela foi corrigida para garantir a ordem correta de exibição de todos os campos (Nome, CPF, Telefone, Enfermeiro, Sexo e Deficiências).

• Deletar (Delete): Remoção permanente de um paciente usando o CPF.

## Tecnologias

- Node.js  
- Express  
- MySQL2  
- XAMPP (MySQL local)  
- HTML, JS, CSS

