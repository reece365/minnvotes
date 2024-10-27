mapboxgl.accessToken = 'pk.eyJ1IjoicmVlY2UzNjUyIiwiYSI6ImNtMm14d3lncjAwNGkybXE4YzB4d3gzOG8ifQ.yElaYNuLmKw1OufKJkROfg';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/dark-v11', // style URL
        zoom: 4, // starting zoom
        center: [-95, 46] // // starting center in [lng, lat]
    });

    map.on('style.load', () => {
        map.setFog({}); // Set the default atmosphere style
    });

    map.on('load', () => {
        map.addSource('voting-locs', {
            type: 'geojson',
            // Use a URL for the value for the `data` property.
            data: 'assets/js/voting_data.js'
        });

        map.addLayer({
            'id': 'voting-locs-layer',
            'type': 'circle',
            'source': 'voting-locs',
            'paint': {
                'circle-radius': 6,
                'circle-stroke-width': 2,
                'circle-color': '#0C6CF6',
                'circle-stroke-color': 'white'
            }
        });

        map.addControl(
          new MapboxGeocoder({
              accessToken: mapboxgl.accessToken,
              mapboxgl: mapboxgl,
              zoom: 10,
              placeholder: 'Search for a voting location',
              proximity: {
                    longitude: -95.000,
                    latitude: 46.000
                }
          })
      );

        map.on('click', 'voting-locs-layer', (e) => {
            window.early_voting_location = {"name": e.features[0].properties["Name"], "address": e.features[0].properties["Address"]};
            document.getElementById("selected_location").innerHTML = e.features[0].properties["Name"];

            const coordinates = e.features[0].geometry.coordinates.slice();
            
            // Get the GeoJSON property "name"
            const name = e.features[0].properties["Name"];
            const open = e.features[0].properties["Open"];

            new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(`<b>${name} (Selected)</b><br>${open}`)
                .addTo(map);
        });

        map.on('mouseenter', 'voting-locs-layer', () => {
            map.getCanvas().style.cursor = 'pointer';
        });
    });