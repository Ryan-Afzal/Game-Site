"use strict";
var Numbers = /** @class */ (function () {
    function Numbers() {
    }
    Numbers.abs = function (n) {
        if (n > 0) {
            return n;
        }
        else {
            return -n;
        }
    };
    // Finds gcd of i and j (want my own implementation to make sure negatives are dealt with correctly and to show off)
    Numbers.gcd = function (i, j) {
        // Take absolute values
        var iPos = this.abs(i);
        var jPos = this.abs(j);
        if (iPos == jPos && iPos == 0) {
            return 0;
        }
        else if (iPos == 0) {
            return jPos;
        }
        else if (jPos == 0) {
            return iPos;
        }
        else if (iPos > jPos) {
            return this.gcd(iPos % jPos, jPos);
        }
        else {
            return this.gcd(iPos, jPos % iPos);
        }
    };
    // Finds gcd of integers in an integer array arr
    Numbers.gcdArr = function (arr) {
        var gcd = this.abs(arr[0]);
        for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
            var i = arr_1[_i];
            gcd = this.gcd(gcd, i);
        }
        return gcd;
    };
    // Checks if an integer is in a range (inclusive), returns boolean
    Numbers.prototype.isInRange = function (num, min, max) {
        if (num <= max && num >= min) {
            return true;
        }
        return false;
    };
    // Returns the smaller of the two numbers.
    Numbers.prototype.min = function (i, j) {
        if (i < j) {
            return i;
        }
        else {
            return j;
        }
    };
    return Numbers;
}());
var Fraction = /** @class */ (function () {
    function Fraction(N, D) {
        this.N = N;
        this.D = D;
        if (D == 0) {
            try {
                throw new Error('Denominator cannot be 0.');
            }
            catch (e) {
                console.log(e);
            }
        }
    }
    Fraction.prototype.multiply = function (c) {
        this.N *= c;
    };
    Fraction.prototype.multiplyFraction = function (f) {
        this.N *= f.N;
        this.D *= f.D;
    };
    Fraction.prototype.divide = function (c) {
        if (c == 0) {
            try {
                throw new Error('Cannot divide by 0.');
            }
            catch (e) {
                console.log(e);
            }
        }
        this.D *= c;
    };
    Fraction.prototype.simplify = function () {
        var gcd = Numbers.gcd(this.N, this.D);
        this.N /= gcd;
        this.D /= gcd;
        if (this.D < 0) {
            this.N *= -1;
            this.D *= -1;
        }
    };
    Fraction.prototype.toString = function () {
        this.simplify();
        if (this.D == 1) {
            return this.N + "";
        }
        else {
            return this.N + "/" + this.D;
        }
    };
    return Fraction;
}());
//# sourceMappingURL=linalg.js.map