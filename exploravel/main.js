
// seleciona todas as tags 'path', que representa cada estado no mapa SVG
let estadosBr = document.querySelectorAll('.mapa-br > path')

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
// graficoChartJs([1,2], [1,2])

function carregandoDadosJson (sigla) {
  fetch('caged_estados.json')
  .then(response => response.json())
  .then(data => {

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


