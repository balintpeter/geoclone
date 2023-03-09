import locations from "../components/csvjson.json";

const rad = (x) => {
  return (x * Math.PI) / 180;
};

export const getDistance = (p1, p2) => {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat - p1.lat);
  var dLong = rad(p2.lng - p1.lng);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) *
      Math.cos(rad(p2.lat)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  var text = "";

  if (d > 1000) {
    text = Math.round(d / 1000) + " km";
  } else {
    text = Math.round(d) + " m";
  }
  return { distance: d, text: text, meters: d }; // returns the distance in meter
};

export const getRandom = (arr, n) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

export async function getRandomStreetViewCoordinate() {
  let sv = new window.google.maps.StreetViewService();
  let coords = getRandom(locations, 1)[0];
  let chosenPos = null;
  while (!chosenPos) {
    console.log("Place", `${coords.city}, ${coords.country}`);

    // Check if the coordinate has a corresponding Street View panorama
    await isStreetViewAvailable(coords.lat, coords.lng, sv)
      .then(({ data }) => {
        console.log("pano location", {
          lat: data.location.latLng.lat(),
          lng: data.location.latLng.lng(),
        });
        // console.log("returned pos", { lat: coords.lat, lng: coords.lng });
        // chosenPos = { lat: coords.lat, lng: coords.lng };
        chosenPos = {
          lat: data.location.latLng.lat(),
          lng: data.location.latLng.lng(),
        };
      })
      .catch((err) => console.log("error"));

    coords = getRandom(locations, 1)[0];
  }

  return chosenPos;
}

function isStreetViewAvailable(lat, lng, sv) {
  let STREETVIEW_MAX_DISTANCE = 200;
  let latLng = new window.google.maps.LatLng(lat, lng);
  let promise = sv.getPanorama({
    location: latLng,
    preference: window.google.maps.StreetViewPreference.NEAREST,
    radius: STREETVIEW_MAX_DISTANCE,
    source: window.google.maps.StreetViewSource.OUTDOOR,
  });

  return promise;
}
