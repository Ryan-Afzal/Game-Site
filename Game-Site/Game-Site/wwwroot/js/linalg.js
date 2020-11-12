"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
$(function () {
    // Directions
    printMessage("", "Welcome to the Linear Algebra program. ");
    printMessage("", "Conventions: ");
    printMessage("", "1. An M x N matrix contains M rows and N columns.");
    printMessage("", "2. All indices are 1-based, meaning they start from 1 and count upwards");
    printMessage("", "");
    // End of directions, starts user input
    printMessage("", "Enter the dimensions of the matrix (in the form \"M N\"): ");
    var stepNum = 0;
    var matrix;
    var dimM;
    var dimN;
    var quitNow = false;
    $("#console-input").keydown(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == 13 && !event.shiftKey) {
            var node = document.getElementById("console-input");
            var input = node.textContent;
            if (input.trim() == "") {
                // Do Nothing
            }
            else {
                node.textContent = "";
                printMessage(">> ", input);
                // Get output
                if (stepNum == 0) {
                    var inputArr = input.split(" ");
                    dimM = parseInt(inputArr[0]);
                    dimN = parseInt(inputArr[1]);
                    if (dimM == dimN) {
                        matrix = new SquareMatrix(dimN);
                    }
                    else {
                        matrix = new Matrix(dimM, dimN);
                    }
                    printMessage("", "Matrix has dimensions " + dimM + " x " + dimN + ". ");
                    printMessage("", "You will now the entries of the matrix, separated by a single space. ");
                }
                else if (stepNum <= dimM) {
                    var inputArr = input.split(" ");
                    for (var j = 0; j < dimN; j++) {
                        var val = parseInt(inputArr[j], 10);
                        matrix.setValue(val, stepNum - 1, j);
                    }
                }
                else if (!quitNow) {
                    var inputArr = input.split(" ");
                    if (inputArr[0] === ("H")) {
                        printMessage("", "Here are the commands: ");
                        printMessage("", "\"H\": Displays the list of commands.");
                        printMessage("", "\"S [i] [j]\": Swaps rows [i] and [j].");
                        printMessage("", "\"X [i] [scale]\": Multiplies the elements in row [i] by the integer [scale].");
                        printMessage("", "\"A [i] [j]\": Adds row [i] to row [j].");
                        printMessage("", "\"D [i]\": Divides the row [i] by the greatest common divisor of numbers in the row and makes the first nonzero element in the row positive.");
                        printMessage("", "\"C [i] [j]\": Adds one of row [i] and row [j] by a scalar multiple of the other row to simplify it. Prints out the operations used. For now should only run after descaling all rows");
                        printMessage("", "\"REF\": Simplifies to REF form and shows work.");
                        printMessage("", "\"RREF\": Simplifies to RREF form and shows work.");
                        printMessage("", "\"DET\": Prints out the determinant.");
                        printMessage("", "\"Q\": End the program.");
                    }
                    else if (inputArr[0] === "S") {
                        if (inputArr.length < 3) {
                            printMessage("", "Error: You need at least 2 arguments for this command");
                        }
                        var i = parseInt(inputArr[1]);
                        var j = parseInt(inputArr[2]);
                        if (!Numbers.isInRange(i, 1, dimM)) {
                            printMessage("", "Error: Row numbers must be between 1 and " + dimM + " inclusive. ");
                            return;
                        }
                        if (!Numbers.isInRange(j, 1, dimM)) {
                            printMessage("", "Error: Row numbers must be between 1 and " + dimM + " inclusive. ");
                            return;
                        }
                        var str = matrix.swap(i - 1, j - 1, true);
                        printMessage("", str);
                        printMessage("", "The resulting matrix is below:");
                        printMessage("", matrix.toString());
                    }
                    else if (inputArr[0] === "X") {
                        if (inputArr.length < 3) {
                            printMessage("", "Error: You need at least 2 arguments for this command");
                        }
                        var i = parseInt(inputArr[1]);
                        var scale = parseInt(inputArr[2]);
                        if (!Numbers.isInRange(i, 1, dimM)) {
                            printMessage("", "Error: Row numbers must be between 1 and " + dimM + " inclusive. ");
                            return;
                        }
                        matrix.scale(i - 1, scale);
                        printMessage("", "The resulting matrix is below:");
                        printMessage("", matrix.toString());
                    }
                    else if (inputArr[0] === "A") {
                        if (inputArr.length < 3) {
                            printMessage("", "Error: You need at least 2 arguments for this command");
                        }
                        var i = parseInt(inputArr[1]);
                        var j = parseInt(inputArr[2]);
                        if (!Numbers.isInRange(i, 1, dimM)) {
                            printMessage("", "Error: Row numbers must be between 1 and " + dimM + " inclusive. ");
                            return;
                        }
                        if (!Numbers.isInRange(j, 1, dimM)) {
                            printMessage("", "Error: Row numbers must be between 1 and " + dimM + " inclusive. ");
                            return;
                        }
                        matrix.addRow(i - 1, j - 1);
                        printMessage("", "The resulting matrix is below:");
                        printMessage("", matrix.toString());
                    }
                    else if (inputArr[0] === "D") {
                        if (inputArr.length < 2) {
                            printMessage("", "Error: You need at least 1 argument for this command");
                        }
                        var i = parseInt(inputArr[1]);
                        if (!Numbers.isInRange(i, 1, dimM)) {
                            printMessage("", "Error: Row numbers must be between 1 and " + dimM + " inclusive. ");
                            return;
                        }
                        matrix.descale(i - 1);
                        printMessage("", "The resulting matrix is below:");
                        printMessage("", matrix.toString());
                    }
                    else if (inputArr[0] === "C") {
                        if (inputArr.length < 3) {
                            printMessage("", "Error: You need at least 2 arguments for this command");
                        }
                        var i = parseInt(inputArr[1]);
                        var j = parseInt(inputArr[2]);
                        if (!Numbers.isInRange(i, 1, dimM)) {
                            printMessage("", "Error: Row numbers must be between 1 and " + dimM + " inclusive. ");
                            return;
                        }
                        if (!Numbers.isInRange(j, 1, dimM)) {
                            printMessage("", "Error: Row numbers must be between 1 and " + dimM + " inclusive. ");
                            return;
                        }
                        var str = matrix.cancel(i - 1, j - 1, true)[1];
                        printMessage("", str);
                        printMessage("", "The resulting matrix is below:");
                        printMessage("", matrix.toString());
                    }
                    else if (inputArr[0] === "REF") {
                        var str = matrix.toREF(true)[1];
                        printMessage("", str);
                        printMessage("", "The resulting matrix is below:");
                        printMessage("", matrix.toString());
                    }
                    else if (inputArr[0] === "RREF") {
                        var str = matrix.toRREF(true);
                        printMessage("", str);
                        printMessage("", "The resulting matrix is below:");
                        printMessage("", matrix.toString());
                    }
                    else if (inputArr[0] === "DET") {
                        if (matrix instanceof SquareMatrix) {
                            printMessage("", "Determinant is: " + matrix.computeDet());
                        }
                        else {
                            printMessage("", "Error: Determinant of non-square matrix is undefined.");
                        }
                    }
                    else if (inputArr[0] === "Q") {
                        quitNow = true;
                    }
                    else {
                        printMessage("", "Error: \"" + input + "\" is not a valid command. Press \"H\" to see the list of valid commands. ");
                    }
                }
                if (stepNum < dimM) {
                    printMessage("", "Enter the entries of row #" + (stepNum + 1) + ": ");
                }
                else {
                    if (stepNum == dimM) {
                        printMessage("", "The matrix you entered is below:");
                        printMessage("", matrix.toString());
                    }
                    printMessage("", "<br/>");
                    if (!quitNow) {
                        printMessage("", "Enter next command (enter \"H\" for help): ");
                    }
                }
                event.preventDefault();
                stepNum++;
            }
        }
    });
});
/*
 * Prints a message to the console.
 */
