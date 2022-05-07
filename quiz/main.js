
// ao clicar no botão 'iniciar' ocultar container da section intro e aparecer o da questão

document.querySelector('button.iniciar').addEventListener('click', e => {
    console.log('iniciar...')
    document.querySelector('section.intro').style.display = 'none';
    document.querySelector('section.questao').style.display = 'block';
})



// OCULTANDO QUESTÕES DA PÁGINA
document.querySelectorAll('section.questao .desativada').forEach(questao => {

    questao.style.display = 'none';
  
  });




function habilitarBotaoConfirmar (sim) {
    
    if (sim == true) {
        document.querySelector("section.questao button.confirmar").style.backgroundColor = "#4A95EB";
        document.getElementById("#btn-confirmar").disabled = "false";
        
    } else {
        document.querySelector("section.questao button.confirmar").style.backgroundColor = "#EEEEEE";
        document.getElementById("#btn-confirmar").disabled = "true";
    }    

}
    

// nota inicial do usuário
let notaUsuario = 0

// texto da nota final do usuário
let notaFinalUsuario = ''


// VARIÁVEIS PARA DEFINIR QUESTÃO E POPUP ATUAIS
let alternativaAtual = 1
let idQuestaoAtual = '#q' + alternativaAtual

let popUpAtual = 1
let idPopUpAtual = '#p' + popUpAtual

// chamando função de ativar questão atual
ativandoQuestao()


function ativandoQuestao () {
    console.log('teste')
    // PEGA TODAS AS ALTERNATIVAS DA QUESTÃO ATUAL
    let alternativas = document.querySelectorAll(idQuestaoAtual + ' ul > button')

    // PARA CADA BOTÃO/OPÇÃO VAI ACIONAR A FUNÇÃO 'SELECIONAROPCAO'
    for ( let opcao of alternativas) {
        opcao.addEventListener('click', selecionarOpcao)
    }

    // ADICIONAR CLASS 'SELECIONADA' NA OPCAO ESCOLHIDA DA QUESTÃO
    function selecionarOpcao (e) {

        let btns = document.querySelectorAll(idQuestaoAtual + ' ul > button')

        // primeiro remove todas as classes 'selecionada' dos buttons
        btns.forEach(button => button.classList.remove('selecionada'));

        // depois adiciona classe 'selecionada' no botão clicado
        e.target.classList.add('selecionada')

        // e depois adiciona na tag pai a classe 'ativar-botao' para habilitar o botão de 'confirmar' na questão
        document.querySelector('.questao').classList.add('ativar-botao') 

    }
}



// AÇÃO QUANDO O BOTÃO DE 'CONFIRMAR' É APERTADO CHAMA A FUNÇÃO DE VERIFICAR RESPOSTA
document.querySelector('button.confirmar').addEventListener('click', verificarResposta)


function verificarResposta () { 


    let existeAlternativaSelecionada = document.querySelector('.questao').classList.contains('ativar-botao')

    // se a classe 'ativar-botao' existir roda o restante do código
    if (existeAlternativaSelecionada) {

        let btns = document.querySelectorAll(idQuestaoAtual + ' ul > button')

        for ( let botao of btns ) {

            if (botao.classList.contains('certa')) {
                if (botao.classList.contains('selecionada')) {

                    
                    // se o usuário acertou será acrescentado um ponto na nota
                    notaUsuario += 1

                    // muda a cor do destaque do popup para verde
                    document.querySelectorAll('section.popup div.resultado').forEach(event => {
                        event.style.backgroundColor = '#2BC28F';
                    })

                    // alterando texto da mensagem de acertou ou erro
                    document.querySelectorAll('div.resultado > h2').forEach(event => {
                        event.innerHTML = 'Você acertou! 👏🏼👏🏼'
                    })

                    // chama a função de mostrar o popup
                    popUp()

                } else {
                    
                    // muda a cor do destaque do popup para vermelho
                    document.querySelectorAll('section.popup div.resultado').forEach(event => {
                        event.style.backgroundColor = '#F86754';
                    })
                    
                    // alterando texto da mensagem de acertou ou erro
                    document.querySelectorAll('div.resultado > h2').forEach(event => {
                        event.innerHTML = 'Ops, você errou! 😥'
                    })
                    
                    // chama a função de mostrar o popup
                    popUp()

                }
            }   
        
            
        }

        // atualiza variáveis da questao e pop-up atuais
        alternativaAtual += 1
        idQuestaoAtual = '#q' + alternativaAtual
        console.log('idQuestaoAtual: ' + idQuestaoAtual)

        popUpAtual += 1
        idPopUpAtual = '#p' + popUpAtual  
        console.log('idPopUpAtual:' + idPopUpAtual) 

    } else {
        console.log('clica na alternativa, cristão!')
    }    

}



