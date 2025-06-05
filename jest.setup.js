// Import Jest DOM extensions
import '@testing-library/jest-dom';

// Mock environment variables
process.env.ANTHROPIC_API_KEY = 'test-anthropic-api-key';
process.env.BUILTWITH_API_KEY = 'test-builtwith-api-key';
process.env.PAGESPEED_API_KEY = 'test-pagespeed-api-key';
process.env.MAX_PAGES_TO_CRAWL = '20';
process.env.TIMEOUT_SECONDS = '60';

// Global mocks and settings can be added here
global.fetch = jest.fn();
global.console = {
  ...console,
  // Uncomment to ignore certain console methods during tests
  // error: jest.fn(),
  // warn: jest.fn(),
  // log: jest.fn(),
};
