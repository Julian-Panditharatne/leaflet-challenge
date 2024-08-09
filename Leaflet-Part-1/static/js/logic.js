// Store the earthquake JSON URL https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson
// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson
let earthquakeJSON = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Get the JSON data from that URL
d3.json(earthquakeJSON).then((data) => {
    // Get the features field, which contains the earthquake data
    let quakeData = data.features;

    const colorVars = quakeData.map((feat) => feat.geometry.coordinates[2]);
    console.log(colorVars);
    console.log(Math.min(...colorVars));
    console.log(Math.max(...colorVars));
    const domain = [Math.floor(Math.min(...colorVars)), Math.ceil(Math.max(...colorVars))];
    console.log(domain);
    //d3.schemeRdYlGn[6]
    const colour = d3.scaleLinear(domain, ["green", "red"]);
    console.log(colour);

    // Function for creating the circle markers for each feature
    function pointToLayer(feature, latlng) {
        return L.circleMarker(latlng, {
            radius: feature.properties.mag*5,
            stroke: true,
            fillOpacity: 1,
            color: "black",
            fillColor: colour(feature.geometry.coordinates[2])
        });
    };

    // Function for creating popups that display the place and time of each feature
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}\n depth: ${feature.geometry.coordinates[2]}</p>`);
    };

    let quakes = L.geoJSON(quakeData, {
        pointToLayer: pointToLayer,
        onEachFeature: onEachFeature
      });

    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    let myMap = L.map("map", {
        center: [
          37.09, -95.71
        ],
        zoom: 5,
        layers: [street, quakes]
    });
});