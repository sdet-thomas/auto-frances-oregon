import { test, expect } from '@playwright/test';
import { username, password } from './config.ts';
import { Job, loadJobsFromCsv } from '../utils/jobUtils';

test('test', async ({ page }) => {
  await page.goto('https://frances.oregon.gov/Claimant/_/');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill(username);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();

  // 2 minutes: Allow time for manaul input of multi-factor authentication
  await expect(page.getByText('Ready to File')).toBeVisible({timeout: 120000 });
  // File a new weekly claim 
  await page.getByRole('link', { name: 'File Now' }).click();
  await page.getByRole('button', { name: ' Next' }).click();

  // I don't trust any of the other locators, so I'm going to use XPath, if the questions changes, the script will fail
  const question1 = "Did you fail to accept any offer of work last week?"
  const question2 = "Did you quit a job last week?"
  const question3 = "Were you fired from a job last week?"
  const question4 = "Were you suspended from a job last week?"
  await page.locator(`//legend[contains(text(), "${question1}")]/following-sibling::div//label[.//span[contains(text(), "No")]]`).click();
  await page.locator(`//legend[contains(text(), "${question2}")]/following-sibling::div//label[.//span[contains(text(), "No")]]`).click();
  await page.locator(`//legend[contains(text(), "${question3}")]/following-sibling::div//label[.//span[contains(text(), "No")]]`).click();
  await page.locator(`//legend[contains(text(), "${question4}")]/following-sibling::div//label[.//span[contains(text(), "No")]]`).click();
  await page.getByRole('button', { name: ' Next' }).click();

  const question5 = "Were you away from your permanent residence for more than three days last week?"
  const question6 = "Were you both physically and mentally able to perform the work you sought last week?"
  const question7 = "Each day last week, were you willing to work and capable of accepting and reporting for full-time, part-time, and temporary work?"
  await page.locator(`//legend[contains(text(), "${question5}")]/following-sibling::div//label[.//span[contains(text(), "No")]]`).click();
  await page.locator(`//legend[contains(text(), "${question6}")]/following-sibling::div//label[.//span[contains(text(), "Yes")]]`).click();
  await page.locator(`//legend[contains(text(), "${question7}")]/following-sibling::div//label[.//span[contains(text(), "Yes")]]`).click();
  await page.getByRole('button', { name: ' Next' }).click();

  const question8 = "Did you actively look for work last week?"
  await page.locator(`//legend[contains(text(), "${question8}")]/following-sibling::div//label[.//span[contains(text(), "Yes")]]`).click();

  // Load jobs from CSV - update the path if needed
  const jobs = loadJobsFromCsv('../jobs.csv');
  for (const job of jobs) {
    await page.getByLabel('Direct Contacts').getByRole('link', { name: ' Add a Direct Contact' }).click();
    await page.getByRole('textbox', { name: 'Employer Name *' }).click();
    await page.getByRole('textbox', { name: 'Employer Name *' }).fill(job['Employer Name']);
    await page.getByRole('textbox', { name: 'Job Title *' }).click();
    await page.getByRole('textbox', { name: 'Job Title *' }).fill(job['Job Title']);
    await page.getByRole('textbox', { name: 'Location *' }).click();
    await page.getByRole('textbox', { name: 'Location *' }).fill(job['Location']);
    await page.getByRole('textbox', { name: 'Contact Date *' }).click();
    await page.getByRole('textbox', { name: 'Contact Date *' }).fill(job['Contact Date']);
    await page.getByLabel('Contact Method').selectOption(job['Contact Method']);
    await page.getByLabel('Results').selectOption(job['Results']);
    await page.getByRole('button', { name: 'Add' }).click();
  }
  // Take a screenshot of the Direct Contacts page
  await page.waitForTimeout(1000);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const screenshotPath = `Jobs_Direct_Contacts_${timestamp}.png`;
  await page.screenshot({ path: screenshotPath, fullPage: true });
  await page.getByRole('button', { name: ' Next' }).click();

   // This will keep the browser open for you to finish the claim
   await page.pause();
});
