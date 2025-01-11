import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./screens/Landing";
import Game from "./screens/Game";

function App() {
  return (
    <div className="h-screen w-full bg-[#312E2A] ">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

{
  /* <div className="flex justify-center items-center h-screen w-full">

</div> */
}
