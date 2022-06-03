

// criando objeto vazio para adicionar os produtos "comprados"
let todosProdutosVendidos = {}

// função para formatar número no formato de moeda brasileira
function formatMoney(number) {
    return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}  

// total da fortuna inicial
let fortunaElonMusk = 1021000000000

// total de gastos inicial
let totalGasto = 0



// função que atualiza a variável fortunaElonMusk e atualiza a informação na página
function calculandoFortuna (precoProduto, tipo) {

    if (tipo == "compra") {
        fortunaElonMusk = fortunaElonMusk - precoProduto  
             
        
    } else if (tipo == "venda") {
        fortunaElonMusk = fortunaElonMusk + precoProduto
        
    }
    
    let fortuna = document.querySelector('section.resultado p.fortuna')

    let fortunaCalculada = formatMoney(fortunaElonMusk)
    fortuna.innerHTML = fortunaCalculada
        
}

// função que atualiza texto com informações do % e total gasto
function atualizarGastos () {
    
    let percentualGasto = (totalGasto * 100) / 1021000000000

    // arredondado valor final para 5 casas decimais
    percentualGasto = percentualGasto.toFixed(5)
    document.querySelector('div.gasto-total .percentual').innerHTML = percentualGasto        

    let valorTotalGasto = formatMoney(totalGasto)    
    document.querySelector('div.gasto-total .valor-total').innerHTML = valorTotalGasto

    // chamando função para mostrar botão de mostrar nota fiscal (pop-up)
    mostrarBotaoNotafiscal()

}
    

// percorrendo cada produto da página
document.querySelectorAll('.container-produto').forEach(produto => {

    // nome do produto
    let nomeProduto = produto.querySelector('h2')
    nomeProduto = nomeProduto.innerHTML

    //  cria variável do preço do produto 
    let precoProduto = produto.querySelector('input')
    precoProduto = parseFloat(precoProduto.value)

    
    //  cria variável da quantidade do produto
    let quantidadeProduto = 0
 
    // preço total do produto
    let precoFinalProduto = 0
   

    // tag de mostrar quantidade de produtos
    let mostradorQuantProd = produto.querySelector('div output')

    //  botão de comprar acionado
    let btnCompra = produto.querySelector('div button.compra')
    
    // ao clicar no botão de comprar chama a função "comprarProduto()"
    btnCompra.addEventListener('click', comprarProduto)

    function comprarProduto () {        

        // adicionar mais um produto na quantidade
        quantidadeProduto += 1    

        // calcula o preço atual dos produtos "comprados"
        precoFinalProduto = precoProduto * quantidadeProduto

        // atualiza na página o quantitativo de vezes que um produto foi "comprado"
        mostradorQuantProd.textContent = quantidadeProduto

        // soma na variável global "totalGasto" 
        totalGasto = totalGasto + precoProduto

        // chamando fução de calculandoFortuna()
        calculandoFortuna(precoProduto, "compra")

        // verificando se o produto possui apenas uma unidade disponível, como o caso do Twitter e do Cruzeiro
        if (produto.classList.contains('unico') && quantidadeProduto == 1) {
            // desabilita o botão e muda a cor
            btnCompra.disabled = true   
            btnCompra.style.backgroundColor = '#d3d3d3'
    
        } 

        // chama função de atualizarGastos() para atualizar infos na página
        atualizarGastos()

        // adiciona um novo objeto (caso não tenha) e atualiza os registros já "comprados"
        todosProdutosVendidos[nomeProduto] = { 
            'quantidade': quantidadeProduto,
            'produto': nomeProduto,
            'total': precoFinalProduto
        }

        // chama a função que lista produtos na "nota fiscal"
        listaProdutos()
    
        // todosProdutosVendidos.push(produtoVendido)
        // console.log(todosProdutosVendidos)

    }


    //  botão de vender acionado
    let btnVenda = produto.querySelector('div button.venda')

    btnVenda.addEventListener('click', venderProduto)

    function venderProduto () {
        

        if (quantidadeProduto > 0) {
            quantidadeProduto -= 1    
            precoFinalProduto = precoProduto * quantidadeProduto
            mostradorQuantProd.textContent = quantidadeProduto

            totalGasto = totalGasto - precoProduto

            calculandoFortuna(precoProduto, "venda")

            // caso o produto seja diferente de 1 o botão é reativado e a cor fica verde novamente
            if (produto.classList.contains('unico') &&  quantidadeProduto != 1) {
                btnCompra.disabled = false   
                btnCompra.style.backgroundColor = '#1FAA6F'
            }
            
        } 

        // adiciona um novo objeto (caso não tenha) e atualiza os registros já "comprados"
        todosProdutosVendidos[nomeProduto] = { 
            'quantidade': quantidadeProduto,
            'produto': nomeProduto,
            'total': precoFinalProduto
        }

        // chama função de atualizarGastos() para atualizar infos na página
        atualizarGastos()

        // chama a função que lista produtos na "nota fiscal"
        listaProdutos()

    }
})


