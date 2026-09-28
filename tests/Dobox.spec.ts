import { test } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { env } from '../config/env';
import { Header } from '../Pages/Header';
import { SpacesComponent } from '../Pages/SpacesComponent';



test('Verify user can open spaces @smoke @regression', async ({ page }) => {
  

  const loginPage = new LoginPage(page);
  await page.goto(env.baseURL);
  await loginPage.login(env.username, env.password);

  const spacesComponent = new SpacesComponent(page);
  await spacesComponent.selectWorkspace('Test');
  
  //await page.pause();

//koko

});

test('Verify user can search and open service @smoke @regression', async ({ page }) => {
  

  const loginPage = new LoginPage(page);
  await page.goto(env.baseURL);
  await loginPage.login(env.username, env.password);

  const header = new Header(page);
  await header.selectFirstOption('Group Shared Services');
  //await page.pause();



});


