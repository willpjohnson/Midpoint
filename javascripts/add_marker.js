import removeMarker from './remove_marker';

export const markers = [];

export function addAddress(geocoder, map) {
  var address = document.getElementById('address').value + document.getElementById('city').value;
  var title = document.getElementById('title').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
      addLocationToList(title);
      markers.push(marker);
      clearInput();
      resizeMap(map);
    } else {
      alert('Midpoint could not add location for the following reason: ' + status);
    }
  });
}

export function addWill(geocoder, map) {
  geocoder.geocode({'address': '370 Cornelia St Brooklyn NY'}, function(results, status) {
    if (status === 'OK') {
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
      addLocationToList('Will');
      markers.push(marker);
    } else {
      alert('Midpoint could not add location for the following reason: ' + status);
    }
  });
}

const addLocationToList = (title) => {
  let item = document.createElement("li");
  let trashIcon = document.createElement("img");
  trashIcon.classList.add("trash-icon");
  trashIcon.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGsSURBVGhD7dq/K0VxGMfxm19FoSQpm4lB2FHKRBJlMtiUxWJAFpuN7Fb/gQmLVVlMFoVsiuRHIT/eT91vPenp3HM7v255PvVa7nPP934/0b3nnnNLKWUGJ3jBTwyfOMcKGlAT2YK12biO0IhCM4pvWBusxhoKzT70hr5wh6sI13iHPu4SheYCekNjiJMOPEAf245M0oZJzEe4h97MAqznWeSvo49dhvU8MYseVJ1W/H2hor1iGLHSjSXswFqsaIeQ/Q0hMiOwFqg164iMF8lZxSKdsN41ak0f/memcVwDNpAo8iFl/Y/m7QCJ4kVS5kVCKhV5gpzFisfyY8EHwky8Qc+foefyFUDPtcyLDCBETsP1TM6LdORDTM+noHMDPde8SIgXgRcxeJEQLwIvYvAiIV4EXsTgRUK8CLyIwYuEeBF4EYMXCalUZBXhCvli+bFAfhCgr6DLZvR8G3r+936klnmRvHiRkDlYC+dtF4kid7Dk0qe1eJ7kfn/i7MFaPC9nqEPiNOMU1otk7Ra9SC1N2ETUW2Sa5Mq9/GCnC5mkHv0Yx0RGBtGCKlIq/QI+C+St9GvhtAAAAABJRU5ErkJggg=="
  trashIcon.addEventListener("click", (e) => removeMarker(e.target.parentElement))
  item.innerHTML = title;
  item.appendChild(trashIcon);
  document.getElementById('locations-list').appendChild(item);
}

const clearInput = () => {
  document.getElementById('address').value = "";
  document.getElementById('title').value = "";
}

const resizeMap = (map) => {
  let bounds = new google.maps.LatLngBounds();
  markers.forEach( (marker) => {
    bounds.extend(marker.getPosition())
  })
  map.fitBounds(bounds);
}
