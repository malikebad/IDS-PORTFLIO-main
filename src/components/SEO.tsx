import { useEffect } from "react";
import { BASE_URL, BRAND_NAME, getOrganizationSchema, getWebSiteSchema } from "@/lib/structuredData";
import { trackPageView } from "@/lib/analytics";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  schema?: Record<string, any> | Array<Record<string, any>>;
  noindex?: boolean;
}

export const SEO = ({
  title,
  description = "Inventor Design Studio is a leading creative technology studio specializing in software development, UI/UX design, and cinematic video production.",
  path = "",
  ogImage = `${BASE_URL}/assets/logo.jpeg`,
  ogType = "website",
  schema,
  noindex = false,
}: SEOProps) => {
  const fullTitle = title ? `${title} | ${BRAND_NAME}` : `${BRAND_NAME} | Creative Technology Studio`;
  const canonicalUrl = `${BASE_URL}${path}`;

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle;

    // Helper for managing meta tags
    const setMeta = (nameOrProperty: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${nameOrProperty}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, nameOrProperty);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // 2. Standard Meta
    setMeta("description", description);
    setMeta("robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

    // 3. Canonical Link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    // 4. OpenGraph Meta
    setMeta("og:site_name", BRAND_NAME, true);
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:type", ogType, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:locale", "en_US", true);

    // 5. Twitter Card Meta
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);

    // 6. JSON-LD Structured Data
    const defaultSchemas = [getOrganizationSchema(), getWebSiteSchema()];
    const allSchemas = schema
      ? Array.isArray(schema)
        ? [...defaultSchemas, ...schema]
        : [...defaultSchemas, schema]
      : defaultSchemas;

    let scriptTag = document.getElementById("json-ld-schema") as HTMLScriptElement;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "json-ld-schema";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(allSchemas);

    // 7. Track GA4 Page View
    trackPageView(path, fullTitle);
  }, [fullTitle, description, canonicalUrl, ogImage, ogType, schema, noindex, path]);

  return null;
};

export default SEO;
