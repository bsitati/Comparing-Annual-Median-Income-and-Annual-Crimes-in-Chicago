// Add Years 2017 and 2018 to new layer group

// Creating map object
var myMap = L.map("map", {
  center: [41.8781, -87.6298],
  zoom: 13,
});

// Adding tile layer
var basemap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap)

var layers = {
    LAYER_ROBBERY: new L.LayerGroup(),
    LAYER_HOMICIDE: new L.LayerGroup(),
    LAYER_CRIMINAL_DAMAGE: new L.LayerGroup(),
    LAYER_SEX_OFFENSE: new L.LayerGroup(),
    LAYER_MOTOR_THEFT: new L.LayerGroup(),
    LAYER_CHILD_OFFENCE: new L.LayerGroup(),
    LAYER_ASSAULT: new L.LayerGroup(),
    LAYER_NARCOTICS: new L.LayerGroup()
};

// var crime_layers = {
//     "Robbery": LAYER_ROBBERY,
//     "Homicide": LAYER_HOMICIDE,
//     "Criminal Damage": LAYER_CRIMINAL_DAMAGE,
//     "Sexual Offense": LAYER_SEX_OFFENSE,
//     "Motor Theft": LAYER_MOTOR_THEFT,
//     "Offence Involving Children":LAYER_CHILD_OFFENCE,
//     "Assault": LAYER_ASSAULT,
//     "Narcotics": LAYER_NARCOTICS
//     };

L.control.layers(null, layers).addTo(myMap);


//Set default year selected on load
var yearSelected=2018;

// Load in geojson data
var geoData = `static/data/chi_merged_${yearSelected}.geojson`;
console.log(geoData)

// update median income data year on radio button change
d3.selectAll("input[name='year']").on("change", function(){
    yearSelected = this.value;
    geoData = `static/data/chi_merged_${yearSelected}.geojson`;
    console.log(geoData);
    updateMedianIncomeMap();
});

// function to updateMedianIncomeMap
function updateMedianIncomeMap(){
    var geojson;
    var layerGroup = L.layerGroup().addTo(myMap);
    //layerGroup.removeLayer(geojson);

    // Grab data with d3
    d3.json(geoData).then(function(data) {

    // Create a new choropleth layer
    geojson = L.choropleth(data, {
    
        // Define what  property in the features to use
        valueProperty: "hhincome",

        // Set color scale
        scale: ["AQUAMARINE", "GREEN"],

        // Number of breaks in step range
        steps: 10,

        // q for quartile, e for equidistant, k for k-means
        mode: "q",
        style: {
        // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.5
        },

        // Binding a pop-up to each layer
        onEachFeature: function(feature, layer) {
        layer.bindPopup("Tract #: " + feature.properties.NAME + "<br>Median Household Income:<br>" +
            "$" + feature.properties.hhincome);
        }
    }).addTo(layerGroup);
    layerGroup.addTo(myMap);

    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        d3.select(".legend").remove();
        var div = L.DomUtil.create("div", "info legend");
        var limits = geojson.options.limits;
        var colors = geojson.options.colors;
        var labels = [];

        // Add min & max
        var legendInfo = "<h1>Median Income</h1>" +
         "<div class=\"labels\">" +
           "<div class=\"min\">" + limits[0] + "</div>" +
            "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
          "</div>";

        div.innerHTML = legendInfo;

        limits.forEach(function(limit, index) {
            labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
            });

            div.innerHTML += "<ul>" + labels.join("") + "</ul>";
            return div;
    };

    // Adding legend to the map
    legend.addTo(myMap);

    // Pass our map layers into our layer control
    // Add the layer control to the map
    console.log(basemap)
    });
};

updateMedianIncomeMap();

