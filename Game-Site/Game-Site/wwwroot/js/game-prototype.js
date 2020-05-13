/**
 * Represents a lemonade stand. It is used to store and manipulate a single stand.
 */
var LemonadeStand = /** @class */ (function () {
    /**
     * Creates a new LemonadeStand with no money and free lemonade (price = $0).
     */
    function LemonadeStand() {
        this.money = 0.0;
        this.price = 0.0;
    }
    LemonadeStand.prototype.getPrice = function () {
        return this.price;
    };
    LemonadeStand.prototype.setPrice = function (price) {
        this.price = price;
    };
    return LemonadeStand;
}());
//# sourceMappingURL=game-prototype.js.map