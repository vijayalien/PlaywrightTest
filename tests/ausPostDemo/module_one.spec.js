// @ts-check
const { test, expect } = require('@playwright/test');
import homePage_PO from '../../pageObjectModel/homePage_PO';

test('Click on postage Cost module', async ({ page }) => {
    const home_PO = new homePage_PO(page)
    home_PO.goto()
    home_PO.postageCostClick()
});

