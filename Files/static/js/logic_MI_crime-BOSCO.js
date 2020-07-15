// Add Years 2017 and 2018 to new layer group
console.log("This is Bosco's Code")
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

// ---------------------------START CRIME DATA----------------------------------------
// Grab the data with d3 for crime

var yearSelected = 2018

var crime_control;
var LAYER_ROBBERY;
var LAYER_HOMICIDE;
var LAYER_CRIMINAL_DAMAGE;
var LAYER_SEX_OFFENSE;
var LAYER_MOTOR_THEFT;
var LAYER_CHILD_OFFENCE;
var LAYER_ASSAULT;
var LAYER_NARCOTICS;

function updateCrimeMap(year){

  var url = "static/data/crime_objects_data.js"
  var yearSelected = parseInt(year);

  d3.json(url).then(function(response) {
    
    // Create a new marker cluster group
    var robberyMarkers = new L.FeatureGroup();
    var homicideMarkers = new L.FeatureGroup();
    var criminalDamageMarkers = new L.FeatureGroup();
    var sexOffenseMarkers = new L.FeatureGroup();
    var motorTheftMarkers = new L.FeatureGroup();
    var childOffenseMarkers = new L.FeatureGroup();
    var assaultMarkers = new L.FeatureGroup();
    var narcoticsMarkers = new L.FeatureGroup();

    console.log("Check Year Selected:")
    console.log(yearSelected)

    // Check for ROBBERY property
    var ROBBERY = response.filter(d => d.Crime === "ROBBERY" && d.Year === yearSelected);

    for (var i = 0; i < ROBBERY.length; i++) {
      // Set the data location property to a variable
      var Crime = ROBBERY[i].Crime;
      var Latitude = ROBBERY[i].Latitude;
      var Longitude = ROBBERY[i].Longitude;
      var Date = ROBBERY[i].Date;
      var Year = ROBBERY[i].Year;
      
      if(LAYER_ROBBERY){
         myMap.removeLayer(LAYER_ROBBERY)
      }

      LAYER_ROBBERY = robberyMarkers.addLayer(L.marker([Latitude, Longitude], {icon: greenIcon})
      .bindPopup("Crime: " + Crime + "<br> Date: " + Date));
      } 

    // Check for HOMICIDE property
    var HOMICIDE = response.filter(d => d.Crime === "HOMICIDE" && d.Year === yearSelected);
    
    for (var i = 0; i < HOMICIDE.length; i++) {
      // Set the data location property to a variable
      var Crime = HOMICIDE[i].Crime;
      var Latitude = HOMICIDE[i].Latitude;
      var Longitude = HOMICIDE[i].Longitude;
      var Date = HOMICIDE[i].Date;
      var Year = HOMICIDE[i].Year;

      if(LAYER_HOMICIDE){
        myMap.removeLayer(LAYER_HOMICIDE)
      }

      // Add a new marker to the cluster group and bind a pop-up
      LAYER_HOMICIDE = homicideMarkers.addLayer(L.marker([Latitude, Longitude],{icon: goldIcon})
      .bindPopup("Crime: " + Crime + "<br> Date: " + Date));
      }  

    // Check for CRIMINAL DAMAGE property
    var CRIMINAL_DAMAGE = response.filter(d => d.Crime === "CRIMINAL DAMAGE" && d.Year === yearSelected);

    for (var i = 0; i < CRIMINAL_DAMAGE.length; i++) {
      // Set the data location property to a variable
      var Crime = CRIMINAL_DAMAGE[i].Crime;
      var Latitude = CRIMINAL_DAMAGE[i].Latitude;
      var Longitude = CRIMINAL_DAMAGE[i].Longitude;
      var Date = CRIMINAL_DAMAGE[i].Date;
      var Year = CRIMINAL_DAMAGE[i].Year;

      if(LAYER_CRIMINAL_DAMAGE){
        myMap.removeLayer(LAYER_CRIMINAL_DAMAGE)
      }

      // Add a new marker to the cluster group and bind a pop-up
      LAYER_CRIMINAL_DAMAGE = criminalDamageMarkers.addLayer(L.marker([Latitude, Longitude], {icon: redIcon})
      .bindPopup("Crime: " + Crime + "<br> Date: " + Date));
    }
    
    // Check for SEX OFFENSE property
    var SEX_OFFENSE = response.filter(d => d.Crime === "SEX OFFENSE" && d.Year === yearSelected);

    for (var i = 0; i < SEX_OFFENSE.length; i++) {
      // Set the data location property to a variable
      var Crime = SEX_OFFENSE[i].Crime;
      var Latitude = SEX_OFFENSE[i].Latitude;
      var Longitude = SEX_OFFENSE[i].Longitude;
      var Date = SEX_OFFENSE[i].Date;
      var Year = SEX_OFFENSE[i].Year;

      if(LAYER_SEX_OFFENSE){
        myMap.removeLayer(LAYER_SEX_OFFENSE)
      }

      // Add a new marker to the cluster group and bind a pop-up
      LAYER_SEX_OFFENSE = sexOffenseMarkers.addLayer(L.marker([Latitude, Longitude], {icon: orangeIcon})
      .bindPopup("Crime: " + Crime + "<br> Date: " + Date));
      }

    // Check for MOTOR VEHICLE THEFT property
    var MOTOR_VEHICLE_THEFT = response.filter(d => d.Crime === "MOTOR VEHICLE THEFT" && d.Year === yearSelected);
        
    for (var i = 0; i < MOTOR_VEHICLE_THEFT.length; i++) {
      // Set the data location property to a variable
      var Crime = MOTOR_VEHICLE_THEFT[i].Crime;
      var Latitude = MOTOR_VEHICLE_THEFT[i].Latitude;
      var Longitude = MOTOR_VEHICLE_THEFT[i].Longitude;
      var Date = MOTOR_VEHICLE_THEFT[i].Date;
      var Year = MOTOR_VEHICLE_THEFT[i].Year;

      if(LAYER_MOTOR_THEFT){
        myMap.removeLayer(LAYER_MOTOR_THEFT)
      }

      // Add a new marker to the cluster group and bind a pop-up
      LAYER_MOTOR_THEFT = motorTheftMarkers.addLayer(L.marker([Latitude, Longitude], {icon: violetIcon})
      .bindPopup("Crime: " + Crime + "<br> Date: " + Date));
      }

    // Check for OFFENSE INVOLVING CHILDREN property
    var OFFENSE_INVOLVING_CHILDREN = response.filter(d => d.Crime === "OFFENSE INVOLVING CHILDREN" && d.Year === yearSelected);

    for (var i = 0; i < OFFENSE_INVOLVING_CHILDREN.length; i++) {
      // Set the data location property to a variable
      var Crime = OFFENSE_INVOLVING_CHILDREN[i].Crime;
      var Latitude = OFFENSE_INVOLVING_CHILDREN[i].Latitude;
      var Longitude = OFFENSE_INVOLVING_CHILDREN[i].Longitude;
      var Date = OFFENSE_INVOLVING_CHILDREN[i].Date;
      var Year = OFFENSE_INVOLVING_CHILDREN[i].Year;

      if(LAYER_CHILD_OFFENCE){
        myMap.removeLayer(LAYER_CHILD_OFFENCE)
      }
      // Add a new marker to the cluster group and bind a pop-up
      LAYER_CHILD_OFFENCE = childOffenseMarkers.addLayer(L.marker([Latitude, Longitude], {icon: blackIcon})
      .bindPopup("Crime: " + Crime + "<br> Date: " + Date));
      }
    

    // Check for ASSAULT property
    var ASSAULT = response.filter(d => d.Crime === "ASSAULT" && d.Year === yearSelected);

    for (var i = 0; i < ASSAULT.length; i++) {
      // Set the data location property to a variable
      var Crime = ASSAULT[i].Crime;
      var Latitude = ASSAULT[i].Latitude;
      var Longitude = ASSAULT[i].Longitude;
      var Date = ASSAULT[i].Date;
      var Year = ASSAULT[i].Year;
      
      if(LAYER_ASSAULT){
        myMap.removeLayer(LAYER_ASSAULT)
      }

      // Add a new marker to the cluster group and bind a pop-up
      LAYER_ASSAULT = assaultMarkers.addLayer(L.marker([Latitude, Longitude], {icon: greyIcon})
      .bindPopup("Crime: " + Crime + "<br> Date: " + Date));
      }
    
    // // Check for NARCOTICS property
    var NARCOTICS = response.filter(d => d.Crime === "NARCOTICS" && d.Year === yearSelected);

    for (var i = 0; i < NARCOTICS.length; i++) {
      // Set the data location property to a variable
      var Crime = NARCOTICS[i].Crime;
      var Latitude = NARCOTICS[i].Latitude;
      var Longitude = NARCOTICS[i].Longitude;
      var Date = NARCOTICS[i].Date;
      var Year = NARCOTICS[i].Year;

      if(LAYER_NARCOTICS){
        myMap.removeLayer(LAYER_NARCOTICS)
      }

      // Add a new marker to the cluster group and bind a pop-up
      LAYER_NARCOTICS = narcoticsMarkers.addLayer(L.marker([Latitude, Longitude], {icon: blueIcon} )
      .bindPopup("Crime: " + Crime + "<br> Date: " + Date));
      }

      // Initialize all of the LayerGroups we'll be using
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

      //List of layers
    var crime_layers = {
      "Robbery": LAYER_ROBBERY,
      "Homicide": LAYER_HOMICIDE,
      "Criminal Damage": LAYER_CRIMINAL_DAMAGE,
      "Sexual Offense": LAYER_SEX_OFFENSE,
      "Motor Theft": LAYER_MOTOR_THEFT,
      "Offence Involving Children":LAYER_CHILD_OFFENCE,
      "Assault": LAYER_ASSAULT,
      "Narcotics": LAYER_NARCOTICS
      };
    
    console.log(ROBBERY)
  if (crime_control){
    console.log(crime_control)
    crime_control.remove(myMap)
    
  }
  crime_control = L.control.layers(null, crime_layers, {collapsed:false}).addTo(myMap);

  });
};

