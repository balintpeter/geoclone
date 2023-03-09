import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { getDistance } from "../utils/mapHelper";
import GoogleMap from "google-map-react";
import Marker from "./Marker";
import { getDistanceString } from "../utils/helpers";

const Results = ({
  API_KEY,
  isOpen,
  handleClose,
  position,
  round,
  maxRounds,
  guess,
  score,
  totalScore,
}) => {
  const handleGoogleMapApi = (google) => {
    var line = new google.maps.Polyline({
      path: [guess, position],
      strokeColor: "#bd7d33",
      strokeOpacity: 1,
      strokeWeight: 3,
    });

    line.setMap(google.map);
  };

  if (guess)
    return (
      <Modal size="lg" show={isOpen} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            Results {maxRounds}/{round}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Distance: {getDistanceString(getDistance(guess, position))}
          <br />
          Score: {score}
          <br />
          <strong>Total Score: {totalScore}</strong>
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
            {round < maxRounds ? "Next round" : "New game"}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  else
    return (
      <Modal size="lg" show={isOpen} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>
            Results {maxRounds}/{round}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Time's up!
          <br />
          Score: {score}
          <br />
          <strong>Total Score: {totalScore}</strong>
          <br />
          <div style={{ width: "100%", height: "500px" }}>
            <GoogleMap
              bootstrapURLKeys={{ key: API_KEY }}
              defaultCenter={{
                lat: position.lat,
                lng: position.lng,
              }}
              defaultZoom={4}
              yesIWantToUseGoogleMapApiInternals
            >
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
            {round < maxRounds ? "Next round" : "New game"}
          </Button>
        </Modal.Footer>
      </Modal>
    );
};

export default Results;
