"use strict";

let multipleInput = false;

function generateReceiptOnClick() {
	$(".check-tax").click(() => {
		let isGoodInput = checkErrors();
		if (isGoodInput) {
			multipleInput = checkIfMultipleInputs();
			var productInputValue = getProductInput();
			addNewReceipt();
			if (multipleInput) {
				var productInputValue = getMultiLineInput();
				for (let i = 0; i < productInputValue.length; i++) {
					performTaxComputationForInput(productInputValue[i]);
				}
			} else {
				performTaxComputationForInput(productInputValue);
			}
            addTotalForReceipt(roundOffFloatValues(totalSalesTax), roundOffFloatValues(totalPrice));
            addReceipt();
            resetValues();
		} else {
			showError();
		}
	});

}

function getProductInput() {
	const productValue = $('.input-product').val();
	return productValue;
}

function getMultiLineInput() {
	const productValue = $('.input-product').val().split('\n');
	const productValues = [];

	for (let i = 0; i < productValue.length; i++) {
		if (productValue[i] != '') {
			productValues[i] = productValue[i];
		}
	}
	return productValues;
}

function resetValues() {
	totalPrice = 0.0;
	totalSalesTax = 0.0;
}

$(document).ready(() => {
	generateReceiptOnClick();
});