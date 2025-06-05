// Analysis Types
export interface AnalysisResult {
  type: AnalysisType;
  issues: Issue[];
  summary: string;
}

export enum AnalysisType {
  ACCESSIBILITY = 'accessibility',
  CONTENT = 'content',
  SEO = 'seo',
  LLMO = 'llmo',
  PERFORMANCE = 'performance',
  SECURITY = 'security',
  CRO = 'cro',
}

export interface Issue {
  id: string;
  problem: string;
  solution: string;
  learnMoreUrl?: string;
  severity: IssueSeverity;
  location?: string; // URL or element path where the issue was found
}

export enum IssueSeverity {
  CRITICAL = 'critical',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

// Crawler Types
export interface CrawlResult {
  url: string;
  title: string;
  html: string;
  text: string;
  screenshots: Screenshot[];
  resources: Resource[];
  links: Link[];
  metadata: PageMetadata;
}

export interface Screenshot {
  path: string;
  type: 'full' | 'viewport';
}

export interface Resource {
  url: string;
  type: ResourceType;
  size: number;
}

export enum ResourceType {
  SCRIPT = 'script',
  STYLESHEET = 'stylesheet',
  IMAGE = 'image',
  FONT = 'font',
  OTHER = 'other',
}

export interface Link {
  url: string;
  text: string;
  isInternal: boolean;
}

export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogTags: Record<string, string>;
  loadTime: number;
}

// API Client Types
export interface AnthropicRequest {
  prompt: string;
  model: string;
  maxTokens: number;
}

export interface AnthropicResponse {
  completion: string;
}

export interface BuiltWithRequest {
  url: string;
}

export interface BuiltWithResponse {
  technologies: Technology[];
}

export interface Technology {
  name: string;
  version?: string;
  categories: string[];
}

export interface PageSpeedRequest {
  url: string;
  strategy: 'mobile' | 'desktop';
}

export interface PageSpeedResponse {
  lighthouseResult: {
    categories: Record<string, { score: number }>;
    audits: Record<string, { score: number; displayValue: string }>;
  };
}

// PDF Report Types
export interface ReportOptions {
  includeScreenshots: boolean;
  includeBranding: boolean;
  includeTimestamp: boolean;
}

// Config Types
export interface EnvironmentConfig {
  ANTHROPIC_API_KEY: string;
  BUILTWITH_API_KEY: string;
  PAGESPEED_API_KEY: string;
  MAX_PAGES_TO_CRAWL: number;
  TIMEOUT_SECONDS: number;
}
