

// função para converter formato do número do json
function converteNumero (numero) {
    numeroConvertido = parseFloat(numero.replace('.','').replace(' ',''))
    return numeroConvertido
}



// carregando os dados json dos municípios para cada um dos mapas
function carregandoDadosMapas () {
    // chamando json com os dados dos municípios
    fetch('dados_meis.json') 
    .then(response => response.json())
    .then(data => {

        // para cada municipio fazer tais ações
        for (let municipio of data) {


            nomeMunicipio = municipio['Município']
            categoriaMunicipio = municipio['categoria']

            // chamando função para gerar o mapa
            gerandoMapa('exosfera', nomeMunicipio, categoriaMunicipio)
            gerandoMapa('mesosfera', nomeMunicipio, categoriaMunicipio)
            gerandoMapa('troposfera', nomeMunicipio, categoriaMunicipio)

        }        

    })    

}

// chamando função para carregar os dados de todos os mapas
carregandoDadosMapas()


// função para exibir o pop-up ao clicar em um determinado município
function ativandoPopUp (camada) {

    let mapaAlagoas = document.querySelectorAll('#mapa-'+ camada + ' > path')
    
    // para cada município de um mapa específico (camada) fazer tal função...
    mapaAlagoas.forEach(municipio => {
        municipio.addEventListener('click', e => {
            // quando um município é clicado, chamar função de aparecer o pop-up
            aparecerPopUp()
    
            let nomeDoMunicipioClicado = municipio.querySelector('title').innerHTML
    
            // chamando função para pegar dados do município clicado
            pegandoDadosMunicipio(nomeDoMunicipioClicado, camada)
           
            
        })
    })
}

// chamando função para cada mapa
ativandoPopUp('exosfera')
ativandoPopUp('mesosfera')
ativandoPopUp('troposfera')
        
        

// função que vai pegar os dados do município que for clicado no mapa
function pegandoDadosMunicipio (nomeDoMunicipio, camada) {
    fetch('dados_meis.json')
    .then(response => response.json())
    .then(data => {

        // para cada municipio fazer tais ações
        for (let municipio of data) {

            if (municipio['Município'] == nomeDoMunicipio) {

                // array com os dados de registros de MEIs por ano em cada município
                let arrayMunicipio = [
                    converteNumero(municipio['2018']), 
                    converteNumero(municipio['2019']), 
                    converteNumero(municipio['2020']), 
                    converteNumero(municipio['2021']), 
                ]

                // variável com o texto a ser exibido no pop-up
                let textoMunicipioPopUp = 'Nos últimos quatro anos, o município teve ' + municipio['2018/2021'] + ' de crescimento, saindo de ' + municipio['2018'] + ', em 2018, para ' + municipio['2021'] + ' MEIs registrados no final de 2021.' 

                // alterando o html do pop-up
                document.querySelector('.texto-municipio').innerHTML = textoMunicipioPopUp

                document.querySelector('.nome-municipio').innerHTML = nomeDoMunicipio

                document.querySelector('.camada-municipio').innerHTML = camada

                // chamando a função de gerar gráfico e passando os dados do municipio clicado
                graficoChartJs(nomeDoMunicipio, arrayMunicipio)
 
            }

        }        

    })    

}




// variável do nível da camada/categoria: 'alta', 'regular' ou 'baixa'
let nivelCamada

// função para personalizar o mapa de acordo com a camada/categoria do município
function gerandoMapa (camada, nomeMunicipio, categoriaMunicipio) {

    if (camada == 'exosfera') {
        nivelCamada = 'alto'

    } else if (camada == 'mesosfera') {
        nivelCamada = 'regular'

    } else if (camada == 'troposfera') {
        nivelCamada = 'baixo'
    }

    let mapaAl = document.querySelectorAll('#mapa-'+ camada + ' > path')


    for (let municipio of mapaAl) {
        
        let conteudoMuninicipio = municipio.querySelector('title')


        let nomeMunMapa = conteudoMuninicipio.innerHTML

        if (nomeMunicipio == conteudoMuninicipio.innerHTML) {

            if (categoriaMunicipio == nivelCamada) {
                // console.log('é alto! ', categoriaMunicipio)
            } else {
                municipio.style.cursor = 'unset'
                // municipio.style.stroke = 'rgb(98 93 245 / 29%)'

                municipio.classList.add('desativado')
            }


        }

        

    }

    

}

