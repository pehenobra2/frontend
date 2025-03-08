import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import Catalogo from "./pages/catalogo";
import NotFound from "./pages/notFound";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
