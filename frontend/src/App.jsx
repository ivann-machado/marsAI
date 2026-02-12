import "./App.css";
import Homepage from "./pages/homepage/Homepage.jsx";
import HomepagePhase2 from "./pages/Homepage-Phase2/Homepage2.jsx";
import VideoDetail from "./pages/VideoDetail/VideoDetail.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage.jsx";
import UploadPage from "./pages/Upload_page";
import Gallery from "./pages/galery/Galery.jsx";
import AdminLogin from "./pages/AdminLogin/AdminLogin.jsx";
import AdminVideos from "./pages/AdminVideos/AdminVideos.jsx";
import AdminVideo from "./pages/AdminVideo/AdminVideo.jsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.jsx";
import AdminUsers from "./pages/AdminUsers/AdminUsers.jsx";
import AdminEvents from "./pages/AdminEvents/AdminEvents.jsx";
import AdminSettings from "./pages/AdminSettings/AdminSettings.jsx";
import AdminContent from "./pages/AdminContent/AdminContent.jsx";
import AdminJury from "./pages/AdminJury/AdminJury.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import JuryPage from "./pages/JuryPage/JuryPage.jsx";
import SponsorsPage from "./pages/SponsorsPage/SponsorsPage.jsx";

function App() {
  if (window.location.host.split(".")[0] == "admin")
    /* PAGES ADMIN */
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route
            path="/"
            element={
              <ProtectedRoute requiredRole={"admin"}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/videos"
            element={
              <ProtectedRoute requiredRole={"admin"}>
                <AdminVideos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/video/:id"
            element={
              <ProtectedRoute requiredRole={"admin"}>
                <AdminVideo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute requiredRole={"superadmin"}>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/events"
            element={
              <ProtectedRoute requiredRole={"superadmin"}>
                <AdminEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute requiredRole={"superadmin"}>
                <AdminSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/content"
            element={
              <ProtectedRoute requiredRole={"superadmin"}>
                <AdminContent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/jury"
            element={
              <ProtectedRoute requiredRole={"superadmin"}>
                <AdminJury />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    );
  else
    /* PAGES PUBLIQUES */
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/video/:videoId" element={<VideoDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/participate" element={<UploadPage />} />
          <Route path="/jury" element={<JuryPage />} />
          <Route path="/partners" element={<SponsorsPage />} />
        </Routes>
      </BrowserRouter>
    );
}

export default App;
