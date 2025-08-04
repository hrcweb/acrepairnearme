
import FirecrawlApp from '@mendable/firecrawl-js';
import { useSecureApiKey } from '@/hooks/useSecureApiKey';

class SecureFirecrawlService {
  private firecrawlApp: FirecrawlApp | null = null;
  private apiKeyService = useSecureApiKey();

  async initialize(): Promise<boolean> {
    try {
      const apiKey = await this.apiKeyService.retrieveApiKey('firecrawl');
      
      if (!apiKey) {
        console.warn('Firecrawl API key not found. Please configure it in settings.');
        return false;
      }

      this.firecrawlApp = new FirecrawlApp({ apiKey });
      return true;
    } catch (error) {
      console.error('Failed to initialize Firecrawl service:', error);
      return false;
    }
  }

  async scrapeUrl(url: string): Promise<any> {
    if (!this.firecrawlApp) {
      const initialized = await this.initialize();
      if (!initialized) {
        throw new Error('Firecrawl service not initialized. Please configure API key.');
      }
    }

    // Input validation
    if (!url || typeof url !== 'string') {
      throw new Error('Invalid URL provided');
    }

    try {
      new URL(url); // Validate URL format
    } catch (error) {
      throw new Error('Invalid URL format');
    }

    if (!this.firecrawlApp) {
      throw new Error('Firecrawl service not available');
    }

    try {
      const scrapeResponse = await this.firecrawlApp.scrapeUrl(url, {
        formats: ['markdown'],
        onlyMainContent: true,
        waitFor: 3000
      });

      if (!scrapeResponse.success) {
        throw new Error(`Scraping failed: ${scrapeResponse.error}`);
      }

      return scrapeResponse;
    } catch (error) {
      console.error('Scraping error:', error);
      throw error;
    }
  }

  async crawlUrl(url: string, options: any = {}): Promise<any> {
    if (!this.firecrawlApp) {
      const initialized = await this.initialize();
      if (!initialized) {
        throw new Error('Firecrawl service not initialized. Please configure API key.');
      }
    }

    // Input validation
    if (!url || typeof url !== 'string') {
      throw new Error('Invalid URL provided');
    }

    try {
      new URL(url); // Validate URL format
    } catch (error) {
      throw new Error('Invalid URL format');
    }

    if (!this.firecrawlApp) {
      throw new Error('Firecrawl service not available');
    }

    const crawlResponse = await this.firecrawlApp.crawlUrl(url, {
      limit: Math.min(options.limit || 5, 10), // Limit crawl depth for security
      scrapeOptions: {
        formats: ['markdown'],
        onlyMainContent: true,
        ...options.scrapeOptions
      }
    });

    if (!crawlResponse.success) {
      throw new Error(`Crawling failed: ${crawlResponse.error}`);
    }

    return crawlResponse;
  }
}

export const secureFirecrawlService = new SecureFirecrawlService();
