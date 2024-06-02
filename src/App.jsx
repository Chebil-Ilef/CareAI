import "../src/styles/main.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chatbot from "./pages/Chatbot";
import BrainCancer from "./pages/BrainCancer";
import Skin from "./pages/Skin";
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
                    <Route path="/Skin" element={<Skin />} />
                    <Route path="/" element={<Skin />} />

                </Routes>
            </div>
        </Router>
    );
}

export default App;
