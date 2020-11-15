$(document).ready(function () {

    var numpag = 1;
    var produtosPorPagina = 5;
    var produtos;
    var produtosFiltrados;
    var propriedades = [];

    //Página listar produtos 

    function puxarProduto() {

        produtos = JSON.parse(localStorage["produtos"])
        produtosFiltrados = produtos

    }

    function mostrarPagina() {

        $(".produtos").html("")
        
        var indexMin = (numpag * produtosPorPagina) - produtosPorPagina
        var indexMax = (numpag * produtosPorPagina) - 1
        for (var i = indexMin; i <= indexMax; i++) {

            if(indexMin >= produtosFiltrados.length){

                $(".tabela-produtos").css("display", "none")
                $(".nenhum-produto").css("display", "block")

            }
            else{
                $(".tabela-produtos").css("display", "table")
                $(".nenhum-produto").css("display", "none")
            }

            if (i < produtosFiltrados.length) {

                var produto = produtosFiltrados[i]

                var conteudo = "<tr class='produto'>"
                conteudo +=         "<td><img class='foto' src='" + produto["foto"] + "'></td>" 
                conteudo +=         "<td><p>" + produto["nome"] + "</p></td>" 
                conteudo +=         "<td><p>" + produto["marca"] + "</p></td>" 
                conteudo +=         "<td><p>" + produto["precocompra"] + "</p></td>" 
                conteudo +=         "<td><p>" + produto["precovenda"] + "</p></td>"
                conteudo +=         "<td><p>" + produto["estoquemin"] + "</p></td>" 
                conteudo +=         "<td><p>" + produto["estoquemax"] + "</p></td>" 
                conteudo +=         "<td><p>" + produto["estoqueatual"] + "</p></td>" 
                conteudo +=         "<td><p>" + produto["fornecedor"] + "</p></td>" 
                conteudo +=         "<td><textarea class='textarea-descricao'cols='20'>" + produto["descricao"] + "</textarea></td>" 
                conteudo +=         "<td><p>" + produto["codigo"] + "</p></td>"
                conteudo +=         "<td class='editar-produto-td'><i class='fas fa-pencil-alt editar-produto'></i></td>"
                conteudo +=    "</tr>"

                $(".produtos").append(conteudo)
            }
        }

    }

    $(".n-produtos").on('input', function () {

        produtosPorPagina = $(this).val()
        mostrarPagina()

    })

    $(".addproduct").click(function () {

        $(".div-produtos").css("display", "none");
        $(".cadastrar-editar-produtos").css("display", "block");
        $(".conteudo")[0].reset();
        $("textarea").attr("style", "")
        $(".botao").css("display", "none")
        $(".cadastrar").css("display", "inline-block")

    });

    $(".botoes-paginas input").on('input', function () {

        numpag = $(this).val();
        mostrarPagina()

    })

    $("body").on("click", ".deletar-produto", function(){
        deletarProduto()
    })


    function filtrarProdutos() {

        var chaves = document.getElementsByClassName("opcoes")
        var valores = document.getElementsByClassName("filtro-valor")
        var produtosRejeitados = []

        for (var x = 0; x < produtos.length; x++) {

            var produto = produtos[x]

            for (var y = 1; y < chaves.length; y++) {

                var key = $(chaves[y]).prop("value")
                var valor = $(valores[y]).val()

                if(!(produto[key] == valor)){

                    produtosRejeitados.push(produto)
                    break

                }

            }

        }

        produtosFiltrados = []
        for(var i = 0; i < produtos.length; i++){

            var produto = produtos[i]

            if(!(produtosRejeitados.includes(produto))){

                produtosFiltrados.push(produto)

            }

        }

    }

    var listaFiltros = [];

    $(".botao-novo-filtro").click(function () {

        $(".filtros-botoes").css("display", "block")

        var novofiltro = $(".novo-filtro").first().clone();
        $(novofiltro).css("display", "flex")
        $(novofiltro).find("input").val("")
        $(novofiltro).find("textarea").val("")
        $(novofiltro).insertBefore(".botao-novo-filtro");
        $("textarea").last().attr("style", "")
        listaFiltros = document.getElementsByClassName("novo-filtro")


    });

    $("body").on('click', ".botao-deletar-filtro", function () {

        if (listaFiltros.length > 1) {
            $(this).parents(".novo-filtro").remove()
        }

        if (listaFiltros.length == 1) {

            $(".filtros-botoes").css("display", "none")
            puxarProduto()
            mostrarPagina()

        }

    });

    $(".confirmar-filtros").click(function () {

        filtrarProdutos()
        mostrarPagina()

    })

    $(".deletar-filtros").click(function () {

        var base = $(".novo-filtro").first()
        $(".novo-filtro").not(base).remove()
        $(".filtros-botoes").css("display", "none")
        puxarProduto()
        mostrarPagina()

    })

    
    $("body").on("click", ".editar-produto", function () {


        $(".div-produtos").css("display", "none");
        $(".cadastrar-editar-produtos").css("display", "block");
        $(".botao").css("display", "none")
        $(".editar").css("display", "inline-block")

    })

    puxarProduto()
    mostrarPagina()

    //Página cadastrar produto

    $(".cadastrar").click(function () {
               
        if(localStorage.hasOwnProperty("maxProdutoID")){

            var maxProdutoID = parseInt(localStorage["maxProdutoID"]) + 1
            localStorage.setItem("maxProdutoID", maxProdutoID)

        }
        else{
            var maxProdutoID = 0
            localStorage.setItem("maxProdutoID", maxProdutoID)
        }

        var linkImagem = $("#foto").val().replace("C:\\fakepath\\", "img/")
        var produto = {
            produtoID: maxProdutoID,
            nome: $("#nome").val(),
            marca: $("#marca").val(),
            fornecedor: $("#fornecedor").val(),
            descricao: $("#descricao").val(),
            codigo: $("#codigo").val(),
            foto: linkImagem,
            estoquemin: $("#estoquemin").val(),
            estoquemax: $("#estoquemax").val(),
            precocompra: $("#precocompra").val(),
            precovenda: $("#precovenda").val()

        };

        var listaProdutos = JSON.parse(localStorage["produtos"])
        listaProdutos.push(produto)
        var listaProdutosJSON = JSON.stringify(listaProdutos)
        localStorage.setItem("produtos", listaProdutosJSON);
        
    });

    $(".editar").click(function () {

        


    })

    $(".cancelar").click(function () {

        $(".cadastrar-editar-produtos").css("display", "none");
        $(".div-produtos").css("display", "block");

    });


});