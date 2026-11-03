import { test, expect } from '@playwright/test';
import { signIn } from '../api/auth';
import { env } from '../config/env';

const portalOrigin = 'https://igate-dev-new.stc.com.sa';
const profileURL = `${portalOrigin}/group/hub/profile`;

test.use({ trace: 'off' });

test('User can sign in to iGate and open their profile @igate', async ({ page, context }) => {
  await page.goto(`${portalOrigin}/en/web/hub/login`);
  await page.getByPlaceholder('Email Address', { exact: true }).fill(env.username);
  await page.getByPlaceholder('Password', { exact: true }).fill(env.password);
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    page.getByRole('button', { name: 'Sign In', exact: true }).click(),
  ]);

  const tokens = await signIn();
  if (tokens['user-id'] === undefined || tokens['user-id'] === null) {
    throw new Error('Sign-in response is missing user-id');
  }

  await context.addCookies(
    Object.entries({
      'access-token': tokens['access-token'],
      token: tokens['access-token'],
      authorization: tokens.authorization,
      userId: String(tokens['user-id']),
      username: env.username,
    }).map(([name, value]) => ({
      name,
      value,
      domain: new URL(portalOrigin).hostname,
      path: '/',
      secure: true,
      sameSite: 'Lax' as const,
    })),
  );

  const response = await page.goto(profileURL, { waitUntil: 'domcontentloaded' });
  expect(response?.ok(), 'Profile page should load successfully').toBe(true);
  await expect(page).toHaveURL(profileURL);
  await expect(page.getByRole('button', { name: 'Sign In', exact: true })).toBeHidden();
    await page.pause();
});
