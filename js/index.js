let body = document.querySelector("body")
let main = document.querySelector(".principal")
let carrinho = document.querySelector(".interior-carrinho")
let carrinhoVazio = document.querySelector(".vazio")
let calculoTotal = document.querySelector(".total")
let quantidadeItens = document.querySelector(".quantidade-itens")
let precoTotal = document.querySelector(".preco-compra")
let todos = document.querySelector(".todos")
let acessorios = document.querySelector(".acessorio")
let calcados = document.querySelector(".calcados")
let camisetas = document.querySelector(".camisetas")
let semProdutos = document.querySelector(".sem-produtos")
let inputText = document.querySelector(".input-text")
let buttonPesquisar = document.querySelector(".pesquisar")
let darkMode = document.querySelector(".mode")
let imgButtonMode = document.querySelector(".img-button")
let listaCards = document.createElement("ul")

main.insertAdjacentElement("afterbegin", listaCards)

function listarCard(data) {
    listaCards.classList.add("principal-cards")
    listaCards.appendChild(semProdutos)
    data.forEach((element, index) => {
        listaCards.insertAdjacentHTML("beforeend", `<li class="card">
        <figure class="card-imagem">
            <img src="${element.img}" alt="${element.nameItem}">
        </figure>
        <div class="card-produto">
            <div class="categoria">
                <p>${element.tag}</p>
            </div>
            <h2>${element.nameItem}</h2>
            <p class="card-descricao">${element.description}</p>
            <strong class="card-preco">R$ ${element.value},00</strong>
            <button id="${index}" class="adicionar-carrinho">${element.addCart}</button>
        </div>
    </li>`)
    });

}
listarCard(data)

let buttonCarrinho = document.querySelectorAll(".adicionar-carrinho")

function listarCarrinho(lista, dados, botao) {
    botao.forEach((element, index) => {
        element.addEventListener("click", () => {
            lista.push(dados[index])
        })
    })
    return lista
}

listarCarrinho(listaCarrinho, data, buttonCarrinho)

function templateCarrinho(listCar) {
    listCar.forEach((element, index) => {
        carrinho.insertAdjacentHTML("beforeend",
            `<div class="item">
    <figure>
        <img class="img-carrinho" src="${element.img}" alt="">
    </figure>
    <div class="descricao-item-carrinho">
        <p>${element.nameItem}</p>
        <strong>R$ ${element.value}.00</strong>
        <button id="${index}" class="remover">Remover produto</button>
    </div>
    </div>`)
    })
    removeItem(listaCarrinho)
}

function adicionarCarrinho(botao) {
    botao.forEach((element) => {
        element.addEventListener("click", () => {
            carrinho.innerHTML = ""
            templateCarrinho(listaCarrinho)
            templateTotalCompra(listaCarrinho)
            carrinhoVazio.classList.add("hidden")
            calculoTotal.classList.remove("hidden")
        })
    })
}

adicionarCarrinho(buttonCarrinho)

function precoCompra(listItens) {
    let soma = 0
    listItens.forEach((element) => {
        soma += element.value
    })
    return soma
}

function templateTotalCompra(listCarrinho) {
    quantidadeItens.innerText = `${listCarrinho.length}`
    precoTotal.innerText = `R$ ${precoCompra(listCarrinho)},00`
}


function removeItem(list) {
    let buttonRemove = document.querySelectorAll(".remover")
    buttonRemove.forEach((element, index) => {
        element.addEventListener("click", (e) => {
            carrinho.innerHTML = ""
            list.splice(index, 1)
            templateCarrinho(list)
            templateTotalCompra(list)
            if (list.length === 0) {
                carrinho.insertAdjacentHTML("beforeend", `<div class="vazio">
                <h3>Carrinho Vazio</h3>
                <p class="adicione-itens">Adicione itens</p>
            </div>`)
                calculoTotal.classList.add("hidden")
            }
        })
    })
}

function filtrarSecoes(click) {
    let dados = data.filter(element => element.tag[0] === click.innerText)
    dados.length == 0 ? semProdutos.classList.remove("hidden") : semProdutos.classList.add("hidden")
    listaCards.innerHTML = ""
    listarCard(dados)
    let buttonCarrinho = document.querySelectorAll(".adicionar-carrinho")
    listarCarrinho(listaCarrinho, dados, buttonCarrinho)
    adicionarCarrinho(buttonCarrinho)

}

function filtrarTodos() {
    data.length == 0 ? semProdutos.classList.remove("hidden") : semProdutos.classList.add("hidden")
    listaCards.innerHTML = ""
    listarCard(data)
    let buttonCarrinho = document.querySelectorAll(".adicionar-carrinho")
    listarCarrinho(listaCarrinho, data, buttonCarrinho)
    adicionarCarrinho(buttonCarrinho)


}

acessorios.addEventListener("click", () => {
    filtrarSecoes(acessorios)
})
calcados.addEventListener("click", () => {
    filtrarSecoes(calcados)
})
camisetas.addEventListener("click", () => {
    filtrarSecoes(camisetas)
})
todos.addEventListener("click", () => {
    filtrarTodos()
})

function buscarItem() {
    const textValue = inputText.value
    let item = data.filter(element => element.nameItem.toLocaleLowerCase() == textValue.toLocaleLowerCase())
    listaCards.innerHTML = ""
    listarCard(item)
    let buttonCarrinho = document.querySelectorAll(".adicionar-carrinho")
    listarCarrinho(listaCarrinho, item, buttonCarrinho)
    adicionarCarrinho(buttonCarrinho)
}

buttonPesquisar.addEventListener("click", buscarItem)

darkMode.addEventListener("click", () => {
    body.classList.toggle("dark-mode")
    body.classList.contains("dark-mode") ? imgButtonMode.src = "./img/sun.png" : imgButtonMode.src = "./img/lua-crescente.png"
})
























