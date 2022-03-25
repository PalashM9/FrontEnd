# Sales Tax Calculator

**Task**

Basic sales tax is applicable at a rate of 10% on all goods, except books, food, and medical
products that are exempt. Import duty is an additional sales tax
applicable on all imported goods at a rate of 5%, with no exemptions. When I purchase items
I receive a receipt which lists the name of all the items and their price (including tax),
finishing with the total cost of the items,
and the total amounts of sales taxes paid. The rounding rules for sales tax are that for a tax
rate of n%, a shelf price of p contains (np/100 rounded up to the nearest 0.05) amount of
sales tax.

**Setup**

No Addiitional setup is required. 

**Run**

Need to run **salesTaxCalculator.html** in the root folder.

**Test**

Need to run **specRunner.html** in the root folder.

**Test Cases**

✓ Check if the rounding rules work -> rounded up to the nearest 0.05

✓ Check if the input gets correct sales tax addition for normal products
    
    '1 washing powder at 13.99' Input should return additional tax
    '1 music CD at 14.99' Input should return additional tax
    '1 bottle of perfume at 18.99' Input should return additional tax
    '1 bottle of shampoo at 12.99' Input should return additional tax
    
✓ Check if the input gets correct sales tax addition for tax-exempts
    
    '1 book at 12.49' Input should return no additional tax
    '1 packet of candy at 1.75' Input should return no additional tax
    '1 harry-potter novel at 11.75' Input should return no additional tax
    '1 chocolate bar at 0.85' Input should return no additional tax
    '1 packet of fever pills at 19.75' Input should return no additional tax
    '1 packet of chips at 1.75' Input should return no additional tax
    '1 packet of headache pills at 9.75' Input should return no additional tax
    
✓ Check if the input gets correct sales tax addition for imported
    
    '1 imported bottle of perfume at 47.50' Input should return additional tax
    '1 imported box of chocolates at 10.00' Input should return additional tax
    '1 imported bottle of perfume at 27.99' Input should return additional tax
    
✓ Check if multiple input has quantity and throw error if absent for either one value
   
    should return false if quantity is not absent in any input
    should return true if quantity is absent in any input
    
✓ Check if input has 'at' and throw error if it's not present
   
    should return true if 'at' is absent
    should return false if 'at' is present
    
✓ Check if the input gets correct sales tax addition for imported with tax exempt product
    
    '1 box of imported chips at 12.25' Input should return only import tax
    '1 box of imported chocolates at 11.25' Input should return only import tax
    '1 box of imported candy at 13.25' Input should return only import tax
    
✓ Check if input has several special characters but considers only the cost 
    
    should work with even special characters which can be garbage values -> 1 bottle of shampoo at 4cx0e12.99
    
✓ Check if input has several numerals but considers only the cost
    
    should work with even multiple numerals which can be same as cost -> 17.00 bottle of shampoo at 12.99
    
✓ Check if the input gets correct sales tax addition for multiple products
    
    '1 imported bottle of perfume at 27.99','1 bottle of perfume at 18.99','1 packet of headache pills at 9.75','1 box of imported chocolates at 11.25'
    '1 book at 12.49, 1 music CD at 14.99, 1 chocolate bar at 0.85'
    '1 imported box of chocolates at 10.00','1 imported bottle of perfume at 47.50'
    
✓ If Input is copied & pasted including special characters -> Check if the input gets correct sales tax addition for multiple products
    
    '>1 imported bottle of perfume at 27.99 >1 bottle of perfume at 18.99 >1 packet of headache pills at 9.75 >1 box of imported chocolates at 11.25'
    '>1 imported box of chocolates at 10.00 >1 imported bottle of perfume at 47.50'
    '>1 book at 12.49 >1 music CD at 14.99 >1 chocolate bar at 0.85'
    
✓ Check if input has quantity and throw error if absent
    
    should return false if quantity is present
    should return true if quantity is absent
    
✓ Check if input has price
    
    should not work without prices -> '1 bottle of shampoo at'
    should work with prices of float -> '1 bottle of shampoo at 12.99'
    should work with prices of int -> '1 bottle of shampoo at 12'
    
✓ Check if input has spaces in beginning
    
    should work with even spaces and return proper value -> ' 1 bottle of shampoo at 12.99'
    

**Considerations**  

✓ Input always contain 1 quantity as per the given input examples

✓ Categories -> Book, Food, Medicine, Imported

✓ Example Products -> Books, Book, chocolate, chips, pills, music, book, perfume, bottle, chocolates, perfumes, pill

✓ Input always contain words like 'at'

✓ Input always follow the format '1 chocolate bar at 0.85'
