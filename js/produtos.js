var produtos = []

$(document).ready(function(){

    puxaProdutos()
    montarCard()

    $(".card-produto").click(function(){

        var id = $(this).index()
        var produto = JSON.stringify(produtos[id])
        sessionStorage.setItem("visualizarproduto", produto)
        window.location.href = "produto.html"

    })

});

function puxaProdutos() {
    produtos = JSON.parse(localStorage["produtos"])
}

function tratarReal(valor){

    return "R$ " + valor.toString().replace(".", ",")

}

function montarCard() {
    for(i = 0; i < produtos.length; i++) {

        var produto = produtos[i]
        var conteudo = ""
        
        conteudo += '<div class="card-produto">'
        conteudo +=     '<div class="card-produto-foto">'
        conteudo +=         '<img src="' + produto["foto"] + '">'
        conteudo +=     '</div>'
        conteudo +=     '<div class="card-produto-nome">'
        conteudo +=         '<h3>' + produto["nome"] + '</h3>'
        conteudo +=     '</div>'
        conteudo +=     '<div class="card-produto-nota">'
        conteudo +=         '<p>' + produto["marca"] + '</p>'
        conteudo +=         '<img src="img/five-stars.png">'
        conteudo +=     '</div>'
        conteudo +=     '<div class="card-produto-preco">'
        conteudo +=         '<h3>' + tratarReal(produto["precovenda"]) + '</h3>'
        conteudo +=     '</div>'
        conteudo += '</div>'

        $(".produtos-centro").append(conteudo)
    }
        
}
