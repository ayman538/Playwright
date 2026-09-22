import { test, expect,Page  } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { env } from '../config/env';

export class loginPage {
    readonly loginPage: LoginPage;

    constructor(page: Page) {
    this.loginPage = new LoginPage(page);
  }

}



test('Verify user can login successfully @smoke @regression', async ({ page }) => {
  

  // Expect a title "to contain" a substring.
  //await expect(page).toHaveTitle(/*hubplatforms/);
  const loginPage = new LoginPage(page);
  await page.goto(env.baseURL);
  await loginPage.login(env.username, env.password);
  await expect(page).toHaveTitle(/Dobox/);


});


