/*
 We provide a shopping portal, where dealers can offer their goods (similiar to Amazon market place).
 We want to support red pencil promotions for reduced prices. During the red pencil promotion the old price is crossed out in red and the new reduced price is written next to it.
 To avoid misuse of red pencil promotions the red pencil promotions are activated and deactivated automatically.
 The scope of the Code Kata is the implementations of the rules for activation and end of red pencil promotions.
 A red pencil promotion starts due to a price reduction. The price has to be reduced by at least 5% but at most bei 30% and the previous price had to be stable for at least 30 days.
 A red pencil promotion lasts 30 days as the maximum length.
 If the price is further reduced during the red pencil promotion the promotion will not be prolonged by that reduction.
 If the price is increased during the red pencil promotion the promotion will be ended immediately.
 If the price if reduced during the red pencil promotion so that the overall reduction is more than 30% with regard to the original price, the promotion is ended immediately.
 After a red pencil promotion is ended additional red pencil promotions may follow – as long as the start condition is valid: the price was stable for 30 days and these 30 days don’t intersect with a previous red pencil promotion.
 */

Big.DP = 2;

var products = [
    {
        "id"                      : "A1",
        "name"                    : "Hat",
        "price"                   : 200,
        "old_price"               : 0,
        "days_since_price_change" : 0,
        "promotion_active"        : false,
        "reduction_percentage"    : 0
    },
    {
        "id"                      : "B5",
        "name"                    : "Suit",
        "price"                   : 500,
        "old_price"               : 0,
        "days_since_price_change" : 0,
        "promotion_active"        : false,
        "reduction_percentage"    : 0
    },
    {
        "id"                      : "C3",
        "name"                    : "Shoes",
        "price"                   : 300,
        "old_price"               : 0,
        "days_since_price_change" : 0,
        "promotion_active"        : false,
        "reduction_percentage"    : 0
    },
    {
        "id"                      : "D8",
        "name"                    : "IceCream",
        "price"                   : 25,
        "old_price"               : 0,
        "days_since_price_change" : 35,
        "promotion_active"        : false,
        "reduction_percentage"    : 0
    },
    {
        "id"                      : "G4",
        "name"                    : "Apple",
        "price"                   : 250,
        "old_price"               : 0,
        "days_since_price_change" : 45,
        "promotion_active"        : false,
        "reduction_percentage"    : 0
    },
    {
        "id"                      : "G6",
        "name"                    : "Mug",
        "price"                   : 200,
        "old_price"               : 0,
        "days_since_price_change" : 30,
        "promotion_active"        : false,
        "reduction_percentage"    : 0
    },
    {
        "id"                      : "G7",
        "name"                    : "Tea",
        "price"                   : 500,
        "old_price"               : 0,
        "days_since_price_change" : 30,
        "promotion_active"        : false,
        "reduction_percentage"    : 0
    }
];

/**
 * @return {number}
 */
function GetProductIndexById(id) {
    for (var i = 0, j = products.length ; i < j ; i++) {
        if (products[i].id === id) {
            return i
        }
    }
    return -1
}

/**
 * @return {number}
 */
function ModifyProductPrice(id, value) {
    var index = GetProductIndexById(id);
    if (index != -1) {
        products[index].old_price = products[index].price;
        products[index].price += value;

        if (products[index].price < products[index].old_price) {

            var percentage = GetPriceReductionPercentage(products[index].old_price, products[index].price);

            if (products[index].reduction_percentage + percentage <= 30) {

                if (products[index].days_since_price_change > 29 && percentage >= 5 && percentage <= 30) {
                    products[index].promotion_active = true;
                    products[index].reduction_percentage += percentage;
                }
            }else{
                products[index].promotion_active = false;
                products[index].reduction_percentage = 0;
            }
        }
        products[index].days_since_price_change = 0;
    }
}

/**
 * @return {number}
 */
function GetPriceReductionPercentage(old_price, new_price) {
    var difference = old_price - new_price;
    return (difference / old_price) * 100
}