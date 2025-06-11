
export const SEO_CONFIG = {
  siteName: "AC Repair Near Me Pro",
  siteUrl: "https://acrepairnearme.pro",
  defaultTitle: "AC Repair Near Me | Commercial AC Repair Florida | 24/7 Emergency HVAC Service",
  defaultDescription: "Find top-rated AC repair near me in Florida. Professional commercial AC repair, heating and air conditioning repair services. Licensed HVAC contractors available 24/7.",
  defaultKeywords: "ac repair near me, commercial ac repair near me, commercial heating and air conditioning repair near me, hvac repair florida, emergency ac repair",
  twitterHandle: "@acrepairnearme",
  facebookPage: "https://www.facebook.com/acrepairnearme",
  defaultImage: "/lovable-uploads/199e8012-a0ff-42e4-bcb0-b5aa38e394c5.png",
  contactEmail: "support@acrepairnearme.pro",
  contactPhone: "561-206-2624",
  businessAddress: {
    streetAddress: "11987 Southern Blvd., 2020",
    addressLocality: "Royal Palm Beach",
    addressRegion: "FL",
    postalCode: "33411",
    addressCountry: "US"
  }
};

export const generatePageTitle = (pageTitle: string) => {
  return `${pageTitle} | ${SEO_CONFIG.siteName}`;
};

export const generateBreadcrumbStructuredData = (breadcrumbs: Array<{name: string, url?: string}>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      ...(crumb.url && { "item": crumb.url })
    }))
  };
};
