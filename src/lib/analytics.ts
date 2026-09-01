// Google Analytics 4 (GA4) Integration Helper

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId || typeof window === "undefined") return;

  // Prevent multiple script insertions
  if (document.getElementById("ga-script")) return;

  const script = document.createElement("script");
  script.id = "ga-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    send_page_view: false, // We handle page views on route changes
  });
};

export const trackPageView = (url: string, title?: string) => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (!measurementId || typeof window === "undefined" || !window.gtag) return;

  window.gtag("event", "page_view", {
    page_path: url,
    page_title: title || document.title,
    page_location: window.location.href,
  });
};

export const trackEvent = (
  eventName:
    | "contact_form_submitted"
    | "newsletter_subscribed"
    | "phone_clicked"
    | "email_clicked"
    | "primary_cta_clicked"
    | string,
  params: Record<string, any> = {}
) => {
  if (typeof window === "undefined" || !window.gtag) {
    if (import.meta.env.DEV) {
      console.log(`[GA4 Event (dev)] ${eventName}`, params);
    }
    return;
  }

  window.gtag("event", eventName, params);
};
