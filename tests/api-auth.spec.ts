import { test, expect } from '@playwright/test';
import { signIn } from '../api/auth';

test.use({ trace: 'off' });

test('API sign-in returns access-token and authorization @api', async () => {
  const tokens = await signIn();
  // Assert presence without including token values in test reports.
  expect(Boolean(tokens['access-token'])).toBe(true);
  expect(Boolean(tokens.authorization)).toBe(true);
  console.log("Access token:", tokens['access-token']);
    console.log("Authorization:", tokens.authorization);
        console.log("User ID:", tokens['user-id']);



});
