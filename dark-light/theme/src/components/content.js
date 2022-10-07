import React, { useContext } from "react";
import { themeData } from "../App";
import "../App.css";

export default function Content() {
  return (
    <div style={useContext(themeData)}>
      <p></p>
      <h1>Kodluyoruz</h1>
      <h2>React Bootcamp</h2>
      <h3>Week - 3</h3>
      <h4>Dark - Light</h4>
    </div>
  );
}
