/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__javascripts_add_marker__ = __webpack_require__(1);


const markers = [];

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 40.6959498, lng: -73.963771}
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    Object(__WEBPACK_IMPORTED_MODULE_0__javascripts_add_marker__["a" /* addAddress */])(geocoder, map);
  });

  Object(__WEBPACK_IMPORTED_MODULE_0__javascripts_add_marker__["b" /* addWill */])(geocoder, map);
}

window.initMap = initMap;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addAddress;
/* harmony export (immutable) */ __webpack_exports__["b"] = addWill;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__remove_marker__ = __webpack_require__(2);


const markers = [];
/* harmony export (immutable) */ __webpack_exports__["c"] = markers;


function addAddress(geocoder, map) {
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

function addWill(geocoder, map) {
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
  trashIcon.addEventListener("click", (e) => Object(__WEBPACK_IMPORTED_MODULE_0__remove_marker__["a" /* default */])(e.target.parentElement))
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


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__add_marker__ = __webpack_require__(1);


const removeMarker = (item) => {
  let idx = getIndex(item);
  __WEBPACK_IMPORTED_MODULE_0__add_marker__["c" /* markers */][idx].setMap(null);
  __WEBPACK_IMPORTED_MODULE_0__add_marker__["c" /* markers */].splice(idx, 1);
  item.parentElement.removeChild(item);
}

const getIndex = (item) => {
  let list = item.parentElement.childNodes;
  let idx;
  for (let i = 0; i < list.length; i++) {
    if (list[i] === item) idx = i - 1;
  }
  return idx;
}

/* harmony default export */ __webpack_exports__["a"] = (removeMarker);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map