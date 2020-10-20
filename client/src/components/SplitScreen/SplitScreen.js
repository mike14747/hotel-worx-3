import React from "react";
import SplitPane from "react-split-pane";
import './style.css';


export default function splitScreen() {
  return (
    <div>
      <SplitPane
        split="vertical"
        minSize={50}
        defaultSize={parseInt(localStorage.getItem("splitPos"), 10)}
        onChange={(size) => localStorage.setItem("splitPos", size)}
      >
        <div>
          <h1>arrival</h1>
        </div>
        <div>
          <h1>departure</h1>
        </div>
      </SplitPane>
    </div>
  );
}
