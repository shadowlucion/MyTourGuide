export const displayMap = locations =>{

    mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhZG93bHVjaW9uIiwiYSI6ImNsMTJkbGFuMjAxZXMzbG1rY256Y3llbjkifQ.42xHG27BXjwuVjvC462OjQ';

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/shadowlucion/cl131j4ji000414rk7xrk7wow',
        scrollZoom: false,

    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach(loc=>{
        // create marker
        const el = document.createElement('div')
        el.className = 'marker'

        // add marker 
        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        })
        .setLngLat(loc.coordinates)
        .addTo(map);


        // add popup 
        new mapboxgl.Popup({
            offset: 50
        })
            .setLngLat(loc.coordinates)
            .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
            .addTo(map)


        // Extend map bounds to include current location
        bounds.extend(loc.coordinates)
    })

    map.fitBounds(bounds,{
        padding: {
            top:200,
            bottom: 150,
            left: 100,
            right: 100
        }
    })
}