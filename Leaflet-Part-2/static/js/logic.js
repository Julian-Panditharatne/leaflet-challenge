// Store the earthquake JSON URL https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson
// The JSON to be used in Part 2: https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json
let earthquakeJSON = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
let platesJSON = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// Get the earthquakeJSON data from its URL
d3.json(earthquakeJSON).then((dataQuake) => {
    // Get the platesJSON data from its URL, and then get the feature data from the features field
    let plateData = d3.json(platesJSON).then((dataPlate) => dataPlate.features);

    // Get the earthquake data from the earthquakeJSON's features field
    let quakeData = dataQuake.features;

    const colorSchemeInterpolated = d3.interpolate("lime", "darkred"); // The color range that will be used to indicate the depth of each feature 
    const colorVarsDiscrete = [-10, 10, 30, 50, 70, 90]; // The groups into which all the depths of each feature will be aggregated
    const color = d3.scaleSequentialQuantile(colorVarsDiscrete, colorSchemeInterpolated); // The color scale that will be used to assign to each marker its color based on the depth of its associated feature

    // Function for creating the circle markers for each feature
    function quakePointToLayer(feature, latlng) {
        return L.circleMarker(latlng, {
            radius: feature.properties.mag*5,
            stroke: true,
            weight: 1,
            fillOpacity: 1,
            color: "black",
            fillColor: color(feature.geometry.coordinates[2])
        });
    };

    // Function for creating popups that display the place and time of each feature
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}\n\n Magnitude: ${feature.properties.mag} \n Depth: ${feature.geometry.coordinates[2]}</p>`);
    };

    // Create a GeoJSON layer that contains the features array on the quakeData object.
    // Run the previous functions for each feature of the array.
    let quakes = L.geoJSON(quakeData, {
        pointToLayer: quakePointToLayer,
        onEachFeature: onEachFeature
      });

    // Function for creating line markers to display the tectonic plate borders
    function plateLineToLayer(feature, latlng) {
        return L.polyline(latlng, {
            color: "orange"
        });
    };

    // Create a GeoJSON layer that contains the features array on the plateData object.
    // Run the previous function for each feature of the array.
    let plates = L.geoJSON(plateData, {
        pointToLayer: plateLineToLayer
    });

      // Create an overlay object to hold earthquake and tectonic overlay.
    let overlayMaps = {
        Earthquakes: quakes,
        'Tectonic Plates': plates
    };
    // Create the default base map layer
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Create the other base map layers
    // URL for outdoors: mapbox://styles/mapbox/outdoors-v12 https://api.mapbox.com/styles/v1/mapbox/outdoors-v12?access_token=pk.eyJ1IjoibWFwLTF0LTB1dCIsImEiOiJjbHpyaDI3ZW4wNnpoMmxvbm1ka25xNGVtIn0.v7zheM6QmhTBzaEFLtxLXg
    let outdoorTileURL = "https://api.mapbox.com/styles/v1/mapbox/outdoors-v12?access_token=pk.eyJ1IjoibWFwLTF0LTB1dCIsImEiOiJjbHpyaDI3ZW4wNnpoMmxvbm1ka25xNGVtIn0.v7zheM6QmhTBzaEFLtxLXg";

    // 
    let outdoors = L.tileLayer(outdoorTileURL, {
        attribution: "Map data: &copy; <a href='https://www.mapbox.com/'>Mapbox</a>"
    });

    // URL for satellite: mapbox://styles/mapbox/satellite-v9 https://api.mapbox.com/styles/v1/mapbox/satellite-v9?access_token=pk.eyJ1IjoibWFwLTF0LTB1dCIsImEiOiJjbHpyaDI3ZW4wNnpoMmxvbm1ka25xNGVtIn0.v7zheM6QmhTBzaEFLtxLXg
    let satelliteTileURL = "https://api.mapbox.com/styles/v1/mapbox/satellite-v9?access_token=pk.eyJ1IjoibWFwLTF0LTB1dCIsImEiOiJjbHpyaDI3ZW4wNnpoMmxvbm1ka25xNGVtIn0.v7zheM6QmhTBzaEFLtxLXg";

   // 
   let satellite = L.tileLayer(satelliteTileURL, {
    attribution: "Map data: &copy; <a href='https://www.mapbox.com/'>Mapbox</a>"
    });

    // Create a baseMaps object.
    let baseMaps = {
        
    };

    // Create the map with the streetmap and earthquakes layers to display on load.
    let myMap = L.map("map", {
        center: [
          37.09, -95.71
        ],
        zoom: 5,
        layers: [street, quakes]
    });

    // Creating legend steps:
    var legend = L.control({position: 'bottomright'}); // Specify legend position in map

    // Steps for generating the content/info that legend will display;
    legend.onAdd = (map) => {
        var div = L.DomUtil.create('div', 'info legend');
        // loop through the depth intervals and generate a label with a colored square for each interval     
        colorVarsDiscrete.map((v, i) => {
            div.innerHTML +=
                '<i style="background:' + color(v + 1) + '"></i> ' +
                v + (colorVarsDiscrete[i + 1] ? '&ndash;' + colorVarsDiscrete[i + 1] + '<br>' : '+');
        });
        return div;
    };

    legend.addTo(myMap); // Add the legend into the map

});