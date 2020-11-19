$(document).ready(function(){

    puxarInformacoes()
    carregarCarrinho()

})

var relacaoCardID = [];

function carregarCarrinho(){

    var usuario = JSON.parse(sessionStorage["usuario-logado"])
    var produtosCarrinho = usuario["produtosAdicionados"]

    var listaProdutos = JSON.parse(localStorage["produtos"])

    var cardIndex = 0

    $(".produtos-selecionados").html("")
    for(var i = 0; i < listaProdutos.length; i++){

        if(produtosCarrinho.includes(listaProdutos[i]["produtoID"])){

            var conteudo = ""
            conteudo += ' <div class="card boleto">'
            conteudo +=     '<div class="imagem">'
            conteudo +=         '<img src="' + listaProdutos[i]["foto"] + '">'
            conteudo +=      '</div>'
            conteudo +=      '<div class="informacoes">'
            conteudo +=          '<p>' + listaProdutos[i]["nome"] + '</p>'
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
