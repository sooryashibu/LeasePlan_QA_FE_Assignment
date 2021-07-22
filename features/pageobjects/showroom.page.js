const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ShowroomPage extends Page {
    /**
     * define selectors using getter methods
     */

    async clickOnMakeAndModelFilter() {
        await $$('[class="Button-sc-ioy572 fuIxjw"]').then(filters => filters[8].click());
    }

    async clickAcceptCookiesButton() {
        await $("[class='optanon-allow-all accept-cookies-button']").then(cookies => {
            if (cookies.isExisting())
                cookies.click()
        });
    }

    async selectCarModelFilter(carModel) {
        await $(`[value=\"${carModel.toUpperCase()}\"]`).then(async checkBox => {
            await checkBox.parentElement().then(parent => {
                parent.click();
            })
        });
    }

    async checkIfTheCarsAreOfTheSameModel(carModel) {
        expect(browser).toHaveUrlContaining(carModel, {ignoreCase: true, wait: 5000})
        await $$('//h2[@data-component=\'Heading\']').then(async carTitles => {
            for(let i=0;i<carTitles.length;i++)
                await expect(carTitles[i]).toHaveTextContaining(carModel,{ignoreCase:true});
        });
    }

    /**
     * functions to perform actions
     */
    async selectACarModelInTheFilter(carModel) {
        console.log(`Filtering ${carModel}`);
        await this.clickAcceptCookiesButton();
        await this.clickOnMakeAndModelFilter();
        await this.selectCarModelFilter(carModel);
        // await sleep(5000);//wait for updating
        await this.clickOnMakeAndModelFilter();//close filter popup
        await this.checkIfTheCarsAreOfTheSameModel(carModel);
        // await sleep(15000);

    }

    /**
     * overwrite specifc options to adapt it to page object
     */
    open() {
        return super.open('business/showroom');
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = new ShowroomPage();
