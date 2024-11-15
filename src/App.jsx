import "./App.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Garant from "./pages/Garant";
import Contacts from "./pages/Contacts";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/:anchor?" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="info" element={<Contacts />} />
            <Route path="garantType/:id" element={<Garant />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
