var arrayProdutos = []

$(document).ready(function(){

    puxaProdutos()
    montarCard()

    $(".card-produto").click(function(){
        window.location.href="produto.html"
    })

});

function puxaProdutos() {
    for(var key in localStorage) {
        if(localStorage.hasOwnProperty(key) && localStorage[key] == "produto") {
            arrayProdutos.push(key)
        }
    }
}

function montarCard() {
    for(i = 0; i < arrayProdutos.length; i++) {

        var produto = JSON.parse(arrayProdutos[i])
        var conteudo = ""
        
        conteudo += '<div class="card-produto">'
        conteudo +=     '<div class="card-produto-foto">'
        conteudo +=         '<img src="' + produto["foto"] + '" alt="racao-gato">'
        conteudo +=     '</div>'
        conteudo +=     '<div class="card-produto-nome">'
        conteudo +=         '<h3>' + produto["nome"] + '</h3>'
        conteudo +=     '</div>'
        conteudo +=     '<div class="card-produto-nota">'
        conteudo +=         '<p>' + produto["marca"] + '</p>'
        conteudo +=         '<img src="img/five-stars.png" alt="stars">'
        conteudo +=     '</div>'
        conteudo +=     '<div class="card-produto-preco">'
        conteudo +=         '<h3>' + produto["preco"] + '</h3>'
        conteudo +=     '</div>'
        conteudo += '</div>'

        $(".produtos-centro").append(conteudo)
    }
        
}
