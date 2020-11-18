$(document).ready(function(){

<<<<<<< HEAD
    $(".produto-botao").click(function(){
=======
    $(".botao-todos-produtos").click(function(){
>>>>>>> google-api

        window.location.href = "produtos.html"

    })


})

//Google maps API

var mapa;

function initMap() {

  var configuracoes = {
    center: {lat: -25.45212754, lng: -49.25276682},
<<<<<<< HEAD
    zoom: 30
=======
    zoom: 15
>>>>>>> google-api
  }
      
  mapa = new google.maps.Map(document.getElementById('map'), configuracoes);

<<<<<<< HEAD
=======
  var marcador = new google.maps.Marker({
    position: {lat: -25.45212754, lng: -49.25276682},
    title: "PUCPR",
    map: mapa
  });

>>>>>>> google-api
}
