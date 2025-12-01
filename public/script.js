// 1. Variáveis de Registro
const emailRegistrar = document.getElementById('emailRegistrar');
const senhaRegistrar = document.getElementById('senhaRegistrar');
const nomeRegistrar = document.getElementById('nome');
const btnCadastrar = document.getElementById("btnCadastrar");

// 2. Variáveis de Login (O 'nome' de login é desnecessário)
const formLogin = document.getElementById('form'); // É bom usar o form para o evento submit
const emailLogin = document.getElementById('email');
const senhaLogin = document.getElementById('senha');
const btnConfirmar = document.getElementById('btnConfirmar');

// Opcional: Crie um elemento para mensagens de status (Adicione <div id="statusDiv"></div> no seu HTML)
const statusDiv = document.getElementById('statusDiv'); 


btnCadastrar.addEventListener('click', async (event) => { // ADICIONE 'async' aqui!
    event.preventDefault();

    // 3. Verifica se os campos existem antes de tentar pegar o valor
    if (!emailRegistrar || !senhaRegistrar || !nomeRegistrar) {
        statusDiv.innerHTML = `<p style="color: red;">❌ Erro: Elementos HTML não encontrados.</p>`;
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/enfermeiros', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ 
                // CORREÇÃO: Usando .value para enviar os dados
                nome: nomeRegistrar.value, 
                email: emailRegistrar.value,
                senha: senhaRegistrar.value
            })
        });

        const resultado = await response.json();

        // Lógica de resposta
        if (response.ok) { 
            statusDiv.innerHTML = `<p style="color: green;">✅ ${resultado.mensagem || 'Cadastro sucesso!'}</p>`;
            
            // Limpa os campos após o sucesso
            nomeRegistrar.value = '';
            emailRegistrar.value = '';
            senhaRegistrar.value = '';
            
        } else { 
            // Mostra a mensagem de erro que veio do servidor (ex: Email já cadastrado)
            statusDiv.innerHTML = `<p style="color: red;">❌ Erro: ${resultado.mensagem || 'Falha no cadastro.'}</p>`;
        }
    } catch (error) {
        console.error('Erro de rede/servidor:', error);
        statusDiv.innerHTML = `<p style="color: red;">❌ Erro de conexão. Servidor Node.js desligado?</p>`;
    }
});

