import "./App.css";
import VideoDetail from "./pages/VideoDetail/VideoDetail.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage.jsx";
import AdminLogin from "./pages/AdminLogin/AdminLogin.jsx";
import AdminVideos from "./pages/AdminVideos/AdminVideos.jsx";
import AdminVideo from "./pages/AdminVideo/AdminVideo.jsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.jsx";

function App() {
  if (window.location.host.split(".")[0] == "admin")
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/videos" element={<AdminVideos />} />
          <Route path="/video/:id" element={<AdminVideo />} />
        </Routes>
      </BrowserRouter>
    );
  else
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
