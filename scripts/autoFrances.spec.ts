import { test, expect } from '@playwright/test';
import { username, password } from './config.ts';


test('test', async ({ page }) => {
  await page.goto('https://frances.oregon.gov/Claimant/_/');
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill(username);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(password);
  await page.getByRole('button', { name: 'Log in' }).click();

  // 2 minutes: Allow time for manaul input of multi-factor authentication
  await expect(page.getByRole('link', { name: 'Manage My Profile' })).toBeVisible({ timeout: 120000 }); 

});