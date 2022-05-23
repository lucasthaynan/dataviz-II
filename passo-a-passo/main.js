// variável que define a etapa atual da visualização
let etapaVisualizacao = 1

// ao clicar na seta (botão) avança para a próxima etapa
document.querySelector('button.proximo').addEventListener('click', e => {

    // remove a classe "ativo" de todas os divs de texto
    let textos = document.querySelectorAll('div.texto > div')

    textos.forEach(texto => {
        texto.classList.remove('ativo')
        });

    // verifica em que etapa está
    if (etapaVisualizacao == 1) {

        // deixa os elementos de blocos visíveis
        document.querySelectorAll('span.instagram > div').forEach(elementoDiv => {
            elementoDiv.style.opacity = 1;
        }) 

        // adiciona a classe "ativo" nos blocos e no texto
        document.querySelector('span.instagram').classList.add('ativo')      
        
        document.querySelector('.texto-instagram').classList.add('ativo')
        
    } else if (etapaVisualizacao == 2) {

        document.querySelectorAll('span.whatsapp > div').forEach(elementoDiv => {
            elementoDiv.style.opacity = 1;
        }) 

        document.querySelector('span.whatsapp').classList.add('ativo') 
        document.querySelector('.texto-whatsapp').classList.add('ativo')

    } else if (etapaVisualizacao == 3) {

        document.querySelectorAll('span.chrome > div').forEach(elementoDiv => {
            elementoDiv.style.opacity = 1;
        }) 

        document.querySelector('span.chrome').classList.add('ativo') 

        document.querySelector('.texto-chrome').classList.add('ativo')

    } else if (etapaVisualizacao == 4) {

        document.querySelectorAll('span.twitter > div').forEach(elementoDiv => {
            elementoDiv.style.opacity = 1;
        }) 

        document.querySelector('span.twitter').classList.add('ativo') 

        document.querySelector('.texto-twitter').classList.add('ativo')

    } else if (etapaVisualizacao == 5) {

        document.querySelectorAll('span.free-fire > div').forEach(elementoDiv => {
            elementoDiv.style.opacity = 1;
        }) 

        document.querySelector('span.free-fire').classList.add('ativo') 

        document.querySelector('.texto-free-fire').classList.add('ativo')

    } else if (etapaVisualizacao == 6) {

        document.querySelectorAll('span.outros-apps > div').forEach(elementoDiv => {
            elementoDiv.style.opacity = 1
        }) 

        document.querySelector('span.outros-apps').classList.add('ativo') 
        document.querySelector('.texto-outros-apps').classList.add('ativo')
    }

    // soma + 1 na variável da etapa atual
    etapaVisualizacao += 1

    
})