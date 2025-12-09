## SenseCare - Sistema de Gerenciamento de Pacientes

Este repositório contém o código-fonte do SenseCare, um sistema Full-Stack projetado para autenticação e gerenciamento de pacientes por enfermeiros. O projeto está completo em seu Produto Mínimo Viável (MVP), abrangendo o ciclo de vida completo do paciente (Criar, Ler e Deletar) e um sistema de autenticação de usuários seguro.

## Funcionalidades Concluídas (MVP)
O SenseCare oferece as seguintes funcionalidades principais:

1. Autenticação de Enfermeiros
• Registro (Cadastro): Permite que novos enfermeiros se cadastrem com nome, email e senha.

• Login: Permite acesso ao sistema com verificação segura de senha (bcrypt).

• Segurança: As senhas são armazenadas como hashes no banco de dados.

• Estilização: As telas de Login e Cadastro foram estilizadas para um visual compacto e centralizado em verde e branco.

2. Gerenciamento de Pacientes (CRUD Principal)
• Criar (Create): Cadastro de novos pacientes, com os seguintes dados:

• Dados demográficos e informações sobre deficiências.

• Inclusão dos campos Número de Telefone e Enfermeiro Designado (automaticamente preenchido pelo usuário logado).

• Ler (Read): Listagem e visualização de todos os pacientes. A tabela foi corrigida para garantir a ordem correta de exibição de todos os campos (Nome, CPF, Telefone, Enfermeiro, Sexo e Deficiências).

• Deletar (Delete): Remoção permanente de um paciente usando o CPF.

## Configuração e Instalação
Siga estes passos para configurar e executar o projeto em seu ambiente local.

# 1. Requisitos
Node.js e NPM (ou Yarn) instalados.

MySQL em execução (via XAMPP ou similar).

# 2. Configuração do Banco de Dados
Crie o banco de dados chamado sensecare.

Execute as seguintes queries SQL para configurar as tabelas com os campos de telefone e enfermeiro designado:

 ```
 -- Tabela de Autenticação (Enfermeiros)
CREATE TABLE enfermeiros (
    email VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE,
    nome VARCHAR(255) NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- Tabela de Gerenciamento (Pacientes)
CREATE TABLE pacientes (
    nome VARCHAR(100),
    cpf VARCHAR (11) PRIMARY KEY NOT NULL UNIQUE,
    telefone VARCHAR(20) NULL,             
    enfermeiro_designado VARCHAR(255) NULL, 
    sex_fem TINYINT(1) DEFAULT 0,
    sex_masc TINYINT(1) DEFAULT 0,
    sex_outro TINYINT(1) DEFAULT 0,
    def_auditiva TINYINT(1) DEFAULT 0,
    def_visual TINYINT(1) DEFAULT 0,
    def_motora TINYINT(1) DEFAULT 0,
    def_intelectual TINYINT(1) DEFAULT 0
);
```

# 3. Instalação das Dependências
Na pasta raiz do projeto, instale os módulos Node.js:

```
npm install express mysql2 cors bcrypt path
```

# 4. Iniciando a Aplicação
Execute o servidor Node.js:

```
node server.js
```

Acesse a aplicação no navegador:

http://localhost:3000/

## Tecnologias

- Node.js  
- Express  
- MySQL2  
- XAMPP (MySQL local)  
- HTML, JS, CSS

