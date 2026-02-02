import "./App.css";
import Homepage from "./pages/Homepage";
import VideoDetail from "./pages/VideoDetail";
import Footer from "./components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/video/:videoId" element={<VideoDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
