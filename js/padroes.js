$(document).ready(function(){

    if(!(sessionStorage.hasOwnProperty("usuario-logado"))){
        $("#carrinho-icone").css("display", "none")
    }
    else{
        $("#carrinho-icone").css("display", "block")
    }

    $("#deslogar-logar").click(function (){

        if(!(sessionStorage.hasOwnProperty("usuario-logado"))){
            window.location.href = "loginCadastro.html"
        }
        else{
            sessionStorage.removeItem("usuario-logado")
            window.location.href = "loginCadastro.html"
        }

    })

})