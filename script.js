const urlBase = "https://landingpage-e168b-default-rtdb.firebaseio.com//perfil";
// o link do firebase do projeto//
function adicionar() {
    const nome = $("#nome").val();
    const idade = $("#idade").val();
    const perfil = $("#perfil").val();
    const dados = JSON.stringify({ nome, idade, perfil });
    $.post(`${urlBase}.json`, dados, () => {
        alert("Depoimento adicionado com sucesso!");
        $("#nome").val("");
        $("#idade").val("");
        $("#perfil").val("");
        listar();
    });
}
// aqui permite que o usuario adicione um novo depoimento no banco de dados do firebase
//$("#nome").val() serve para capturar os valores do campos: nome, idade e perfil

function listar() {
    $.get(`${urlBase}.json`, data => {
        $("#lista").html("");
        for (const id in data) {
            const usuario = data[id];
            $("#lista").append(`
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <strong>${usuario.nome}</strong> - ${usuario.idade}: ${usuario.perfil}
                    </div>
                    <div>
                        <button class="btn btn-sm btn-warning me-2" onclick="editar('${id}', '${usuario.nome}', '${usuario.idade}', '${usuario.perfil}')">Editar</button>
                        <button class="btn btn-sm btn-danger" onclick="excluir('${id}')">Excluir</button>
                    </div>
                </li>
            `);
        }
    });
}
// aqui recupera e exibe todos os depoimentos do usuario armazenado no banco de dados
//$.get usei para obter os dados dentro do firebase e o $("#lista").html("") para evitar duplicação nas informações
// list-group-item, d-flex, justify-content-between, align-items-center, btn-sm, btn-warning, btn-danger usado do bootstrap
// para estilizar os itens e os botoes
function editar(id, nome, idade, perfil) {
    const novoNome = prompt("Novo nome:", nome);
    const novaIdade = prompt("Nova idade:", idade);
    const novoPerfil = prompt("Novo perfil:", perfil);
    const dados = JSON.stringify({ nome: novoNome, idade: novaIdade, perfil: novoPerfil });
    $.ajax({
        url: `${urlBase}/${id}.json`,
        method: "PUT",
        data: dados,
        success: listar
    });
}
//aqui permite o editar o depoimento feito pelo usuario já existente no banco de dados
// usado o prompt() para coletar os novos valores para nome,idade e perfil pré preenchidos com os valores atuais
//converte os novos dados para o JSON
// usado o listar() para atualizar a exibição da lista
function excluir(id) {
    $.ajax({
        url: `${urlBase}/${id}.json`,
        method: "DELETE",
        success: listar
    });
}
// aqui ele remove o depoimento do banco de dados
//$.ajax usei para excluir o registro com o id espefico
// e o listar() novamnete para atualiazr a lista exibida
$(document).ready(() => {
    listar();
});

//aqui o listar() executa a função para assim que a pagina estiver totalmente carregada
//$(document).ready() usado para garantir que o DOM esteja pronto antes da manipulação 