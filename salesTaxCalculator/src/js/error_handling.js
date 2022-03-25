let errorMsg = '';

function checkErrors() {
	let productInputValue = getProductInput();
	productInputValue = removeSpacesfromInput(productInputValue);
	let goodInput = true;

	if (productInputValue == null || productInputValue == ' ' || productInputValue == '') {
		goodInput = false;
		errorMsg = ' without being empty !';
	}
	else if (!(products.some(v => productInputValue.includes(v)))) {
		goodInput = false;
		errorMsg = ' from the categories !';
	}
	else if (checkIfDifferentialValueisAbsent(productInputValue) || checkIfQuantityisAbsent(productInputValue)) {
		goodInput = false;
		errorMsg = ' with a quantity !';
	}
	else if(checkIfMultipleInputs(productInputValue)){
		let productInput = getMultiLineInput();
		for (let i = 0; i < productInput.length; i++) {			
			if(checkIfQuantityisAbsent(productInput[i])){
				console.log(productInput[i]);
				goodInput = false;
				errorMsg = ' with a quantity !';
				break;
			}
		}
	}
	else if(checkNumberInInput(productInputValue) == null){
		goodInput = false;
		errorMsg = ' with a price in Input !';
	}
	setErrorMsg(errorMsg);
	return goodInput;
}

function checkIfMultipleInputs() {
	const productValue = $('.input-product').val();
	if (productValue.includes('\n')) {
		return true;
	}
}

function showError() {
	$('.alert-danger').fadeIn();
}

function hideError() {
	$('.alert-danger').fadeOut();
}

function closeClick(){
	$(".close").click(function () {
		hideError();
	});
}

function checkIfQuantityisAbsent(productInputValue){
	if(!(Number.isInteger(parseInt(productInputValue[0])))){
		return true;
	}
	else{
		return false;
	}
}

function checkIfDifferentialValueisAbsent(productInputValue){
	if(!productInputValue.includes('at')){
		return true;
	}
	else{
		return false;
	}
}

function removeSpacesfromInput(productInputValue){
	productInputValue = productInputValue.replace(/^\s+/g, '');
	
	return productInputValue;
}

function checkNumberInInput(productValue){
	const checkFloat = /\d+\.\d+/g;
	const checkInt = /(\d+)/g;
	let fetchFloatValue = productValue.match(checkFloat);
	let fetchIntValue = productValue.match(checkInt);
	const lastIndex = productValue.lastIndexOf('at');
	let floatValue = fetchFloatValue != null ? fetchFloatValue[fetchFloatValue.length - 1] : null;
	let intValue = fetchIntValue!= null ? fetchIntValue[fetchIntValue.length - 1] : null;
	let floatIndex = floatValue!=null ? productValue.lastIndexOf(floatValue) : null;
	let intIndex = intValue!=null ? productValue.lastIndexOf(intValue) : null;

	let productPrice = (floatIndex != null && floatIndex > lastIndex) ? floatValue : (intIndex != null  && intIndex > lastIndex) ? intValue : null;
	
	return productPrice;
}

function setErrorMsg(errorMsg){
	$('.error-value').html(errorMsg);
}

function resetErrorMsg(){
	$('.error-value').html(' as per the regulations.');
}