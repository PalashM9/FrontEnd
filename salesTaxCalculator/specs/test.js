describe("Check if the rounding rules work", function() {
    it("rounded up to the nearest 0.05", function() {
      expect(parseFloat(roundOffFloatValues(16.89))).toBe(parseFloat(16.90));
    });
});

describe("Check if the input gets correct sales tax addition for tax-exempts", function() {
  it("'1 book at 12.49' Input should return no additional tax", function() {
    let productValue = '1 book at 12.49';
    let category = checkCategory(productValue);
    let salesTaxValue = calculateSalesTax(parseFloat(12.49),category);
    expect(parseFloat(salesTaxValue)).toBe(12.49);
  });
  it("'1 chocolate bar at 0.85' Input should return no additional tax", function() {
    let productValue = '1 chocolate bar at 0.85';
    let category = checkCategory(productValue);
    let salesTaxValue = calculateSalesTax(parseFloat(0.85),category);
    expect(parseFloat(salesTaxValue)).toBe(0.85);
  });
  it("'1 packet of headache pills at 9.75' Input should return no additional tax", function() {
    let productValue = '1 packet of headache pills at 9.75';
    let category = checkCategory(productValue);
    let salesTaxValue = calculateSalesTax(parseFloat(9.75),category);
    expect(parseFloat(salesTaxValue)).toBe(9.75);
  });
  it("'1 packet of fever pills at 19.75' Input should return no additional tax", function() {
    let productValue = '1 packet of fever pills at 19.75';
    let category = checkCategory(productValue);
    let salesTaxValue = calculateSalesTax(parseFloat(19.75),category);
    expect(parseFloat(salesTaxValue)).toBe(19.75);
  });
  it("'1 packet of chips at 1.75' Input should return no additional tax", function() {
    let productValue = '1 packet of chips at 1.75';
    let category = checkCategory(productValue);
    let salesTaxValue = calculateSalesTax(parseFloat(1.75),category);
    expect(parseFloat(salesTaxValue)).toBe(1.75);
  });
  it("'1 packet of candy at 1.75' Input should return no additional tax", function() {
    let productValue = '1 packet of candy at 1.75';
    let category = checkCategory(productValue);
    let salesTaxValue = calculateSalesTax(parseFloat(1.75),category);
    expect(parseFloat(salesTaxValue)).toBe(1.75);
  });
  it("'1 harry-potter novel at 11.75' Input should return no additional tax", function() {
    let productValue = '1 harry-potter novel at 11.75';
    let category = checkCategory(productValue);
    let salesTaxValue = calculateSalesTax(parseFloat(11.75),category);
    expect(parseFloat(salesTaxValue)).toBe(11.75);
  });
});

describe("Check if the input gets correct sales tax addition for normal products", function() {
  it("'1 music CD at 14.99' Input should return additional tax", function() {
    let productValue = '1 music CD at 14.99';
    let category = checkCategory(productValue);
    let salesTaxValue = roundOffFloatValues(calculateSalesTax(parseFloat(14.99),category));
    expect(parseFloat(salesTaxValue)).toBe(parseFloat(16.50));
  });
  it("'1 bottle of perfume at 18.99' Input should return additional tax", function() {
    let productValue = '1 bottle of perfume at 18.99';
    let category = checkCategory(productValue);
    let salesTaxValue = roundOffFloatValues(calculateSalesTax(parseFloat(18.99),category));
    expect(parseFloat(salesTaxValue)).toBe(parseFloat(20.90));
  });
  it("'1 bottle of shampoo at 12.99' Input should return additional tax", function() {
    let productValue = '1 bottle of shampoo at 12.99';
    let category = checkCategory(productValue);
    let salesTaxValue = roundOffFloatValues(calculateSalesTax(parseFloat(12.99),category));
    expect(parseFloat(salesTaxValue)).toBe(parseFloat(14.30));
  });
  it("'1 washing powder at 13.99' Input should return additional tax", function() {
    let productValue = '1 washing powder at 13.99';
    let category = checkCategory(productValue);
    let salesTaxValue = roundOffFloatValues(calculateSalesTax(parseFloat(13.99),category));
    expect(parseFloat(salesTaxValue)).toBe(parseFloat(15.40));
  });
});

