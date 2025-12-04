
const emailRegistrar = document.getElementById('emailRegistrar');
const senhaRegistrar = document.getElementById('senhaRegistrar');
const nomeRegistrar = document.getElementById('nome');
const btnCadastrar = document.getElementById("btnCadastrar");


const statusDiv = document.getElementById('statusDiv'); 


btnCadastrar.addEventListener('click', async (event) => { 
    event.preventDefault();

   
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
                
                nome: nomeRegistrar.value, 
                email: emailRegistrar.value,
                senha: senhaRegistrar.value
            })
        });

        const resultado = await response.json();

   
        if (response.ok) { 
            statusDiv.innerHTML = `<p style="color: green;">✅ ${resultado.mensagem || 'Cadastro sucesso!'}</p>`;
            
         
            nomeRegistrar.value = '';
            emailRegistrar.value = '';
            senhaRegistrar.value = '';
            
        } else { 
            
            statusDiv.innerHTML = `<p style="color: red;">❌ Erro: ${resultado.mensagem || 'Falha no cadastro.'}</p>`;
        }
    } catch (error) {
        console.error('Erro de rede/servidor:', error);
        statusDiv.innerHTML = `<p style="color: red;">❌ Erro de conexão. Servidor Node.js desligado?</p>`;
    }
});

