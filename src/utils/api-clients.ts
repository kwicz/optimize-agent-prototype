import axios from 'axios';
import { getEnvironmentConfig } from './env-validation';
import {
  AnthropicResponse,
  BuiltWithResponse,
  PageSpeedResponse,
} from '../types';

// Anthropic Claude API client
export const anthropicClient = {
  async analyze(prompt: string): Promise<string> {
    const config = getEnvironmentConfig();

    try {
      const response = await axios.post<AnthropicResponse>(
        'https://api.anthropic.com/v1/messages',
        {
          model: 'claude-3-opus-20240229',
          max_tokens: 4000,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': config.ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01',
          },
        }
      );

      return response.data.completion;
    } catch (error) {
      console.error('Error calling Anthropic API:', error);
      throw new Error('Failed to analyze content with Claude');
    }
  },
};

// BuiltWith API client
export const builtWithClient = {
  async analyze(url: string): Promise<BuiltWithResponse> {
    const config = getEnvironmentConfig();

    try {
      const response = await axios.get<BuiltWithResponse>(
        `https://api.builtwith.com/v19/api.json`,
        {
          params: {
            KEY: config.BUILTWITH_API_KEY,
            LOOKUP: url,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error calling BuiltWith API:', error);
      throw new Error('Failed to analyze technology stack with BuiltWith');
    }
  },
};

// PageSpeed Insights API client
export const pageSpeedClient = {
  async analyze(
    url: string,
    strategy: 'mobile' | 'desktop' = 'mobile'
  ): Promise<PageSpeedResponse> {
    const config = getEnvironmentConfig();

    try {
      const response = await axios.get<PageSpeedResponse>(
        'https://www.googleapis.com/pagespeedonline/v5/runPagespeed',
        {
          params: {
            url,
            key: config.PAGESPEED_API_KEY,
            strategy,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Error calling PageSpeed Insights API:', error);
      throw new Error('Failed to analyze performance with PageSpeed Insights');
    }
  },
};
