import  '../node_modules/ramda/dist/ramda.js'

const links = document.querySelectorAll('.header-menu a')

const href = R.prop('href')
const hrefLocation = href(location)
const includeHrefInLocation = R.compose(R.includes(R.__, hrefLocation), href)
const addclassListAtivo = node => node.classList.add('ativo')

const ativarLinks = R.forEach(
    R.ifElse(
        includeHrefInLocation,
        addclassListAtivo,
        R.always
    ))

ativarLinks(links)

// Ativar items do orçamento

const parametros = new URLSearchParams(location.search)

const ativarProduto = elemento =>  elemento ? elemento.checked = true : elemento.checked = false

const getElement = id => document.getElementById(id)

const ativarProdutos = R.forEach(R.compose(ativarProduto, getElement))

ativarProdutos(parametros)

// Exibir perguntas

const perguntas = document.querySelectorAll('.perguntas button')

const ativaPergunta = event => {
    const pergunta = event.target
    const controls = pergunta.getAttribute('aria-controls')
    const resposta = document.getElementById(controls)

    resposta.classList.toggle('ativa')

    const contemAtiva = resposta.classList.contains('ativa')

    pergunta.setAttribute('aria-expanded', contemAtiva)
}

const eventosPerguntas = pergunta =>  pergunta.addEventListener('click', ativaPergunta)
perguntas.forEach(eventosPerguntas)

// galeria de imagens

const imagens = document.querySelectorAll('.bicicleta-imagens img')
const container = document.querySelector('.bicicleta-imagens')


const trocaImagem = e => {
    const img = e.currentTarget
    const media = matchMedia("(min-width: 1000px)").matches
    if (media) container.prepend(img)
}

imagens.forEach(img => {
    img.addEventListener('click', trocaImagem)
})

// animação

if(window.SimpleAnime) {
    new SimpleAnime()
}