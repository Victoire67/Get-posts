import { useState } from "react";
import Header from "./components/Header";
import Fetcher from "./components/Fetcher";

function App() {
  const [count, setCount] = useState(0);

  return (
      <div className="grid place-content-center items-center h-128">
        <Header />
        <Fetcher />
      </div>
  );
}

export default App;
