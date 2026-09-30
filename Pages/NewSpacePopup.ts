import { Page, Locator ,expect  } from '@playwright/test';

export class NewSpacePopup {

    readonly SpaceName : Locator;
    readonly createButton   : Locator;
    readonly addIcon   : Locator;
    readonly memberInput   : Locator;
    readonly AddBtn   : Locator;

  readonly page: Page;


  constructor(page: Page) {
    this.page = page;

    this.SpaceName  =    page.locator('input[formcontrolname="nameFormControl"]');
    this.createButton  =  page.getByRole('button', { name: 'Create' });
this.addIcon =  page.locator('button.add-btn').first();
  
  this.memberInput =  page.locator('input[data-placeholder="search"]');

  this.AddBtn =  page.getByRole('button', { name: 'Add', exact: true });


    

  }

  async FillSpaceInfo(expectedText: string ,members?: string[],names?: string[]): Promise<void> {

    await this.SpaceName.fill(expectedText);

  if (members?.length) {
        await this.addIcon.click();

   
    for (let i = 0; i < members.length; i++) {
      await this.memberInput.fill(members[i]);

      const memberResult = this.page.getByText(names![i], {
        exact: true
      });

      await expect(memberResult).toBeVisible();
      await memberResult.click();
    }
  }
  await this.AddBtn.click();

  await this.createButton.click();
}

  
}


