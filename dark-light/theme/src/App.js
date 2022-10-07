import React, { useState } from "react";
import "./App.css";
import Content from "./components/content";
import Button from "react-bootstrap/Button";

const mode = {
  dark: {
    color: "white",
    backgroundColor: "black",
  },
  light: {
    color: "black",
    backgroundColor: "white",
  },
};
export const themeData = React.createContext();

function App() {
  const [value, setValue] = useState(mode.dark);

  function changed() {
    if (mode.dark === value) {
      setValue(mode.light);
    } else {
      setValue(mode.dark);
    }
  }

  return (
    <div className="App">
      <button onClick={changed}>
        {mode.dark === value ? "light" : "dark"}
      </button>
      <themeData.Provider value={value}>
        <Content></Content>
      </themeData.Provider>
    </div>
  );

  

}

export default App;
