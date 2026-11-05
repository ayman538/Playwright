import { type Locator, type Page, type Response } from '@playwright/test';
import { signIn } from '../api/auth';
import { env } from '../config/env';

export class IgateLoginPage {
  readonly portalOrigin = env.portalOrigin;
  readonly profileURL = `${this.portalOrigin}/group/hub/profile`;
  readonly emailAddress: Locator;
  readonly password: Locator;
  readonly signInButton: Locator;

  constructor(private readonly page: Page) {
    this.emailAddress = page.getByPlaceholder('Email Address', { exact: true });
    this.password = page.getByPlaceholder('Password', { exact: true });
    this.signInButton = page.getByRole('button', { name: 'Sign In', exact: true });
  }

  async goto(): Promise<void> {
    await this.page.goto(`${this.portalOrigin}/en/web/hub/login`);
  }

  async login(username: string, password: string): Promise<void> {
    await this.emailAddress.fill(username);
    await this.password.fill(password);
    await Promise.all([
      this.page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      this.signInButton.click(),
    ]);
  }

  async setAuthenticationCookies(): Promise<void> {
    const tokens = await signIn();
    if (tokens['user-id'] === undefined || tokens['user-id'] === null) {
      throw new Error('Sign-in response is missing user-id');
    }

    await this.page.context().addCookies(
      Object.entries({
        'access-token': tokens['access-token'],
        token: tokens['access-token'],
        authorization: tokens.authorization,
        userId: String(tokens['user-id']),
        username: env.username,
      }).map(([name, value]) => ({
        name,
        value,
        domain: new URL(this.portalOrigin).hostname,
        path: '/',
        secure: true,
        sameSite: 'Lax' as const,
      })),
    );
  }

  async openProfile(): Promise<Response | null> {
    return this.page.goto(this.profileURL, { waitUntil: 'domcontentloaded' });
  }
}
