$(document).ready(function(){

    $("input").val("")

    carregarCarrinho()
    puxarInformacoes()

    //Mascaras

    $("#numCartao").mask("0000 0000 0000 0000")
    $("#ano").mask("0000")
    $(".input-parcelar").mask("00")

    
    //-----------------------------


    $(".cartao").click(function(){

        $(".boleto").css("background-color", "rgb(206, 206, 206, 0)")
        $(this).css("background-color", "rgb(206, 206, 206)")
        $(".boleto-bancario").css("display", "none")
        $(".cartao-credito").css("display", "block")
    
    })

    $(".boleto").click(function(){

        $(".cartao").css("background-color", "rgb(206, 206, 206, 0)")
        $(this).css("background-color", "rgb(206, 206, 206)")
        $(".cartao-credito").css("display", "none")
        $(".boleto-bancario").css("display", "block")
    
    })

    $(".fab").click(function(){

        $(".fab").css("color", "rgb(163, 163, 163)")
        $(this).css("color", "rgb(162, 0, 255)")

    })

})

var relacaoCardID = [];
var produtoQuantidade = JSON.parse(sessionStorage["produtosQuantidade"])
function carregarCarrinho(){

    var usuario = JSON.parse(sessionStorage["usuario-logado"])
    var produtosCarrinho = usuario["produtosAdicionados"]

    var listaProdutos = JSON.parse(localStorage["produtos"])

    var cardIndex = 0

    $(".produtos-selecionados").html("")
    for(var i = 0; i < listaProdutos.length; i++){

        if(produtosCarrinho.includes(listaProdutos[i]["produtoID"])){

            for(var x = 0; x < produtoQuantidade.length; x++){
                if(produtoQuantidade[x][0] == listaProdutos[i]["produtoID"]){
                    var quantidade = produtoQuantidade[x][1]
                }
            }

            var conteudo = ""
            conteudo += ' <div class="card card-produto">'
            conteudo +=     '<div class="imagem">'
            conteudo +=         '<img src="' + listaProdutos[i]["foto"] + '">'
            conteudo +=      '</div>'
            conteudo +=      '<div class="informacoes">'
            conteudo +=          '<p>' + listaProdutos[i]["nome"] + '</p><br>'
            conteudo +=          '<p>Preço: ' + listaProdutos[i]["precovenda"] + '</p>'
            conteudo +=          '<p>Quantidade: ' + quantidade + '</p>'
            conteudo +=       '</div>'
            conteudo += '</div>'

            $(".produtos-selecionados").append(conteudo)

            relacaoCardID.push([cardIndex, listaProdutos[i]["produtoID"]])
            cardIndex++
         
        }

    }

}


function puxarInformacoes(){

    var listaProdutos = JSON.parse(localStorage["produtos"])
    var somaTotal = 0;
    var desconto = 1;
    var frete = 2;

    for(var i = 0; i < relacaoCardID.length; i++){

        for(var x = 0; x < produtoQuantidade.length; x++){
            if(produtoQuantidade[x][0] == listaProdutos[i]["produtoID"]){
                var quantidade = produtoQuantidade[x][1]
            }
        }

        var indexProduto = relacaoCardID[i][1]
        var precoVenda = parseFloat(listaProdutos[indexProduto]["precovenda"])
        somaTotal += quantidade * precoVenda

    }

    var subtotal = somaTotal + frete - desconto
    var precoTratado = tratarReal(somaTotal)
    var descontoTratado = tratarReal(desconto)
    var subtotalTratado = tratarReal(subtotal)
    var freteTratado = tratarReal(frete)
    $(".valor-produtos").text(precoTratado)
    $(".valor-frete").text(freteTratado)
    $(".valor-desconto").text(descontoTratado)
    $(".valor-subtotal").text(subtotalTratado)

}

function tratarReal(valor){

    return "R$ " + valor.toFixed(2).toString().replace(".", ",")

}
