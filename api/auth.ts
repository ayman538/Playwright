import { constants, publicEncrypt } from 'node:crypto';
import { request } from '@playwright/test';
import { env } from '../config/env';

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0Hdu+pDl1u+dtxPtUTTL41Sde6zgnbusFLS+tZHZg0lw+ywk8XCzaD06X1cnHYsnU6JQUG4F+YUinn/Yo/crODir+2xoIvX6BMJR+Pk5jnni7lhGBfeLjiVxhlHUShpHzsVC7wfEjNn19xGTEv6MqwkkmUDYaKyOYNct7laLYRXyzSFla5Vpe4tl+Uy92QsxrYmqx5UNKkSulUbqlw9AD950erL3XS85rcrvNlwrC0a2rl3cE4xWr2Q0YCFu2L1VE9TTCZTMfyXu6LupjUedQaI113SEhcZXT8+ia5Ut5gwBsKau2D0OEUvzSZ3EK66fRzmsZ+iWA1KOmkNikU3jVwIDAQAB
-----END PUBLIC KEY-----`;

export interface AuthTokens {
  'access-token': string;
  authorization: string;
  'refresh-token'?: string;
  'expiry-date'?: string;
  'token-type'?: string;
   'user-id'?: number;
}

export async function signIn(): Promise<AuthTokens> {
  const date = new Date().toUTCString();
  // RSA PKCS#1 v1.5 matches JSEncrypt's encrypt() method.
  const apiClient = publicEncrypt(
    { key: publicKey, padding: constants.RSA_PKCS1_PADDING },
    Buffer.from(`${env.apiClientSecret};${date}`),
  ).toString('base64');
  const context = await request.newContext();
  try {
    const response = await context.post(`${env.apiBaseURL}/v3.1/public/auth/signin`, {
      timeout: 45_000,
      headers: {
        Date: date,
        'Content-Type': 'application/json',
        'Accept-Language': 'en',
        'User-Agent': 'web',
        'API-CLIENT': apiClient,
      },
      data: {
        username: env.username,
        password: env.apiPassword,
        'organization-domain': env.organizationDomain,
        'is-duo': true,
      },
    });
    if (!response.ok()) {
      throw new Error(`Sign-in failed: HTTP ${response.status()}`);
    }
    const tokens: AuthTokens = await response.json();
    if (typeof tokens['access-token'] !== 'string' || !tokens['access-token'] ||
        typeof tokens.authorization !== 'string' || !tokens.authorization) {
      throw new Error('Sign-in response is missing access-token or authorization');
    }
    return tokens;
  } finally {
    await context.dispose();
  }
}
