import { test, expect, type Page, type BrowserContext } from '@playwright/test';
import { openPersonalInfo } from './helpers/igate';
import { env } from '../config/env';

const sections = [
  { story: 'HUBCS-7683', name: 'my info', fields: ['first name', 'second name', 'family name', 'date of birth', 'nationality'] },
  { story: 'HUBCS-7684', name: 'address', fields: ['address', 'city', 'district', 'zip code', 'P.O. Box'] },
  { story: 'HUBCS-7685', name: 'official documents', fields: ['id number', 'issue place', 'issue date', 'expiry date'], copy: 'id number', copyTitle: 'Copy ID Number' },
  { story: 'HUBCS-7686', name: 'social insurance', fields: ['GOSI number'], copy: 'GOSI number', copyTitle: 'Copy GOSI Number' },
  { story: 'HUBCS-7687', name: 'passport', fields: ['number', 'issue place', 'issue date', 'expiry date'], copy: 'number', copyTitle: 'Copy Passport Number' },
  { story: 'HUBCS-7688', name: 'driving license', fields: ['number', 'issue date', 'expiry date'], copy: 'number', copyTitle: 'Copy License Number' },
  { story: 'HUBCS-7690', name: 'bank', fields: ['account number'], copy: 'account number', copyTitle: 'Copy Account Number' },
  { story: 'HUBCS-7689', name: 'family', fields: [] },
];

function personalInfo(page: Page) {
  return page.getByRole('region', { name: 'personal info', exact: true });
}

function sectionCard(page: Page, name: string) {
  return personalInfo(page).locator('hp-section-card').filter({
    has: page.getByRole('heading', { name, exact: true, level: 3 }),
  });
}

