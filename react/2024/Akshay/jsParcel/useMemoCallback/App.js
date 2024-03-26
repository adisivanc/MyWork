import React, { useCallback, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import { findNthPrime } from "./Utilis/prime";

const App = () => {
  const [primeNum, setPrimeNum] = useState(0);
  const [square, setSquare] = useState(0);

  console.log("Rendering");

  const prime = useMemo(()=>findNthPrime(primeNum),[primeNum]);

  const handlePrime = useCallback((ev) => {
    setPrimeNum(ev.target.value);
    console.log("Prime Rendering");
  },[]);

  const handleSquare = useCallback((ev) => {
    setSquare(ev.target.value);
    console.log("Square Rendering");
  }, []);

  return (
    <div>
      <input
        type="number"
        name="prime"
        value={primeNum}
        onChange={handlePrime}
      />
      <div>nth Prime: {prime}</div>

      <input
        type="number"
        name="square"
        value={square}
        onChange={handleSquare}
      />
      <div>square: {square * square}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
