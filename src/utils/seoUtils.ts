
export const updatePageSEO = (
  title: string,
  description: string,
  keywords: string,
  ogTitle?: string,
  ogDescription?: string,
  structuredData?: any
) => {
  // Update document title
  document.title = title;

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }

  // Update keywords
  const metaKeywords = document.querySelector('meta[name="keywords"]');
  if (metaKeywords) {
    metaKeywords.setAttribute('content', keywords);
  }

  // Update Open Graph title
  const ogTitleElement = document.querySelector('meta[property="og:title"]');
  if (ogTitleElement && ogTitle) {
    ogTitleElement.setAttribute('content', ogTitle);
  }

  // Update Open Graph description
  const ogDescriptionElement = document.querySelector('meta[property="og:description"]');
  if (ogDescriptionElement && ogDescription) {
    ogDescriptionElement.setAttribute('content', ogDescription);
  }

  // Update Open Graph URL
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.setAttribute('content', window.location.href);
  }

  // Add structured data if provided
  if (structuredData) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.textContent?.includes(structuredData.name)) {
          script.remove();
        }
      });
    };
  }
};
