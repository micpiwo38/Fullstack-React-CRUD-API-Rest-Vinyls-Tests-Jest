import "./App.css";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <>
      <header>
        <nav>
          <NavBar />
        </nav>
      </header>
      <div className="container shadow mt-5 p-3 rounded">
        <h1 className="text-center text-info">Fullstack React Ecommerce</h1>
        <p>
          Attention l'attribut HTML class="" est un mot clé reservé par React,
          utilisé className=""
        </p>
        <Home />
      </div>
    </>
  );
}

export default App;
