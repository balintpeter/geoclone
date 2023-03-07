import "./App.css";
import { useState, useEffect } from "react";
import StreetView from "./components/StreetView";
import OverlayMap from "./components/OverlayMap";
import Results from "./components/Results";
import {
  getRandom,
  getRandomStreetViewCoordinate,
  getStreetViewCoordinate,
} from "./utils/mapHelper";

const App = () => {
  const API_KEY = "AIzaSyBEzsiB9ULE2O1_4Jkt5SKVb8HAtcmWLZY";
  const [positions, setPositions] = useState();
  const [round, setRound] = useState(0);
  const [position, setPosition] = useState();
  const [guessPosition, setGuessPosition] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getRandomStreetViewCoordinate().then((data) => setPositions([data]));
  }, []);

  useEffect(() => {
    if (positions) setPosition(positions[round]);
  }, [positions, round]);

  const guess = (_position) => {
    setGuessPosition(_position);
    setIsModalOpen(true);
  };

  return (
    <div className="App">
      {position && positions && (
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
                if (round + 1 < positions.length) {
                  setPosition(null);
                  setRound(round + 1);
                  setIsModalOpen(false);
                } else {
                  setPosition(null);
                  setRound(0);
                  getRandomStreetViewCoordinate().then((data) =>
                    setPositions([data])
                  );
                  setIsModalOpen(false);
                }
              }}
              guess={guessPosition}
              position={position}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