describe("Check if the input gets correct sales tax addition for imported", function() {
  it("1 imported box of chocolates at 10.00' Input should return additional tax", function() {
    let productValue = '1 imported box of chocolates at 10.00';
    let category = checkCategory(productValue);
    let salesTaxValue = roundOffFloatValues(calculateSalesTax(parseFloat(10.00),category));
    expect(parseFloat(salesTaxValue)).toBe(parseFloat(10.50));
  });
  it("1 imported bottle of perfume at 47.50' Input should return additional tax", function() {
    let productValue = '1 imported bottle of perfume at 47.50';
    let category = checkCategory(productValue);
    let salesTaxValue = roundOffFloatValues(calculateSalesTax(parseFloat(47.50),category));
    expect(parseFloat(salesTaxValue)).toBe(parseFloat(54.65));
  });
  it("1 imported bottle of perfume at 27.99' Input should return additional tax", function() {
    let productValue = '1 imported bottle of perfume at 27.99';
    let category = checkCategory(productValue);
    let salesTaxValue = roundOffFloatValues(calculateSalesTax(parseFloat(27.99),category));
    expect(parseFloat(salesTaxValue)).toBe(parseFloat(32.20));
  });
});

describe("Check if the input gets correct sales tax addition for imported with tax exempt product", function() {
  
  it("'1 box of imported chocolates at 11.25' Input should return only import tax", function() {
    let productValue = '1 box of imported chocolates at 11.25';
    let category = checkCategory(productValue);
    let salesTaxValue = roundOffFloatValues(calculateSalesTax(parseFloat(11.25),category));
    expect(parseFloat(salesTaxValue)).toBe(parseFloat(11.85));
  });

  it("'1 box of imported chips at 12.25' Input should return only import tax", function() {
    let productValue = '1 box of imported chocolates at 12.25';
    let category = checkCategory(productValue);
    let salesTaxValue = roundOffFloatValues(calculateSalesTax(parseFloat(12.25),category));
    expect(parseFloat(salesTaxValue)).toBe(parseFloat(12.90));
  });

  it("'1 box of imported candy at 13.25' Input should return only import tax", function() {
    let productValue = '1 box of imported chocolates at 13.25';
    let category = checkCategory(productValue);
    let salesTaxValue = roundOffFloatValues(calculateSalesTax(parseFloat(13.25),category));
    expect(parseFloat(salesTaxValue)).toBe(parseFloat(13.95));
  });
});

describe("Check if the input gets correct sales tax addition for multiple products", function() {
  
  it("'1 book at 12.49, 1 music CD at 14.99, 1 chocolate bar at 0.85'", function() {
    let productValue = ['1 book at 12.49','1 music CD at 14.99','1 chocolate bar at 0.85'];
    for (var i = 0; i < productValue.length; i++) {
      performTaxComputationForInput(productValue[i]);
    }
    
    let receiptSum = roundOffFloatValues(totalPrice);
    let manualSum = 29.85;
    expect(parseFloat(manualSum)).toBe(parseFloat(receiptSum));
    resetValues();
  });

  it("'1 imported box of chocolates at 10.00','1 imported bottle of perfume at 47.50'", function() {
    let productValue = ['1 imported box of chocolates at 10.00','1 imported bottle of perfume at 47.50'];
    for (var i = 0; i < productValue.length; i++) {
      performTaxComputationForInput(productValue[i]);
    }
    let receiptSum = roundOffFloatValues(totalPrice);
    let manualSum = 65.15;
    expect(parseFloat(manualSum)).toBe(parseFloat(receiptSum));
    
    resetValues();
  });

  it("'1 imported bottle of perfume at 27.99','1 bottle of perfume at 18.99','1 packet of headache pills at 9.75','1 box of imported chocolates at 11.25'", function() {
    let productValue = ['1 imported bottle of perfume at 27.99','1 bottle of perfume at 18.99','1 packet of headache pills at 9.75','1 box of imported chocolates at 11.25'];
    for (var i = 0; i < productValue.length; i++) {
      performTaxComputationForInput(productValue[i]);
    }
    let receiptSum = roundOffFloatValues(totalPrice);
    let manualSum = 74.65;
    expect(parseFloat(manualSum)).toBe(parseFloat(receiptSum));
    resetValues();
  });
});