// FUNÇÃO PARA MOSTRAR POP-UP CORRESPONDENTE A PERGUNTA
function popUp () {

    if (alternativaAtual == 1) {

        // ocultando demais pop-ups
        document.querySelector('#p2').style.display = 'none';
        document.querySelector('#p3').style.display = 'none';
        document.querySelector('#p4').style.display = 'none';
        document.querySelector('#p5').style.display = 'none';

        // console.log('Chamando popup 1')

        let exibirPopUp = document.querySelector('section.popup')        
        exibirPopUp.style.display = 'block';

        let exibirInfosPopUp = document.querySelector(idPopUpAtual)        
        exibirInfosPopUp.style.display = 'block';     

      } else if (alternativaAtual == 2) {

        // ocultando demais pop-ups
        document.querySelector('#p1').style.display = 'none';
        document.querySelector('#p3').style.display = 'none';
        document.querySelector('#p4').style.display = 'none';
        document.querySelector('#p5').style.display = 'none';

        // console.log('Chamando popup 2')
        let exibirPopUp = document.querySelector('section.popup')        
        exibirPopUp.style.display = 'block';

        let exibirInfosPopUp = document.querySelector(idPopUpAtual)        
        exibirInfosPopUp.style.display = 'block';

        
    } else if (alternativaAtual == 3) {

        // ocultando demais pop-ups
        document.querySelector('#p1').style.display = 'none';
        document.querySelector('#p2').style.display = 'none';
        document.querySelector('#p4').style.display = 'none';
        document.querySelector('#p5').style.display = 'none';

        // console.log('Chamando popup 3')
        let exibirPopUp = document.querySelector('section.popup')        
        exibirPopUp.style.display = 'block';

        let exibirInfosPopUp = document.querySelector(idPopUpAtual)        
        exibirInfosPopUp.style.display = 'block';
        
    } else if (alternativaAtual == 4) {

        // ocultando demais pop-ups
        document.querySelector('#p1').style.display = 'none';
        document.querySelector('#p2').style.display = 'none';
        document.querySelector('#p3').style.display = 'none';
        document.querySelector('#p5').style.display = 'none';

        // console.log('Chamando popup 3')
        let exibirPopUp = document.querySelector('section.popup')        
        exibirPopUp.style.display = 'block';

        let exibirInfosPopUp = document.querySelector(idPopUpAtual)        
        exibirInfosPopUp.style.display = 'block';
        
    } else if (alternativaAtual == 5) {

        // ocultando demais pop-ups
        document.querySelector('#p1').style.display = 'none';
        document.querySelector('#p2').style.display = 'none';
        document.querySelector('#p3').style.display = 'none';
        document.querySelector('#p4').style.display = 'none';

        // console.log('Chamando popup 3')
        let exibirPopUp = document.querySelector('section.popup')        
        exibirPopUp.style.display = 'block';

        let exibirInfosPopUp = document.querySelector(idPopUpAtual)        
        exibirInfosPopUp.style.display = 'block';    
        
        // chamando função de ver resultado final
        verResultadoFinal()
        
    }
   

    // ocultando questão atual
    document.querySelector(idQuestaoAtual).style.display = 'none'

}

// AO CLICAR NO BOTÃO 'PRÓXIMA QUESTÃO' NO POP-UP EXECUTA A FUNÇÃO ABAIXO
document.querySelector('button.proxima').addEventListener('click', proximaQuestao)

function proximaQuestao () {      
    
    // console.log('idQuestaoAtual:')
    // console.log(idQuestaoAtual)
    document.querySelector('section.popup').style.display = 'none';
    document.querySelector(idQuestaoAtual).style.display = 'flex'

    document.querySelector('.questao').classList.remove('ativar-botao')
    
    // chamando função de ativar questão atual
    ativandoQuestao()
}


function verResultadoFinal () {    

    // ocultando botão de 'próxima' e exibindo o de 'ver resultado'
    document.querySelector('section.popup button.proxima').style.display = 'none'    
    document.querySelector('section.popup button.resultado').style.display = 'block';

    // executando função ao clicar no botão 'ver resultado'
    document.querySelector('button.resultado').addEventListener('click', e => {
        // ocultado os elementos das questões e pop-up
        document.querySelector('section.questao').style.display = 'none';
        document.querySelector('section.popup').style.display = 'none';

        // exibindo section do resultado final        
        document.querySelector('section.resultado-final').style.display = 'block';
        calculandoNota(notaUsuario)
    })    
}

