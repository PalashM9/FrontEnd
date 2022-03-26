"use strict";

let multipleInput = false;

// This function works for the click of the 'Generate Receipt' button
function generateReceiptOnClick() {
    $(".check-tax").click(() => {
        let isGoodInput = checkErrors();
        if (isGoodInput) {
            hideError();
            resetErrorMsg();
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

// This function fetches the input values
function getProductInput() {
    const productValue = $('.input-product').val();
    return productValue;
}

// This function fetches the multi-line values
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

// This function resets the price and tax for new receipt to be generated in the same session
function resetValues() {
    totalPrice = 0.0;
    totalSalesTax = 0.0;
}

// This function resets receipt for a new transaction
function resetReceipt() {
    $('div.receipt').remove();
}

// This function hides examples after generation of receipt
function hideExamples() {
    $('.examples').fadeOut(10);
}

// This function sets example values in the input box which are standard values and allows user to have an idea of inputs
function addExamplesOnClick() {
    $(".example-btn").click(function(e) {
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

// This function helps to initiate a new transaction instead of refreshing the application page
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