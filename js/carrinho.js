var relacaoCardID = [];
function carregarCarrinho(){

    var usuario = JSON.parse(sessionStorage["usuario-logado"])
    var produtosCarrinho = usuario["produtosAdicionados"]

    var listaProdutos = JSON.parse(localStorage["produtos"])

    var cardIndex = 0

    $(".lista-produtos-carrinho").html("")
    for(var i = 0; i < listaProdutos.length; i++){

        if(produtosCarrinho.includes(listaProdutos[i]["produtoID"])){

            var precoTratado = parseFloat(listaProdutos[i]["precovenda"]).toFixed(2).toString().replace(".", ",")

            var conteudo = ""
            conteudo += '<div class="div-produto-carrinho">'
            conteudo +=    '<div class="imagem-produto-carrinho">'
            conteudo +=           '<img src="' + listaProdutos[i]["foto"] + '">'
            conteudo +=    '</div>'
    
            conteudo +=    '<div class="informacoes-produto-carrinho">'
            conteudo +=         '<p>' + listaProdutos[i]["nome"] + '</p>'
            conteudo +=         '<br>'
            conteudo +=         '<p>R$ ' + precoTratado + '</p>'
            conteudo +=    '</div>'

            conteudo +=    '<div class="icones-final-produto">'
            conteudo +=        '<i class="far fa-trash-alt remover-produto-carrinho"></i>'
            conteudo +=        '<div class="alterar-quantidade">'
            conteudo +=           '<button class="botao botao-menos"> <i class="fas fa-minus"></i></button>'
            conteudo +=           '<input class="quantidade" type="text" value="1">'
            conteudo +=           '<button class="botao botao-mais"><i class="fas fa-plus"></i></button>'
            conteudo +=        '</div>'
            conteudo +=    '</div>'

            conteudo += '</div>'

            $(".lista-produtos-carrinho").append(conteudo)

            relacaoCardID.push([cardIndex, listaProdutos[i]["produtoID"]])
            cardIndex++
         
        }

    }

}

function removerProdutoCarrinho(botaoDeletar){

    var usuarioLogado = JSON.parse(sessionStorage["usuario-logado"])
    var usuarios = JSON.parse(localStorage["usuarios"])

    for(var i = 0; i < relacaoCardID.length; i++){
        if($(botaoDeletar).parents(".div-produto-carrinho").index() == relacaoCardID[i][0]){
            usuarios.splice(usuarioLogado, 1)
            var indexDeletado = usuarioLogado["produtosAdicionados"].indexOf(relacaoCardID[i][1])
            usuarioLogado["produtosAdicionados"].splice(indexDeletado, 1)
            usuarios.push(usuarioLogado)
            var usuarioLogadoJSON = JSON.stringify(usuarioLogado)
            var usuariosJSON = JSON.stringify(usuarios)
            sessionStorage.setItem("usuario-logado", usuarioLogadoJSON)
            localStorage.setItem("usuarios", usuariosJSON)
            $(botaoDeletar).parents(".div-produto-carrinho").remove()
            relacaoCardID.splice(i, 1)
            return
        
        }
    }

}

function puxarInformacoes(){

    var listaProdutos = JSON.parse(localStorage["produtos"])
    var somaTotal = 0;
    var desconto = 1.5;
    var frete = -1;
    var freteACaucular = true

    for(var i = 0; i < relacaoCardID.length; i++){

        var indexProduto = relacaoCardID[i][1]
        var precoVenda = parseFloat(listaProdutos[indexProduto]["precovenda"])
        var quantidade = parseFloat($(".quantidade").eq(i).val())
        somaTotal += quantidade * precoVenda

    }

    var subtotal = somaTotal + frete - desconto

    var precoTratado = tratarReal(somaTotal)
    var descontoTratado = tratarReal(desconto)
    var subtotalTratado = tratarReal(subtotal)
    var freteTratado = tratarReal(frete)
    $(".valor-produtos").text(precoTratado)
    $(".valor-desconto").text(descontoTratado)

    if(freteACaucular){
        $(".valor-frete").text("A calcular")
    }
    else{
        $(".valor-frete").text(freteTratado)
    }

    $(".valor-subtotal").text(subtotalTratado)

}

function tratarReal(valor){

    return "R$ " + valor.toFixed(2).toString().replace(".", ",")

}

$(document).ready(function(){

    carregarCarrinho()
    puxarInformacoes()

    $(".cep").mask("00000-000")
    $("body").on("click", ".remover-produto-carrinho", function(){
        removerProdutoCarrinho(this)
        puxarInformacoes()
    })
    $(".quantidade").on("input", puxarInformacoes)

    $(".comprar").click(function(){

        window.location.href = "compras.html"

    })

})