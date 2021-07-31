//Some variables for control and extents

// var extent = new ZoomSlider({
//   extent: [1700306.7872943957, 920998.882415848, 1850209.7473474208, 1034227.246541411]
// });
// Define view

var clickedCoord = new Array();
var view = new ol.View({
    center: [1787957.2303852485, 956798.9861506136],
    zoom: 12
  });

//Basemap layer
var basemapLayer =  new ol.layer.Tile({
    source: new ol.source.OSM({
        layer: 'terrain'
    })
  });

//Layers from geoserver
var routes = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8081/geoserver/flood_web_map/wms',
    params: { 'LAYERS':'flood_web_map:routes', 'TILED': true},
    serverType: 'geoserver'
  })
})
var arrondissements = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8081/geoserver/flood_web_map/wms',
    params: { 'LAYERS':'flood_web_map:arrondissements', 'TILED': true},
    serverType: 'geoserver'
  })
})
var infrastructures = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8081/geoserver/flood_web_map/wms',
    params: { 'LAYERS':'flood_web_map:infrastructures_moundou', 'TILED': true},
    serverType: 'geoserver'
  })
})
var quartiers = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8081/geoserver/flood_web_map/wms',
    params: { 'LAYERS':'flood_web_map:quartiers', 'TILED': true},
    serverType: 'geoserver'
  })
})
var zarim = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8081/geoserver/flood_web_map/wms',
    params: { 'LAYERS':'flood_web_map:zone_risque_inondation_m', 'TILED': true},
    serverType: 'geoserver'
  })
})
var zarie = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8081/geoserver/flood_web_map/wms',
    params: { 'LAYERS':'flood_web_map:zone_risque_inondation_e', 'TILED': true},
    serverType: 'geoserver'
  })
})
var zarif = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8081/geoserver/flood_web_map/wms',
    params: { 'LAYERS':'flood_web_map:zone_risque_inondation_f', 'TILED': true},
    serverType: 'geoserver'
  })
})

var zari = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8081/geoserver/flood_web_map/wms',
    params: { 'LAYERS':'flood_web_map:zari', 'TILED': true},
    serverType: 'geoserver'
  })
})

//Layer group
var layerArray = [basemapLayer, routes, arrondissements, quartiers, infrastructures, zarie, zarim, zarif, zari];

/**
 * Elements that make up the popup.
 */
  var container = document.getElementById('popup');
  var content = document.getElementById('popup-content');
  var closer = document.getElementById('popup-closer');
  
  /**
   * Create an overlay to anchor the popup to the map.
   */
   var popup = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation:{duration:250}
  });
  
// Initiating map
var map = new ol.Map({
    layers: layerArray, 
    overlays: [popup],
    target: 'map',
    view: view
  });
 
  //Draw layer
  var drawLayer = new ol.layer.Vector({
      source: drawSource
  });
  //Draw source source
  var drawSource = new ol.source.Vector();
  //Add to map
  map.addLayer(drawLayer);
  
 /**
  * Add a click handler to hide the popup.
  */
  closer.onclick = function () {
   popup.setPosition(undefined);
   closer.blur();
   return false;
 };
//Indicate the position clicked at on map
map.on('singleclick', function (evt) {
  var coordinate = evt.coordinate;
  var hdms = ol.coordinate.toStringHDMS(coordinate);

  content.innerHTML = '<p>Votre position sur carte</p></br>'+hdms;
  popup.setPosition(coordinate);
});
  
  //Initiate a draw interaction
  var draw = new ol.interaction.Draw({
      type: 'Point',
      source: drawSource
  });
  //Clear the draw
  draw.on('drawstart', function(evt){
    drawSource.clear();
  })

  //Event removing draw
  draw.on('drawend', function(evt){
      clickedCoord = new ol.proj.transform(evt.feature.values_.geometry.flatCoordinates, 'EPSG:3857', 'EPSG:4326');
      $('#pointadding').modal('show');
      console.log('click at', new ol.proj.transform(evt.feature.values_.geometry.flatCoordinates, 'EPSG:3857', 'EPSG:4326'));
      map.removeInteraction(draw);
  });

  //Function that enables interaction
  function startDrawing(){
      //Add interaction to map
    map.addInteraction(draw);
  }
//Event handler pointed on submit button of the modal
  document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('envoyer')
      .addEventListener('click', getPosition);
  });
  //Function called when clicked on 'envoyer' button
  function getPosition(){
      var nomPrenom = document.getElementById('userName').value;
      var quartier = document.getElementById('areaSelect').value;
      var long = clickedCoord[0];
      var lat = clickedCoord[1];
      if(nomPrenom != '' && quartier != '' && long != '' && lat != ''){
      $.ajax({
        url : 'getPosition.php',
        type : 'GET',
        dataType : 'json',
        data:{
          nPrenom: nomPrenom,
          nQuartier: quartier,
          nLong: long,
          nLat: lat
          },
        success : function (data) {
          console.log(data);
          if(data['type_zari']==='ZARIE'){
            content.innerHTML = 'Vous êtes sur une zone à risque d\'inondation élevé avec les caractéristiques suivantes : '+
                                'Profondeur de submersion (m) : '+data['prof_subm']+', Superficie inondée (m2) : '+data['superficie'];
          }else if(data['type_zari']==='ZARIM'){
            content.innerHTML = 'Vous êtes sur une zone à risque d\'inondation moyen avec les caractéristiques suivantes : '+
            'Profondeur de submersion (m) : '+data['prof_subm']+', Superficie inondée (m2) : '+data['superficie'];
          }else {
            content.innerHTML = 'Vous êtes sur une zone à risque d\'inondation faible avec les caractéristiques suivantes : '+
            'Profondeur de submersion (m) : '+data['prof_subm']+', Superficie inondée (m2) : '+data['superficie'];
          } 
          $('#pointadding').modal('hide');
        },
        error : function () {
          content.innerHTML = 'Vous n\'êtes  pas sur une zone à risque d\'inondation';
          $('#pointadding').modal('hide');
        }
      });
    }else{
      alert('Veuillez renseigner le nom et le quartier');
    }
  }

//Event on Research

 