// Each case gets a fresh page and login, so a failed interaction cannot affect the next case.
test.use({ viewport: { width: 1920, height: 1080 } });
test.describe('Personal info', { tag: '@profile' }, () => {
  test.beforeEach(async ({ page, context }) => {
    await test.step('Sign in and open Personal info', async () => {
      await openPersonalInfo(page, context);
      await expect(personalInfo(page).getByRole('heading', { name: 'my info', exact: true })).toBeVisible();
    });
  });

  test.describe('my info', () => {
    test('Read-Only @HUBCS-7683-C', async ({ page }) => {
      await checkSection(page, sections[0], 'Read-Only');
    });

    test('Collapse & Expand @HUBCS-7683-D', async ({ page }) => {
      await checkSection(page, sections[0], 'Collapse & Expand');
    });

    test('State Not Saved @HUBCS-7683-E', async ({ page }) => {
      await checkSection(page, sections[0], 'State Not Saved');
    });

  });

  test.describe('address', () => {
    test('Read-Only @HUBCS-7684-D', async ({ page }) => {
      await checkSection(page, sections[1], 'Read-Only');
    });

    test('Collapse & Expand @HUBCS-7684-E', async ({ page }) => {
      await checkSection(page, sections[1], 'Collapse & Expand');
    });

    test('State Not Saved @HUBCS-7684-F', async ({ page }) => {
      await checkSection(page, sections[1], 'State Not Saved');
    });

  });

  test.describe('official documents', () => {
    test('Copy ID Number @HUBCS-7685-B', async ({ page, context }) => {
      await checkCopy(page, context, sections[2]);
    });

    test('Read-Only @HUBCS-7685-E', async ({ page }) => {
      await checkSection(page, sections[2], 'Read-Only');
    });

    test('Collapse & Expand @HUBCS-7685-F', async ({ page }) => {
      await checkSection(page, sections[2], 'Collapse & Expand');
    });

    test('State Not Saved @HUBCS-7685-G', async ({ page }) => {
      await checkSection(page, sections[2], 'State Not Saved');
    });

  });

  test.describe('social insurance', () => {
    test('Copy GOSI Number @HUBCS-7686-B', async ({ page, context }) => {
      await checkCopy(page, context, sections[3]);
    });

    test('Read-Only @HUBCS-7686-D', async ({ page }) => {
      await checkSection(page, sections[3], 'Read-Only');
    });

    test('Collapse & Expand @HUBCS-7686-E', async ({ page }) => {
      await checkSection(page, sections[3], 'Collapse & Expand');
    });

    test('State Not Saved @HUBCS-7686-F', async ({ page }) => {
      await checkSection(page, sections[3], 'State Not Saved');
    });

  });

  test.describe('passport', () => {
    test('Copy Passport Number @HUBCS-7687-C', async ({ page, context }) => {
      await checkCopy(page, context, sections[4]);
    });

    test('Read-Only @HUBCS-7687-E', async ({ page }) => {
      await checkSection(page, sections[4], 'Read-Only');
    });

    test('Collapse & Expand @HUBCS-7687-F', async ({ page }) => {
      await checkSection(page, sections[4], 'Collapse & Expand');
    });

    test('State Not Saved @HUBCS-7687-G', async ({ page }) => {
      await checkSection(page, sections[4], 'State Not Saved');
    });

  });

  test.describe('driving license', () => {
    test('Copy License Number @HUBCS-7688-B', async ({ page, context }) => {
      await checkCopy(page, context, sections[5]);
    });

    test('Read-Only @HUBCS-7688-D', async ({ page }) => {
      await checkSection(page, sections[5], 'Read-Only');
    });

    test('Collapse & Expand @HUBCS-7688-E', async ({ page }) => {
      await checkSection(page, sections[5], 'Collapse & Expand');
    });

    test('State Not Saved @HUBCS-7688-F', async ({ page }) => {
      await checkSection(page, sections[5], 'State Not Saved');
    });

  });

  test.describe('bank', () => {
    test('Copy Account Number @HUBCS-7690-C', async ({ page, context }) => {
      await checkCopy(page, context, sections[6]);
    });

    test('Read-Only @HUBCS-7690-E', async ({ page }) => {
      await checkSection(page, sections[6], 'Read-Only');
    });

    test('Collapse & Expand @HUBCS-7690-F', async ({ page }) => {
      await checkSection(page, sections[6], 'Collapse & Expand');
    });

    test('State Not Saved @HUBCS-7690-G', async ({ page }) => {
      await checkSection(page, sections[6], 'State Not Saved');
    });

  });

  test.describe('family', () => {
    test('Read-Only @HUBCS-7689-G', async ({ page }) => {
      await checkSection(page, sections[7], 'Read-Only');
    });

    test('Collapse & Expand @HUBCS-7689-H', async ({ page }) => {
      await checkSection(page, sections[7], 'Collapse & Expand');
    });

    test('State Not Saved @HUBCS-7689-I', async ({ page }) => {
      await checkSection(page, sections[7], 'State Not Saved');
    });

  });

  test.describe('HUBCS-7692', () => {
    test('Copy Email @HUBCS-7692-N', async ({ page, context }) => {
      await context.grantPermissions(['clipboard-read', 'clipboard-write']);
      await test.step('Copy the email address from the profile header', async () => {
        await expect(page.getByRole('link', { name: env.username, exact: true })).toBeVisible();
        await page.getByRole('button', { name: 'copy email', exact: true }).click();
      });
      await test.step('Check the clipboard and the email copied message', async () => {
        await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(env.username);
        await expect(page.getByRole('status').filter({ hasText: /Email copied/i })).toBeVisible();
      });
    });

    test('Action Buttons @HUBCS-7692-Q', async ({ page }) => {
      await test.step('Check the actions available in the profile header', async () => {
        for (const name of ['create meeting', 'add task', 'org chart', 'delegation', 'more']) {
          await expect(page.getByRole('button', { name, exact: true })).toBeVisible();
        }
      });
    });
  });

  // Related display cases are covered partially: this checks labels and formatting,
  // without asserting fixture-specific values, flags, or missing-data preconditions.
  test('Personal info layout and formatting @HUBCS-7683-A @HUBCS-7683-B @HUBCS-7684-A @HUBCS-7685-A @HUBCS-7686-A @HUBCS-7687-A @HUBCS-7688-A @HUBCS-7689-A @HUBCS-7690-A', {
    annotation: { type: 'coverage', description: 'Partial: layout and formatting only; scenario-specific data is not verified.' },
  }, async ({ page }) => {
    await test.step('Check that Personal info is selected and My info appears first', async () => {
      await expect(page.getByRole('navigation', { name: 'profile sections' }).getByRole('link', { name: 'personal info', exact: true })).toHaveAttribute('aria-current', 'page');
      await expect(personalInfo(page).getByRole('heading', { level: 3 }).first()).toHaveText('my info');
      await expect(page.getByRole('heading', { level: 1 })).not.toBeEmpty();
    });
    for (const section of sections) {
      await test.step(`Check the labels and successful loading of ${section.name}`, async () => {
        const card = sectionCard(page, section.name);
        if (section.name === 'family') {
          await expect(card.getByRole('columnheader')).toHaveText(['name', 'relation']);
        } else {
          await expect(card.locator('dt')).toHaveText(section.fields.map(label => new RegExp(`^\\s*${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'i')));
        }
        await expect(card.getByRole('alert')).toHaveCount(0);
      });
    }
    await test.step('Check the birth date format and missing-value placeholders', async () => {
      await expect(personalInfo(page).locator('.field').filter({ has: page.getByText('date of birth', { exact: true }) }).locator('dd')).toHaveText(/^(?:--|\d{1,2} [A-Za-z]+ \d{4})$/);
      const values = (await personalInfo(page).locator('dd').allTextContents()).map(value => value.trim());
      expect(values.filter(value => ['', '\u2014', '\u2013', '-'].includes(value)), 'Missing values should display --').toEqual([]);
    });
  });
});


// Shared interactions keep each test declaration short and its case ID visible.
async function checkSection(page: Page, section: typeof sections[number], title: string) {
  const card = sectionCard(page, section.name);
  const toggle = card.getByRole('button', { name: section.name, exact: true });
  const content = card.locator(':scope > .body');

  await test.step(`Find the expanded ${section.name} section`, async () => {
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await expect(content).toBeVisible();
  });

  if (title === 'Read-Only') {
    await test.step('Check that the employee cannot add or edit information', async () => {
      await expect(card.locator('input:not([type=hidden]), textarea, select, [contenteditable=true]')).toHaveCount(0);
      await expect(card.getByRole('button', { name: /^(add|edit)(\s|$)/i })).toHaveCount(0);
    });
  } else {
    await test.step(`Collapse ${section.name} and check that its content is hidden`, async () => {
      await toggle.click();
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(content).toBeHidden();
    });

    if (title === 'Collapse & Expand') {
      await test.step(`Expand ${section.name} again`, async () => {
        await toggle.click();
        await expect(toggle).toHaveAttribute('aria-expanded', 'true');
        await expect(content).toBeVisible();
      });
    } else {
      await test.step('Visit Business info, then return to Personal info', async () => {
        const navigation = page.getByRole('navigation', { name: 'profile sections' });
        await navigation.getByRole('link', { name: 'business info', exact: true }).click();
        await expect(page).toHaveURL(/tab=business-info/);
        await expect(personalInfo(page)).toBeHidden();
        await navigation.getByRole('link', { name: 'personal info', exact: true }).click();
        await expect(toggle).toHaveAttribute('aria-expanded', 'true');
        await expect(content).toBeVisible();
      });
    }
  }
}

async function checkCopy(page: Page, context: BrowserContext, section: typeof sections[number]) {
  const card = sectionCard(page, section.name);
  const field = card.locator('.field').filter({
    has: page.locator('dt').filter({ hasText: new RegExp(`^${section.copy}$`, 'i') }),
  });
  await expect(field.locator('dd')).toBeVisible();
  const value = (await field.locator('dd').innerText()).trim();
  test.skip(!value || ['--', '\u2014', '\u2013', '-'].includes(value), 'This employee has no number to copy; use an account with this field populated.');

  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await test.step(`Copy the displayed ${section.copy}`, async () => {
    await field.getByRole('button', { name: /copy/i }).click();
  });
  await test.step('Check the copied number and the confirmation message', async () => {
    await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe(value);
    await expect(card.getByRole('status')).toContainText(/copied/i);
  });
}
