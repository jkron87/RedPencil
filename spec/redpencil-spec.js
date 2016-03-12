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
        ModifyProductPrice("B5", 100);
        expect(products[1].price).toBe(600);
    });

    it("does not attempt to modify product if there is no corresponding id", function () {
        ModifyProductPrice("D4", 100);
    });

    it("lowers price of product with id \"C3\" by 100", function () {
        ModifyProductPrice("C3", -100);
        expect(products[2].price).toBe(200);
    });

    it("returns percentage of price reduction", function () {
        var old_price = 1000;
        var new_price = 900;
        var percentage = GetPriceReductionPercentage(old_price, new_price);
        expect(percentage).toBe(10);
    });

    it("returns percentage of price reduction", function () {
        var old_price = 1000;
        var new_price = 750;
        var percentage = GetPriceReductionPercentage(old_price, new_price);
        expect(percentage).toBe(25);
    });

    it("updates both price and old price properties", function () {
        ModifyProductPrice("A1", -100);
        expect(products[0].price).toBe(100);
        expect(products[0].old_price).toBe(200);
    });

    it("update days since last price change", function () {
        ModifyProductPrice("D8", -5);
        expect(products[3].days_since_price_change).toBe(0);
    });

    it("updates red pencil promotion status to active", function () {
        ModifyProductPrice("G4", -50);
        expect(products[3].promotion_active).toBe(true);
    });

    it("updates red pencil promotion status to active only when days since price change are 30 or higher", function () {
        ModifyProductPrice("A1", -100);
        expect(products[0].promotion_active).toBe(false);
    });

    it("updates red pencil promotion status to active only when days since price change are 30 or higher", function () {
        ModifyProductPrice("G6", -50);
        expect(products[5].promotion_active).toBe(true);
    });

    it("updates red pencil promotion status to active only when days since price change are 30 or higher AND price reduction is from 5 up to 30 percent", function () {
        ModifyProductPrice("G7", -20);
        expect(products[6].promotion_active).toBe(false);
    });
});