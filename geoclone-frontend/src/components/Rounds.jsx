import Badge from "react-bootstrap/Badge";

const Rounds = ({ maxRounds, round }) => {
  return (
    <Badge
      bg="white"
      style={{
        position: "absolute",
        zIndex: 2,
        fontSize: "2rem",
        background: "white",
        right: 0,
        padding: "0.8rem 1.6rem",
      }}
    >
      <div style={{ fontSize: "1.6rem", margin: "0 0 0.4rem 0" }}>Round:</div>
      {`${round}/${maxRounds}`}
    </Badge>
  );
};

export default Rounds;
