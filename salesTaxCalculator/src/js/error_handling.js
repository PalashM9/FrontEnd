let errorMsg = '';

// Function checks the validation of the input before enabling the receipt formation
// Instead of onchange for the input, this is used as the input can be multiline or single both
function checkErrors() {
    let productInputValue = getProductInput();
    productInputValue = removeSpacesfromInput(productInputValue);
    let goodInput = true;

    if (productInputValue == null || productInputValue == ' ' || productInputValue == '') {
        goodInput = false;
        errorMsg = ' without being empty !';
    } else if (!(products.some(v => productInputValue.includes(v)))) {
        goodInput = false;
        errorMsg = ' from the categories !';
    } else if (checkIfDifferentialValueisAbsent(productInputValue) || checkIfQuantityisAbsent(productInputValue)) {
        goodInput = false;
        errorMsg = ' with a quantity !';
    } else if (checkIfMultipleInputs(productInputValue)) {
        let productInput = getMultiLineInput();
        for (let i = 0; i < productInput.length; i++) {
            if (checkIfQuantityisAbsent(productInput[i])) {
                goodInput = false;
                errorMsg = ' with a quantity !';
                break;
            }
        }
    } else if (checkNumberInInput(productInputValue) == null) {
        goodInput = false;
        errorMsg = ' with a price in Input !';
    }
    setErrorMsg(errorMsg);
    return goodInput;
}

// This function checks if the input contains multi-line values
function checkIfMultipleInputs() {
    const productValue = $('.input-product').val();
    if (productValue.includes('\n')) {
        return true;
    }
}

// This function shows error box in case of error
function showError() {
    $('.alert-danger').fadeIn();
}

// This function removes error box in case of validated input
function hideError() {
    $('.alert-danger').fadeOut();
}

// This function removes error box on click
function closeClick() {
    $(".close").click(function() {
        hideError();
    });
}

// This function checks if the quantity is present in the input
// @param productInputValue - string - the input of product
function checkIfQuantityisAbsent(productInputValue) {
    if (!(Number.isInteger(parseInt(productInputValue[0])))) {
        return true;
    } else {
        return false;
    }
}

// This function checks if the core value 'at' is present in the input
// @param productInputValue - string - the input of product
function checkIfDifferentialValueisAbsent(productInputValue) {
    if (!productInputValue.includes('at')) {
        return true;
    } else {
        return false;
    }
}

// This function removes spaces from input if present to avoid error for correct input with space
// @param productInputValue - string - the input of product
function removeSpacesfromInput(productInputValue) {
    productInputValue = productInputValue.replace(/^\s+/g, '');

    return productInputValue;
}

// This function checks if the price is present
// @param productValue - string - the input of product
function checkNumberInInput(productValue) {
    const checkFloat = /\d+\.\d+/g;
    const checkInt = /(\d+)/g;
    let fetchFloatValue = productValue.match(checkFloat);
    let fetchIntValue = productValue.match(checkInt);
    const lastIndex = productValue.lastIndexOf('at');
    let floatValue = fetchFloatValue != null ? fetchFloatValue[fetchFloatValue.length - 1] : null;
    let intValue = fetchIntValue != null ? fetchIntValue[fetchIntValue.length - 1] : null;
    let floatIndex = floatValue != null ? productValue.lastIndexOf(floatValue) : null;
    let intIndex = intValue != null ? productValue.lastIndexOf(intValue) : null;

    let productPrice = (floatIndex != null && floatIndex > lastIndex) ? floatValue : (intIndex != null && intIndex > lastIndex) ? intValue : null;

    return productPrice;
}

// This function sets error messages for different kind of error inputs
// @param errorMsg - string - the error message to be set
function setErrorMsg(errorMsg) {
    $('.error-value').html(errorMsg);
}

// This function resets error message
function resetErrorMsg() {
    $('.error-value').html(' as per the regulations.');
}