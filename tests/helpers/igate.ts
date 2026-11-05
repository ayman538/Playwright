import { test, expect, type Page, type BrowserContext } from '@playwright/test';
import { signIn } from '../../api/auth';
import { env } from '../../config/env';

export const portalOrigin = env.portalOrigin;
export const personalInfoURL = `${portalOrigin}/group/hub/profile?tab=personal-info`;

export async function openPersonalInfo(page: Page, context: BrowserContext) {
  await test.step('Open iGate login', async () => page.goto(`${portalOrigin}/en/web/hub/login`));
  await page.getByPlaceholder('Email Address', { exact: true }).fill(env.username);
  await page.getByPlaceholder('Password', { exact: true }).fill(env.password);
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    page.getByRole('button', { name: 'Sign In', exact: true }).click(),
  ]);
  const tokens = await signIn();
  if (tokens['user-id'] == null) throw new Error('Sign-in response is missing user-id');
  await context.addCookies(Object.entries({
    'access-token': tokens['access-token'], token: tokens['access-token'],
    authorization: tokens.authorization, userId: String(tokens['user-id']), username: env.username,
  }).map(([name, value]) => ({ name, value, domain: new URL(portalOrigin).hostname,
    path: '/', secure: true, sameSite: 'Lax' as const })));
  const response = await page.goto(personalInfoURL, { waitUntil: 'domcontentloaded' });
  expect(response?.ok(), 'Personal info document should load').toBe(true);
  await expect(page).toHaveURL(personalInfoURL);
}
