import React, { useState } from "react";

const useVisualMode = function (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Empty mode --> Create an Appt (CREATE) (push = transition)
  // Transition function --> to add to the stack & replace (pop & push) [1, 2, 3, 5] replace(5) --> [1,2,3,5]
  // Empty mode  <--  (back)

  const transition = function (mode, replace = false) {
    if (replace) {
      // setHistory([...history.slice(0, -1), mode]);
      setHistory((prev) => [...prev.slice(0, -1), mode]);
      setMode(mode);
    } else {
      // setHistory([...history, mode]);
      setHistory((prev) => [...prev, mode]);
      setMode(mode);
    }
  };

  const back = function () {
    //  history = [EMPTY, CREATE, SAVE] ==CANCEL==> [empty, create] ==> mode = CREATE
    if (history.length > 1) {
      let newHistory = [...history.slice(0, -1)];
      // console.log(newHistory);
      console.log(history);
      // setHistory([...history.slice(0, -1)]);
      setHistory(newHistory);
      console.log(history);
      setMode(newHistory[newHistory.length - 1]);
      // setMode(history[history.length - 1]);
    }
  };

  return { mode, transition, back };
};

export default useVisualMode;
