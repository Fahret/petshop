var produto;


function tratarReal(valor){

    return "R$ " + valor.toString().replace(".", ",")

}

function montarProduto(){

    produto = JSON.parse(sessionStorage["visualizarproduto"])
    $(".div-img img").prop("src", produto["foto"])
    $(".produto-nome").text(produto["nome"])
    $(".descricao-produto").html(produto["descricao"])
    $(".preco-produto").text(tratarReal(produto["precovenda"]))
    $(".codigo-produto").text("Cod: " + produto["codigo"])

}

function colocarCarrinho(){

    var produtoID = produto["produtoID"]

    var usuarioLogado = JSON.parse(sessionStorage["usuario-logado"])
    var userID = usuarioLogado["userID"]

    var usuarios = JSON.parse(localStorage["usuarios"])

    for(var i = 0; i < usuarios.length; i++){

        if(usuarios[i]["userID"] == userID && !(usuarios[i]["produtosAdicionados"].includes(produtoID))){

            usuarios[i]["produtosAdicionados"].push(produtoID)

            var usuarioLogadoJSON = JSON.stringify(usuarios[i])
            var usuariosJSON = JSON.stringify(usuarios)

            sessionStorage.setItem("usuario-logado", usuarioLogadoJSON)
            localStorage.setItem("usuarios", usuariosJSON)
            break

        }

    }




}

$(document).ready(function(){
    
    montarProduto()

    $(".colocar-carrinho").click(function(){
        colocarCarrinho()
        window.location.href = "carrinho.html"
    })

})