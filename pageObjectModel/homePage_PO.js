import basePageObject from ""

class homePage_PO extends basePageObject {

    constructor(page) {
        super(page);
        
    }

    async goto() {
        await this.page.goto('https://auspost.com.au/');
    }

    async postageCostClick() {
        await this.waitForAndClickText(this.postageCostLocator, "Postage costs and delivery times")
    }

}

export default homePage_PO