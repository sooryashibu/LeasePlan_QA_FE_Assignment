const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class ShowroomPage extends Page {
    /**
     * define selectors using getter methods
     */
    base_path = 'business/showroom';

    async clickOnMakeAndModelFilter() {
        await $$('[class="Button-sc-ioy572 fuIxjw"]').then(filters => filters[8].click());
    }

    async clickOnPopularFilter() {
        await $$('[class="Button-sc-ioy572 fuIxjw"]').then(filters => filters[7].click());
    }

    async clickAcceptCookiesButton() {
        await $("[class='optanon-allow-all accept-cookies-button']").then(cookies => {
            if (cookies.isExisting())
                cookies.click()
        });
    }

    async selectFilter(filter) {
        await $(`[value=\"${filter}\"]`).then(async checkBox => {
            await checkBox.parentElement().then(parent => {
                parent.click();
            })
        });
    }

    async checkIfTheCarsAreOfTheSameModel(carModel) {
        expect(browser).toHaveUrlContaining(carModel, {ignoreCase: true, wait: 5000})
        await $$('//h2[@data-component=\'Heading\']').then(async carTitles => {
            for (let i = 0; i < carTitles.length; i++)
                await expect(carTitles[i]).toHaveTextContaining(carModel, {ignoreCase: true});
        });
    }

    async checkIfTheCarsAreOfTheSamePriceRange(from, to) {
        expect(browser).toHaveUrlContaining("monthlyPrice", {ignoreCase: true, wait: 5000})
        await $$('//span[@data-component=\'Heading\']//span[@data-component=\'LocalizedPrice\']').then(async localizedPrices => {
            for (let i = 0; i < localizedPrices.length; i++) {
                await localizedPrices[i].getText().then(priceText => {
                    const price = parseInt(priceText.split(" ")[1].replace(".",""));
                    expect(from < price && price < to).toBe(true);
                })

            }
        });
    }

    async sortCarsWith(order) {
        await $$('//div[@data-tag-id=\'sort-by\']//select').then(async sort => {
            await sort[0].selectByAttribute('value', order)
        });
        await browser.pause(5000);
    }

    async checkIfErrorMessagePresent() {
        await expect($('[id="No filter results"]')).toExist();
    }

    async clickOnNextPage() {
        await $('[class="sc-bYEvPH RjsNp"]').then(nextButton => {
            if (nextButton.isExisting()) {
                nextButton.click();
            }
        });
    }

    /**
     * functions to perform actions
     */
    async selectACarModelInTheFilter(carModel) {
        console.log(`Filtering ${carModel}`);
        await this.clickAcceptCookiesButton();
        await this.clickOnMakeAndModelFilter();
        await this.selectFilter(carModel.toUpperCase());
        await this.clickOnMakeAndModelFilter();//close filter popup
    }

    async selectThePopularFilter(filters) {
        console.log(`Filtering ${filters}`);
        await this.clickAcceptCookiesButton();
        await this.clickOnPopularFilter();
       for(let filter of filters.split(",")){
           await this.selectFilter(filter);
       }
        await this.clickOnPopularFilter();//close filter popup
    }

    async shouldOnlySeeSelectedModelCars(carModel) {
        await this.checkIfTheCarsAreOfTheSameModel(carModel);
    }

    async sortCars(order) {
        await this.sortCarsWith(order);
    }

    async shouldOnlySeeSelectedPriceRangeCars(from, to) {
        await this.checkIfTheCarsAreOfTheSamePriceRange(from, to);
    }

    isAscending = a => a.slice(1)
        .every((e, i) => e >= a[i]);

    isDescending = a => a.slice(1)
        .every((e, i) => e <= a[i]);

    async getPricesArray() {
        let actualPrices = [];
        await $$('//span[@data-component=\'Heading\']//span[@data-component=\'LocalizedPrice\']').then(async localizedPrices => {
            for (let i = 0; i < localizedPrices.length; i++) {
                await localizedPrices[i].getText().then(priceText => {
                    const price = parseInt(priceText.split(" ")[1].replace(".",""));
                    actualPrices.push(price);
                });
            }
        });
        return actualPrices;
    }

    async checkIfAscendingOrder() {
        await this.getPricesArray().then(async prices => {
            await expect(this.isAscending(prices)).toBe(true);
        })
    }

    async checkIfDescendingOrder() {
        await this.getPricesArray().then(async prices => {
            await expect(this.isDescending(prices)).toBe(true);
        })
    }

    async shouldShowErrorMessage() {
        await this.checkIfErrorMessagePresent();
    }

    async loadNextPage() {
        await this.clickOnNextPage();
        await browser.pause(5000);
    }

    open() {
        return super.open(this.base_path);
    }

    openUsingFilter(filter) {
        return super.open(`${this.base_path}?${filter}`);
    }
}

module.exports = new ShowroomPage();
