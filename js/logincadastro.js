$(document).ready(function (){


    //Transitar entre páginas

    $(".ir-cadastro").click(function(){

        $(".pagina-login").css("display", "none")
        $(".pagina-cadastro").css("display", "block")

    })

    $(".ir-login").click(function(){

        $(".pagina-login").css("display", "block")
        $(".pagina-cadastro").css("display", "none")

    })

    // -- Cadastro --//
    
    //Validações

    function validarNomeESobrenome(input){

        var charsValidos = "abcdefghijklmnopqrstuvwxyz "
        var valor = $(input).val().toLowerCase()

        $(input).removeClass("erro-input")
        for(var i = 0; i < valor.length; i++){
            if(!(charsValidos).includes(valor[i])){

                $(input).addClass("erro-input")
 
            }
        }

    }

    function validarEmail(){
        
        var email = $(".input-email").val().toLowerCase()

        $(".input-email").removeClass("erro-input")
        if(!(email.includes("@"))){

            $(".input-email").addClass("erro-input")

        }
        
    }

    function mascaraCPF(){

        $(".input-cpf").mask("000.000.000-00")

    }

    function validarCPF(){


    
    }

    function validarSenha(){

        var charsValidos = "abcdefghijklmnopqrstuvwxyz0123456789"
        var senha = $(".input-senha").val().toLowerCase()

        $(".input-senha").removeClass("erro-input")
        for(var i = 0; i < senha.length; i++){

            if (!(charsValidos.includes(senha[i]))){

                $(".input-senha").addClass("erro-input")

            }

        }

        if($(".senha-cadastro").val() != $(".confirmarsenha").val()){

            $(".input-senha").addClass("erro-input")

        }


    }


    $(".input-cadastro").on("input", function(){

        var inputs = document.getElementsByClassName("input-cadastro")

        switch(this){

            //Nome e sobrenome
            case inputs[0]:
                validarNomeESobrenome(this)
                break

            case inputs[1]:
                validarNomeESobrenome(this)
                break

            //E-mail
            case inputs[2]:
                validarEmail()
                break

            //CPF
            case inputs[3]:
                mascaraCPF()
                validarCPF()
                break

            //Senha
            case inputs[4]:
                validarSenha()
                break

            case inputs[5]:
                validarSenha()
                break

        }


        var validado = true
        for(var i = 0; i < inputs.length; i++){

            if($(inputs[i]).val() == ""){
                validado = false
                break
            }

            if($(inputs[i]).hasClass("erro-input")){
                validado = false
                break
            }
 
        }

        if(validado){

            $(".salvar").prop("disabled", false)

        }
        else{
            $(".salvar").prop("disabled", true)
        }

    })

    //Cadastrar no localStorage

    $(".salvar").click(function (){

        var usuario = {

            nome: $(".input-nome").val().toLowerCase(),
            sobrenome: $(".input-sobrenome").val().toLowerCase(),
            email: $(".input-email").val().toLowerCase(),
            cpf: $(".input-cpf").val(),
            senha: $(".senha-cadastro").val()

        }

        var usuarioJSON = JSON.stringify(usuario)
        localStorage.setItem(usuarioJSON, "usuario")

    })
    
    //Logar
    
    $(".logar").click(function (){

        for(var key in localStorage){

            if (localStorage.hasOwnProperty(key)){

                var usuario = JSON.parse(key)
                if($(".usuario-login").val() == usuario["email"] && $(".enha-login").val() == usuario["senha"]){

                    sessionStorage.setItem(key)
                    return

                }

            }

        }


    })

})