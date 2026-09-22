import { Page, Locator ,expect  } from '@playwright/test';

export class Header {

    readonly searchBox: Locator;

  readonly autocomplete: Locator;
  readonly firstOption: Locator;

  constructor(page: Page) {

    this.searchBox = page.locator('#searchInput').first();

    this.autocomplete = page.getByRole('listbox');

    this.firstOption = this.autocomplete
      .getByRole('option')
      .first();

  }

  async selectFirstOption(expectedText: string): Promise<void> {

    await this.searchBox.fill(expectedText);

    await expect(this.firstOption).toHaveText(expectedText);

    await this.firstOption.click();
    // Wait for 2 seconds to allow the page to load after clicking the first option

  }
}
