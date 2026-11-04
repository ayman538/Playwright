import { type Locator, type Page } from '@playwright/test';

export class IgateProfileSection {
  readonly card: Locator;
  readonly toggle: Locator;
  readonly content: Locator;
  readonly editableFields: Locator;
  readonly editButtons: Locator;
  readonly columnHeaders: Locator;
  readonly labels: Locator;
  readonly alerts: Locator;
  readonly status: Locator;

  constructor(private readonly page: Page, name: string) {
    const region = page.locator('section[aria-labelledby="personal-info-title"]');
    this.card = region.locator('hp-section-card').filter({
      has: page.getByRole('heading', { name, exact: true, level: 3 }),
    });
    this.toggle = this.card.getByRole('button', { name, exact: true });
    this.content = this.card.locator(':scope > .body');
    this.editableFields = this.card.locator('input:not([type=hidden]), textarea, select, [contenteditable=true]');
    this.editButtons = this.card.getByRole('button', { name: /^(add|edit)(\s|$)/i });
    this.columnHeaders = this.card.getByRole('columnheader');
    this.labels = this.card.locator('dt');
    this.alerts = this.card.getByRole('alert');
    this.status = this.card.getByRole('status');
  }

  private field(label: string): Locator {
    const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return this.card.locator('.field').filter({
      has: this.page.locator('dt').filter({ hasText: new RegExp(`^${escaped}$`, 'i') }),
    });
  }

  fieldValue(label: string): Locator {
    return this.field(label).locator('dd');
  }

  async toggleExpanded(): Promise<void> {
    await this.toggle.click();
  }

  async copyField(label: string): Promise<void> {
    await this.field(label).getByRole('button', { name: /copy/i }).click();
  }
}
