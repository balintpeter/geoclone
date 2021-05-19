import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import GoogleMap from "google-map-react";
import { Marker } from "./Marker";

export const ResultWindow = ({
  isOpen,
  position,
  guess,
  round,
  closeModal,
  totalScore,
}) => {
  const API_KEY = "AIzaSyBEzsiB9ULE2O1_4Jkt5SKVb8HAtcmWLZY";
  const rad = (degrees) => {
    var pi = Math.PI;
    return degrees * (pi / 180);
  };
  const getDistance = function (p1, p2) {
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

    let text = "";
    if (d > 999) {
      text = Math.round(d / 1000) + " km";
    } else {
      text = Math.round(d) + " m";
    }
    return { dist: d, text }; // returns the distance in meter
  };

  const handleGoogleMapApi = (google) => {
    var line = new google.maps.Polyline({
      path: [guess, position],
      geodesic: false,
      strokeColor: "#bd7d33",
      strokeOpacity: 1,
      strokeWeight: 3,
    });

    line.setMap(google.map);
  };

  const { dist, text } = getDistance(position, guess);
  const score =
    Math.round((5000000 - dist) / 1000) > 0
      ? Math.round((5000000 - dist) / 1000)
      : 0;

  return (
    <Modal size="lg" show={isOpen} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>3/{round + 1} Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Distance: {text}</h3>
        <h4>Points: {score}</h4>
        <h4>Total: {totalScore + score}</h4>
        <div style={{ width: "100%", height: "500px" }}>
          <GoogleMap
            bootstrapURLKeys={{ key: API_KEY }}
            defaultCenter={{
              lat: (guess.lat + position.lat) / 2,
              lng: (guess.lng + position.lng) / 2,
            }}
            disableDefaultUI={true}
            defaultZoom={getDistance(position, guess).d < 1000000 ? 5 : 1}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={handleGoogleMapApi}
          >
            {guess && (
              <Marker
                text="My Marker"
                lat={guess.lat}
                lng={guess.lng}
                isGuess={true}
              />
            )}
            {position && (
              <Marker
                text="My Marker"
                lat={position.lat}
                lng={position.lng}
                isGuess={false}
              />
            )}
          </GoogleMap>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => closeModal(score)}>
          {round < 2 ? "Next Round" : "Új játék"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
