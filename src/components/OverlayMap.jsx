import GoogleMap from "google-map-react";
import Button from "react-bootstrap/Button";
import { Marker } from "./Marker";
import { useState } from "react";

const OverlayMap = ({ guess }) => {
  const [marker, setMarker] = useState(null);
  const API_KEY = "AIzaSyBEzsiB9ULE2O1_4Jkt5SKVb8HAtcmWLZY";
  const _onClick = ({ x, y, lat, lng, event }) => {
    setMarker({ lat, lng });
  };

  return (
    <div
      className="overlay_map"
      style={{
        height: "400px",
        width: "600px",
        position: "absolute",
        bottom: "2em",
        right: "2em",
        zIndex: 2,
      }}
    >
      <GoogleMap
        onClick={_onClick}
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={{
          lat: 46.9171876,
          lng: 17.8951832,
        }}
        defaultZoom={1}
      >
        {marker && (
          <Marker
            text="My Marker"
            lat={marker.lat}
            lng={marker.lng}
            isGuess={true}
          />
        )}
      </GoogleMap>
      <Button
        style={{ position: "absolute", bottom: 0 }}
        onClick={() => {
          if (marker) {
            guess(marker);
            setMarker(null);
          }
        }}
      >
        Guess
      </Button>
    </div>
  );
};

export default OverlayMap;
