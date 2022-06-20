
// seleciona todas as tags 'path', que representa cada estado no mapa SVG
let estadosBr = document.querySelectorAll('.mapa-br > path')

// cherando variáveis com os dados do Brasil
admissoesBr = [1507496,1612525,1460083,658270,758648,956142,1166998,1312961,1462000,1630076,1613644,1297874,1622976,1766561,1658049,1395180,1560071,1610611,1666855,1816305,1780138]

desligamentosBr = [1389604,1386756,1736281,1621918,1132530,986702,1029950,1070349,1142803,1237840,1215572,1409853,1361712,1368856,1482368,1279116,1284355,1308278,1364364,1448140,1466162],

// criando gráfico do Brasil
graficoChartJs(admissoesBr, desligamentosBr)


// percorrendo a lista de estados 
for (let estado of estadosBr) {
    // console.log(estado.id)
    let siglaEstado = estado.id

    // NÃO DEU CERTO - tentativa de criar um rótulo do mapa com a sigla do estado
    let rotuloEstado = document.createElement('text')
    rotuloEstado.textContent = siglaEstado
    estado.append(rotuloEstado)

    // quando algum estado é clicado aciona a função abaixo
    estado.addEventListener('click', e => {  
      
      // removendo a classe 'ativo' de todos os estados
      estadosBr.forEach(estado => {
        estado.classList.remove('ativo')
      })

      // adicionando a classe 'ativo' no estado clicado
      estado.classList.add('ativo')
      
      
      let sigla = estado.id.split('-')
      console.log(sigla[1])

      // chamando a função de carregar os dados e passando o parâmetro 'sigla' do  estado
      carregandoDadosJson(sigla)

      // criando uma variável com o nome do estado
      let nomeEstado = estado.getAttribute("title")

      // função que mudo o nome do local (estado) na página
      mudandoNomeLocal(nomeEstado)

      // pegando dado do atributo "title" do SVG
      console.log(estado.getAttribute("title"))
  })
}

// funcao para carregar dados do Json
function carregandoDadosJson (sigla) {
  fetch('caged_estados.json')
  .then(response => response.json())
  .then(data => {

    // script para ler o json no formato atual, mais detalhes em: https://stackoverflow.com/questions/72654010/how-to-properly-adjust-json-file-format-in-javascript/72654083#72654083
      const format = (arr) => {
        const result = {};
        arr.forEach((val) => {
          const { sigla_uf, ...rest } = val;
          const keys = Object.keys(rest);
          let res = {};
          if (result[sigla_uf]) {
            res = result[sigla_uf];
          }
          keys.forEach((key) => {
            if (!res[key]) {
              res[key] = [rest[key]];
            } else {
              res[key] = res[key].concat(rest[key]);
            }
          });
          result[sigla_uf] = {
            ...res,
          };
        });
        return result;
      };
      let res = format(data);
      


      let arrayAdmissoes = res[sigla[1]].admitidos
      console.log(arrayAdmissoes)

      let arrayDesligamentos = res[sigla[1]].desligados
      console.log(arrayDesligamentos)

      graficoChartJs(arrayAdmissoes, arrayDesligamentos)


  } 
)
}


function mudandoNomeLocal (nomeEstado) {
  let nome = document.querySelector('p.nome-local')
  console.log(nome)

  nome.textContent = nomeEstado
  console.log(nomeEstado)
}


function recriandoGrafico () {
  // apagando e recriando o elemento 'canvas' para resetar os dados do gráfico
  let chartElement = document.getElementById("chart");    
  chartElement.remove();

  let canvaElement = document.createElement('canvas');

  canvaElement.setAttribute("id", "chart");
  canvaElement.setAttribute("class", "grafico_chart_js");
  canvaElement.setAttribute("width", 400);
  canvaElement.setAttribute("height", 300)
  
  document.querySelector(".grafico").appendChild(canvaElement);  
}

function graficoChartJs(arrayAdmissoes, arrayDesligamentos) {

  // chamando a função de apagar e recriar elemento 'canvas'
  recriandoGrafico()    

  let grafico = new Chart('chart', {
    type: "line",
    data: {
      // valores do eixo X
      
      labels: ['01-2020', '02-2020', '03-2020', '04-2020', '05-2020', '06-2020', '07-2020', '08-2020', '09-2020', '10-2020', '11-2020', '12-2020', '01-2021', '02-2021', '03-2021', '04-2021', '05-2021', '06-2021', '07-2021', '08-2021', '09-2021'],        
      datasets: [
        {
        // valores do eixo Y
        data: arrayAdmissoes,
        borderColor: '#1AA430',
        // fill: true,
        label: 'Admissões'
      }, {
        // valores do eixo Y
        data: arrayDesligamentos,
        borderColor: '#C32525',
        // fill: true,
        label: 'Desligamentos'
      }   
    ]},
    options: {
      legend: {
        display: false
      },

      interaction: {
          intersect: false,
          mode: 'index',
      },

      plugins: {
        legend: {
            labels: {font: {size: 12,}}
        },          
      },
      scales: {
        y: {
            display: false // Hide Y axis labels
        },
        x: {
            display: true // Hide X axis labels
        }
      }       

    }
  });   

  return grafico;
    
  }


