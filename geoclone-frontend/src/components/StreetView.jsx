// import ReactStreetView from "react-streetview";
import Streetview from "react-google-streetview";

const StreetView = ({ API_KEY, position }) => {
  const options = {
    position,
    pov: { heading: 100, pitch: 0 },
    zoom: 1,
    disableDefaultUI: true,
    showRoadLabels: false,
  };
  return (
    <>
      {position && (
        <Streetview apiKey={API_KEY} streetViewPanoramaOptions={options} />
      )}
    </>
  );
};

export default StreetView;
