// Store the earthquake JSON URL
let earthquakeJSON = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Get the JSON data from that URL
d3.json(earthquakeJSON).then((data) => {
    // Get the features field, which contains the earthquake data
    let quakeData = data.features;

    // Function for creating the circle markers for each feature
    function pointToLayer(geoJsonPoint, latlng) {

    };
});