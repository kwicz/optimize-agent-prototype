import {
  validateEnvironment,
  getEnvironmentConfig,
} from '../../src/utils/env-validation';

describe('Environment Validation', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  test('validateEnvironment returns a valid config when all required env vars are present', () => {
    // These values are set in jest.setup.js
    const config = validateEnvironment();

    expect(config).toEqual({
      ANTHROPIC_API_KEY: 'test-anthropic-api-key',
      BUILTWITH_API_KEY: 'test-builtwith-api-key',
      PAGESPEED_API_KEY: 'test-pagespeed-api-key',
      MAX_PAGES_TO_CRAWL: 20,
      TIMEOUT_SECONDS: 60,
    });
  });

  test('validateEnvironment throws an error when required env vars are missing', () => {
    // Temporarily remove required env vars
    delete process.env.ANTHROPIC_API_KEY;

    expect(() => validateEnvironment()).toThrow(
      'Missing required environment variables: ANTHROPIC_API_KEY'
    );
  });

  test('getEnvironmentConfig caches the config', () => {
    const firstCall = getEnvironmentConfig();
    const secondCall = getEnvironmentConfig();

    expect(firstCall).toBe(secondCall); // Same instance
  });
});