function listaProdutos () {
    let containerProdutos = document.querySelector('.container-lista')
    containerProdutos.innerHTML = ''
    let nomesProdutos = Object.keys(todosProdutosVendidos) 
    // console.log(nomesProdutos)

    nomesProdutos.forEach ( produto => {

        // acrescenta um item na lista da "nota fiscal" se o produto foi comprado pelo menos uma vez, ou seja, a quantidade é maior que 0
        if (todosProdutosVendidos[produto].quantidade > 0) {

            console.log('Maior que zero: ' + produto);

            // criando divs e ps para listar dados no html

            let item = document.createElement('div')
            item.classList.add('item')

            let p1 = document.createElement('p')
            p1.innerText = todosProdutosVendidos[produto].quantidade + 'x'

            let p2 = document.createElement('p')
            p2.innerText = todosProdutosVendidos[produto].produto

            let p3 = document.createElement('p')
            p3.innerText = formatMoney(todosProdutosVendidos[produto].total)

            // pendurando tags de parágrafo ao div pai
            item.appendChild(p1)
            item.appendChild(p2)
            item.appendChild(p3)

            // pendurando div em container pai
            containerProdutos.appendChild(item)
        }        
        
    })
}


let btnFechar = document.querySelector('button.fechar')

btnFechar.addEventListener('click', e => {

    // ocultando pop-up da nota fiscal

    

    document.querySelector("section.nota-fiscal").style.display = "none"

    document.querySelector("section.produtos").style.display = "flex"

    document.querySelector("section.resultado").style.display = "block"

    
})


let btnVerNotaFiscal = document.querySelector('button.nota')

function mostrarBotaoNotafiscal () {
    if (totalGasto > 0 ) {
        btnVerNotaFiscal.style.display = "flex"
    } else {
        btnVerNotaFiscal.style.display = "none"
    }

}

btnVerNotaFiscal.addEventListener('click', e => {

    // deixar o scroll no topo da página quando o botão do pop-up for clicado
    document.documentElement.scrollTop = 0

    

    // ocultando pop-up da nota fiscal
    document.querySelector("section.nota-fiscal").style.display = "block"

    document.querySelector("section.produtos").style.display = "none"

    document.querySelector("section.resultado").style.display = "none"

    
})


window.addEventListener('resize', ajustandoBotaoNota);

ajustandoBotaoNota()

// criando função que ajusta o texto dentro do botão a depender da dimensão da tela
function ajustandoBotaoNota() {

    let botaoNota = document.querySelector("button.nota")

    if (window.innerWidth < 1040) {        

        botaoNota.innerHTML = '<img src="imagens/nota-fiscal.png" alt="">'

    } else {

        botaoNota.innerHTML = `<img src="imagens/nota-fiscal.png" alt="">
        Nota fiscal`

    }
}
