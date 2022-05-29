function exibirCards(produtos) {
    const containerProdutos = document.querySelector(".principal-cards")
    containerProdutos.innerHTML = ""
    const semProdutos = document.querySelector(".sem-produtos")
    produtos.length === 0 ? (
        semProdutos.classList.remove("hidden"),
        semProdutos.innerText = "Não há produtos nessa secão :("
    ) : (
        semProdutos.classList.add("hidden")
    )
    produtos.forEach(element => {
        const cardProduto = criarCardProduto(element)
        containerProdutos.append(cardProduto)
    })
}

function criarCardProduto(produtos) {
    const imagemProduto = document.createElement("img")
    imagemProduto.src = produtos.img

    const containerImagemProduto = document.createElement("figure")
    containerImagemProduto.classList.add("card-imagem")

    const containerDescricaoProduto = document.createElement("div")
    containerDescricaoProduto.classList.add("card-produto")

    const containerCategoriaProduto = document.createElement("div")
    containerCategoriaProduto.classList.add("categoria")

    const categoriaProduto = document.createElement("p")
    categoriaProduto.innerText = produtos.tag

    const nomeProduto = document.createElement("h2")
    nomeProduto.innerText = produtos.nameItem

    const descricaoProduto = document.createElement("p")
    descricaoProduto.innerText = produtos.description
    descricaoProduto.classList.add("card-descricao")

    const precoProduto = document.createElement("strong")
    precoProduto.innerText = `R$${produtos.value.toFixed(2)}`
    precoProduto.classList.add("card-preco")

    const botaoCarrinho = document.createElement("button")
    botaoCarrinho.innerText = produtos.addCart
    botaoCarrinho.classList.add("adicionar-carrinho")

    const cardProduto = document.createElement("li")
    cardProduto.classList.add("card")

    containerImagemProduto.appendChild(imagemProduto)
    containerDescricaoProduto.append(containerCategoriaProduto, nomeProduto, descricaoProduto, precoProduto, botaoCarrinho)
    containerCategoriaProduto.appendChild(categoriaProduto)
    cardProduto.append(containerImagemProduto, containerDescricaoProduto)

    return cardProduto
}

function exibirProdutosCarrinho(produtos) {
    const listaItensCarrinho = document.querySelector(".list-items")
    listaItensCarrinho.innerHTML = ""
    const carrinhoVazio = document.querySelector(".vazio")
    const calculoTotal = document.querySelector(".total")
    produtos.length > 0 ? (
        carrinhoVazio.classList.add("hidden"),
        calculoTotal.classList.remove("hidden")
    ) : (carrinhoVazio.classList.remove("hidden"),
        calculoTotal.classList.add("hidden"))
    produtos.forEach(element => {
        const cardProdutoCarrinho = criarItemCarrinho(element)
        listaItensCarrinho.append(cardProdutoCarrinho)
    })
    removerItemCarrinho()
}

function criarItemCarrinho(produto) {
    const containerItemCarrinho = document.createElement("li")
    containerItemCarrinho.classList.add("item")

    const containerImagemProdutoCarrinho = document.createElement("figure")

    const imagemProdutoCarrinho = document.createElement("img")
    imagemProdutoCarrinho.src = produto.img
    imagemProdutoCarrinho.classList.add("img-carrinho")

    const containerDescricaoProdutoCarrinho = document.createElement("div")
    containerDescricaoProdutoCarrinho.classList.add("descricao-item-carrinho")

    const nomeProdutoCarrinho = document.createElement("p")
    nomeProdutoCarrinho.innerText = produto.nameItem

    const precoProdutoCarrinho = document.createElement("strong")
    precoProdutoCarrinho.innerText = `R$ ${produto.value}.00`

    const botaoRemoverCarrinho = document.createElement("button")
    botaoRemoverCarrinho.innerText = "Remover carrinho"
    botaoRemoverCarrinho.classList.add("remover")

    containerImagemProdutoCarrinho.append(imagemProdutoCarrinho)
    containerDescricaoProdutoCarrinho.append(nomeProdutoCarrinho, precoProdutoCarrinho, botaoRemoverCarrinho)
    containerItemCarrinho.append(containerImagemProdutoCarrinho, containerDescricaoProdutoCarrinho)

    return containerItemCarrinho
}

