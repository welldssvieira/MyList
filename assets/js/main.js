window.onload = function () {
    renderizarTarefas();
    atualizarData()
}

let tarefas = [];
let id = 0;

function criarTarefa() {
    const inputTitulo = document.getElementById("tituloTarefa");
    const titulo = inputTitulo.value.trim();

    id = String(++id).padStart(3, "0");
    let tituloTarefa = titulo;

    tarefas.push({
        id,
        tituloTarefa
    });

    salvarLocalStorage(tarefas)
    renderizarTarefas();
};

function adicionarTarefa(titulo) {

}

function lerTarefas() {
    return console.table(tarefas)
}

function deletarTarefa(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
}

function atualizarTarefa(id, titulo) {
    const tarefa = tarefas.find(tarefa => tarefa.id == id);
    if (tarefa) {
        tarefa.titulo = titulo;
    }
};

function renderizarTarefas() {
    const lista = document.getElementById('lista');
    const paginaPrincipal = "./index.html";
    //lista.innerHTML = "";

    tarefas = JSON.parse(localStorage.getItem("tarefas"));

    tarefas.forEach(tarefa => {

        const li = document.createElement('li');
        li.textContent = tarefa.tituloTarefa;
        lista.appendChild(li);

        const checarTarefa = document.createElement('input');
        checarTarefa.type = 'checkbox';
        li.appendChild(checarTarefa)
        checarTarefa.addEventListener('change', () => {
            if (checarTarefa.checked) {
                deletarTarefa(tarefa.id);
                salvarLocalStorage(tarefas);
                renderizarTarefas();
            } 
        });


        const botaoDeletar = document.createElement('button');
        botaoDeletar.textContent = 'Deletar';
        li.appendChild(botaoDeletar)
        botaoDeletar.addEventListener('click', () => {
            deletarTarefa(tarefa.id);
            salvarLocalStorage(tarefas);
            renderizarTarefas();
        })
    })

}

function salvarLocalStorage(tarefas) {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function fecharPagina() {
    document.location.href = "./index.html";
}

function botaoAdicionarTarefa() {
    let botao = document.getElementById("botaoAdicionarTarefa");
    document.location.href = "./adicionarTarefa.html";
}

function atualizarData(){
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();

    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const mesNome = meses[data.getMonth()];
    const dataFormatada = `${mesNome}, ${dia}, ${ano}`;
    document.querySelector('header span').textContent = dataFormatada;
}