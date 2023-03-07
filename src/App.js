import "./App.css";
import { useState, useEffect } from "react";
import StreetView from "./components/StreetView";
import OverlayMap from "./components/OverlayMap";
import Results from "./components/Results";
import { getRandomStreetViewCoordinate, getDistance } from "./utils/mapHelper";
const MAX_ROUNDS = 5;
const App = () => {
  const API_KEY = "AIzaSyBEzsiB9ULE2O1_4Jkt5SKVb8HAtcmWLZY";
  const [round, setRound] = useState(0);
  const [position, setPosition] = useState();
  const [guessPosition, setGuessPosition] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [text, setText] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    getRandomStreetViewCoordinate().then((data) => setPosition(data));
  }, []);

  const guess = (_position) => {
    setGuessPosition(_position);
    const { distance, text } = getDistance(_position, position);
    const score =
      (5000000 - distance) / 1000 > 0
        ? Math.round((5000000 - distance) / 1000)
        : 0;
    setScore(score);
    setText(text);
    setTotalScore(score + totalScore);

    setIsModalOpen(true);
  };

  return (
    <div className="App">
      {position && (
        <>
          <OverlayMap API_KEY={API_KEY} guess={guess} />
          {position ? (
            <StreetView API_KEY={API_KEY} position={position} />
          ) : null}
          {isModalOpen && (
            <Results
              API_KEY={API_KEY}
              isOpen={isModalOpen}
              handleClose={() => {
                if (round + 1 < MAX_ROUNDS) {
                  setPosition(null);
                  setRound(round + 1);
                  getRandomStreetViewCoordinate().then((data) =>
                    setPosition(data)
                  );
                  setIsModalOpen(false);
                } else {
                  setPosition(null);
                  setRound(0);
                  setTotalScore(0);
                  getRandomStreetViewCoordinate().then((data) =>
                    setPosition(data)
                  );
                  setIsModalOpen(false);
                }
              }}
              round={round + 1}
              maxRounds={MAX_ROUNDS}
              guess={guessPosition}
              score={score}
              text={text}
              totalScore={totalScore}
              position={position}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
