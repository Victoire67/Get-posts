import { useState } from "react";
import Header from "./components/Header";
import Fetcher from "./components/Fetcher";

function App() {


  return (
      <div className="grid place-content-center items-center h-128">
        <Header />
        <Fetcher />
      </div>
  );
}

export default App;
