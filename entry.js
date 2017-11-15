import {addAddress, addWill} from './javascripts/add_marker';

const markers = [];

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 40.6959498, lng: -73.963771}
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    addAddress(geocoder, map);
  });

  addWill(geocoder, map);
}

window.initMap = initMap;
