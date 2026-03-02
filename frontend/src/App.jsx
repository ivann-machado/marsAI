import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ReactGAModule from "react-ga4";
const ReactGA = ReactGAModule.default || ReactGAModule;

// --- Pages & Composants ---
import VideoDetail from "./pages/VideoDetail/VideoDetail.jsx";
import Homepage from "./pages/homepage/Homepage.jsx";
import HomepagePhase2 from "./pages/Homepage-Phase2/Homepage2.jsx";
import HomepagePhase3 from "./pages/Homepage-Phase3/Homepage3.jsx";
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
import Contact from "./pages/Contact/contact.jsx";
import AdminJury from "./pages/AdminJury/AdminJury.jsx";
import AdminSponsors from "./pages/AdminSponsors/AdminSponsors.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import JuryPage from "./pages/JuryPage/JuryPage.jsx";
import SponsorsPage from "./pages/SponsorsPage/SponsorsPage.jsx";
import Event from "./pages/Event/Event_page.jsx";
import NotFound from "./components/Utils/NotFound.jsx";

// --- Contextes ---
import { SettingsProvider } from "./context/SettingsContext.jsx";
import { FlashProvider } from "./context/FlashContext.jsx";

//  Configuration Google Analytics
ReactGA.initialize("G-J0MZ3BCXW7"); // ID

const AnalyticsTracker = () => {
	const location = useLocation();

	useEffect(() => {
		ReactGA.send({
			hitType: "pageview",
			page: location.pathname + location.search,
		});
	}, [location]);

	return null; // Ce composant est invisible
};

function App() {
	const isAdminHost = window.location.host.split(".")[0] === "admin";

	if (isAdminHost) {
		/* --- SECTION ADMIN --- */
		return (
			<BrowserRouter>
				<AnalyticsTracker />
				<FlashProvider>
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
						<Route
							path="/partners"
							element={
								<ProtectedRoute requiredRole={"superadmin"}>
									<AdminSponsors />
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
				</FlashProvider>
			</BrowserRouter>
		);
	} else {
		/* --- SECTION PUBLIQUE --- */
		return (
			<BrowserRouter>
				<AnalyticsTracker />
				<FlashProvider>
					<SettingsProvider>
						<Routes>
							<Route path="/" element={<Homepage />} />
							<Route
								path="/video/:videoId"
								element={<VideoDetail />}
							/>
							<Route path="/gallery" element={<Gallery />} />
							<Route
								path="/participate"
								element={<UploadPage />}
							/>
							<Route path="/contact" element={<Contact />} />
							<Route path="/jury" element={<JuryPage />} />
							<Route
								path="/partners"
								element={<SponsorsPage />}
							/>
							<Route path="/Event" element={<Event />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</SettingsProvider>
				</FlashProvider>
			</BrowserRouter>
		);
	}
}

export default App;
