const { Given, When, Then } = require('@cucumber/cucumber');

const showroomPage = require('../pageobjects/showroom.page');

const pages = {
    showroom: showroomPage
}

Given(/^I open (\w+) page$/, async (page) => {
    await pages[page].open()
});

When(/^I filter using the carmodel (\w+)$/, async (model) => {
   await showroomPage.selectACarModelInTheFilter(model);
});


