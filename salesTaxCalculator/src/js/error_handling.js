function checkErrors() {
	const productInputValue = getProductInput();
	let goodInput = true;

	if (productInputValue == null || productInputValue == ' ' || productInputValue == '') {
		goodInput = false;
	}
	if (!(products.some(v => productInputValue.includes(v)))) {
		goodInput = false;
	}
	if (!productInputValue.includes('at') || checkIfQuantityisAbsent(productInputValue)) {
		goodInput = false;
	}
	if(checkIfMultipleInputs(productInputValue)){
		let productInput = getMultiLineInput();
		for (let i = 0; i < productInput.length; i++) {			
			if(checkIfQuantityisAbsent(productInput[i])){
				console.log(productInput[i]);
				goodInput = false;
				break;
			}
		}
	}

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

function checkIfQuantityisAbsent(productInputValue){
	if(!(Number.isInteger(parseInt(productInputValue[0])))){
		return true;
	}
}