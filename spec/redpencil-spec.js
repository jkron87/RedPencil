describe("Modify Product Price", function () {

    it("returns index 1 when product id \"B5\" is passed", function () {
        var index = GetProductIndexById("B5");
        expect(index).toBe(1);
    });

    it("returns index 2 when product id \"C3\" is passed", function () {
        var index = GetProductIndexById("C3");
        expect(index).toBe(2);
    });

    it("returns index -1 when product id \"C5\" is passed", function () {
        var index = GetProductIndexById("C5");
        expect(index).toBe(-1);
    });

    it("increases price of product with id \"B5\" by 100", function () {
        ModifyProductPrice("B5", null);
        expect(products[1].price).toBe(600);
    });
});