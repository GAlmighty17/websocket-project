import React from "react";
let socket = null;

export default function WebsocketCounterComponent() {
  const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {
    socket = new WebSocket("ws://localhost:6767");
    socket.addEventListener("message", (event) => {
      const [type, message] = event.data.split(",");
      if ((type === "updateCounter", !isNaN(parseInt(message, 10)))) {
        setCounter(parseInt(message, 10));
      }
    });
  }, []);

  const handleCounterIncrease = () => {
    socket.send(`syncCounter,${counter + 1}`);
    setCounter(counter + 1);
  };

  return (
    <div>
      <h1>Counter Id</h1>
      <h2>{counter}</h2>
      <button className="button" type="button" onClick={handleCounterIncrease}>
        Count++
      </button>
    </div>
  );
}
