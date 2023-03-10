import Badge from "react-bootstrap/Badge";

const Timer = ({ time }) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return (
    <Badge
      bg="white"
      style={{
        position: "absolute",
        zIndex: 2,
        fontSize: "2rem",
        background: "white",
        padding: "0.8rem 1.6rem",
      }}
    >
      <div style={{ fontSize: "1.6rem", margin: "0 0 0.4rem 0" }}>Time:</div>
      {`${minutes.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}:${seconds.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}`}
    </Badge>
  );
};

export default Timer;
