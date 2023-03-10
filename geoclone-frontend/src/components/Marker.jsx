const Marker = ({ isGuess }) => {
  return (
    <>
      <img
        src={isGuess ? "marker_person.png" : "marker.png"}
        alt="marker"
        style={{
          background: "transparent",
          width: "40px",
          height: "40px",
          marginLeft: "-20px",
          marginTop: "-40px",
        }}
      />
    </>
  );
};

export default Marker;
