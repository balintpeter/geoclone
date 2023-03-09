import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { getHighScores } from "../utils/api";

const HighScores = () => {
  const [highScores, setHighScores] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHighScores();
      return data;
    };
    setLoading(true);
    getHighScores().then((scores) => setHighScores(scores.highScores));
  }, []);

  return (
    <ListGroup sx>
      {highScores.map((score) => (
        <ListGroup.Item>{JSON.stringify(score, null, 2)}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default HighScores;
