import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Player = ({ url }) => {
  const [playing, toggle] = useAudio("https://80.hostpleng.com/api.php?url=http://112.121.151.133:8147/live");

  return (
    <div>
      <button onClick={toggle} className="text-white">{playing ? "Pause" : "Play"}</button>
      <Link className="text-xl text-white" to={"/"}>Home</Link>
    </div>
  );
};

export default Player;