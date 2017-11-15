import {markers} from './add_marker.js';

export const addMidpoint = (map) => {
  const lats = [];
  const longs = [];
  markers.forEach( (marker) => {
    lats.push(marker.position.lat());
    longs.push(marker.position.lng());
  })
  const avgLat = (lats.reduce((a,b) => a + b, 0)) / lats.length;
  const avgLong = (longs.reduce((a,b) => a + b, 0)) / longs.length;
  let midpoint = new google.maps.Marker({
    map: map,
    position: {lat: avgLat, lng: avgLong}
  });
}
