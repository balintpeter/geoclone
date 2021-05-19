import StreetViewComp from "react-streetview";

const StreetView = ({ position }) => {
  const API_KEY = "AIzaSyBEzsiB9ULE2O1_4Jkt5SKVb8HAtcmWLZY";
  const options = {
    position,
    addressControl: false,
    zoom: 1,
    disableDefaultUI: true,
  };
  return (
    <>
      {position && (
        <StreetViewComp apiKey={API_KEY} streetViewPanoramaOptions={options} />
      )}
    </>
  );
};

export default StreetView;
