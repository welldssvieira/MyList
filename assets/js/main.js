window.onload = function () {
    renderizarTarefas();
    atualizarData();
    saudacaoUsuario();
    saldoPendente();
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
    saldoPendente();
    inputTitulo.value = "";
};

function salvarLocalStorage(tarefas) {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function salvarSaldoLocalStorage(saldo) {
    localStorage.setItem("saldo", saldo.toString().concat(" moedas"));
}

function renderizarTarefas() {
    const lista = document.getElementById('lista');
    lista.innerHTML = "";

    tarefas = obterTarefasLocalStorage();
    saldo = parseFloat(localStorage.getItem("saldo")) || 0;
    document.getElementById('saldo').textContent = saldo.toFixed(2).concat(" moedas");



    tarefas.forEach(tarefa => {

        const li = document.createElement('li');
        lista.appendChild(li);

        const checarTarefa = document.createElement('input');
        checarTarefa.type = 'checkbox';
        checarTarefa.id = `checarTarefa`;
        li.appendChild(checarTarefa)
        checarTarefa.addEventListener('change', () => {
            if (checarTarefa.checked) {
                deletarTarefa(tarefa.id);
                salvarLocalStorage(tarefas);
                incrementarSaldo();
                renderizarTarefas();
                tocarMusica()
                saldoPendente()
            }
        });

        const label = document.createElement('label');
        label.textContent = tarefa.tituloTarefa;
        label.htmlFor = `checarTarefa`;
        li.appendChild(label);

        const containerValorTarefa = document.createElement('div');
        containerValorTarefa.classList.add('containerValorTarefa');
        li.appendChild(containerValorTarefa);

        const iconMoeda = document.createElement('img');
        iconMoeda.classList.add('iconMoeda');
        iconMoeda.src = 'assets/img/coin.png';
        iconMoeda.alt = 'Moeda';
        containerValorTarefa.appendChild(iconMoeda);

        const valorTarefa = document.createElement('span');
        valorTarefa.classList.add('valorTarefa');
        valorTarefa.textContent = '+10';
        containerValorTarefa.appendChild(valorTarefa);
    })

}

function deletarTarefa(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
}

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

function saudacaoUsuario() {
    const data = new Date();
    const hora = data.getHours();
    const saudacaoElement = document.getElementById('saudacaoUsuario');

    const saudacoes = ["Olá !", "Que bom te ver !", "Voltou rápido :)"];
    const valorAleatorio = Math.floor(Math.random() * 2);

    saudacaoAleatoria = saudacoes[Math.floor(Math.random() * saudacoes.length)];
    saudacaoElement.querySelector('h1').textContent = saudacaoAleatoria;

    if (hora >= 5 && hora < 12) {
        if (valorAleatorio === 0) {
            saudacaoElement.querySelector('h1').textContent = 'Hey ! Bom dia!';
        } else {
            saudacaoElement.querySelector('h1').textContent = saudacoes[Math.floor(Math.random() * saudacoes.length)];
        }
    } else if (hora >= 12 && hora < 18) {
        if (valorAleatorio === 0) {
            saudacaoElement.querySelector('h1').textContent = 'Hey ! Boa tarde!';
        } else {
            saudacaoElement.querySelector('h1').textContent = saudacoes[Math.floor(Math.random() * saudacoes.length)];
        }
    } else {
        if (valorAleatorio === 0) {
            saudacaoElement.querySelector('h1').textContent = 'Hey ! Boa noite!';
        } else {
            saudacaoElement.querySelector('h1').textContent = saudacoes[Math.floor(Math.random() * saudacoes.length)];
        }
    }

}

function incrementarSaldo() {
    const saldoElement = document.getElementById('saldo');
    saldo = parseFloat(saldoElement.textContent);
    saldo += 10;
    salvarSaldoLocalStorage(saldo);

}

function tocarMusica() {
    const elemementoAudio = document.createElement('audio');
    elemementoAudio.src = 'assets/audio/virtual_vibes-pop-tap-click-fx-383733.mp3';

    elemementoAudio.play();
}

function saldoPendente() {
    const saldoPendenteElement = document.getElementById('saldoPendente');
    const saldoPendente = parseFloat(saldoPendenteElement.textContent) || 0;
    saldoPendenteElement.textContent = String(`+ ${tarefas.length * 10}`);
}