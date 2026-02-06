import "./App.css";
import VideoDetail from "./pages/VideoDetail/VideoDetail.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage.jsx";
import UploadPage from "./pages/Upload_page";
import Gallery from "./pages/galery/galery.jsx";
import AdminLogin from "./pages/AdminLogin/AdminLogin.jsx";
import AdminVideos from "./pages/AdminVideos/AdminVideos.jsx";
import AdminVideo from "./pages/AdminVideo/AdminVideo.jsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.jsx";
import AdminUsers from "./pages/AdminUsers/AdminUsers.jsx";
import AdminEvents from "./pages/AdminEvents/AdminEvents.jsx";
import AdminSettings from "./pages/AdminSettings/AdminSettings.jsx";
import AdminContent from "./pages/AdminContent/AdminContent.jsx";
import AdminJury from "./pages/AdminJury/AdminJury.jsx";

function App() {
  if (window.location.host.split(".")[0] == "admin")
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/videos" element={<AdminVideos />} />
          <Route path="/video/:id" element={<AdminVideo />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/events" element={<AdminEvents />} />
          <Route path="/settings" element={<AdminSettings />} />
          <Route path="/content" element={<AdminContent />} />
          <Route path="/jury" element={<AdminJury />} />
        </Routes>
      </BrowserRouter>
    );
  else
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/video/:videoId" element={<VideoDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/participate" element={<UploadPage />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
