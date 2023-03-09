import "./App.css";
import { useState, useEffect } from "react";
import { getScore } from "./utils/gameManager";
import StreetView from "./components/StreetView";
import OverlayMap from "./components/OverlayMap";
import Timer from "./components/Timer";
import Results from "./components/Results";
import { getRandomStreetViewCoordinate, getDistance } from "./utils/mapHelper";
import Rounds from "./components/Rounds";
const MAX_ROUNDS = 5;
const MAX_TIME = 10;
const App = () => {
  const API_KEY = "AIzaSyBEzsiB9ULE2O1_4Jkt5SKVb8HAtcmWLZY";
  const [gameState, setGameState] = useState("GUESS");
  const [time, setTime] = useState(MAX_TIME);
  const [timing, setTiming] = useState(false);
  const [round, setRound] = useState(0);
  const [position, setPosition] = useState();
  const [guessPosition, setGuessPosition] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    newRound();
  }, []);

  useEffect(() => {
    if (!timing) return;

    if (time > 0)
      setTimeout(() => {
        setTime((time) => time - 1);
      }, 1000);
    else {
      endRound();
    }
  }, [time, timing]);

  const endRound = (_guessPosition = null) => {
    setTiming(false);
    setGuessPosition(_guessPosition);
    const score = _guessPosition
      ? getScore(getDistance(_guessPosition, position), time)
      : 0;
    setScore(score);
    setTotalScore(score + totalScore);

    setIsModalOpen(true);
    setGameState("RESULTS");
  };

  const newRound = () => {
    getRandomStreetViewCoordinate().then((data) => {
      setPosition(data);
      setTime(MAX_TIME);
      setTiming(true);
      setGameState("GUESS");
    });
  };

  const newGame = () => {
    setRound(0);
    setTotalScore(0);
    newRound();
    setIsModalOpen(false);
  };

  const nextRound = () => {
    {
      setRound(round + 1);
      newRound();
      setIsModalOpen(false);
    }
  };

  return (
    <div className="App">
      {position && (
        <>
          <Timer time={time} />
          <Rounds maxRounds={MAX_ROUNDS} round={round + 1} />
          <OverlayMap API_KEY={API_KEY} guess={endRound} />
          {position ? (
            <StreetView API_KEY={API_KEY} position={position} />
          ) : null}
          {isModalOpen && (
            <Results
              API_KEY={API_KEY}
              isOpen={isModalOpen}
              handleClose={() => {
                if (round + 1 < MAX_ROUNDS) {
                  nextRound();
                } else {
                  newGame();
                }
              }}
              round={round + 1}
              maxRounds={MAX_ROUNDS}
              guess={guessPosition}
              score={score}
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
