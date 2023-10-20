import React from "react";
import loadingGif from "../assets/load_small.gif";

function Loading() {
  return (
    <div>
      <img src={loadingGif} alt="loading..." />
    </div>
  );
}

export default Loading;
