import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./index.css";

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  return <>{!code ? <Login /> : <Dashboard code={code} />}</>;
}

export default App;
