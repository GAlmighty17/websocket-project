import React, { useState } from "react";
import "./App.css";
import SocketIOCounterComponent from "./SocketIOCounterComponent";
import WebsocketCounterComponent from "./WebsocketCounterComponent";

function App() {
  const [type, setType] = useState("ws");

  const handleCheckbox = (e) => {
    setType(e.target.checked ? "ws" : "socket.io");
  };

  return (
    <div className="App">
      <input
        className="select-type"
        type="checkbox"
        checked={type === "ws"}
        onChange={handleCheckbox}
        name="conn-type"
        id="conn-type"
      />
      {type}
      {type === "ws" ? (
        <WebsocketCounterComponent />
      ) : (
        <SocketIOCounterComponent />
      )}
    </div>
  );
}

export default App;