updateCrimeMap(yearSelected);
// -------------------------------END CRIME LAYERS-------------------------------------


// Load in geojson data
var geoData = `static/data/chi_merged_${yearSelected}.geojson`;

// update data year on radio button change
d3.selectAll("input[name='year']").on("change", function(){
  yearSelected = this.value;
  geoData = `static/data/chi_merged_${yearSelected}.geojson`;
  console.log(geoData);
  
  updateMedianIncomeMap();
  updateCrimeMap(yearSelected);
});

// function to updateMedianIncomeMap

var geojson;

function updateMedianIncomeMap(){
    var layerGroup = L.layerGroup().addTo(myMap);
    //layerGroup.removeLayer(geojson);

    // Grab data with d3
    d3.json(geoData).then(function(data) {
    
    if(geojson){
      geojson.remove(myMap)
    }
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
        fillOpacity: 0.7
        },

        // Binding a pop-up to each layer
        onEachFeature: function(feature, layer) {
        layer.bindPopup("Tract #: " + feature.properties.NAME + "<br>Median Household Income:<br>" +
            "$" + feature.properties.hhincome);
        }
    }).addTo(layerGroup);
    //layerGroup.addTo(myMap);

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
           "<div class=\"min\">" + 4000 + "</div>" +
            "<div class=\"max\">" + 260000 + "</div>" +
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

    });
};

updateMedianIncomeMap();

