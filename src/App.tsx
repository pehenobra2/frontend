import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/home";
import Catalogo from "./pages/catalogo";
import NotFound from "./pages/notFound";
import "./App.css";
import { RecoilRoot } from "recoil"
import Produto from "./pages/produto";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <Router>
        <div className="App">
          <Header />
          <div className="body">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/catalogo/:id" element={<Produto/>}/>
            </Routes>
          </div>
        </div>
      </Router>
    </RecoilRoot>  
  );
};

export default App;
