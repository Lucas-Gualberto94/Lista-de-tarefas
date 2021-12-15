// 1) temos que referenciar o input
let input = document.querySelector('input[name=tarefa]');


// 2° temos que referenciar o button
let btn = document.querySelector('#botao');


// 3° temos que referenciar a lista
let lista = document.querySelector('#lista');

//recuperar informações do card
let card = document.querySelector('.card');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || []; //JSON.parse transformas as strings da 'tarefas' feita la em baixo e
                                                                 // transforma em array novamente. || significa ou o array vazio []

function renderizarTarefas(){

    //Limpar a listagem de item antes de renderizar
    lista.innerHTML = '';
     
    for(tarefa of tarefas){
        //Criar 0 lista da lista
        let itemLista = document.createElement('li');

        //Adicionar classes no item da Lista
        itemLista.setAttribute('class', 'list-group-item list-group-item-action')

        //Adicionar evento de click no item da lista
        itemLista.onclick = function(){
            deletarTarefa(this);
        }

        //Criar um texto
        let itemTexto = document.createTextNode(tarefa);

        //Adicionar o texto no item da lista
        itemLista.appendChild(itemTexto);

        //Adicionar o item da lista na lista
        lista.appendChild(itemLista);
    }
}

// Executando a função para renderizar Tarefas
renderizarTarefas();

// 1) Precisamos "escutar" o evento do clique do botao
btn.onclick = function (){
    //Precisamos capturar o valor digitado pelo usuario no input
    let novaTarefa = input.value;

    if(novaTarefa !==""){
        // 3) Precisamos atualizar a nova tarefa na lista (array) de tarefas e renderizar a tela
        tarefas.push(novaTarefa);

        // Executando a função para renderizar Tarefas
        renderizarTarefas();

        //limpar input
        input.value = '';

        //Limpar mensagens de erro (spans)
        removerSpans()

        //Salva os novos dados no banco de dados
        salvarDadosNoStorage();
    } else{
        //Limpar mensagens de erro (spans)
        removerSpans()

        let span = document.createElement('span');
        span.setAttribute('class', 'alert alert-warning');

        let msg = document.createTextNode('Você precisar informar a tarefa!');

        span.appendChild(msg);

        card.appendChild(span);
    }
     
} 

function removerSpans (){
   let spans = document.querySelectorAll('span');

    for(let i=0; i < spans.length; i++){
      card.removeChild(spans[i]);
    }
}

function deletarTarefa(tar){
    //remove a tarefa do array
    tarefas.splice(tarefas.indexOf(tar.textContent), 1);

    //renderiza novamente a tela
    renderizarTarefas();
    
    //Salva os novos dados no banco de dados
    salvarDadosNoStorage();
}

function salvarDadosNoStorage(){
    //Todo navegador web possui essa capacidade
    localStorage.setItem('tarefas', JSON.stringify(tarefas)); //transformar o "tarefas" que é um array em string (JSON.stringify)
}