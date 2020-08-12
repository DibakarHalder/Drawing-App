import React from "react";
import "./styles.scss";
import AddIcon from "@material-ui/icons/AddCircle";
import Tooltip from "@material-ui/core/Tooltip";

export default function Home({ history }) {
  let canvases = JSON.parse(window.localStorage.getItem("canvases")) || {};
  console.log("hi");
  return (
    <div className="home">
      <h1>Drawing app</h1>
      <div>Recent canvases</div>
      <div className="row flex-wrap">
        {Object.keys(canvases).map((key) => {
          const src = JSON.parse(window.localStorage.getItem(key));
          return (
            <div key={key} className="canvas-container">
              <img
                src={src}
                className="canvas-image"
                alt={canvases[key].title}
              />
              <div className="canvas-title">{canvases[key].title}</div>
            </div>
          );
        })}
        <Tooltip
          title="Add a new canvas"
          aria-label="add"
          onClick={() => {
            const newKey = Date.now().toString(8);
            canvases[newKey] = { title: "Untitled" };
            window.localStorage.setItem("canvases", JSON.stringify(canvases));
            history.push(`/canvas/${newKey}`);
          }}
        >
          <AddIcon color="primary" style={{ width: 60, height: 60 }} />
        </Tooltip>
      </div>
    </div>
  );
}
