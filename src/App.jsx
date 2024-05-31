import "../src/styles/main.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
                    <Route path="/Chatbot" element={<Chatbot />} />
                    <Route path="/BrainCancer" element={<BrainCancer />} />
                    <Route path="/Alzheimers" element={<Alzheimers />} />
                    <Route path="/Parkinson" element={<Parkinson />} />
                    <Route path="/HeartDisease" element={<HeartDisease />} />
                    <Route path="/" element={<HeartDisease />} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;
