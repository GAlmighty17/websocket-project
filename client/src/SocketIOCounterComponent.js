import React, { useRef } from "react";
import io from "socket.io-client";

export default function SocketIOCounterComponent() {
  const [counter, setCounter] = React.useState(0);
  const [id, setId] = React.useState("");
  const socket = useRef(null);

  const handleCounterIncrease = () => {
    setCounter(counter + 1);
    socket.emit("update-counter", counter + 1);
  };

  React.useEffect(() => {
    socket.current = io.connect("http://localhost:6767");
    socket.on("sync-counter", (count) => {
      if (!isNaN(parseInt(count, 10))) {
        setCounter(parseInt(count, 10));
        console.log("counter updated");
      }
    });
    socket.on("your-id", (data) => {
      setId(data);
    });
  }, []);
  return (
    <div>
      <h1>Counter Id: {id}</h1>
      <h2>{counter}</h2>
      <button className="button" type="button" onClick={handleCounterIncrease}>
        Count++
      </button>
    </div>
  );
}
