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
    const colorScheme = ['#c7e9c0','#a1d99b','#74c476','#fb6a4a','#de2d26','#a50f15'];
    const colorSchemeInterpolated = d3.interpolate("lime", "darkred");
    const colorVarsDiscrete = [-10, 10, 30, 50, 70, 90];

    const color = d3.scaleSequentialQuantile(colorVarsDiscrete, colorSchemeInterpolated);
    console.log(color(20));

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

    // Creating legend steps:
    var legend = L.control({position: 'bottomright'}); // Specify legened position in map

    // Steps for generating the content/info that legend will display;
    legend.onAdd = (map) => {

        var div = L.DomUtil.create('div', 'info legend'),
            labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < colorVarsDiscrete.length; i++) {
            div.innerHTML +=
                '<i style="background:' + color(colorVarsDiscrete[i] + 1) + '"></i> ' +
                colorVarsDiscrete[i] + (colorVarsDiscrete[i + 1] ? '&ndash;' + colorVarsDiscrete[i + 1] + '<br>' : '+');
        }
        


        return div;
    };

    legend.addTo(myMap);
});