// função que calcula a nota final do usuário

function calculandoNota (notaUsuario) {
    if (notaUsuario == 0) {
        TituloNota = 'Você se saiu bem mal!'

    } else if (notaUsuario <= 2) {
        TituloNota = 'Você não foi bem!'

    }
     else if (notaUsuario <= 4) {
        TituloNota = 'Você foi bem!'

    } else {
        TituloNota = 'Parabéns, você arrasou!'

    }
    nota = (notaUsuario * 100) / 5
    notaFinalUsuario = 'Acertou ' + nota + '% das questões.'
    
    resultadoFinalUsuario = 'Acertei ' + nota + '% das questões do Quiz das Buscas no Google. Jogue também em >> https://lucasthaynan.github.io/dataviz-II/quiz/index.html'

   
    document.querySelector('section.resultado-final > h1').innerHTML = TituloNota
    document.querySelector('section.resultado-final > p').innerHTML = notaFinalUsuario
    
}

// reiniciando o jogo ao clicar no botão de 'jogar novamente' 
document.querySelector('button.replay').addEventListener('click', e =>{
    document.location.reload(true)
})


// GRÁFICO 1
let labelsGrafico1 = ['Facebook','Instagram','Twitter','Tik Tok'];
let dataGrafico1 = [81, 66, 21, 14];
let idGrafico1 = 'chart1';
gerandoGrafico(idGrafico1, labelsGrafico1, dataGrafico1);

// GRÁFICO 2
let labelsGrafico2 = ['Jair Bolsonaro','Lula','Ciro Gomes','Sérgio Moro'];
let dataGrafico2 = [20, 10, 5, 2];
let idGrafico2 = 'chart2';
gerandoGrafico(idGrafico2, labelsGrafico2, dataGrafico2);

// GRÁFICO 3
let labelsGrafico3 = ['Flamengo','Plameiras','São Paulo','Corinthians'];
let dataGrafico3 = [36, 21, 15, 15];
let idGrafico3 = 'chart3';
gerandoGrafico(idGrafico3, labelsGrafico3, dataGrafico3);

// GRÁFICO 4
let labelsGrafico4 = ['Karol Conká','Silvio Santos','Paulo Gustavo','Juliette'];
let dataGrafico4 = [2, 2, 5, 2];
let idGrafico4 = 'chart4';
gerandoGrafico(idGrafico4, labelsGrafico4, dataGrafico4);

// GRÁFICO 5
let labelsGrafico5 = [['Rebeca', 'Andrade'],['Isaquias', 'Queiroz'],['Simone', 'Biles'],['Ítalo', 'Ferreira']];
let dataGrafico5 = [4, 2, 2, 1];
let idGrafico5 = 'chart5';
gerandoGrafico(idGrafico5, labelsGrafico5, dataGrafico5);



// FUNÇÃO DE GERAR GRÁFICO COM O CHART.JS

function gerandoGrafico (idGrafico, labels, valores) {
    const data = {
        labels: labels,
        datasets: [{
          label: 'Média',      
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 206, 86)',
            'rgb(75, 192, 192)',   
         ],
          data: valores,
        }]
      };
    
      const config = {
        type: 'bar',
        data: data,
        // ocultar labels do gráfico
        options: {
            plugins:{
             legend: {
              display: false
             },
             title: {
                display: true,
                text: 'Média de interesse de buscas no período'
                }
            }        
        }
      };

      const myChart = new Chart(
        document.getElementById(idGrafico),
        config
      );
};
  
//  pegando variáveis do botão de "copiar resultado"
let buttonShare = document.querySelector( 'button.share' )
let textoButtonShare = document.querySelector( 'button.share p' )
let imgButtonShare = document.querySelector( 'button.share img' )

//  função pra resetar o botão de "copiar resultado" para as configurações padrões
function resetar() {
    textoButtonShare.innerHTML = 'Copiar resultado'
    imgButtonShare.src = 'imagens/bxs_copy.svg'
    buttonShare.style.backgroundColor = '#2BC28F'
  }

function copiarTexto() { 

    // alterar imagem do botão
    imgButtonShare.src = 'imagens/el_ok-sign.svg'

    // alterar cor do botão
    buttonShare.style.backgroundColor = '#209e74'

    // alterar texto do botão
    textoButtonShare.textContent = 'Copiado!!!'

    // chamar função para resentar botão após 2 mil milissegundos
    setTimeout( resetar, 2000 )         
  
    // copiar texto automaticamente
    navigator.clipboard.writeText(resultadoFinalUsuario);
    
  }

  

  