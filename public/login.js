const formLogin = document.getElementById('form'); 
const emailLogin = document.getElementById('email');
const senhaLogin = document.getElementById('senha');
const btnConfirmar = document.getElementById('btnConfirmar');


btnConfirmar.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: emailLogin.value,
                senha: senhaLogin.value
            })
        });

      
        const resultado = await response.json();

        if (response.ok) {
            
            statusDiv.innerHTML = `<p style="color: green;">${resultado.mensagem}</p>`;

            
            localStorage.setItem("enfermeiro_nome", resultado.nome);
            localStorage.setItem("enfermeiro_email", resultado.email);

            window.location.href = "paginaPrincipal.html";
        } else {
            statusDiv.innerHTML = `<p style="color: red;">${resultado.mensagem}</p>`;
        }

    } catch (error) {
        statusDiv.innerHTML = `<p style="color:red;">Erro ao conectar ao servidor.</p>`;
    }
});
