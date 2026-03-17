import "./App.css";
import VideoDetail from "./pages/VideoDetail/VideoDetail.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage.jsx";
import HomepagePhase2 from "./pages/Homepage-Phase2/Homepage2.jsx";
import HomepagePhase3 from "./pages/Homepage-Phase3/Homepage3.jsx";
import UploadPage from "./pages/Upload_page";
import Gallery from "./pages/galery/Galery.jsx";
import AdminLogin from "./pages/AdminLogin/AdminLogin.jsx";
import ReviewVideos from "./pages/AdminReviewVideos/AdminReviewVideos.jsx";
import AdminVideos from "./pages/AdminVideos/AdminVideos.jsx";
import AdminVideo from "./pages/AdminVideo/AdminVideo.jsx";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard.jsx";
import AdminUsers from "./pages/AdminUsers/AdminUsers.jsx";
import AdminEvents from "./pages/AdminEvents/AdminEvents.jsx";
import AdminSettings from "./pages/AdminSettings/AdminSettings.jsx";
import AdminContent from "./pages/AdminContent/AdminContent.jsx";
import Contact from "./pages/Contact/contact.jsx";
import AdminJury from "./pages/AdminJury/AdminJury.jsx";
import AdminSponsors from "./pages/AdminSponsors/AdminSponsors.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import JuryPage from "./pages/JuryPage/JuryPage.jsx";
import SponsorsPage from "./pages/SponsorsPage/SponsorsPage.jsx";
import AdminPrizes from "./pages/AdminPrizes/AdminPrizes.jsx";
import Event from "./pages/Event/Event_page.jsx";
import CguCgv from "./pages/CguCgv/CguCgv.jsx";
import Faq from "./pages/Faq/Faq.jsx";

import NotFound from "./components/Utils/NotFound.jsx";
import AdminRegister from "./pages/AdminRegister/AdminRegister.jsx";
import { useSettings } from "./context/SettingsContext.jsx";
import Loading from "./components/Utils/Loading.jsx";

function App() {
  const settings = useSettings();
  if (settings === null) return <Loading />;

  if (window.location.host.split(".")[0] == "admin")
    /* PAGES ADMIN */

    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/register/:token" element={<AdminRegister />} />
          <Route path="/register" element={<AdminRegister />} />
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
            path="/reviews"
            element={
              <ProtectedRoute requiredRole={"admin"}>
                <ReviewVideos />
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
          <Route
            path="/partners"
            element={
              <ProtectedRoute requiredRole={"superadmin"}>
                <AdminSponsors />
              </ProtectedRoute>
            }
          />
          <Route
            path="/prizes"
            element={
              <ProtectedRoute requiredRole={"superadmin"}>
                <AdminPrizes />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              <ProtectedRoute requiredRole={"admin"}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    );
  else if (settings.phase === "1")
    /* PHASE 1 */
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/video/:videoId" element={<VideoDetail />} /> */}
          {/* <Route path="/gallery" element={<Gallery />} /> */}
          <Route path="/participate" element={<UploadPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/jury" element={<JuryPage />} />
          <Route path="/partners" element={<SponsorsPage />} />
          <Route path="/Event" element={<Event />} />
          <Route path="/CguCgv" element={<CguCgv />} />
          <Route path="/Faq" element={<Faq />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    );
  else if (settings.phase === "2")
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomepagePhase2 />} />
          <Route path="/video/:videoId" element={<VideoDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          {/* <Route path="/participate" element={<UploadPage />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/jury" element={<JuryPage />} />
          <Route path="/partners" element={<SponsorsPage />} />
          <Route path="/Event" element={<Event />} />
          <Route path="/CguCgv" element={<CguCgv />} />
          <Route path="/Faq" element={<Faq />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    );
  else if (settings.phase === "3")
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomepagePhase3 />} />
          <Route path="/video/:videoId" element={<VideoDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          {/* <Route path="/participate" element={<UploadPage />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/jury" element={<JuryPage />} />
          <Route path="/partners" element={<SponsorsPage />} />
          <Route path="/Event" element={<Event />} />
          <Route path="/CguCgv" element={<CguCgv />} />
          <Route path="/Faq" element={<Faq />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    );
}

export default App;
