
import { ContractorScraper } from "@/components/ContractorScraper";

const ContractorScraperPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AC Contractor Data Scraper
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Use Firecrawl to scrape real AC contractor data from websites and business directories
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <ContractorScraper />
        </div>
        
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold mb-4">How to Use:</h3>
            <div className="text-left space-y-2 text-sm text-gray-600">
              <p>1. Get a free API key from <a href="https://firecrawl.dev" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">firecrawl.dev</a></p>
              <p>2. Enter the API key to set up the integration</p>
              <p>3. Search Google for "AC contractors Florida" and copy the URL</p>
              <p>4. Paste the URL and click "Scrape Contractors"</p>
              <p>5. Review and format the scraped data for your database</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractorScraperPage;
