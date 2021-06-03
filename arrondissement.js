var clickedCoord = new Array();
var view = new ol.View({
    center: [1788488.3498692007, 956167.7913541093],
    zoom: 12
  });

//Basemap layer
var basemapLayer =  new ol.layer.Tile({
    source: new ol.source.OSM({
        layer: 'terrain'
    })
  });

//Layers from geoserver
var arrondissements = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'http://localhost:8081/geoserver/flood_web_map/wms',
    params: { 'LAYERS':'flood_web_map:arrondissements', 'TILED': true},
    serverType: 'geoserver'
  })
})

//Layer group
var layerArray = [basemapLayer, arrondissements];

// Initiating map
var map = new ol.Map({
    target: 'map2',
    layers: layerArray,
    view: view
  });