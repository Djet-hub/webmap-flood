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
var quartiers = new ol.layer.Tile({
    source: new ol.source.TileWMS({
      url: 'http://localhost:8081/geoserver/flood_web_map/wms',
      params: { 'LAYERS':'flood_web_map:quartiers', 'TILED': true},
      serverType: 'geoserver'
    })
  })

//Layer group
var layerArray = [basemapLayer, quartiers];

// Initiating map
var map = new ol.Map({
    target: 'map3',
    layers: layerArray,
    view: view
  });