function calcularPrecoCompra(listItens) {
    let soma = 0
    listItens.forEach((element) => {
        soma += element.value
    })
    return soma
}

function exibirTotalCompra(listCarrinho) {
    const quantidadeItens = document.querySelector(".quantidade-itens")
    const precoTotal = document.querySelector(".preco-compra")
    quantidadeItens.innerText = `${listCarrinho.length}`
    precoTotal.innerText = `R$ ${calcularPrecoCompra(listCarrinho)},00`
}

function adicionarItemCarrinho(produtos) {
    const buttonCarrinho = document.querySelectorAll(".adicionar-carrinho")
    buttonCarrinho.forEach((element, index) => {
        element.addEventListener("click", () => {
            listaCarrinho.push(produtos[index])
            exibirProdutosCarrinho(listaCarrinho)
            exibirTotalCompra(listaCarrinho)
        })
    })
}

function removerItemCarrinho() {
    const buttonRemoverCarrinho = document.querySelectorAll(".remover")
    buttonRemoverCarrinho.forEach((element, index) => {
        element.addEventListener("click", () => {
            listaCarrinho.splice(index, 1)
            exibirProdutosCarrinho(listaCarrinho)
            exibirTotalCompra(listaCarrinho)
        })
    })
}

function filtrarSecoes(click) {
    const produtosFiltrados = data.filter(element => element.tag[0] === click.innerText)
    exibirCards(produtosFiltrados)
    adicionarItemCarrinho(produtosFiltrados)
}

function filtrarAcessorios() {
    const buttonAcessorios = document.querySelector(".acessorio")
    buttonAcessorios.addEventListener("click", () => {
        filtrarSecoes(buttonAcessorios)
    })
}

function filtrarCalcados() {
    const buttonCalcados = document.querySelector(".calcados")
    buttonCalcados.addEventListener("click", () => {
        filtrarSecoes(buttonCalcados)
    })
}
function filtrarCamisetas() {
    const buttonCamisetas = document.querySelector(".camisetas")
    buttonCamisetas.addEventListener("click", () => {
        filtrarSecoes(buttonCamisetas)
    })
}
function filtrarTodos() {
    const buttonTodos = document.querySelector(".todos")
    buttonTodos.addEventListener("click", () => {
        exibirCards(data)
    })
}

function removerAcentos(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

function filtrarPesquisa() {
    const userPesquisa = document.querySelector(".input-text")
    const itensPesquisa = data.filter(element => removerAcentos(element.description.toLocaleLowerCase()).includes(removerAcentos(userPesquisa.value.toLocaleLowerCase())) || removerAcentos(element.nameItem.toLocaleLowerCase()).includes(removerAcentos(userPesquisa.value.toLocaleLowerCase())))
    const semProdutos = document.querySelector(".sem-produtos")
    exibirCards(itensPesquisa)
    itensPesquisa.length === 0 ? semProdutos.innerText = "O item não foi encontrado :(" : false
    adicionarItemCarrinho(itensPesquisa)
}

function pesquisarItem() {
    const buttonPesquisar = document.querySelector(".pesquisar")
    buttonPesquisar.addEventListener("click", () => {
        filtrarPesquisa()
    })
}

function ativarDarkMode() {
    const body = document.querySelector("body")
    const darkMode = document.querySelector(".mode")
    const imgButtonMode = document.querySelector(".img-button")
    darkMode.addEventListener("click", () => {
        body.classList.toggle("dark-mode")
        body.classList.contains("dark-mode") ? imgButtonMode.src = "./img/sun.png" : imgButtonMode.src = "./img/lua-crescente.png"
    })
}

function montarEstruturaFuncional() {
    exibirCards(data)
    adicionarItemCarrinho(data)
    filtrarAcessorios()
    filtrarCalcados()
    filtrarCamisetas()
    filtrarTodos()
    pesquisarItem()
    ativarDarkMode()
}

montarEstruturaFuncional()



























