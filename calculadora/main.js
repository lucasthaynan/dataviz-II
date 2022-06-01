

// criar array

let todosProdutosVendidos = {}

// console.log(todosProdutosVendidos)


function formatMoney(number) {
    return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }  


let fortunaElonMusk = 1021000000000

let totalGasto = 0

// function percentual () {

// }



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

}
    



document.querySelectorAll('.container-produto').forEach(produto => {

    // nome do produto
    let nomeProduto = produto.querySelector('h2')
    nomeProduto = nomeProduto.innerHTML

    //  cria variavel do preço do produto 
    let precoProduto = produto.querySelector('input')
    precoProduto = parseFloat(precoProduto.value)

    
    //  cria variavel da quantidade do produto
    let quantidadeProduto = 0
 
    // preço total do produtos
    let precoFinalProduto = 0
   

    // tag de mostrar quantidade de produtos
    let mostradorQuantProd = produto.querySelector('div output')

    //  botão de comprar acionado
    let btnCompra = produto.querySelector('div button.compra')

    btnCompra.addEventListener('click', comprarProduto)

    function comprarProduto () {        

        quantidadeProduto += 1    
        precoFinalProduto = precoProduto * quantidadeProduto
        mostradorQuantProd.textContent = quantidadeProduto

        totalGasto = totalGasto + precoProduto


        calculandoFortuna(precoProduto, "compra")

        // verificando se o produto possui apenas uma unidade disponível, como o caso do Twitter e do Cruzeiro
        if (produto.classList.contains('unico') && quantidadeProduto == 1) {
            // desabilita o botão e muda a cor
            btnCompra.disabled = true   
            btnCompra.style.backgroundColor = '#d3d3d3'
    
        } 

        atualizarGastos()


        todosProdutosVendidos[nomeProduto] = { 
            'quantidade': quantidadeProduto,
            'produto': nomeProduto,
            'total': precoFinalProduto
        }

        listaProdutos()
    
        // todosProdutosVendidos.push(produtoVendido)
        console.log(todosProdutosVendidos)

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

            atualizarGastos()

            // let produtoVendido = { 
            //     'quantidade': quantidadeProduto,
            //     'produto': nomeProduto,
            //     'Total': precoFinalProduto
            // }
        
            // todosProdutosVendidos.push(produtoVendido)
            // console.log(todosProdutosVendidos)
        } 

    }

})

function listaProdutos () {
    let containerProdutos = document.querySelector('.container-lista')
    containerProdutos.innerHTML = ''
    let nomesProdutos = Object.keys(todosProdutosVendidos) 
    console.log(nomesProdutos)

    nomesProdutos.forEach ( produto => {
        let item = document.createElement('div')
        item.classList.add('item')
        let p1 = document.createElement('p')
        p1.innerText = todosProdutosVendidos[produto].quantidade + 'X'

        let p2 = document.createElement('p')
        p2.innerText = todosProdutosVendidos[produto].produto

        let p3 = document.createElement('p')
        p3.innerText = formatMoney(todosProdutosVendidos[produto].total)

        item.appendChild(p1)
        item.appendChild(p2)
        item.appendChild(p3)

        containerProdutos.appendChild(item)
    })


}

