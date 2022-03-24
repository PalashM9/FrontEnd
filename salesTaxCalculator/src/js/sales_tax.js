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

function getReceiptTime() {
	const today = new Date();
	const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
	const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
	const dateTime = `${date} ${time}`;
	return dateTime;
}

function addNewReceipt() {
	const receiptTime = getReceiptTime();
	receiptParent = `<div class="receipt"><header class="receipt_header"><p class="receipt_title"> itemis receipt  </p><p class="receipt_date"> ${receiptTime}</p></header><dl class="receipt_list"></dl></div>`;
	$(receiptParent).appendTo('.receipt-container');
}

function performTaxComputationForInput(productValue) {
	const extractPrice = /\d+\.\d+/g;
	productPrice = productValue.match(extractPrice);
	category = checkCategory(productValue);

	const extractQuantity = productValue[0];
	const lastIndex = productValue.lastIndexOf('at');
	const extractItems = (productValue.substr(0, lastIndex)).replace('> ', '');

	const calculatedTaxedPrice = calculateSalesTax(productPrice, category);
	getTaxedDetails(calculatedTaxedPrice, extractItems);
}

function getTaxedDetails(calculatedTaxedPrice, extractItems) {
	totalPrice = parseFloat(totalPrice) + parseFloat(calculatedTaxedPrice);
}

function roundOffFloatValues(initialValue) {
	initialValue = (Math.ceil(initialValue * 20) / 20).toFixed(2);
	return initialValue;
}

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