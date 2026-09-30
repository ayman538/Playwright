import { Page, Locator } from '@playwright/test';

export class DoboxSideMenu {

    readonly defaultSpace : Locator;
        readonly addIcon  : Locator;


  constructor(page: Page) {

    this.defaultSpace  =   page.getByText('Default Space', { exact: true });
    this.addIcon = page.getByText('Add Space ', { exact: true });

    

  }

  async AddNewSpace(): Promise<void> {

    await this.defaultSpace.click();

    await this.addIcon.click();


  }
}
