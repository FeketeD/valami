import { BrowserRouter as Router, NavLink, Routes, Route } from "react-router-dom";
import ListPage from "./ListPage";
import DelPage from "./DelPage";
import CreatePage from "./CreatePage";
import ModPage from "./ModPage";
import SinglePage from "./SinglePage";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={'/'} style={{textDecoration: "none"}}>
                <span className="nav-link">Itemek</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/uj-item'} style={{textDecoration: "none"}}>
                <span className="nav-link">Új item</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" exact element={<ListPage />} />
        <Route path="/item/:itemId" exact element={<SinglePage />} />
        <Route path="/uj-item" exact element={<CreatePage />} />
        <Route path="/mod-item/:itemId" exact element={<ModPage />} />
        <Route path="/del-item/:itemId" exact element={<DelPage />} />
      </Routes>
    </Router>
  );
}

export default App;
