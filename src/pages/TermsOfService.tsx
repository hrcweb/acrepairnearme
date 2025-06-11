
import { useEffect } from "react";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  useEffect(() => {
    // SEO optimization for Terms of Service
    document.title = "Terms of Service | AC Repair Near Me - Directory Usage Terms";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Read our terms of service for using AC Repair Near Me HVAC contractor directory. Learn about user responsibilities, contractor guidelines, and service terms.'
      );
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 
        'terms of service, hvac directory terms, ac repair terms, contractor directory rules, service agreement'
      );
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Terms of Service | AC Repair Near Me');
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', 'Terms and conditions for using our HVAC contractor directory and connecting with AC repair professionals.');
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', window.location.href);
    }

    // Add structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Terms of Service",
      "description": "Terms of service for AC Repair Near Me HVAC contractor directory",
      "url": window.location.href,
      "isPartOf": {
        "@type": "WebSite",
        "name": "AC Repair Near Me Pro",
        "url": "https://acrepairnearme.pro"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.textContent?.includes('"Terms of Service"') && script.textContent?.includes('AC Repair Near Me')) {
          script.remove();
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <p className="text-gray-600 mb-8">
            <strong>Last updated:</strong> January 1, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using AC Repair Near Me, you accept and agree to be bound by 
              the terms and provision of this agreement. If you do not agree to abide by 
              the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Use License</h2>
            <p className="text-gray-700 mb-4">
              Permission is granted to temporarily access our website for personal, 
              non-commercial transitory viewing only. This is the grant of a license, 
              not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on our website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">User Accounts</h2>
            <p className="text-gray-700 mb-4">
              When you create an account with us, you must provide information that is 
              accurate, complete, and current at all times. You are responsible for 
              safeguarding the password and for all activities under your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Contractor Listings</h2>
            <p className="text-gray-700 mb-4">
              AC Repair Near Me serves as a platform to connect homeowners with contractors. 
              We do not guarantee the quality of work, availability, or pricing of any contractor. 
              All transactions are between users and contractors directly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Reviews and Content</h2>
            <p className="text-gray-700 mb-4">
              Users may submit reviews and other content. By submitting content, you grant 
              us a non-exclusive, worldwide, royalty-free license to use, reproduce, and 
              distribute such content. You represent that:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>You own or have the necessary rights to the content</li>
              <li>The content is accurate and not misleading</li>
              <li>The content does not violate any third-party rights</li>
              <li>The content is not defamatory, obscene, or otherwise objectionable</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Prohibited Uses</h2>
            <p className="text-gray-700 mb-4">
              You may not use our service:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
              <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
              <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
              <li>To submit false or misleading information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
            <p className="text-gray-700 mb-4">
              The information on this website is provided on an 'as is' basis. To the 
              fullest extent permitted by law, this Company excludes all representations, 
              warranties, conditions and terms whether express or implied.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Limitations</h2>
            <p className="text-gray-700 mb-4">
              In no event shall AC Repair Near Me or its suppliers be liable for any 
              damages (including, without limitation, damages for loss of data or profit, 
              or due to business interruption) arising out of the use or inability to use 
              the materials on our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Revisions and Errata</h2>
            <p className="text-gray-700 mb-4">
              The materials appearing on our website could include technical, typographical, 
              or photographic errors. We do not warrant that any of the materials on its 
              website are accurate, complete, or current.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Termination</h2>
            <p className="text-gray-700 mb-4">
              We may terminate or suspend your account and bar access to the service 
              immediately, without prior notice or liability, under our sole discretion, 
              for any reason whatsoever and without limitation, including but not limited 
              to a breach of the Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <p className="text-gray-700">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> support@acrepairnearme.pro<br />
                <strong>Address:</strong> 11987 Southern Blvd., 2020, Royal Palm Beach, FL 33411
              </p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsOfService;
