import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cards from "./components/Cards";
import Detail from "./pages/Detail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/detail/:id" element={<Detail />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
