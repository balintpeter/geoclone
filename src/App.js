import "./App.css";
import { useState, useEffect } from "react";
import StreetView from "./components/StreetView";
import OverlayMap from "./components/OverlayMap";
import { ResultWindow } from "./components/Results";
import locations from "./components/locations.json";

function App() {
  const [positions, setPositions] = useState();
  const [totalScore, setTotalScore] = useState(0);
  const [round, setRound] = useState(0);
  const [guess, setGuess] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [position, setPosition] = useState();

  const guessPosition = (guess) => {
    setGuess(guess);
    setIsModalOpen(true);
  };

  const getRandom = (arr, n) => {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  };

  useEffect(() => {
    setPositions(getRandom(locations, 3));
  }, []);

  useEffect(() => {
    setPosition(null);
    setGuess(null);
    setIsModalOpen(false);
    if (positions) setPosition(positions[round]);
  }, [positions, round]);

  return (
    <div className="App">
      {position && positions && (
        <>
          {position ? <StreetView position={position} /> : null}
          <OverlayMap guess={guessPosition} />
          {isModalOpen ? (
            <ResultWindow
              isOpen={isModalOpen}
              position={position}
              guess={guess}
              totalScore={totalScore}
              round={round}
              closeModal={(score) => {
                if (round + 1 < positions.length) {
                  setTotalScore(totalScore + score);
                  console.log(totalScore);
                  setPosition(null);
                  setRound(round + 1);
                }
                if (round === 2) {
                  setPosition(null);
                  setRound(0);
                  setPositions(getRandom(locations, 3));
                  setTotalScore(0);
                }
              }}
            />
          ) : null}
        </>
      )}
    </div>
  );
}

export default App;
