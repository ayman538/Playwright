import { test as base, expect } from '@playwright/test';
import { IgateLoginPage } from '../Pages/IgateLoginPage';
import { IgateProfilePage } from '../Pages/IgateProfilePage';
import { IgateProfileSection } from '../Pages/IgateProfileSection';
import { env } from '../config/env';

const test = base.extend<{ profilePage: IgateProfilePage }>({
  profilePage: async ({ page }, use) => {
    await use(new IgateProfilePage(page));
  },
});

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

// Each case gets a fresh page and login, so a failed interaction cannot affect the next case.
test.use({ viewport: { width: 1920, height: 1080 } });
test.describe('Personal info', { tag: ['@profile', '@profile-info-seq'] }, () => {
  test.beforeEach(async ({ page, profilePage }) => {

    
    await test.step('Sign in and open Personal info', async () => {
      const loginPage = new IgateLoginPage(page);
      await test.step('Open iGate login', () => loginPage.goto());
      await loginPage.login(env.username, env.password);
      await loginPage.setAuthenticationCookies();
      const response = await profilePage.goto();
      expect(response?.ok(), 'Personal info document should load').toBe(true);
      await expect(page).toHaveURL(profilePage.personalInfoURL);
      await expect(profilePage.myInfoHeading).toBeVisible();
    });
  });

  test.describe('my info', () => {
    test('Read-Only @HUBCS-7683-C', async ({ page }) => {
      const myInfoSection = new IgateProfileSection(page, 'my info');

      await expect(myInfoSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(myInfoSection.content).toBeVisible();

      await expect(myInfoSection.editableFields).toHaveCount(0);
      await expect(myInfoSection.editButtons).toHaveCount(0);
    });

    test('Collapse & Expand @HUBCS-7683-D', async ({ page, profilePage }) => {
      const myInfoSection = new IgateProfileSection(page, 'my info');

      await expect(myInfoSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(myInfoSection.content).toBeVisible();

      await myInfoSection.toggleExpanded();
      await expect(myInfoSection.toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(myInfoSection.content).toBeHidden();

      await myInfoSection.toggleExpanded();
      await expect(myInfoSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(myInfoSection.content).toBeVisible();
    });

    test('State Not Saved @HUBCS-7683-E', async ({ page, profilePage }) => {
      const myInfoSection = new IgateProfileSection(page, 'my info');

      await expect(myInfoSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(myInfoSection.content).toBeVisible();

      await myInfoSection.toggleExpanded();
      await expect(myInfoSection.toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(myInfoSection.content).toBeHidden();

      await profilePage.openBusinessInfo();
      await expect(page).toHaveURL(/tab=business-info/);
      await expect(profilePage.personalInfo).toBeHidden();
      await profilePage.openPersonalInfo();
      await expect(myInfoSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(myInfoSection.content).toBeVisible();
    });

  });

  test.describe('address', () => {
    test('Read-Only @HUBCS-7684-D', async ({ page, profilePage }) => {
      const addressSection = new IgateProfileSection(page, 'address');

      await expect(addressSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(addressSection.content).toBeVisible();

      await expect(addressSection.editableFields).toHaveCount(0);
      await expect(addressSection.editButtons).toHaveCount(0);
    });

    test('Collapse & Expand @HUBCS-7684-E', async ({ page, profilePage }) => {
      const addressSection = new IgateProfileSection(page, 'address');

      await expect(addressSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(addressSection.content).toBeVisible();

      await addressSection.toggleExpanded();
      await expect(addressSection.toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(addressSection.content).toBeHidden();

      await addressSection.toggleExpanded();
      await expect(addressSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(addressSection.content).toBeVisible();
    });

    test('State Not Saved @HUBCS-7684-F', async ({ page, profilePage }) => {
      const addressSection = new IgateProfileSection(page, 'address');

      await expect(addressSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(addressSection.content).toBeVisible();

      await addressSection.toggleExpanded();
      await expect(addressSection.toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(addressSection.content).toBeHidden();

      await profilePage.openBusinessInfo();
      await expect(page).toHaveURL(/tab=business-info/);
      await expect(profilePage.personalInfo).toBeHidden();
      await profilePage.openPersonalInfo();
      await expect(addressSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(addressSection.content).toBeVisible();
    });

  });

  test.describe('official documents', () => {
    test('Copy ID Number @HUBCS-7685-B', async ({ page, profilePage }) => {
      const officialDocumentsSection = new IgateProfileSection(page, 'official documents');
      const fieldValue = officialDocumentsSection.fieldValue('id number');
      await expect(fieldValue).toBeVisible();
      const value = (await fieldValue.innerText()).trim();
      test.skip(!value || ['--', '\u2014', '\u2013', '-'].includes(value), 'This employee has no number to copy; use an account with this field populated.');

      await profilePage.allowClipboard();
      await officialDocumentsSection.copyField('id number');
      await expect.poll(() => profilePage.readClipboard()).toBe(value);
      await expect(officialDocumentsSection.status).toContainText(/copied/i);
    });

    test('Read-Only @HUBCS-7685-E', async ({ page, profilePage }) => {
      const officialDocumentsSection = new IgateProfileSection(page, 'official documents');

      await expect(officialDocumentsSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(officialDocumentsSection.content).toBeVisible();

      await expect(officialDocumentsSection.editableFields).toHaveCount(0);
      await expect(officialDocumentsSection.editButtons).toHaveCount(0);
    });

    test('Collapse & Expand @HUBCS-7685-F', async ({ page, profilePage }) => {
      const officialDocumentsSection = new IgateProfileSection(page, 'official documents');

      await expect(officialDocumentsSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(officialDocumentsSection.content).toBeVisible();

      await officialDocumentsSection.toggleExpanded();
      await expect(officialDocumentsSection.toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(officialDocumentsSection.content).toBeHidden();

      await officialDocumentsSection.toggleExpanded();
      await expect(officialDocumentsSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(officialDocumentsSection.content).toBeVisible();
    });

    test('State Not Saved @HUBCS-7685-G', async ({ page, profilePage }) => {
      const officialDocumentsSection = new IgateProfileSection(page, 'official documents');

      await expect(officialDocumentsSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(officialDocumentsSection.content).toBeVisible();

      await officialDocumentsSection.toggleExpanded();
      await expect(officialDocumentsSection.toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(officialDocumentsSection.content).toBeHidden();

      await profilePage.openBusinessInfo();
      await expect(page).toHaveURL(/tab=business-info/);
      await expect(profilePage.personalInfo).toBeHidden();
      await profilePage.openPersonalInfo();
      await expect(officialDocumentsSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(officialDocumentsSection.content).toBeVisible();
    });

  });

  test.describe('social insurance', () => {
    test('Copy GOSI Number @HUBCS-7686-B', async ({ page, profilePage }) => {
      const socialInsuranceSection = new IgateProfileSection(page, 'social insurance');
      const fieldValue = socialInsuranceSection.fieldValue('GOSI number');
      await expect(fieldValue).toBeVisible();
      const value = (await fieldValue.innerText()).trim();
      test.skip(!value || ['--', '\u2014', '\u2013', '-'].includes(value), 'This employee has no number to copy; use an account with this field populated.');

      await profilePage.allowClipboard();
      await socialInsuranceSection.copyField('GOSI number');
      await expect.poll(() => profilePage.readClipboard()).toBe(value);
      await expect(socialInsuranceSection.status).toContainText(/copied/i);
    });

    test('Read-Only @HUBCS-7686-D', async ({ page, profilePage }) => {
      const socialInsuranceSection = new IgateProfileSection(page, 'social insurance');

      await expect(socialInsuranceSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(socialInsuranceSection.content).toBeVisible();

      await expect(socialInsuranceSection.editableFields).toHaveCount(0);
      await expect(socialInsuranceSection.editButtons).toHaveCount(0);
    });

    test('Collapse & Expand @HUBCS-7686-E', async ({ page, profilePage }) => {
      const socialInsuranceSection = new IgateProfileSection(page, 'social insurance');

      await expect(socialInsuranceSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(socialInsuranceSection.content).toBeVisible();

      await socialInsuranceSection.toggleExpanded();
      await expect(socialInsuranceSection.toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(socialInsuranceSection.content).toBeHidden();

      await socialInsuranceSection.toggleExpanded();
      await expect(socialInsuranceSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(socialInsuranceSection.content).toBeVisible();
    });

    test('State Not Saved @HUBCS-7686-F', async ({ page, profilePage }) => {
      const socialInsuranceSection = new IgateProfileSection(page, 'social insurance');

      await expect(socialInsuranceSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(socialInsuranceSection.content).toBeVisible();

      await socialInsuranceSection.toggleExpanded();
      await expect(socialInsuranceSection.toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(socialInsuranceSection.content).toBeHidden();

      await profilePage.openBusinessInfo();
      await expect(page).toHaveURL(/tab=business-info/);
      await expect(profilePage.personalInfo).toBeHidden();
      await profilePage.openPersonalInfo();
      await expect(socialInsuranceSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(socialInsuranceSection.content).toBeVisible();
    });

  });

  test.describe('passport', () => {
    test('Copy Passport Number @HUBCS-7687-C', async ({ page, profilePage }) => {
      const passportSection = new IgateProfileSection(page, 'passport');
      const fieldValue = passportSection.fieldValue('number');
      await expect(fieldValue).toBeVisible();
      const value = (await fieldValue.innerText()).trim();
      test.skip(!value || ['--', '\u2014', '\u2013', '-'].includes(value), 'This employee has no number to copy; use an account with this field populated.');

      await profilePage.allowClipboard();
      await passportSection.copyField('number');
      await expect.poll(() => profilePage.readClipboard()).toBe(value);
      await expect(passportSection.status).toContainText(/copied/i);
    });

    test('Read-Only @HUBCS-7687-E', async ({ page, profilePage }) => {
      const passportSection = new IgateProfileSection(page, 'passport');

      await expect(passportSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(passportSection.content).toBeVisible();

      await expect(passportSection.editableFields).toHaveCount(0);
      await expect(passportSection.editButtons).toHaveCount(0);
    });

    test('Collapse & Expand @HUBCS-7687-F', async ({ page, profilePage }) => {
      const passportSection = new IgateProfileSection(page, 'passport');

      await expect(passportSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(passportSection.content).toBeVisible();

      await passportSection.toggleExpanded();
      await expect(passportSection.toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(passportSection.content).toBeHidden();

      await passportSection.toggleExpanded();
      await expect(passportSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(passportSection.content).toBeVisible();
    });

    test('State Not Saved @HUBCS-7687-G', async ({ page, profilePage }) => {
      const passportSection = new IgateProfileSection(page, 'passport');

      await expect(passportSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(passportSection.content).toBeVisible();

      await passportSection.toggleExpanded();
      await expect(passportSection.toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(passportSection.content).toBeHidden();

      await profilePage.openBusinessInfo();
      await expect(page).toHaveURL(/tab=business-info/);
      await expect(profilePage.personalInfo).toBeHidden();
      await profilePage.openPersonalInfo();
      await expect(passportSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(passportSection.content).toBeVisible();
    });

  });

  test.describe('driving license', () => {
    test('Copy License Number @HUBCS-7688-B', async ({ page, profilePage }) => {
      const drivingLicenseSection = new IgateProfileSection(page, 'driving license');
      const fieldValue = drivingLicenseSection.fieldValue('number');
      await expect(fieldValue).toBeVisible();
      const value = (await fieldValue.innerText()).trim();
      test.skip(!value || ['--', '\u2014', '\u2013', '-'].includes(value), 'This employee has no number to copy; use an account with this field populated.');

      await profilePage.allowClipboard();
      await drivingLicenseSection.copyField('number');
      await expect.poll(() => profilePage.readClipboard()).toBe(value);
      await expect(drivingLicenseSection.status).toContainText(/copied/i);
    });

    test('Read-Only @HUBCS-7688-D', async ({ page, profilePage }) => {
      const drivingLicenseSection = new IgateProfileSection(page, 'driving license');

      await expect(drivingLicenseSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(drivingLicenseSection.content).toBeVisible();

      await expect(drivingLicenseSection.editableFields).toHaveCount(0);
      await expect(drivingLicenseSection.editButtons).toHaveCount(0);
    });

    test('Collapse & Expand @HUBCS-7688-E', async ({ page, profilePage }) => {
      const drivingLicenseSection = new IgateProfileSection(page, 'driving license');

      await expect(drivingLicenseSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(drivingLicenseSection.content).toBeVisible();

      await drivingLicenseSection.toggleExpanded();
      await expect(drivingLicenseSection.toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(drivingLicenseSection.content).toBeHidden();

      await drivingLicenseSection.toggleExpanded();
      await expect(drivingLicenseSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(drivingLicenseSection.content).toBeVisible();
    });

    test('State Not Saved @HUBCS-7688-F', async ({ page, profilePage }) => {
      const drivingLicenseSection = new IgateProfileSection(page, 'driving license');

      await expect(drivingLicenseSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(drivingLicenseSection.content).toBeVisible();

      await drivingLicenseSection.toggleExpanded();
      await expect(drivingLicenseSection.toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(drivingLicenseSection.content).toBeHidden();

      await profilePage.openBusinessInfo();
      await expect(page).toHaveURL(/tab=business-info/);
      await expect(profilePage.personalInfo).toBeHidden();
      await profilePage.openPersonalInfo();
      await expect(drivingLicenseSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(drivingLicenseSection.content).toBeVisible();
    });

  });

  test.describe('bank', () => {
    test('Copy Account Number @HUBCS-7690-C', async ({ page, profilePage }) => {
      const bankSection = new IgateProfileSection(page, 'bank');
      const fieldValue = bankSection.fieldValue('account number');
      await expect(fieldValue).toBeVisible();
      const value = (await fieldValue.innerText()).trim();
      test.skip(!value || ['--', '\u2014', '\u2013', '-'].includes(value), 'This employee has no number to copy; use an account with this field populated.');

      await profilePage.allowClipboard();
      await bankSection.copyField('account number');
      await expect.poll(() => profilePage.readClipboard()).toBe(value);
      await expect(bankSection.status).toContainText(/copied/i);
    });

    test('Read-Only @HUBCS-7690-E', async ({ page, profilePage }) => {
      const bankSection = new IgateProfileSection(page, 'bank');

      await expect(bankSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(bankSection.content).toBeVisible();

      await expect(bankSection.editableFields).toHaveCount(0);
      await expect(bankSection.editButtons).toHaveCount(0);
    });

    test('Collapse & Expand @HUBCS-7690-F', async ({ page, profilePage }) => {
      const bankSection = new IgateProfileSection(page, 'bank');

      await expect(bankSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(bankSection.content).toBeVisible();

      await bankSection.toggleExpanded();
      await expect(bankSection.toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(bankSection.content).toBeHidden();

      await bankSection.toggleExpanded();
      await expect(bankSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(bankSection.content).toBeVisible();
    });

    test('State Not Saved @HUBCS-7690-G', async ({ page, profilePage }) => {
      const bankSection = new IgateProfileSection(page, 'bank');

      await expect(bankSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(bankSection.content).toBeVisible();

      await bankSection.toggleExpanded();
      await expect(bankSection.toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(bankSection.content).toBeHidden();

      await profilePage.openBusinessInfo();
      await expect(page).toHaveURL(/tab=business-info/);
      await expect(profilePage.personalInfo).toBeHidden();
      await profilePage.openPersonalInfo();
      await expect(bankSection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(bankSection.content).toBeVisible();
    });

  });

  test.describe('family', () => {
    test('Read-Only @HUBCS-7689-G', async ({ page, profilePage }) => {
      const familySection = new IgateProfileSection(page, 'family');

      await expect(familySection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(familySection.content).toBeVisible();

      await expect(familySection.editableFields).toHaveCount(0);
      await expect(familySection.editButtons).toHaveCount(0);
    });

    test('Collapse & Expand @HUBCS-7689-H', async ({ page, profilePage }) => {
      const familySection = new IgateProfileSection(page, 'family');

      await expect(familySection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(familySection.content).toBeVisible();

      await familySection.toggleExpanded();
      await expect(familySection.toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(familySection.content).toBeHidden();

      await familySection.toggleExpanded();
      await expect(familySection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(familySection.content).toBeVisible();
    });

    test('State Not Saved @HUBCS-7689-I', async ({ page, profilePage }) => {
      const familySection = new IgateProfileSection(page, 'family');

      await expect(familySection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(familySection.content).toBeVisible();

      await familySection.toggleExpanded();
      await expect(familySection.toggle).toHaveAttribute('aria-expanded', 'false');
      await expect(familySection.content).toBeHidden();

      await profilePage.openBusinessInfo();
      await expect(page).toHaveURL(/tab=business-info/);
      await expect(profilePage.personalInfo).toBeHidden();
      await profilePage.openPersonalInfo();
      await expect(familySection.toggle).toHaveAttribute('aria-expanded', 'true');
      await expect(familySection.content).toBeVisible();
    });

  });

  test.describe('HUBCS-7692', () => {
    test('Copy Email @HUBCS-7692-N', async ({ page, profilePage }) => {
      await profilePage.allowClipboard();
      await test.step('Copy the email address from the profile header', async () => {
        await expect(profilePage.emailLink(env.username)).toBeVisible();
        await profilePage.copyEmail();
      });
      await test.step('Check the clipboard and the email copied message', async () => {
        await expect.poll(() => profilePage.readClipboard()).toBe(env.username);
        await expect(profilePage.emailCopiedStatus).toBeVisible();
      });
    });

    test('Action Buttons @HUBCS-7692-Q', async ({ page, profilePage }) => {
      await test.step('Check the actions available in the profile header', async () => {
        for (const name of ['create meeting', 'add task', 'org chart', 'delegation', 'more']) {
          await expect(profilePage.actionButton(name)).toBeVisible();
        }
      });
    });
  });

  // Related display cases are covered partially: this checks labels and formatting,
  // without asserting fixture-specific values, flags, or missing-data preconditions.
  test('Personal info layout and formatting @HUBCS-7683-A @HUBCS-7683-B @HUBCS-7684-A @HUBCS-7685-A @HUBCS-7686-A @HUBCS-7687-A @HUBCS-7688-A @HUBCS-7689-A @HUBCS-7690-A', {
    annotation: { type: 'coverage', description: 'Partial: layout and formatting only; scenario-specific data is not verified.' },
  }, async ({ page, profilePage }) => {
    await test.step('Check that Personal info is selected and My info appears first', async () => {
      await expect(profilePage.personalInfoLink).toHaveAttribute('aria-current', 'page');
      await expect(profilePage.sectionHeadings.first()).toHaveText('my info');
      await expect(profilePage.heading).not.toBeEmpty();
    });
    for (const section of sections) {
      await test.step(`Check the labels and successful loading of ${section.name}`, async () => {
        const card = new IgateProfileSection(page, section.name);
        if (section.name === 'family') {
          await expect(card.columnHeaders).toHaveText(['name', 'relation']);
        } else {
          await expect(card.labels).toHaveText(section.fields.map(label => new RegExp(`^\\s*${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'i')));
        }
        await expect(card.alerts).toHaveCount(0);
      });
    }
    await test.step('Check the birth date format and missing-value placeholders', async () => {
      await expect(profilePage.birthDate).toHaveText(/^(?:--|\d{1,2} [A-Za-z]+ \d{4})$/);
      const values = (await profilePage.values.allTextContents()).map(value => value.trim());
      expect(values.filter(value => ['', '\u2014', '\u2013', '-'].includes(value)), 'Missing values should display --').toEqual([]);
    });
  });
});
