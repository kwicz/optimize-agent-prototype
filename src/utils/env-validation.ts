import { EnvironmentConfig } from '../types';

/**
 * Validates that all required environment variables are present
 * @returns A validated environment configuration object
 * @throws Error if any required environment variables are missing
 */
export function validateEnvironment(): EnvironmentConfig {
  const requiredEnvVars = [
    'ANTHROPIC_API_KEY',
    'BUILTWITH_API_KEY',
    'PAGESPEED_API_KEY',
  ];

  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(', ')}`
    );
  }

  return {
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY!,
    BUILTWITH_API_KEY: process.env.BUILTWITH_API_KEY!,
    PAGESPEED_API_KEY: process.env.PAGESPEED_API_KEY!,
    MAX_PAGES_TO_CRAWL: parseInt(process.env.MAX_PAGES_TO_CRAWL || '20'),
    TIMEOUT_SECONDS: parseInt(process.env.TIMEOUT_SECONDS || '60'),
  };
}

/**
 * A global variable to store the validated environment configuration
 */
let cachedConfig: EnvironmentConfig | null = null;

/**
 * Gets the environment configuration, validating it if not already validated
 * @returns The validated environment configuration
 */
export function getEnvironmentConfig(): EnvironmentConfig {
  if (!cachedConfig) {
    cachedConfig = validateEnvironment();
  }
  return cachedConfig;
}
