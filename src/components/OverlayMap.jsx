import GoogleMap from "google-map-react";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Marker from "./Marker";

const OverlayMap = ({ API_KEY, guess }) => {
  const [marker, setMarker] = useState(null);
  const center = { lat: 46.9171876, lng: 17.8951832 };
  const zoom = 1;

  const handleClick = ({ x, y, lat, lng, event }) => {
    setMarker({ lat, lng });
  };

  return (
    <div className="map_overlay">
      <GoogleMap
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
        onClick={handleClick}
      >
        {marker && (
          <Marker
            lat={marker.lat}
            lng={marker.lng}
            text="Marker"
            isGuess={true}
          />
        )}
      </GoogleMap>
      <Button
        variant="primary"
        // block
        style={{ width: "100%" }}
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
