// Store the earthquake JSON URL https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson
// The JSON to be used in Part 2: https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json
let earthquakeJSON = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Get the JSON data from that URL
d3.json(earthquakeJSON).then((data) => {
    // Get the features field, which contains the earthquake data
    let quakeData = data.features;

    const colorSchemeInterpolated = d3.interpolate("lime", "darkred"); // The color range that will be used to indicate the depth of each feature 
    const colorVarsDiscrete = [-10, 10, 30, 50, 70, 90]; // The groups into which all the depths of each feature will be aggregated
    const color = d3.scaleSequentialQuantile(colorVarsDiscrete, colorSchemeInterpolated); // The color scale that will be used to assign to each marker its color based on the depth of its associated feature

    // Function for creating the circle markers for each feature
    function pointToLayer(feature, latlng) {
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
        pointToLayer: pointToLayer,
        onEachFeature: onEachFeature
      });

    // Create the default base map layer
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

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