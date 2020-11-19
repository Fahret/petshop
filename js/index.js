$(document).ready(function(){

    $(".botao-todos-produtos").click(function(){
      sessionStorage.setItem('produtosFiltro', JSON.stringify('nenhum-filtro'))
        window.location.href = "produtos.html"

    })

    $(".produto-botao-img").click(function(){
      var produtosfiltro = $(this).attr("id")
      sessionStorage.setItem('produtosFiltro', JSON.stringify(produtosfiltro))
      window.location.href = "produtos.html"
    })

})



//Google maps API

var mapa;

function initMap() {

  var configuracoes = {
    center: {lat: -13.7462056, lng:-55.0532014},
    zoom: 4
  }
      
  mapa = new google.maps.Map(document.getElementById('map'), configuracoes);

  var l1 = new google.maps.Marker({
    position: {lat: -30.0293591, lng: -51.2176647},
    title: "Loja 1",
    map: mapa
  });

  var l2 = new google.maps.Marker({
    position: {lat: -26.3107492, lng: -48.8427014},
    title: "Loja 2",
    map: mapa
  });

  var l3 = new google.maps.Marker({
    position: {lat: -25.4630118, lng: -49.2336328},
    title: "Loja 3",
    map: mapa
  });

  var l4 = new google.maps.Marker({
    position: {lat: -23.6629436, lng: -46.7654166},
    title: "Loja 4",
    map: mapa
  });

  var l5 = new google.maps.Marker({
    position: {lat: -23.5244248, lng: -46.18303},
    title: "Loja 5",
    map: mapa
  });

  var l6 = new google.maps.Marker({
    position: {lat: -20.4704525, lng: -54.6237114},
    title: "Loja 6",
    map: mapa
  });

  var l7 = new google.maps.Marker({
    position: {lat: -19.9693372, lng: -44.0645407},
    title: "Loja 7",
    map: mapa
  });

  var l8 = new google.maps.Marker({
    position: {lat: -16.6912457, lng: -49.25532},
    title: "Loja 8",
    map: mapa
  });

  var l9 = new google.maps.Marker({
    position: {lat: -15.5936756, lng: -56.1067607},
    title: "Loja 9",
    map: mapa
  });

  var l10 = new google.maps.Marker({
    position: {lat: -8.7621415, lng:-63.8790749},
    title: "Loja 10",
    map: mapa
  });

  var l11 = new google.maps.Marker({
    position: {lat: -12.9744311, lng: -38.5097645},
    title: "Loja 11",
    map: mapa
  });

  var l12 = new google.maps.Marker({
    position: {lat: -10.2442777, lng: -48.3239231},
    title: "Loja 12",
    map: mapa
  });

  var l13 = new google.maps.Marker({
    position: {lat: -3.7316109, lng: -38.4920892},
    title: "Loja 13",
    map: mapa
  });

  var l14 = new google.maps.Marker({
    position: {lat: -8.055746, lng: -34.8995424},
    title: "Loja 14",
    map: mapa
  });

  var l15 = new google.maps.Marker({
    position: {lat: -5.7802933, lng: -35.2013908},
    title: "Loja 15",
    map: mapa
  });

  var l16 = new google.maps.Marker({
    position: {lat: -2.5238326, lng: -44.2185039},
    title: "Loja 16",
    map: mapa
  });

  var l17 = new google.maps.Marker({
    position: {lat: -7.1242272, lng:-34.8374505},
    title: "Loja 17",
    map: mapa
  });

  var l18 = new google.maps.Marker({
    position: {lat: -3.0901877, lng: -59.9813476},
    title: "Loja 18",
    map: mapa
  });

  var l19 = new google.maps.Marker({
    position: {lat: -1.4508501, lng: -48.4939848},
    title: "Loja 19",
    map: mapa
  });

  var l20 = new google.maps.Marker({
    position: {lat: -5.3710991, lng: -49.1259386},
    title: "Loja 20",
    map: mapa
  });

  var l21 = new google.maps.Marker({
    position: {lat: -23.4340592, lng: -46.499556},
    title: "Loja 21",
    map: mapa
  });

}
