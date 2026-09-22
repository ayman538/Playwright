import { Page, Locator } from '@playwright/test';

export class SpacesComponent {
    readonly workspaceDropdown: Locator;

  constructor(private readonly page: Page) {
    this.workspaceDropdown = page.locator(
      'app-workspace-dropdown .mat-menu-trigger'
    );
  }

  async selectWorkspace(name: string): Promise<void> {
    await this.workspaceDropdown.click();
    

   const project = this.page.getByRole('menuitem', {
  name,
  exact: false
}).first();
  await project.scrollIntoViewIfNeeded();
    await project.click();

}
  //test
}
