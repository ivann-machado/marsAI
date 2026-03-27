const GA_ID = import.meta.env.VITE_GA_ID || "G-J0MZ3BCXW7";

export const initializeGA = () => {
	if (typeof window !== "undefined" && window.gtag) {
		console.log("Google Analytics initialized with ID:", GA_ID);
	}
};

export const trackPageView = (pagePath, pageTitle) => {
	if (typeof window !== "undefined" && window.gtag) {
		window.gtag("config", GA_ID, {
			page_path: pagePath,
			page_title: pageTitle,
		});
	}
};

export const trackEvent = (eventName, eventData = {}) => {
	if (typeof window !== "undefined" && window.gtag) {
		window.gtag("event", eventName, eventData);
	}
};

export const setUserProperties = (userProperties) => {
	if (typeof window !== "undefined" && window.gtag) {
		window.gtag("set", {
			user_properties: userProperties,
		});
	}
};
