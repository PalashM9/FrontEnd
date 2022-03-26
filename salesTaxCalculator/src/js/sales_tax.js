"use strict";

let exemptTax = true;
let taxExempt = ['B', 'F', 'M'];
let products = ['chocolate', 'chips', 'pills', 'music', 'book', 'perfume', 'bottle', 'chocolates', 'perfumes', 'pill'];
let salesTax = 1;
let productPrice = 0.0;
let category = '';
let totalPrice = 0.0;
let totalSalesTax = 0.0;
let salesTaxRow = '';
let totalRow = '';
let receiptRow = '';
const receiptContainer = '';

// This function sets time of transaction in the receipt
function getReceiptTime() {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const dateTime = `${date} ${time}`;
    return dateTime;
}

// This function previews the receipt generated
function addReceipt() {
    $('.receipt').fadeIn();
}

// This function creates the receipt
function addNewReceipt() {
    const receiptTime = getReceiptTime();
    let receiptParent = `<div class="receipt"><header class="receipt_header"><p class="receipt_title"> itemis receipt  </p><p class="receipt_date"> ${receiptTime}</p></header><dl class="receipt_list"></dl></div>`;
    $(receiptParent).appendTo('.receipt-container');
}

// This function calculates the tax computation with the input value provided
// @param productValue - string - the input of product
function performTaxComputationForInput(productValue) {
    productPrice = checkNumberInInput(productValue);
    category = checkCategory(productValue);

    const extractQuantity = productValue[0];
    const lastIndex = productValue.lastIndexOf('at');
    const extractItems = (productValue.substr(0, lastIndex)).replace('> ', '');

    const calculatedTaxedPrice = calculateSalesTax(productPrice, category);
    getTaxedDetails(calculatedTaxedPrice, extractItems);
}

// This function gets the taxed details with the calculated price and sets the value of total and sales tax in the receipt
// @param calculatedTaxedPrice - float - the input product price
// @param extractItems - string - the label of the product
function getTaxedDetails(calculatedTaxedPrice, extractItems) {
    totalPrice = parseFloat(totalPrice) + parseFloat(calculatedTaxedPrice);
    addItemsListForReceipt(calculatedTaxedPrice, extractItems);
}

// This function is used for setting the value of the decimal places, however it is not exactly matchable with the given outputs
// as trying with floor, and changing fixed values give unsimilar values in the different standard outputs, so keeping it as the 
// genuine and standard way of rounding to nearest 0.05 values
// @param initialValue - float - the input product price
function roundOffFloatValues(initialValue) {
    initialValue = (Math.ceil(initialValue * 20) / 20).toFixed(2);
    return initialValue;
}

// This function checks the category of the product
// @param productValue - string - the input of product
function checkCategory(productValue) {
    let category = '';
    if (productValue.includes('book') || productValue.includes('novel') || productValue.includes('magazine')) {
        category = 'B';
    } else if (productValue.includes('chocolate') || productValue.includes('candy') || productValue.includes('chips')) {
        category = 'F';
        if (productValue.includes('import')) {
            category = 'FI';
        }
    } else if (productValue.includes('import')) {
        category = 'I';
    } else if (productValue.includes('pill')) {
        category = 'M';
    } else {
        category = 'E';
    }

    return category;
}

// This function calculates sales tax as per the category and price provided in the input
// @param productPrice - float - the product price
// @param category - string - the category of the product
function calculateSalesTax(productPrice, category) {
    let taxedPrice = 0.0;
    let computedSalesTax = 0.0;
    if (jQuery.inArray(category, taxExempt) === -1) {
        if (category == 'I') {
            salesTax = 0.15;
        } else if (category == 'FI') {
            salesTax = 0.05;
        } else {
            salesTax = 0.1;
        }
        salesTax = productPrice * salesTax;
        computedSalesTax = salesTax;
        taxedPrice = parseFloat(salesTax) + parseFloat(productPrice);
    } else {
        taxedPrice = productPrice;
    }

    totalSalesTax = totalSalesTax + computedSalesTax;
    return taxedPrice;
}

// This function sets items in the receipt
// @param calculatedTaxedPrice - float - the total taxed price added to the original price
// @param extractItems - string - the product name and quantity
function addItemsListForReceipt(calculatedTaxedPrice, extractItems) {
    receiptRow = `<div class="receipt_list-row"><dt class="receipt_item product-item">${extractItems} <dd class="receipt_cost">${calculatedTaxedPrice}</dd></div>`;
    $(receiptRow).appendTo($('.receipt_list'));
}

// This function sets total value in the receipt
// @param totalSalesTax - float - the total salestax calculated to be set,
// @param totalPrice - float - the total Price calculated to be set
function addTotalForReceipt(totalSalesTax, totalPrice) {
    salesTaxRow = ` <div class="receipt_list-row receipt_list-row--total"><dt class="receipt_item">Sales Tax :</dt><dd class="receipt_cost">${totalSalesTax}</dd></div>`;
    totalRow = ` <div class="receipt_list-row"><dt class="receipt_item">Total :</dt><dd class="receipt_cost">${totalPrice}</dd></div>`;
    $(salesTaxRow).appendTo($('.receipt_list'));
    $(totalRow).appendTo($('.receipt_list'));
}