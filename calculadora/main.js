

// criar array

let todosProdutosVendidos = []

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

        let produtoVendido = { 
            'quantidade': quantidadeProduto,
            'produto': nomeProduto,
            'Total': precoFinalProduto
        }
    
        todosProdutosVendidos.push(produtoVendido)
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

