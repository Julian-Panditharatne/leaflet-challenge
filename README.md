# Leaflet Challenge

This challenge is broken into two parts:

- Creating an Earthquake Visualization.

- Gathering and plotting Tectonic Plate Data.

## Part 1: Creating the Earthquake Visualization

For this part of the challenge, I created a map visualization to explore [earthquake data for the past seven days](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson); the visualization was created in the following manner:

- I got the data from the [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php), by clicking the [All Earthquakes](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson) link under the **Past 7 Days** heading.

- I used the URL I got from clicking that link to import the data for visualization using D3 JavaScript library.

- I visualized the data using the Leaflet JavaScript library, by:
  - plotting the earthquakes based on their latitude and longitude coordinates
    - with markers that reflect the magnitude of the earthquakes by their sizes - larger markers for higher magnitudes and smaller for lower
    - and that reflect the depths of the earthquakes with their color - darker colors for greater depths and brighter for lower.
  - adding popups that provide the depth, location, magnitude, and time of the earthquake when its associated marker is clicked.
  - designing a legend that provides context for the map data, specifically the association between marker colors and earthquake depths.

## Part 2: Gathering and Plotting the Tectonic Plate Data

For this part of the challenge, I created a map visualization to illustrate the relationship between tectonic plates and seismic activity. The visualization was created in the following manner:

- I got the data from the [tectonic plates](https://github.com/fraxen/tectonicplates) GitHub repository.

- I imported the [tectonic plate boundaries](https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json) data for visualization using D3.

- I visualized the data using Leaflet by:
  - plotting the tectonic plates data to the map along with the earthquake data.
  - adding other base maps to choose from for visualizing the map.
  - putting the earthquake and tectonic plate data into separate overlays that can be turned on and off independently.
  - adding layer controls to the map to select which overlays and base maps to display in the visualization.

---

## **Repository Files and Folders**

Besides this `README.md` file there are 18 other files and 11 folders.

The **Leaflet-Part-1** and **Leaflet-Part-2** folders both contain similarly named files and folders, except the files in the former are used to create the first map visualization while the latter is used to create the second.

The files and folders within **Leaflet-Part-1** and **Leaflet-Part-2** are named as follows:

- `index.html`: The HTML files used for displaying the visualizations.
- `indexStarter.html`: The HTML files used to create the `index.html` files.
- `style.css`: The CSS files with the stylesheets used to design the visualizations, contained in the **css** folders within the **static** folders.
- `styleStarter.css`: The CSS files used to create the `style.css` files, also contained in the **css** folders.
- `logic.js`: The JavaScript files used to create the visualizations, contained in the **js** folders within the **static** folders.
- `logicStarter.js`:The JavaScript files used to create the `logic.js` files, also contained in the **js** folders.

Along with this `README.md` file and the **Leaflet-Part-1** and **Leaflet-Part-2** folders, the root of the repository contains:

- another altered copy of the `index.html` file.

- another **static** folder, which contains another pair of **css** and **js** folders.

  - the **css** folder contains another copy of `styleStarter.css`, along with an altered `style.css`.
  - the **js** folder contains copies of `logic.js` and `logicStarter.js`, along with `logicP2.js` - which is an altered copy of the `logic.js` file in the **Leaflet-Part-2** folder.

All these altered copies of files and folders were created and placed in the root of the repository so that the map visualizations from both parts could be displayed in a single webpage when deployed to GitHub Pages.

---

## **References**

Agafonkin, V. (n.d.-a). *Documentation - Leaflet - a JavaScript library for interactive maps*. Leafletjs.com. <https://leafletjs.com/reference.html>

Agafonkin, V. (n.d.-b). *Interactive Choropleth Map - Leaflet - a JavaScript library for interactive maps*. Leafletjs.com. <https://leafletjs.com/examples/choropleth/>

Bootstrap. (2022). *Bootstrap*. Getbootstrap.com. <https://getbootstrap.com/>

Bostock, M. (2019, January 29). *Observable*. Observable. <https://observablehq.com/@d3/quantile-choropleth>

Bostock, M. (2023, October 26). *Observable*. Observable. <https://observablehq.com/@d3/working-with-color?collection=@d3/d3-color>

Fil. (2023, October 24). *Observable*. Observable. <https://observablehq.com/@d3/sequential-scales?collection=@d3/d3-scale>

leaflet-providers contributors, & Seelmann, S. (2023). *GitHub - leaflet-extras/leaflet-providers: An extension to Leaflet that contains configurations for various free tile providers*. GitHub. <https://github.com/leaflet-extras/leaflet-providers>

Mapbox. (2024). *Styles API | API Docs*. Mapbox. <https://docs.mapbox.com/api/maps/styles/#mapbox-styles>

MDN Contributors. (2023, September 25). *JavaScript*. MDN Web Docs. <https://developer.mozilla.org/en-US/docs/Web/javascript>

Observable. (n.d.). *What is D3? | D3 by Observable*. D3js.org. <https://d3js.org/what-is-d3>

W3C, Mozilla Corporation, Pemberton, S., & Pettit, B. (2022, January 18). *CSS Color Module Level 3* (T. Çelik, C. Lilley, & L. D. Baron, Eds.). W3.org; W3C. <https://www.w3.org/TR/css-color-3/#colorunits>
