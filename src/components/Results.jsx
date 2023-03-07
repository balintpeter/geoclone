import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getDistance } from "../utils/mapHelper";
import GoogleMap from "google-map-react";
import Marker from "./Marker";

const Results = ({ API_KEY, isOpen, handleClose, position, guess }) => {
  const { distance, text } = getDistance(position, guess);
  const score =
    (5000000 - distance) / 1000 > 0
      ? Math.round((5000000 - distance) / 1000)
      : 0;

  const handleGoogleMapApi = (google) => {
    var line = new google.maps.Polyline({
      path: [guess, position],
      strokeColor: "#bd7d33",
      strokeOpacity: 1,
      strokeWeight: 3,
    });

    line.setMap(google.map);
  };
  return (
    <Modal size="lg" show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Results</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Distance: {text}
        <br />
        Score: {score}
        <br />
        <div style={{ width: "100%", height: "500px" }}>
          <GoogleMap
            bootstrapURLKeys={{ key: API_KEY }}
            defaultCenter={{
              lat: (guess.lat + position.lat) / 2,
              lng: (guess.lng + position.lng) / 2,
            }}
            defaultZoom={1}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={handleGoogleMapApi}
          >
            {guess && (
              <Marker
                lat={guess.lat}
                lng={guess.lng}
                text="Marker"
                isGuess={true}
              />
            )}
            {position && (
              <Marker
                lat={position.lat}
                lng={position.lng}
                text="Marker"
                isGuess={false}
              />
            )}
          </GoogleMap>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Next round
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Results;