describe("If Input is copied & pasted including special characters -> Check if the input gets correct sales tax addition for multiple products", function() {
  
  it("'>1 book at 12.49 >1 music CD at 14.99 >1 chocolate bar at 0.85'", function() {
    let productValue = ['>1 book at 12.49','>1 music CD at 14.99','>1 chocolate bar at 0.85'];
    for (var i = 0; i < productValue.length; i++) {
      performTaxComputationForInput(productValue[i]);
    }
    
    let receiptSum = roundOffFloatValues(totalPrice);
    let manualSum = 29.85;
    expect(parseFloat(manualSum)).toBe(parseFloat(receiptSum));
    resetValues();
  });

  it("'>1 imported box of chocolates at 10.00 >1 imported bottle of perfume at 47.50'", function() {
    let productValue = ['>1 imported box of chocolates at 10.00','>1 imported bottle of perfume at 47.50'];
    for (var i = 0; i < productValue.length; i++) {
      performTaxComputationForInput(productValue[i]);
    }
    let receiptSum = roundOffFloatValues(totalPrice);
    let manualSum = 65.15;
    expect(parseFloat(manualSum)).toBe(parseFloat(receiptSum));
    
    resetValues();
  });

  it("'>1 imported bottle of perfume at 27.99 >1 bottle of perfume at 18.99 >1 packet of headache pills at 9.75 >1 box of imported chocolates at 11.25'", function() {
    let productValue = ['>1 imported bottle of perfume at 27.99','>1 bottle of perfume at 18.99','>1 packet of headache pills at 9.75','>1 box of imported chocolates at 11.25'];
    for (var i = 0; i < productValue.length; i++) {
      performTaxComputationForInput(productValue[i]);
    }
    let receiptSum = roundOffFloatValues(totalPrice);
    let manualSum = 74.65;
    expect(parseFloat(manualSum)).toBe(parseFloat(receiptSum));
    resetValues();
  });
});

describe("Check if input has quantity and throw error if absent", function() {
  it("should return false if quantity is present", function() {
    let productValue = '1 bottle of shampoo at 12.99';
    let isQuantityAbsent = checkIfQuantityisAbsent(productValue);
    console.log(checkIfQuantityisAbsent(productValue));
    expect(isQuantityAbsent).toBe(false);
  });
  it("should return true if quantity is absent", function() {
    let productValue = 'bottle of shampoo at 12.99';
    let isQuantityAbsent = checkIfQuantityisAbsent(productValue);
    expect(isQuantityAbsent).toBe(true);
  });
});

describe("Check if multiple input has quantity and throw error if absent for either one value", function() {
  it("should return true if quantity is absent in any input", function() {
    let isQuantityAbsent = false;
    let productValue = ['1 imported bottle of perfume at 27.99','bottle of perfume at 18.99','1 packet of headache pills at 9.75','1 box of imported chocolates at 11.25'];
    for (var i = 0; i < productValue.length; i++) {
      if(checkIfQuantityisAbsent(productValue[i])){
        isQuantityAbsent = true;
        break;
      }
    }
    expect(isQuantityAbsent).toBe(true);
  });
  it("should return false if quantity is not absent in any input", function() {
    let isQuantityAbsent = false;
    let productValue = ['1 imported bottle of perfume at 27.99','1 bottle of perfume at 18.99','1 packet of headache pills at 9.75','1 box of imported chocolates at 11.25'];
    for (var i = 0; i < productValue.length; i++) {
      if(checkIfQuantityisAbsent(productValue[i])){
        isQuantityAbsent = true;
        break;
      }
    }
    expect(isQuantityAbsent).toBe(false);
  });
});

describe("Check if input has 'at' and throw error if it's not present", function() {
  it("should return false if 'at' is present", function() {
    let productValue = '1 bottle of shampoo at 12.99';
    let isAtAbsent = checkIfDifferentialValueisAbsent(productValue);
    expect(isAtAbsent).toBe(false);
  });
  it("should return true if 'at' is absent", function() {
    let productValue = '1 bottle of shampoo 12.99';
    let isAtAbsent = checkIfDifferentialValueisAbsent(productValue);
    expect(isAtAbsent).toBe(true);
  });
});
