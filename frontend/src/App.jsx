import "./App.css";
import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useSettings } from "./context/SettingsContext.jsx";
import Loading from "./components/Utils/Loading.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import Cookie from "./components/Cookie/Cookie.jsx";

// Public pages
const Homepage = lazy(() => import("./pages/homepage/Homepage.jsx"));
const HomepagePhase2 = lazy(() => import("./pages/Homepage-Phase2/Homepage2.jsx"));
const HomepagePhase3 = lazy(() => import("./pages/Homepage-Phase3/Homepage3.jsx"));
const UploadPage = lazy(() => import("./pages/Upload_page"));
const Gallery = lazy(() => import("./pages/galery/Galery.jsx"));
const VideoDetail = lazy(() => import("./pages/VideoDetail/VideoDetail.jsx"));
const Contact = lazy(() => import("./pages/Contact/contact.jsx"));
const JuryPage = lazy(() => import("./pages/JuryPage/JuryPage.jsx"));
const SponsorsPage = lazy(() => import("./pages/SponsorsPage/SponsorsPage.jsx"));
const Event = lazy(() => import("./pages/Event/Event_page.jsx"));
const CguCgv = lazy(() => import("./pages/CguCgv/CguCgv.jsx"));
const Faq = lazy(() => import("./pages/Faq/Faq.jsx"));
const NotFound = lazy(() => import("./components/Utils/NotFound.jsx"));

// Admin pages
const AdminLogin = lazy(() => import("./pages/AdminLogin/AdminLogin.jsx"));
const AdminRegister = lazy(() => import("./pages/AdminRegister/AdminRegister.jsx"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard/AdminDashboard.jsx"));
const AdminVideos = lazy(() => import("./pages/AdminVideos/AdminVideos.jsx"));
const AdminVideo = lazy(() => import("./pages/AdminVideo/AdminVideo.jsx"));
const ReviewVideos = lazy(() => import("./pages/AdminReviewVideos/AdminReviewVideos.jsx"));
const AdminUsers = lazy(() => import("./pages/AdminUsers/AdminUsers.jsx"));
const AdminEvents = lazy(() => import("./pages/AdminEvents/AdminEvents.jsx"));
const AdminSettings = lazy(() => import("./pages/AdminSettings/AdminSettings.jsx"));
const AdminContent = lazy(() => import("./pages/AdminContent/AdminContent.jsx"));
const AdminJury = lazy(() => import("./pages/AdminJury/AdminJury.jsx"));
const AdminSponsors = lazy(() => import("./pages/AdminSponsors/AdminSponsors.jsx"));
const AdminPrizes = lazy(() => import("./pages/AdminPrizes/AdminPrizes.jsx"));
const AdminEdit = lazy(() => import("./pages/AdminEdit/AdminEdit.jsx"));

const GA_ID = import.meta.env.VITE_GA_ID || "G-J0MZ3BCXW7";

function AnalyticsTracker() {
	const location = useLocation();
	useEffect(() => {
		if (typeof window !== "undefined" && typeof window.gtag === "function") {
			window.gtag("config", GA_ID, {
				page_path: `${location.pathname}${location.search}${location.hash}`,
				page_title: document.title,
			});
		}
	}, [location]);
	return null;
}

function App() {
	const settings = useSettings();
	const isAdmin = window.location.host.split(".")[0] == "admin";

	if (settings === null) return <Loading />;

	return (
		<BrowserRouter>
			<AnalyticsTracker />
			<Suspense fallback={<Loading />}>
				<Routes>
					{isAdmin ? (
						<>
							<Route path="/login" element={<AdminLogin />} />
							<Route path="/register/:token" element={<AdminRegister />} />
							<Route path="/register" element={<AdminRegister />} />
							<Route path="/" element={<ProtectedRoute requiredRole={"admin"}><AdminDashboard /></ProtectedRoute>} />
							<Route path="/videos" element={<ProtectedRoute requiredRole={"admin"}><AdminVideos /></ProtectedRoute>} />
							<Route path="/reviews" element={<ProtectedRoute requiredRole={"admin"}><ReviewVideos /></ProtectedRoute>} />
							<Route path="/video/:id" element={<ProtectedRoute requiredRole={"admin"}><AdminVideo /></ProtectedRoute>} />
							<Route path="/users" element={<ProtectedRoute requiredRole={"superadmin"}><AdminUsers /></ProtectedRoute>} />
							<Route path="/events" element={<ProtectedRoute requiredRole={"superadmin"}><AdminEvents /></ProtectedRoute>} />
							<Route path="/settings" element={<ProtectedRoute requiredRole={"superadmin"}><AdminSettings /></ProtectedRoute>} />
							<Route path="/content" element={<ProtectedRoute requiredRole={"superadmin"}><AdminContent /></ProtectedRoute>} />
							<Route path="/jury" element={<ProtectedRoute requiredRole={"superadmin"}><AdminJury /></ProtectedRoute>} />
							<Route path="/partners" element={<ProtectedRoute requiredRole={"superadmin"}><AdminSponsors /></ProtectedRoute>} />
							<Route path="/prizes" element={<ProtectedRoute requiredRole={"superadmin"}><AdminPrizes /></ProtectedRoute>} />
							<Route path="/edit/:page" element={<ProtectedRoute requiredRole={"superadmin"}><AdminEdit /></ProtectedRoute>} />
							<Route path="*" element={<ProtectedRoute requiredRole={"admin"}><AdminDashboard /></ProtectedRoute>} />
						</>
					) : settings.phase === "1" ? (
						<>
							<Route path="/" element={<Homepage />} />
							<Route path="/participate" element={<UploadPage />} />
							<Route path="/contact" element={<Contact />} />
							<Route path="/jury" element={<JuryPage />} />
							<Route path="/partners" element={<SponsorsPage />} />
							<Route path="/Event" element={<Event />} />
							<Route path="/CguCgv" element={<CguCgv />} />
							<Route path="/Faq" element={<Faq />} />
							<Route path="*" element={<NotFound />} />
						</>
					) : settings.phase === "2" ? (
						<>
							<Route path="/" element={<HomepagePhase2 />} />
							<Route path="/video/:videoId" element={<VideoDetail />} />
							<Route path="/gallery" element={<Gallery />} />
							<Route path="/contact" element={<Contact />} />
							<Route path="/jury" element={<JuryPage />} />
							<Route path="/partners" element={<SponsorsPage />} />
							<Route path="/Event" element={<Event />} />
							<Route path="/CguCgv" element={<CguCgv />} />
							<Route path="/Faq" element={<Faq />} />
							<Route path="*" element={<NotFound />} />
						</>
					) : (
						<>
							<Route path="/" element={<HomepagePhase3 />} />
							<Route path="/video/:videoId" element={<VideoDetail />} />
							<Route path="/gallery" element={<Gallery />} />
							<Route path="/contact" element={<Contact />} />
							<Route path="/jury" element={<JuryPage />} />
							<Route path="/partners" element={<SponsorsPage />} />
							<Route path="/Event" element={<Event />} />
							<Route path="/CguCgv" element={<CguCgv />} />
							<Route path="/Faq" element={<Faq />} />
							<Route path="*" element={<NotFound />} />
						</>
					)}
				</Routes>
			</Suspense>
			<Cookie />
		</BrowserRouter>
	);
}

export default App;