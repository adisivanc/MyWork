import { Routes, Route } from "react-router-dom";
import AfterLogin from "./components/AfterLogin";
import BeforeLogin from "./components/BeforeLogin";
import Todolist from "./components/Todolist";

function App() {


  return (
      <>
      <Routes>
        <Route path="/" element={<BeforeLogin/>}></Route>
        <Route path="/landing" element={<AfterLogin/>}></Route>
        <Route path="/todolist" element={<Todolist/>}></Route>
      </Routes>
      </>
  );
}

export default App;
