import React, { useState } from "react";

//Implemented a hook responsible for transitioning b/w modes
const useVisualMode = function (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (mode, replace = false) {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, -1), mode]);
      setMode(mode);
    } else {
      setHistory((prev) => [...prev, mode]);
      setMode(mode);
    }
  };

  const back = function () {
    if (history.length > 1) {
      let newHistory = [...history.slice(0, -1)];
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  };

  return { mode, transition, back };
};

export default useVisualMode;
