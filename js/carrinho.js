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


    if(relacaoCardID.length == 0){
        $(".valor").text("R$ 0,00")
        $(".comprar").css("display", "none")
        $(".meus-produtos").css("display", "none")
        $(".mensagem-vazio").css("display", "block")
        return
    }
    else{
        $(".comprar").css("display", "block")
        $(".mensagem-vazio").css("display", "none")
        $(".meus-produtos").css("display", "block")
    }

    var listaProdutos = JSON.parse(localStorage["produtos"])
    var somaTotal = 0;
    var desconto = 1;
    var frete = 2;

    for(var i = 0; i < relacaoCardID.length; i++){

        var indexProduto = relacaoCardID[i][1]
        var precoVenda = parseFloat(listaProdutos[indexProduto]["precovenda"])
        if($(".quantidade").val() == ""){
            
            var quantidade = 1;
    
        }
        else{
            var quantidade = parseFloat($(".quantidade").eq(i).val())
        }

        somaTotal += quantidade * precoVenda

    }

    var subtotal = somaTotal + frete - desconto

    var precoTratado = tratarReal(somaTotal)
    var freteTratado = tratarReal(frete)
    var descontoTratado = tratarReal(desconto)
    var subtotalTratado = tratarReal(subtotal)
    $(".valor-produtos").text(precoTratado)
    $(".valor-frete").text(freteTratado)
    $(".valor-desconto").text(descontoTratado)


    $(".valor-subtotal").text(subtotalTratado)

}

function tratarReal(valor){

    return "R$ " + valor.toFixed(2).toString().replace(".", ",")

}

$(document).ready(function(){
  
    carregarCarrinho()
    puxarInformacoes()

    $(".cep").mask("00000-000")
    $(".quantidade").mask("000")


    $("body").on("click", ".remover-produto-carrinho", function(){
        removerProdutoCarrinho(this)
        puxarInformacoes()
    })
    $(".quantidade").on("input", puxarInformacoes)

    $(".comprar").click(function(){

        var usuario = JSON.parse(sessionStorage["usuario-logado"])
        var produtosAdicionados = usuario["produtosAdicionados"]
        
        var arrayProdutoQuantidade = []

        for(var i = 0; i < produtosAdicionados.length; i++){
            
            for(var x = 0; x < relacaoCardID.length; x++){

                if(relacaoCardID[x][1] == produtosAdicionados[i]){

                    var idCard = relacaoCardID[x][0]
                    var quantidade = $(".div-produto-carrinho").eq(idCard).find(".quantidade").val()
                    arrayProdutoQuantidade.push([produtosAdicionados[i], quantidade])

                }

            }

        }

        sessionStorage.setItem("produtosQuantidade", JSON.stringify(arrayProdutoQuantidade))

        window.location.href = "compras.html"

    })
    
    $(".botao-mais").click(function(){

        var valor = parseInt( $(this).siblings(".quantidade").val())
        $(this).siblings(".quantidade").val(valor + 1)
        
        if(parseInt($(".quantidade").val()) > 999){

            $(this).siblings(".quantidade").val("999")

        }

        puxarInformacoes()

    })

       
    $(".botao-menos").click(function(){

        var valor = parseInt($(".quantidade").val())
        $(this).siblings(".quantidade").val(valor - 1)

        if(parseInt( $(this).siblings(".quantidade").val()) < 1){

            $(this).siblings(".quantidade").val("1")

        }
        puxarInformacoes()

    })

})