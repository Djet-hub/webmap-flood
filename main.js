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

// Initiating map
var map = new ol.Map({
    target: 'map',
    layers: layerArray,
    view: view
  });

  //Draw source source
  var drawSource = new ol.source.Vector();
  //Draw layer
  var drawLayer = new ol.layer.Vector({
      source: drawSource
  });
  //Add to map
  map.addLayer(drawLayer);

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
      clickedCoord = evt.feature.values_.geometry.flatCoordinates;
      $('#pointadding').modal('show');
      console.log('click at', evt.feature.values_.geometry.flatCoordinates);
      map.removeInteraction(draw);
  });

  //Function that enables interaction
  function startDrawing(){
      //Add interaction to map
    map.addInteraction(draw);
  }
//Save data from form to database
function saveDataToDB(){
  var nomPrenom = document.getElementById('userName').value;
  var quartier = document.getElementById('areaSelect').value;
  var long = clickedCoord[0];
  var lat = clickedCoord[1];

  if(nomPrenom != '' && quartier != '' && long != '' && lat != ''){
    $.ajax({
      url: 'saveData.php',
      type:'POST',
      data:{
        nPrenom: nomPrenom,
        nQuartier: quartier,
        nLong: long,
        nLat: lat
      },
      succcess: function(dataResult){
        var dataResult = JSON.parse(dataResult);
        if(dataResult.statusCode == 200){
          alert('Data added successfully');
          $('#pointadding').modal('hide');
        } else{
          alert('Something went wrong');
        }
      }
    })
  } else{
    alert('Fill complete information');
  }
}
//Event on Research

 

