
// lendo arquivo csv (teste aleatório)
d3.csv("/path/to/file.csv").then((data) => {
    console.log(data);
  });

// criar array

// let todosProdutosVendidos = []

// console.log(todosProdutosVendidos)


function formatMoney(number) {
    return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }  


let fortunaElonMusk = 1021000000000

let totalGasto = 0


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



document.querySelectorAll('.container-produto').forEach(produto => {
    // console.log(produto)

    // nome do produto
    let nomeProduto = produto.querySelector('h2')
    nomeProduto = nomeProduto.innerHTML

    //  cria variavel do preço do produto 
    let precoProduto = produto.querySelector('input')
    precoProduto = parseInt(precoProduto.value)
    // console.log(precoProduto)    
    
    //  cria variavel da quantidade do produto
    let quantidadeProduto = 0
    // console.log(quantidadeProduto)

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

        // console.log(precoFinalProduto)
        // console.log('Total: ' + totalGasto)

        calculandoFortuna(precoProduto, "compra")

        // let produtoVendido = { 
        //     'quantidade': quantidadeProduto,
        //     'produto': nomeProduto,
        //     'Total': precoFinalProduto
        // }
    
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

            // console.log(precoFinalProduto)
            // console.log('Total: ' + totalGasto)

            calculandoFortuna(precoProduto, "venda")

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

