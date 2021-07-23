const { Given, When, Then } = require('@cucumber/cucumber');

const showroomPage = require('../pageobjects/showroom.page');

const pages = {
    showroom: showroomPage
}

Given(/^I open (\w+) page$/, async (page) => {
    await pages[page].open()
});

Given(/^I filter (\w+) page using the price (\d+) (\d+)$/, async (page, from, to) => {
    await pages[page].openUsingFilter(`monthlyPrice=${from},${to}`)
});

When(/^I filter using the carmodel (\w+)$/, async (model) => {
   await showroomPage.selectACarModelInTheFilter(model);
});
When(/^I filter using the popular filter ([^"]*)$/, async (filter) => {
   await showroomPage.selectThePopularFilter(filter);
});

Then(/^I should see only (\w+) cars$/, async (model) => {
   await showroomPage.shouldOnlySeeSelectedModelCars(model);
});

When(/^I sort using price ([^"]*)$/, async (order) => {
   await showroomPage.sortCars(order);
});

Then(/^I should see only those cars that are in the same price (\d+) (\d+)$/, async (from, to) => {
   await showroomPage.shouldOnlySeeSelectedPriceRangeCars(from, to);
});

Then(/^I should see a list of cars sorted in the ([^"]*)$/, async (order) => {
   switch(order){
       case "price-asc": await showroomPage.checkIfAscendingOrder(); break;
       case "price-desc": await showroomPage.checkIfDescendingOrder(); break;
   }
});

Then(/^I should see error message$/, async () => {
   await showroomPage.shouldShowErrorMessage();
});

Then(/^I load the next page$/, async () => {
   await showroomPage.loadNextPage();
});


