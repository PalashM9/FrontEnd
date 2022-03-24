function checkErrors() {
	const productInputValue = getProductInput();
	let goodInput = true;

	if (productInputValue == null || productInputValue == ' ' || productInputValue == '') {
		goodInput = false;
	}
	if (!(products.some(v => productInputValue.includes(v)))) {
		goodInput = false;
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