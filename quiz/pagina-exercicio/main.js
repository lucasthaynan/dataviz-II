
let result = document.querySelector('.result')

let answer = document.querySelector('.answer')

function checarResposta( event ){

    let alternativaSelecionada = event.target;
    console.log(alternativaSelecionada.textContent);

    if (alternativaSelecionada.classList.contains('correct')) {

        result.textContent = 'Acertou :)'

    } else {

        result.textContent = 'Errou'
    }   

    // Mostrar resposta
    answer.style.display = 'initial'
};


let alternativas = document.querySelectorAll('li');


for ( let alternativa of alternativas) {
    alternativa.addEventListener('click', checarResposta )
}