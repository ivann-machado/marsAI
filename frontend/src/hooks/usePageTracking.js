import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../config/analytics.js";

export const usePageTracking = () => {
	const location = useLocation();

	useEffect(() => {
		// Track page view when location changes
		const pageTitle = document.title || "MarsAI";
		trackPageView(location.pathname, pageTitle);
	}, [location]);
};
