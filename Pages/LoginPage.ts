import { Page, Locator } from '@playwright/test';

export class LoginPage {

  readonly userName: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    // Elements
    this.userName = page.locator('#mat-input-0');
    this.password = page.locator('#mat-input-1');
    this.loginButton = page.getByRole('button', { name: 'Sign In' })
  }

  // Interactions
  async login(userName: string, password: string): Promise<void> {
    await this.userName.fill(userName);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async clearUsername(): Promise<void> {
    await this.userName.clear();
  }
} 
