import { test, expect } from '@playwright/test';
import { IgateLoginPage } from '../Pages/IgateLoginPage';
import { env } from '../config/env';

test.use({ trace: 'off' });

test('User can sign in to iGate and open their profile @igate', async ({ page }) => {
  const igateLoginPage = new IgateLoginPage(page);

  await igateLoginPage.goto();
  await igateLoginPage.login(env.username, env.password);
  await igateLoginPage.setAuthenticationCookies();
  const response = await igateLoginPage.openProfile();

  expect(response?.ok(), 'Profile page should load successfully').toBe(true);
  await expect(page).toHaveURL(igateLoginPage.profileURL);
  await expect(igateLoginPage.signInButton).toBeHidden();
});
