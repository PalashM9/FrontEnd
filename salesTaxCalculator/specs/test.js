describe("Check if the rounding rules work", function() {
    it("rounded up to the nearest 0.05", function() {
      expect(parseFloat(roundOffFloatValues(16.89))).toBe(parseFloat(16.90));
    });
});