// ativando botão de fechar pop-up
let botaoFecharPopUp = document.querySelector('#fechar-pop-up')
botaoFecharPopUp.addEventListener('click', sumirPopUp)

// ativando botão de fechar pop-up
let containterFundoPopUp = document.querySelector('.container-pop-up')
containterFundoPopUp.addEventListener('click', sumirPopUp)


// função de fazer o pop-up surgir na tela
function aparecerPopUp () {
    document.querySelector('div.pop-up').style.display = 'block'
    document.querySelector('.container-pop-up').style.display = 'block'
    aviao.style.display = 'none'
}

// função de fazer o pop-up fechar
function sumirPopUp () {
    document.querySelector('div.pop-up').style.display = 'none'
    document.querySelector('.container-pop-up').style.display = 'none'
    aviao.style.display = 'block'
}





let aviao = document.querySelector('.aviao');

// função para fazer o avião ficar transparente em um determinando ponto da página, logo quando aparecer o texto 'Novos voos'
function escutaRolagem () {

    let limite = window.pageYOffset + reportagem.getBoundingClientRect().y

    let posicao = window.pageYOffset + (window.innerHeight / 2 )

    if (posicao > limite) {
        console.log('esconder')
        aviao.style.opacity = 0.2

    } else {
        console.log('mostra')
        aviao.style.opacity = 1
    }
   
}

window.addEventListener('scroll', escutaRolagem);


// função que identifica o sentido do scroll e muda a posição do avião
function detectandoRolagem(){
    var ultimaRolagem = 0;
  
    window.onscroll = function() {
        let currentScroll = document.documentElement.scrollTop || document.body.scrollTop; // Get Current Scroll Value
  
        if (currentScroll > 0 && ultimaRolagem <= currentScroll){
            ultimaRolagem = currentScroll;
            // console.log('scroll DOWN')

            aviao.style.transform = 'translate(-50%, 0) rotate(0deg)'

        } else {
            ultimaRolagem = currentScroll;
            // console.log('scroll UP')

            aviao.style.transform = 'translate(-50%, 0) rotate(180deg)'

        }
    };
}

detectandoRolagem();


// cherando variáveis com os dados do Brasil
meisRegistrados = [56, 67, 87, 119]


// criando gráfico inicial fake
graficoChartJs('Maceió', meisRegistrados)

// função para resetar gráfico (necessário no Chart.js)
function recriandoGrafico () {
    // apagando e recriando o elemento 'canvas' para resetar os dados do gráfico
    let chartElement = document.getElementById("chart");    
    chartElement.remove();
  
    let canvaElement = document.createElement('canvas');
  
    canvaElement.setAttribute("id", "chart");
    canvaElement.setAttribute("class", "grafico_chart_js");
    canvaElement.setAttribute("width", 300);
    canvaElement.setAttribute("height", 320)
    
    document.querySelector(".grafico").appendChild(canvaElement);  
}

// função para criar gráfico com o Chart.js
function graficoChartJs(nomeMunicipio, meisRegistrados) {

    // chamando a função de apagar e recriar elemento 'canvas'
    recriandoGrafico()    

    let grafico = new Chart('chart', {
        type: "line",
        data: {
        // valores do eixo X
        
        labels: ['2018', '2019', '2020', '2021'],        
        datasets: [
            {
            // valores do eixo Y
            data: meisRegistrados,
            borderColor: '#8dbef3',
            fontColor: '#fff',
            // fill: true,
            label: 'MEIs registrados em ' +  nomeMunicipio
        }
        ]},
        options: {
            // deixando gráfico responsivo
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            },

            layout: {
                padding: 30
            },
        
            legend: {
                labels: {
                   fontColor: 'white'
                }
             },

            interaction: {
                intersect: false,
                mode: 'index',
            },

            plugins: {
                legend: {
                    labels: {font: {size: 12,}},
                    fontColor: "white",                     
                },          
            },
            scales: {
                
                y: {
                    display: true // Hide Y axis labels
                },
                x: {
                    display: true // Hide X axis labels
                }
            }       

        }
    });   

    return grafico;
        
}