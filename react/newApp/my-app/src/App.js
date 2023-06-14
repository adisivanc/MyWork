import { Routes, Route } from "react-router-dom";
import AfterLogin from "./components/AfterLogin";
import BeforeLogin from "./components/BeforeLogin";

function App() {


  return (
      <>
      <Routes>
        <Route path="/" element={<BeforeLogin/>}></Route>
        <Route path="/landing" element={<AfterLogin/>}></Route>
      </Routes>
      </>
  );
}

export default App;
