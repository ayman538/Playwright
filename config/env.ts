import 'dotenv/config';

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}. Set it in .env or your environment.`);
  }
  return value;
}

export const env = {
  baseURL: process.env.BASE_URL ?? 'https://webdev.hubplatforms.com/new-dobox/#/auth/login',
  get username(): string {
    return requiredEnv('TEST_USERNAME');
  },
  get password(): string {
    return requiredEnv('TEST_PASSWORD');
  },

    get ci(): string {
    return requiredEnv('CI');
  },
};

