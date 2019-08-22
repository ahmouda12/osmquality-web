// mabbox accessToken
mapboxgl.accessToken = 'pk.eyJ1Ijoic3BhdGlhbGRldiIsImEiOiJjanpoYWFyZTkwaW4xM25vNWs2cWt6NWFqIn0.pjqihTlW7bHAp8bC8SaiNQ';

// appand menu div
$("#menu").append('<div id="pd" style="height:0px; font-size:20px"><p>Hover over a cell!</p></div>');

// initialize map
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/spatialdev/cjzhaiba028201cpjtu0aicao',
    zoom: 10.3,
    center: [-116.22963922, 43.60428888]
});

// make a pointer cursor
map.getCanvas().style.cursor = 'default';

// make legends
var w = 200, h = 45;
var key = d3.select("#menu")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

var legend = key.append("defs")
  .append("svg:linearGradient")
  .attr("id", "gradient")
  .attr("x1", "0%")
  .attr("y1", "100%")
  .attr("x2", "100%")
  .attr("y2", "100%")
  .attr("spreadMethod", "pad");

legend.append("stop")
  .attr("offset", "0%")
  .attr("stop-color", "#f3ebed")
  .attr("stop-opacity", 1);

legend.append("stop")
  .attr("offset", "50%")
  .attr("stop-color", "#c2a0c0")
  .attr("stop-opacity", 1);

legend.append("stop")
  .attr("offset", "100%")
  .attr("stop-color", "#5c3366")
  .attr("stop-opacity", 1);

key.append("rect")
  .attr("width", w)
  .attr("height", h - 30)
  .style("fill", "url(#gradient)")
  .attr("transform", "translate(0,0)");

key.append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(0,30)")
  .append("text")
  .attr("y", -2)
  .attr("x", 0)
  .text("Low");

key.append("g")
  .attr("class", "y axis")
  .attr("transform", "translate(0,30)")
  .append("text")
  .attr("y", -2)
  .attr("x", 174)
  .text("High");

// city centers
var city_centers = [[-104.85459295, 39.76433500], [-89.40921645, 43.08508317], [-110.88199188, 32.15556352], [-108.57235566, 45.78117625], 
                    [-86.67189895, 34.70163350], [-115.23393607, 36.26553082], [-149.44718041, 61.10848507], [-83.09872810, 42.35266739], 
                    [-82.99026369, 39.98305926], [-106.67157383, 35.08253477], [-122.65402775, 45.54308710], [-94.57471339, 39.09053468], 
                    [-93.60103972, 41.58383100], [-96.82763203, 46.84032405], [-80.93710676, 34.03440650], [-122.33568829, 47.61519258], 
                    [-96.06921751, 41.29188416], [-89.96938846, 35.12907650], [-97.47709796, 35.48282495], [-86.13266801, 39.77984461], 
                    [-96.72482542, 43.55145459], [-84.41988181, 33.76742662], [-76.27783424, 36.70817898], [-111.91999188, 40.77797899], 
                    [-71.44386255, 42.97108629], [-81.35368341, 28.48117613], [-73.22664120, 44.49292694], [-80.80653141, 35.20084000], 
                    [-104.77997858, 41.12792604], [-97.44299699, 37.64753736], [-90.19246155, 32.30397000], [-93.26148085, 44.97115498], 
                    [-75.11762592, 40.00269527], [-70.21724982, 43.67991725], [-81.64335920, 38.34344900], [-122.71705540, 37.77824550], 
                    [-92.33574962, 34.72375525], [-75.52936810, 39.72976300], [-87.73156585, 41.83379085], [-76.62028351, 39.28462456], 
                    [-89.88340331, 30.02013783], [-77.01417042, 38.89380619], [-72.68003880, 41.76559850], [-85.67542258, 38.18816140], 
                    [-157.96458291, 21.48386118], [-96.73208006, 32.81857126], [-70.96952580, 42.31437300], [-71.42104865, 41.81699250], 
                    [-73.97889853, 40.69748800], [-74.18257202, 40.73102785], [-116.22963922, 43.60428888]]

var city_zooms = [9.4, 10.1, 9.8, 10.3, 9.4, 9.9, 7.5, 9.8, 9.5, 9.7, 9.9, 9, 10.3, 9.8, 9.5, 10, 9.8, 9, 8.9, 9.7, 10.4, 10.2, 9.6, 9.9, 
                  10.6, 10.1, 11.3, 9.4, 10.6, 9.2, 10.2, 10.6, 9.9, 10.4, 11, 8.9, 9.8, 11.4, 9.4, 10.5, 9.4, 10.3, 11.5, 9.3, 9.1, 9.3, 
                  9.6, 11.4, 9.2, 11.1, 10.3]

// Fly to a center
var center_index = 0
var zoom_index = 0
document.getElementById('fly').addEventListener('click', function () {
    map.jumpTo({center: city_centers[center_index], zoom: city_zooms[zoom_index]});
    //console.log(center_index)
    center_index++;
    if(center_index >= city_centers.length) {
    center_index = 0;
    }
    zoom_index++;
    if(zoom_index >= city_zooms.length) {
    zoom_index = 0;
    }
});

// change info window on hover
map.on('mousemove', function (e) {
    var states = map.queryRenderedFeatures(e.point, {
        layers: ['map-error', 'newark-error']
    });
    if (states.length > 0) {
        document.getElementById('pd').innerHTML = "<p>" + states[0].properties.counts + " map errors</p>";
    } 
    else {
        document.getElementById('pd').innerHTML = '<p>Hover over a cell!</p>';
    }
});