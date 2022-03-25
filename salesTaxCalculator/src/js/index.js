"use strict";

let multipleInput = false;

function generateReceiptOnClick() {
	$(".check-tax").click(() => {
		let isGoodInput = checkErrors();
		if (isGoodInput) {
			hideError();
			hideExamples();
			resetReceipt();
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

function resetReceipt(){
	$('div.receipt').remove();
}

function hideExamples(){
	$('.examples').fadeOut(10);
}

function addExamplesOnClick() {
	$(".example-btn").click(function (e) {
		const productInputValue = getProductInput();
		let setText = '';
		if (productInputValue == null || productInputValue == ' ' || productInputValue == '') {
			setText = $(this).text();
		} else {
			setText = `${productInputValue}\n${$(this).text()}`;
		}
		$('.input-product').val(setText);
	});
}

function startOverAgainOnClick() {
	$(".start-over").click(e => {
		$('.input-product').val('');
		$('.examples').fadeIn(1000);
		$('div.receipt').remove();
	});
}

$(document).ready(() => {
	generateReceiptOnClick();
	addExamplesOnClick();
	startOverAgainOnClick();
	closeClick();
});