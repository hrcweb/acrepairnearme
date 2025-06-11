
import { useEffect } from "react";
import { updatePageSEO } from "@/utils/seoUtils";

export const useFAQSEO = () => {
  useEffect(() => {
    const cleanup = updatePageSEO(
      "AC Repair FAQ | Common HVAC Questions Answered - AC Repair Near Me",
      "Get answers to frequently asked questions about AC repair, HVAC maintenance, emergency services, and finding qualified contractors in Florida.",
      "ac repair faq, hvac questions, air conditioning help, ac maintenance tips, emergency ac repair, hvac troubleshooting",
      "AC Repair FAQ | Common HVAC Questions Answered",
      "Find answers to the most common questions about AC repair, maintenance, emergency services, and choosing the right HVAC contractor.",
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "name": "AC Repair FAQ",
        "description": "Frequently asked questions about AC repair and HVAC services",
        "url": window.location.href,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How much does AC repair cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "AC repair costs vary depending on the issue, but typically range from $150-$800 for common repairs."
            }
          },
          {
            "@type": "Question", 
            "name": "How often should I service my AC?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "AC units should be serviced at least twice a year - once before summer and once before winter."
            }
          }
        ]
      }
    );

    return cleanup;
  }, []);
};
