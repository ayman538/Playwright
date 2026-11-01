import 'dotenv/config';

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}. Set it in .env or your environment.`);
  }
  return value;
}

export const env = {
  apiBaseURL: process.env.API_BASE_URL ?? 'https://apiblinkdev.hubplatforms.com',
  get apiUsername(): string { return requiredEnv('API_USERNAME'); },
  get apiPassword(): string { return requiredEnv('API_PASSWORD'); },
  get apiClientSecret(): string { return requiredEnv('API_CLIENT_SECRET'); },
  organizationDomain: process.env.API_ORGANIZATION_DOMAIN ?? 'blink.stcs.com.sa',
  baseURL: process.env.BASE_URL ?? 'https://webdev.hubplatforms.com/new-dobox/#/auth/login',
  get username(): string {
    return requiredEnv('TEST_USERNAME');
  },
  get password(): string {
    return requiredEnv('TEST_PASSWORD');
  },

    get ci(): string {
    return process.env.CI ?? 'false';
  },
};

