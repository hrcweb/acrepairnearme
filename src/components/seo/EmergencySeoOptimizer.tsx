
import { useEffect } from "react";
import { updatePageSEO } from "@/utils/seoUtils";

export const useEmergencySEO = () => {
  useEffect(() => {
    const cleanup = updatePageSEO(
      "24/7 Emergency AC Repair Florida | Urgent HVAC Service Near Me",
      "Need emergency AC repair now? Find 24/7 HVAC contractors in Florida for urgent air conditioning and heating repairs. Fast response, licensed technicians.",
      "emergency ac repair, 24/7 hvac service, urgent air conditioning repair, emergency heating repair, after hours ac service, same day ac repair",
      "24/7 Emergency AC Repair Florida | Urgent HVAC Service",
      "Get immediate help with emergency AC repair in Florida. 24/7 licensed HVAC contractors available for urgent heating and cooling repairs.",
      {
        "@context": "https://schema.org",
        "@type": "EmergencyService",
        "name": "24/7 Emergency AC Repair",
        "description": "Emergency air conditioning and HVAC repair services available 24/7 across Florida",
        "url": window.location.href,
        "serviceType": "Emergency HVAC Repair",
        "areaServed": {
          "@type": "State",
          "name": "Florida"
        },
        "availableChannel": {
          "@type": "ServiceChannel",
          "servicePhone": "561-206-2624",
          "availableLanguage": "English"
        },
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "00:00",
          "closes": "23:59"
        }
      }
    );

    return cleanup;
  }, []);
};
