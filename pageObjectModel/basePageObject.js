class basePageObject {
    constructor(page) {
        this.page = page;
    }

    // Method to wait for an element to be visible
    async waitForElement(locator) {
        await this.page.waitForSelector(locator, { timeout: 20000 });
    }

    // Method to wait for text content to be visible
    async waitForTextContent(locator, text) {
        await this.page.waitForSelector(locator, { timeout: 20000 });
        await expect(this.page.locator(locator)).toContainText(text);
    }

    // Method to wait for text and click 
    async waitForAndClickText(locator, text) {
        await this.page.waitForSelector(locator, { timeout: 20000 })
        const element = await this.page.locator(locator).filter({ hasText: text })
        await element.first().click()
    }

    // Method to wait for an element by index
    async waitForIndexElement(locator, index) {
        await this.page.waitForSelector(locator, { timeout: 20000 });
        await this.page.locator(locator).nth(index);
    }

    // Method to wait for an element to be visible and enabled
    async waitForEnabledElement(locator) {
        await this.page.waitForSelector(locator, { timeout: 20000 });
        const element = await this.page.locator(locator);
        await expect(element).toBeVisible();
        await expect(element).toBeEnabled();
    }

    // Method to wait for an element without asserting
    async waitForElementWithoutAssert(locator) {
        await this.page.waitForSelector(locator, { timeout: 10000 });
    }

    // Method to switch context 
    async switchContext(frameLocator) {
        const frame = await page.waitForSelector(frameLocator, { timeout: 10000 });
        await this.page.context().switchToFrame(frame);
    }

    // Method to get element text
    async getText(locator) {
        await this.page.waitForSelector(locator, { timeout: 20000 });
        return this.page.locator(locator).textContent();
    }

    // Method to wait for an element to disappear
    async waitForElementToDisappear(locator) {
        await this.page.waitForSelector(locator, { timeout: 7500, state: 'detached' });
    }

    // Method to click and log 
    async clickAndLog(locator) {
        await this.page.waitForSelector(locator, { timeout: 20000 });
        await this.page.click(locator);
        await this.page.waitForTimeout(2000);
        console.log(`Clicked ${locator}`);
    }

    // Method to click without waiting
    async click(locator) {
        await this.page.click(locator);
    }

    // Method to type slowly
    async typeSlowly(locator, text) {
        await this.page.waitForSelector(locator, { timeout: 20000 });
        await this.page.locator(locator).clear();
        for (const character of text) {
            await this.page.locator(locator).type(character, { delay: 100 });
        }
    }

    // Method to assert visibility
    async assertIsVisible(locator) {
        await expect(this.page.locator(locator)).toBeVisible();
    }

    // Method to select from dropdown
    async selectOption(locator, value) {
        await this.page.waitForSelector(locator, { timeout: 20000 })
        await this.page.selectOption(locator, value);
    }

    // Method to hover and click
    async hoverAndClick(hoverLocator, clickLocator) {
        await this.page.waitForSelector(hoverLocator, { timeout: 20000 });
        await this.page.waitForSelector(clickLocator, { timeout: 20000 });
        await this.page.hover(hoverLocator);
        await this.page.click(clickLocator);
    }

    // Method to check visibility
    async isVisible(locator) {
        let visible = true;
        await this.page.waitForSelector(locator, { timeout: 3000 })
            .catch(() => {
                visible = false;
            });
        return visible;
    }

    // Method to print page source
    async printPageSource() {
        const html = await this.page.content();
        console.log('Page source:', html);
    }

    // Method to print element text
    async printElementText(locator) {
        const text = await this.page.locator(locator).textContent();
        console.log('Element text:', text);
    }

    // Method to assert text includes
    async textIncludes(locator, text) {
        await expect(this.page.locator(locator)).toContainText(text);
    }

    // Method to assert parent text 
    async parentTextIncludes(locator, text) {
        const parent = this.page.locator(locator).first().parent();
        await expect(parent).toContainText(text);
    }

    // Method to search table rows
    async searchTableRows(tableLocator, name) {
        const rows = this.page.locator(tableLocator).all();
        for (const row of rows) {
            const text = await row.textContent();
            if (text.includes(name)) {
                console.log(`Found ${name} in row: ${text}`);
            }
        }
    }

    // Method to search and click table row
    async searchAndClickTableRow(tableLocator, name, clickLocator) {
        const rows = await this.page.locator(tableLocator).all();
        for (const row of rows) {
            const text = await row.textContent();
            if (text.includes(name)) {
                await row.locator(clickLocator).first().click();
                console.log(`Clicked ${clickLocator} in row with text: ${text}`);
                break;
            }
        }
    }

    async findAndClickChild(parentLocator, childLocator) {
        const parent = this.page.locator(parentLocator);
        const child = parent.locator(childLocator);
        await child.click();
    }

    async filterLocator(parentLocator, childLocator) {
        return this.page.locator(parentLocator).locator(childLocator);
    }

}

export default new basePageObject();
