async function salvarPaciente() {
    const dados = {
        nome: document.getElementById("nomePaciente").value,
        cpf: document.getElementById("cpfPaciente").value,
        
   
        telefone: document.getElementById("telefonePaciente").value, 
       
        enfermeiro_designado: localStorage.getItem("enfermeiro_nome"),

        sex_fem: document.getElementById("sex_fem").checked ? 1 : 0,
    
        sex_masc: document.getElementById("sex_masc").checked ? 1 : 0,
        sex_outro: document.getElementById("sex_outro").checked ? 1 : 0,
        def_auditiva: document.getElementById("def_auditiva").checked ? 1 : 0,
        def_visual: document.getElementById("def_visual").checked ? 1 : 0,
        def_motora: document.getElementById("def_motora").checked ? 1 : 0,
        def_intelectual: document.getElementById("def_intelectual").checked ? 1 : 0
    };

   
    const response = await fetch("http://localhost:3000/pacientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
    });

    const r = await response.json();
    alert(r.mensagem);
    carregarPacientes();
}

async function carregarPacientes() {
    const res = await fetch("http://localhost:3000/pacientes");
    const lista = await res.json();

    const tbody = document.getElementById("listaPacientes");
    tbody.innerHTML = "";

    lista.forEach(p => {
        tbody.innerHTML += `
            <tr>
                <td>${p.nome}</td>
                <td>${p.cpf}</td>
                <td>${p.telefone || ''}</td>
                <td>${p.enfermeiro_designado || ''}</td>
                <td>
                    ${p.sex_fem ? "F " : ""}
                    ${p.sex_masc ? "M " : ""}
                    ${p.sex_outro ? "Outro" : ""}
                </td>
                <td>
                    ${p.def_auditiva ? "Auditiva " : ""}
                    ${p.def_visual ? "Visual " : ""}
                    ${p.def_motora ? "Motora " : ""}
                    ${p.def_intelectual ? "Intelectual" : ""}
                </td>
                <td>
                    <button onclick="deletarPaciente('${p.cpf}')">Deletar</button>
                </td>
            </tr>
        `;
    });
}

async function deletarPaciente(cpf) {
    if (!confirm("Deseja excluir este paciente?")) return;

    const res = await fetch(`http://localhost:3000/pacientes/${cpf}`, {
        method: "DELETE"
    });

    const r = await res.json();
    alert(r.mensagem);
    carregarPacientes();
    
}


carregarPacientes();

