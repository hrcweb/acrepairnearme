
import { useEffect } from "react";
import { updatePageSEO } from "@/utils/seoUtils";

export const useContactSEO = () => {
  useEffect(() => {
    const cleanup = updatePageSEO(
      "Contact Support | AC Repair Near Me - Get Help & Support",
      "Need help with our HVAC directory? Contact our support team for assistance with listings, contractor verification, or technical issues. Quick response guaranteed.",
      "contact support, hvac directory help, ac repair near me support, contractor assistance, technical support",
      "Contact Support | AC Repair Near Me",
      "Get help with our HVAC contractor directory. Contact our support team for assistance with listings, verification, or any questions.",
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Support",
        "description": "Contact support for AC Repair Near Me HVAC contractor directory",
        "url": window.location.href,
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "customer support",
          "email": "support@acrepairnearme.pro",
          "telephone": "561-206-2624",
          "availableLanguage": "English"
        }
      }
    );

    return cleanup;
  }, []);
};
