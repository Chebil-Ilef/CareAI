import "../src/styles/main.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Chatbot from "./pages/Chatbot";
import BrainCancer from "./pages/BrainCancer";
import HeartDisease from "./pages/HeartDisease";
import Alzheimers from "./pages/ALzheimers";
import Parkinson from "./pages/Parkinson";
import Sidebar from "./components/Sidebar";

function App() {


    return (
        <Router>
            <div className="App">
                <Sidebar />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/Chatbot" element={<Chatbot />} />
                    <Route path="/BrainCancer" element={<BrainCancer />} />
                    <Route path="/Alzheimers" element={<Alzheimers />} />
                    <Route path="/Parkinson" element={<Parkinson />} />
                    <Route path="/HeartDisease" element={<HeartDisease />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
