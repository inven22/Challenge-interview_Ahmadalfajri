import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Menu1 from "./pages/Menu1/home";
import Menu2 from "./pages/Menu1/home";
import MainLayout from "./Layout/mainlayout/MainLayout";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Menu1 />
              </MainLayout>
            }
          />

          <Route
            path="/menu2"
            element={
              <MainLayout>
                <Menu2 />
              </MainLayout>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
