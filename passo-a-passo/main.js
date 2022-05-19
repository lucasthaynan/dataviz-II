// document.querySelector('button.iniciar').addEventListener('click', e => {
//     console.log('iniciar...')
//     document.querySelector('section.intro').style.display = 'none';
//     document.querySelector('section.questao').style.display = 'block';
// })

let etapaVisualizacao = 1

document.querySelector('button.proximo').addEventListener('click', e => {

    console.log(e)
    console.log(etapaVisualizacao)

    if (etapaVisualizacao == 1) {

        document.querySelectorAll('span.instagram > div').forEach(elementoDiv => {
            elementoDiv.style.opacity = 1;
        }) 

        document.querySelector('span.instagram').classList.add('ativo')         
        
    } else if (etapaVisualizacao == 2) {

        document.querySelectorAll('span.whatsapp > div').forEach(elementoDiv => {
            elementoDiv.style.opacity = 1;
        }) 

        document.querySelector('span.whatsapp').classList.add('ativo') 
    } else if (etapaVisualizacao == 3) {

        document.querySelectorAll('span.chrome > div').forEach(elementoDiv => {
            elementoDiv.style.opacity = 1;
        }) 

        document.querySelector('span.chrome').classList.add('ativo') 

    } else if (etapaVisualizacao == 4) {

        document.querySelectorAll('span.twitter > div').forEach(elementoDiv => {
            elementoDiv.style.opacity = 1;
        }) 

        document.querySelector('span.twitter').classList.add('ativo') 

    } else if (etapaVisualizacao == 5) {

        document.querySelectorAll('span.free-fire > div').forEach(elementoDiv => {
            elementoDiv.style.opacity = 1;
        }) 

        document.querySelector('span.free-fire').classList.add('ativo') 

    } else if (etapaVisualizacao == 6) {

        document.querySelectorAll('span.outros-apps > div').forEach(elementoDiv => {
            elementoDiv.style.opacity = 1
        }) 

        document.querySelector('span.outros-apps').classList.add('ativo') 
    }

    etapaVisualizacao += 1
    console.log(etapaVisualizacao)    
    
})