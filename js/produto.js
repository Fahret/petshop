function montarProduto(){

    var produtoJSON = sessionStorage.getItem("visualizarproduto")
    var produto = JSON.parse(produtoJSON)
    $(".div-img img").prop("src", produto["foto"])
    $(".produto-nome").text(produto["nome"])
    $(".descricao-produto").html(produto["descricao"])
    $(".preco-produto").text("R$ " + produto["precovenda"])
    $(".codigo-produto").text("Cod: " + produto["codigo"])

}


$(document).ready(function(){
    
    montarProduto()

})