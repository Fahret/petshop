$(document).ready(function(){

    $(".produto-botao").click(function(){

        window.location.href = "produtos.html"

    })


})

//Google maps API

var mapa;

function initMap() {

  var configuracoes = {
    center: {lat: -25.45212754, lng: -49.25276682},
    zoom: 30
  }
      
  mapa = new google.maps.Map(document.getElementById('map'), configuracoes);

}
