window.onload = function () {
    renderizarTarefas();
    atualizarData();
};

let tarefas = [];
let id = 0;
let saldo = 0;

function obterTarefasLocalStorage() {
    const tarefasStorage = localStorage.getItem("tarefas");

    if (!tarefasStorage) {
        return [];
    }

    try {
        const tarefasParseadas = JSON.parse(tarefasStorage);
        return Array.isArray(tarefasParseadas) ? tarefasParseadas : [];
    } catch {
        return [];
    }
}

function criarTarefa() {
    const inputTitulo = document.getElementById("tituloTarefa");
    const titulo = inputTitulo.value.trim();

    if (!titulo) {
        return;
    }

    tarefas = obterTarefasLocalStorage();
    const ultimoId = tarefas.reduce((maior, tarefa) => {
        const numero = parseInt(tarefa.id, 10) || 0;
        return Math.max(maior, numero);
    }, 0);

    id = String(ultimoId + 1).padStart(3, "0");
    let tituloTarefa = titulo;

    tarefas.push({
        id,
        tituloTarefa
    });

    salvarLocalStorage(tarefas)
    renderizarTarefas();
    inputTitulo.value = "";
};

function salvarLocalStorage(tarefas) {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function salvarSaldoLocalStorage(saldo) {
    localStorage.setItem("saldo", saldo.toString());
}

function renderizarTarefas() {
    const lista = document.getElementById('lista');
    lista.innerHTML = "";

    tarefas = obterTarefasLocalStorage();
    saldo = parseFloat(localStorage.getItem("saldo")) || 0;
    document.getElementById('saldo').textContent = saldo.toFixed(2);

    tarefas.forEach(tarefa => {

        const li = document.createElement('li');
        lista.appendChild(li);

        const checarTarefa = document.createElement('input');
        checarTarefa.type = 'checkbox';
        li.appendChild(checarTarefa)
        checarTarefa.addEventListener('change', () => {
            if (checarTarefa.checked) {
                deletarTarefa(tarefa.id);
                salvarLocalStorage(tarefas);
                incrementarSaldo();
                renderizarTarefas();
            }
        });

        const span = document.createElement('span');
        span.textContent = tarefa.tituloTarefa;
        li.appendChild(span);

    })

}

function deletarTarefa(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
}

// NOTE: Feacture futura.
/* function atualizarTarefa(id, titulo) {
    const tarefa = tarefas.find(tarefa => tarefa.id == id);
    if (tarefa) {
        tarefa.titulo = titulo;
    }
}; */

function atualizarData() {
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();

    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    const mesNome = meses[data.getMonth()];
    const dataFormatada = `${mesNome}, ${dia}, ${ano}`;
    document.querySelector('header span').textContent = dataFormatada;
}

function incrementarSaldo() {
    const saldoElement = document.getElementById('saldo');
    saldo = parseFloat(saldoElement.textContent);
    saldo += 10;
    salvarSaldoLocalStorage(saldo);

}
