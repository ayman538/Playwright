import { type Locator, type Page, type Response } from '@playwright/test';
import { IgateLoginPage } from './IgateLoginPage';

export class IgateProfilePage {
  readonly personalInfoURL: string;
  readonly personalInfo: Locator;
  readonly myInfoHeading: Locator;
  readonly sectionHeadings: Locator;
  readonly heading: Locator;
  readonly personalInfoLink: Locator;
  readonly businessInfoLink: Locator;
  readonly emailCopiedStatus: Locator;
  readonly birthDate: Locator;
  readonly values: Locator;

  constructor(private readonly page: Page) {
    this.personalInfoURL = `${new IgateLoginPage(page).profileURL}?tab=personal-info`;
    this.personalInfo =  page.locator('section[aria-labelledby="personal-info-title"]');
    this.myInfoHeading = this.personalInfo.getByRole('heading', { name: 'my info', exact: true });
    this.sectionHeadings = this.personalInfo.getByRole('heading', { level: 3 });
    this.heading = page.getByRole('heading', { level: 1 });
    const navigation = page.getByRole('navigation', { name: 'profile sections' });
    this.personalInfoLink = navigation.getByRole('link', { name: 'personal info', exact: true });
    this.businessInfoLink = navigation.getByRole('link', { name: 'business info', exact: true });
    this.emailCopiedStatus = page.getByRole('status').filter({ hasText: /Email copied/i });
    this.birthDate = this.personalInfo.locator('.field').filter({
      has: page.getByText('date of birth', { exact: true }),
    }).locator('dd');
    this.values = this.personalInfo.locator('dd');
  }

  emailLink(email: string): Locator {
    return this.page.getByRole('link', { name: email, exact: true });
  }

  actionButton(name: string): Locator {
    return this.page.getByRole('button', { name, exact: true });
  }

  async goto(): Promise<Response | null> {
    return this.page.goto(this.personalInfoURL, { waitUntil: 'domcontentloaded' });
  }

  async openBusinessInfo(): Promise<void> {
    await this.businessInfoLink.click();
  }

  async openPersonalInfo(): Promise<void> {
    await this.personalInfoLink.click();
  }

  async allowClipboard(): Promise<void> {
    await this.page.context().grantPermissions(['clipboard-read', 'clipboard-write']);
  }

  async copyEmail(): Promise<void> {
    await this.actionButton('copy email').click();
  }

  async readClipboard(): Promise<string> {
    return this.page.evaluate(() => navigator.clipboard.readText());
  }
}
