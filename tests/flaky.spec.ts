import { expect, test } from '@playwright/test';

//Fix the below scripts to work consistently and do not use static waits. Add proper assertions to the tests
// Login 3 times sucessfully
test('Login multiple times sucessfully @c1', async ({ page }) => {
  await page.goto('/');
  await page.locator(`//*[@href='/challenge1.html']`).click();
  // Login multiple times
  for (let i = 1; i <= 3; i++) {
    await page.locator('#email').fill(`test${i}@example.com`);
    await page.locator('#password').fill(`password${i}`);
    await page.locator('#submitButton').click();
    await expect(page.locator(`#successMessage`)).toContainText('Successfully submitted!');
    await expect(page.locator(`#successMessage`)).toContainText(`Email: test${i}@example.com`);
    await expect(page.locator(`#successMessage`)).toContainText(`Password: password${i}`);
    await expect(page.locator('#successMessage')).toHaveClass(`success-message`); //Solution
  }
});

// Login and logout successfully with animated form and delayed loading
test('Login animated form and logout sucessfully @c2', async ({ page }) => {
  await page.goto('/');
  await page.locator(`//*[@href='/challenge2.html']`).click();
  await page.locator('#email').fill(`test1@example.com`);
  await page.locator('#password').fill(`password1`);
  //await page.waitForFunction(isStable);
  await page.evaluate(() => document.querySelector('#submitButton').click());
  await expect(page.locator('#loginForm')).toHaveCSS('display', 'none');
  await expect(page.locator('#dashboard')).toHaveCSS('display', 'block');
  await expect(page.locator('#userEmail')).toContainText('Logged in as: test1@example.com');
  await expect(page.locator('#menuButton')).toBeVisible();
  await page.locator('#menuButton').click();
  await expect(page.locator('#accountMenu')).toHaveClass(`dropdown-menu show`);
  await page.locator('#logoutOption').click();
});

// Fix the Forgot password test and add proper assertions
test('Forgot password @c3', async ({ page }) => {
  await page.goto('/');
  await page.locator(`//*[@href='/challenge3.html']`).click();
  await page.getByRole('button', { name: 'Forgot Password?' }).click();
  await expect(page.locator('.back-to-login')).toContainText('Back to Login'); //Solution
  await page.locator('#email').fill('test@example.com');
  await page.getByRole('button', { name: 'Reset Password' }).click();
  await expect(page.getByRole('heading', { name: 'Success!' })).toBeVisible();
  await expect(page.locator('#mainContent')).toContainText('Password reset link sent!');
});

//Fix the login test. Hint: There is a global variable that you can use to check if the app is in ready state
test('Login and logout @c4', async ({ page }) => {
  await page.goto('/');
  await page.locator(`//*[@href='/challenge4.html']`).click();
  await page.waitForFunction(() => window.isAppReady === true); //Solution
  await page.locator('#loginForm').waitFor({ state: 'visible' });
  await page.locator('#email').fill(`test@example.com`);
  await page.locator('#password').fill(`password`);
  await page.locator('#submitButton').click();
  await expect(page.locator('#userEmail')).toContainText('test@example.com'); //assertion
  await page.locator('#profileButton').click();
  await page.getByText('Logout').click();
  await expect(page.locator('#profileButton')).toBeHidden(); //assertion
});