function printMessage(head, message) {
    var output = $("#console-output");
    output.append($('<div />').addClass("output-text-container")
        .append($('<div />').addClass("output-text-head").html(head))
        .append($('<div />').addClass("output-text").html(message)));
    $("#console-output-container").scrollTop(output[0].scrollHeight);
}
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
    Numbers.isInRange = function (num, min, max) {
        if (num <= max && num >= min) {
            return true;
        }
        return false;
    };
    // Returns the smaller of the two numbers.
    Numbers.min = function (i, j) {
        if (i < j) {
            return i;
        }
        else {
            return j;
        }
    };
    // Returns the larger of the two numbers.
    Numbers.max = function (i, j) {
        if (i > j) {
            return i;
        }
        else {
            return j;
        }
    };
    // Returns the number of digits in a number
    Numbers.digitNum = function (i) {
        var digits = 0;
        if (i < 0) {
            digits++;
        }
        i = Numbers.abs(i);
        while (i >= 10) {
            i = i / 10;
            digits++;
        }
        digits++;
        return digits;
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
var Matrix = /** @class */ (function () {
    function Matrix(M, N) {
        this.M = M;
        this.N = N;
        this.vals = new Array(M);
        for (var i = 0; i < M; i++) {
            this.vals[i] = new Array(N);
        }
        this.pivots = new Array(M);
        for (var i = 0; i < M; i++) {
            this.pivots[i] = N;
        }
    }
    Matrix.prototype.setValue = function (val, i, j) {
        this.vals[i][j] = val;
        // FInd pivot (inefficient, should improve)
        var isNonZero = false;
        for (var k = 0; k < this.N; k++) {
            if (this.vals[i][k] != 0 && !isNonZero) {
                isNonZero = true;
                this.pivots[i] = k;
            }
        }
        if (!isNonZero) {
            this.pivots[i] = this.N;
        }
    };
    Matrix.prototype.toString = function () {
        var str = "";
        var colDigits = [];
        for (var j = 0; j < this.N; j++) {
            colDigits.push(0);
            for (var i = 0; i < this.M; i++) {
                if (colDigits[j] < Numbers.digitNum(this.vals[i][j])) {
                    colDigits[j] = Numbers.digitNum(this.vals[i][j]);
                }
            }
        }
        for (var i = 0; i < this.M; i++) {
            for (var j = 0; j < this.N; j++) {
                str += this.vals[i][j];
                for (var k = Numbers.digitNum(this.vals[i][j]); k <= Numbers.max(colDigits[j], 2); k++) {
                    str += "&nbsp;";
                }
            }
            str += "<br/>";
        }
        return str;
    };
    // Swap rows i and j (1-based indices)
    // Prints if print == true
    Matrix.prototype.swap = function (i, j, print) {
        var temp;
        for (var k = 0; k < this.N; k++) {
            temp = this.vals[i][k];
            this.vals[i][k] = this.vals[j][k];
            this.vals[j][k] = temp;
        }
        temp = this.pivots[i];
        this.pivots[i] = this.pivots[j];
        this.pivots[j] = temp;
        if (print) {
            return ("R_" + (i + 1) + " <-> R_" + (j + 1));
        }
        else {
            return "";
        }
    };
    // Scale values in row i by some integer scale, returns the scale
    Matrix.prototype.scale = function (i, scale) {
        for (var j = 0; j < this.N; j++) {
            this.vals[i][j] *= scale;
        }
        if (scale == 0) {
            this.pivots[i] = this.N;
        }
        return scale;
    };
    // Add row i to row j
    Matrix.prototype.addRow = function (i, j) {
        for (var k = 0; k < this.N; k++) {
            this.vals[j][k] += this.vals[i][k];
        }
        // Find pivot (inefficient)
        var isNonZero = false;
        for (var k = 0; k < this.N; k++) {
            this.vals[j][k] = this.vals[j][k];
            if (this.vals[j][k] != 0 && !isNonZero) {
                isNonZero = true;
                this.pivots[j] = k;
            }
        }
        if (!isNonZero) {
            this.pivots[j] = this.N;
        }
    };
    // Divides by gcd of numbers in row i and makes the first nonzero entry positive
    Matrix.prototype.descale = function (i) {
        var gcd = Numbers.gcdArr(this.vals[i]);
        var factor = gcd;
        if (gcd != 0) {
            for (var j = 0; j < this.N; j++) {
                this.vals[i][j] /= gcd;
            }
            // Make leftmost nonzero variable positive
            // Since gcd != 0 some variable is nonzero
            if (this.vals[i][this.pivots[i]] < 0) {
                factor *= -1;
                for (var j = 0; j < this.N; j++) {
                    this.vals[i][j] *= -1;
                }
            }
        }
        else {
            factor = 1;
        }
        return factor;
    };
    // Adds a scalar multiple of row i to row j so that vals[j][pivots[i]] = 0 (or vice versa)
    // Also helper method for toREF()
    // Prints the string it is supposed to print if print is true
    Matrix.prototype.cancel = function (i, j, print) {
        // (a,b) = (i,j) if pivots[i] > pivots[j] or pivots[i] = pivots[j] and i < j, and (j,i) otherwise
        var a;
        var b;
        var str = "";
        var multiplier = new Fraction(1, 1);
        if (this.pivots[i] > this.pivots[j] || (this.pivots[i] == this.pivots[j] && i < j)) {
            a = i;
            b = j;
        }
        else {
            a = j;
            b = i;
        }
        // Now begin cancelling
        // First step is scale down both rows
        var aScale = this.descale(a);
        if (aScale != 1) {
            var aScaleFrac = new Fraction(1, aScale);
            multiplier.multiply(aScale);
            if (print) {
                str += ("R_" + (a + 1) + " -> (" + aScaleFrac + ") * R_" + (a + 1) + "<br/>");
                str += (this.toString() + "<br/>");
            }
        }
        var bScale = this.descale(b);
        if (bScale != 1) {
            var bScaleFrac = new Fraction(1, bScale);
            multiplier.multiply(bScale);
            if (print) {
                str += ("R_" + (b + 1) + " -> (" + bScaleFrac + ") * R_" + (b + 1) + "<br/>");
                str += (this.toString() + "<br/>");
            }
        }
        // Fraction written in form scaleA_N/scaleA_D
        var scaleA_N = 1;
        var scaleA_D = 1;
        scaleA_N *= this.vals[b][this.pivots[a]];
        scaleA_D *= -this.vals[a][this.pivots[a]];
        this.scale(a, scaleA_N);
        this.scale(b, scaleA_D);
        multiplier.divide(scaleA_N);
        multiplier.divide(scaleA_D);
        this.addRow(a, b);
        multiplier.multiply(this.descale(a));
        var scaleB_D = this.descale(b);
        multiplier.multiply(scaleB_D);
        var scaleAFrac = new Fraction(scaleA_N, scaleB_D);
        var scaleBFrac = new Fraction(scaleA_D, scaleB_D);
        if (print) {
            str += ("R_" + (b + 1) + " -> (" + scaleBFrac + ") * R_" + (b + 1) + " + (" + scaleAFrac + ") * R_" + (a + 1));
        }
        multiplier.simplify();
        return [multiplier, str];
    };
    // Helper methods
    // REF stands for Row Echelon Form
    // print determines whether to print the steps
    Matrix.prototype.toREF = function (print) {
        var str = "";
        var multiplier = new Fraction(1, 1);
        // First find rows with minimum value for pivot
        var arr = [];
        for (var i = 0; i < this.M; i++) {
            var pivotVal = Number.MAX_VALUE;
            var firstIndex = -1;
            arr = [];
            var arrSize = 0;
            for (var j = i; j < this.M; j++) {
                if (this.pivots[j] < pivotVal) {
                    pivotVal = this.pivots[j];
                    arr = [];
                    arrSize = 0;
                    firstIndex = j;
                }
                else if (this.pivots[j] == pivotVal) {
                    arr.push(j);
                    arrSize++;
                }
            }
            if (pivotVal < this.N) {
                if (firstIndex != i) {
                    this.swap(i, firstIndex, print);
                    multiplier.multiply(-1);
                    if (print) {
                        str += "<br/>";
                        str += (this.toString() + "<br/>");
                    }
                }
                // Now we can assume the index we want to apply this.cancel() with is at i
                for (var j = 0; j < arrSize; j++) {
                    var cancelRet = this.cancel(i, arr[j], print);
                    multiplier.multiplyFraction(cancelRet[0]);
                    if (print) {
                        str += cancelRet[1];
                        str += "<br/>";
                        str += (this.toString() + "<br/>");
                    }
                    multiplier.simplify();
                }
            }
        }
        // At this point all nonzero rows should have distinct pivots
        for (var i = 0; i < Numbers.min(this.M, this.N); i++) {
            multiplier.multiply(this.vals[i][i]);
        }
        multiplier.simplify();
        return [multiplier, str];
    };
    Matrix.prototype.toRREF = function (print) {
        var str = "";
        if (print) {
            str += this.toREF(print)[1];
        }
        // Go through rows and cancel with rows above them
        for (var i = this.M - 1; i >= 0; i--) {
            if (this.pivots[i] < this.N) {
                for (var j = 0; j < i; j++) {
                    if (this.vals[j][this.pivots[i]] != 0) {
                        var cancelRet = this.cancel(i, j, print)[1];
                        if (print) {
                            str += cancelRet;
                            str += "<br/>";
                            str += (this.toString() + "<br/>");
                        }
                    }
                }
            }
        }
        return str;
    };
    Matrix.prototype.copy = function () {
        var ret = new Matrix(this.M, this.N);
        for (var i = 0; i < this.M; i++) {
            for (var j = 0; j < this.N; j++) {
                ret.setValue(this.vals[i][j], i, j);
            }
        }
        return ret;
    };
    return Matrix;
}());
var SquareMatrix = /** @class */ (function (_super) {
    __extends(SquareMatrix, _super);
    function SquareMatrix(N) {
        return _super.call(this, N, N) || this;
    }
    SquareMatrix.prototype.computeDet = function () {
        var copy = this.copy();
        return copy.toREF(false)[0];
    };
    return SquareMatrix;
}(Matrix));
//# sourceMappingURL=linalg.js.map