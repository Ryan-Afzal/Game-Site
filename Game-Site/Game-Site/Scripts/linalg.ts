"use strict";

$(() => {
    // Directions
    printMessage("", "Welcome to the Linear Algebra program. ");
    printMessage("", "Conventions: ");
    printMessage("", "1. An M x N matrix contains M rows and N columns.");
    printMessage("", "2. All indices are 1-based, meaning they start from 1 and count upwards");
    printMessage("", "");
    // End of directions, starts user input
    printMessage("", "Enter the dimensions of the matrix (in the form \"M N\"): ");
    let stepNum: number = 0;
    let matrix: Matrix;
    let dimM: number;
    let dimN: number;
    let quitNow: boolean = false;

    $("#console-input").keydown(function (event) {
        let keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == 13 && !event.shiftKey) {
            let node = document.getElementById("console-input");
            let input: string = node.textContent;

            if (input.trim() == "") {
                // Do Nothing
            } else {
                node.textContent = "";

                printMessage(">> ", input);

                // Get output
                if (stepNum == 0) {
                    let inputArr: string[] = input.split(" ");
                    dimM = parseInt(inputArr[0]);
                    dimN = parseInt(inputArr[1]);
                    matrix = new Matrix(dimM, dimN);
                    printMessage("", "Matrix has dimensions " + dimM + " x " + dimN + ". ");
                    printMessage("", "You will now the entries of the matrix, separated by a single space. ");
                } else if (stepNum <= dimM) {
                    let inputArr: string[] = input.split(" ");
                    for (let j = 0; j < dimN; j++) {
                        let val: number = parseInt(inputArr[j], 10);
                        matrix.setValue(val, stepNum - 1, j);
                    }
                } else if (!quitNow) {
                    let inputArr: string[] = input.split(" ");
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
                        printMessage("", "\"Q\": End the program.");
                    } else if (inputArr[0] === "S") {
                        if (inputArr.length < 3) {
                            printMessage("", "Error: You need at least 2 arguments for this command");
                        }
                        let i: number = parseInt(inputArr[1]);
                        let j: number = parseInt(inputArr[2]);
                        if (!Numbers.isInRange(i, 1, dimM)) {
                            printMessage("", "Error: Row numbers must be between 1 and " + dimM + " inclusive. ");
                            return;
                        }
                        if (!Numbers.isInRange(j, 1, dimM)) {
                            printMessage("", "Error: Row numbers must be between 1 and " + dimM + " inclusive. ");
                            return;
                        }
                        let str: string = matrix.swap(i - 1, j - 1, true);
                        printMessage("", str);
                        printMessage("", "The resulting matrix is below:");
                        printMessage("", matrix.toString());
                    } else if (inputArr[0] === "X") {
                        if (inputArr.length < 3) {
                            printMessage("", "Error: You need at least 2 arguments for this command");
                        }
                        let i: number = parseInt(inputArr[1]);
                        let scale: number = parseInt(inputArr[2]);
                        if (!Numbers.isInRange(i, 1, dimM)) {
                            printMessage("", "Error: Row numbers must be between 1 and " + dimM + " inclusive. ");
                            return;
                        }
                        matrix.scale(i - 1, scale);
                        printMessage("", "The resulting matrix is below:");
                        printMessage("", matrix.toString());
                    } else if (inputArr[0] === "A") {
                        if (inputArr.length < 3) {
                            printMessage("", "Error: You need at least 2 arguments for this command");
                        }
                        let i: number = parseInt(inputArr[1]);
                        let j: number = parseInt(inputArr[2]);
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
                    } else if (inputArr[0] === "D") {
                        if (inputArr.length < 2) {
                            printMessage("", "Error: You need at least 1 argument for this command");
                        }
                        let i: number = parseInt(inputArr[1]);
                        if (!Numbers.isInRange(i, 1, dimM)) {
                            printMessage("", "Error: Row numbers must be between 1 and " + dimM + " inclusive. ");
                            return;
                        }
                        matrix.descale(i - 1);
                        printMessage("", "The resulting matrix is below:");
                        printMessage("", matrix.toString());
                    } else if (inputArr[0] === "C") {
                        if (inputArr.length < 3) {
                            printMessage("", "Error: You need at least 2 arguments for this command");
                        }
                        let i: number = parseInt(inputArr[1]);
                        let j: number = parseInt(inputArr[2]);
                        if (!Numbers.isInRange(i, 1, dimM)) {
                            printMessage("", "Error: Row numbers must be between 1 and " + dimM + " inclusive. ");
                            return;
                        }
                        if (!Numbers.isInRange(j, 1, dimM)) {
                            printMessage("", "Error: Row numbers must be between 1 and " + dimM + " inclusive. ");
                            return;
                        }
                        let str: string = matrix.cancel(i - 1, j - 1, true)[1];
                        printMessage("", str);
                        printMessage("", "The resulting matrix is below:");
                        printMessage("", matrix.toString());
                    } else if (inputArr[0] === "REF") {
                        let str: string = matrix.toREF(true)[1];
                        printMessage("", str);
                        printMessage("", "The resulting matrix is below:");
                        printMessage("", matrix.toString());
                    } else if (inputArr[0] === "RREF") {
                        let str: string = matrix.toRREF(true);
                        printMessage("", str);
                        printMessage("", "The resulting matrix is below:");
                        printMessage("", matrix.toString());
                    } else if (inputArr[0] === "Q") {
                        quitNow = true;
                    } else {
                        printMessage("", "Error: \"" + input + "\" is not a valid command. Press \"H\" to see the list of valid commands. ");
                    }
                }
                if (stepNum < dimM) {
                    printMessage("", "Enter the entries of row #" + (stepNum + 1) + ": ")
                } else {
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

    output.append(
        $('<div />').addClass("output-text-container")
            .append(
                $('<div />').addClass("output-text-head").html(head)
            )
            .append(

                $('<div />').addClass("output-text").html(message)
            )
    );

    $("#console-output-container").scrollTop(output[0].scrollHeight);
}


class Numbers {
    static abs(n: number): number {
        if (n > 0) {
            return n;
        } else {
            return -n;
        }
    }
    // Finds gcd of i and j (want my own implementation to make sure negatives are dealt with correctly and to show off)
    static gcd(i: number, j: number): number {
        // Take absolute values
        let iPos: number = this.abs(i);
        let jPos: number = this.abs(j);
        if (iPos == jPos && iPos == 0) {
            return 0;
        } else if (iPos == 0) {
            return jPos;
        } else if (jPos == 0) {
            return iPos;
        } else if (iPos > jPos) {
            return this.gcd(iPos % jPos, jPos);
        } else {
            return this.gcd(iPos, jPos % iPos);
        }
    }
    // Finds gcd of integers in an integer array arr
    static gcdArr(arr: number[]): number {
        let gcd: number = this.abs(arr[0]);
        for (let i of arr) {
            gcd = this.gcd(gcd, i);
        }
        return gcd;
    }
    // Checks if an integer is in a range (inclusive), returns boolean
    static isInRange(num: number, min: number, max: number): boolean {
        if (num <= max && num >= min) {
            return true;
        }
        return false;
    }
    // Returns the smaller of the two numbers.
    static min(i: number, j: number): number {
        if (i < j) {
            return i;
        } else {
            return j;
        }
    }
    // Returns the larger of the two numbers.
    static max(i: number, j: number): number {
        if (i > j) {
            return i;
        } else {
            return j;
        }
    }

    // Returns the number of digits in a number
    static digitNum(i: number): number {
        let digits: number = 0;
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
    }
}
class Fraction {
    N: number;
    D: number;
    constructor(N: number, D: number) {
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
    multiply(c: number) {
        this.N *= c;
    }
    multiplyFraction(f: Fraction) {
        this.N *= f.N;
        this.D *= f.D;
    }
    divide(c: number) {
        if (c == 0) {
            try {
                throw new Error('Cannot divide by 0.');
            }
            catch (e) {
                console.log(e);
            }
        }
        this.D *= c;
    }
    simplify() {
        let gcd: number = Numbers.gcd(this.N, this.D);
        this.N /= gcd;
        this.D /= gcd;
        if (this.D < 0) {
            this.N *= -1;
            this.D *= -1;
        }
    }
    public toString(): string {
        this.simplify();
        if (this.D == 1) {
            return this.N + "";
        } else {
            return this.N + "/" + this.D;
        }
    }
}
class Matrix {
    vals;
    // Position of leftmost nonzero number in each row
    pivots: number[];
    M: number;
    N: number;
    constructor(M: number, N: number) {
        this.M = M;
        this.N = N;
        this.vals = new Array(M);
        for (let i = 0; i < M; i++) {
            this.vals[i] = new Array(N);
        }
        this.pivots = new Array(M);
        for (let i = 0; i < M; i++) {
            this.pivots[i] = N;
        }
    }
    setValue(val: number, i: number, j: number) {
        this.vals[i][j] = val;
        // FInd pivot (inefficient, should improve)
        let isNonZero: boolean = false;
        for (let k = 0; k < this.N; k++) {
            if (this.vals[i][k] != 0 && !isNonZero) {
                isNonZero = true;
                this.pivots[i] = k;
            }
        }
        if (!isNonZero) {
            this.pivots[i] = this.N;
        }
    }
    public toString(): string {
        let str: string = "";
        let colDigits: number[] = [];
        for (let j = 0; j < this.N; j++) {
            colDigits.push(0);
            for (let i = 0; i < this.M; i++) {
                if (colDigits[j] < Numbers.digitNum(this.vals[i][j])) {
                    colDigits[j] = Numbers.digitNum(this.vals[i][j]);
                }
            }
        }
        for (let i = 0; i < this.M; i++) {
            for (let j = 0; j < this.N; j++) {
                str += this.vals[i][j];
                for (let k = Numbers.digitNum(this.vals[i][j]); k <= Numbers.max(colDigits[j],2); k++) {
                    str += "&nbsp;";
                }
            }
            str += "<br/>";
        }
        return str;
    }
    // Swap rows i and j (1-based indices)
    // Prints if print == true
    swap(i: number, j: number, print: boolean): string {
        let temp: number;
        for (let k = 0; k < this.N; k++) {
            temp = this.vals[i][k];
            this.vals[i][k] = this.vals[j][k];
            this.vals[j][k] = temp;
        }
        temp = this.pivots[i];
        this.pivots[i] = this.pivots[j];
        this.pivots[j] = temp;
        if (print) {
            return ("R_" + (i + 1) + " <-> R_" + (j + 1));
        } else {
            return "";
        }
    }
    // Scale values in row i by some integer scale, returns the scale
    scale(i: number, scale: number): number {
        for (let j = 0; j < this.N; j++) {
            this.vals[i][j] *= scale;
        }
        if (scale == 0) {
            this.pivots[i] = this.N;
        }
        return scale;
    }
    // Add row i to row j
    addRow(i: number, j: number) {
        for (let k = 0; k < this.N; k++) {
            this.vals[j][k] += this.vals[i][k];
        }
        // Find pivot (inefficient)
        let isNonZero: boolean = false;
        for (let k = 0; k < this.N; k++) {
            this.vals[j][k] = this.vals[j][k];
            if (this.vals[j][k] != 0 && !isNonZero) {
                isNonZero = true;
                this.pivots[j] = k;
            }
        }
        if (!isNonZero) {
            this.pivots[j] = this.N;
        }
    }
    // Divides by gcd of numbers in row i and makes the first nonzero entry positive
    descale(i: number): number {
        let gcd = Numbers.gcdArr(this.vals[i]);
        let factor = gcd;
        if (gcd != 0) {
            for (let j = 0; j < this.N; j++) {
                this.vals[i][j] /= gcd;
            }
            // Make leftmost nonzero variable positive
            // Since gcd != 0 some variable is nonzero

            if (this.vals[i][this.pivots[i]] < 0) {
                factor *= -1;
                for (let j = 0; j < this.N; j++) {
                    this.vals[i][j] *= -1;
                }
            }
        } else {
            factor = 1;
        }
        return factor;
    }
    // Adds a scalar multiple of row i to row j so that vals[j][pivots[i]] = 0 (or vice versa)
    // Also helper method for toREF()
    // Prints the string it is supposed to print if print is true
    cancel(i: number, j: number, print: boolean): [Fraction, string] {
        // (a,b) = (i,j) if pivots[i] > pivots[j] or pivots[i] = pivots[j] and i < j, and (j,i) otherwise
        let a: number;
        let b: number;
        let str: string = "";
        let multiplier: Fraction = new Fraction(1, 1);
        if (this.pivots[i] > this.pivots[j] || (this.pivots[i] == this.pivots[j] && i < j)) {
            a = i;
            b = j;
        } else {
            a = j;
            b = i;
        }
        // Now begin cancelling
        // First step is scale down both rows
        let aScale: number = this.descale(a);
        if (aScale != 1) {
            let aScaleFrac: Fraction = new Fraction(1, aScale);
            multiplier.multiply(aScale);
            if (print) {
                str += ("R_" + (a + 1) + " -> (" + aScaleFrac + ") * R_" + (a + 1) + "<br/>");
                str += (this.toString() + "<br/>");
            }
        }
        let bScale: number = this.descale(b);
        if (bScale != 1) {
            let bScaleFrac: Fraction = new Fraction(1, bScale);
            multiplier.multiply(bScale);
            if (print) {
                str += ("R_" + (b + 1) + " -> (" + bScaleFrac + ") * R_" + (b + 1) + "<br/>");
                str += (this.toString() + "<br/>");
            }
        }

        // Fraction written in form scaleA_N/scaleA_D
        let scaleA_N: number = 1;
        let scaleA_D: number = 1;
        scaleA_N *= this.vals[b][this.pivots[a]];
        scaleA_D *= -this.vals[a][this.pivots[a]];

        this.scale(a, scaleA_N);
        this.scale(b, scaleA_D);
        multiplier.divide(scaleA_N);
        multiplier.divide(scaleA_D);
        this.addRow(a, b);
        multiplier.multiply(this.descale(a));
        let scaleB_D: number = this.descale(b);
        multiplier.multiply(scaleB_D);

        let scaleAFrac: Fraction = new Fraction(scaleA_N, scaleB_D);
        let scaleBFrac: Fraction = new Fraction(scaleA_D, scaleB_D);

        if (print) {
            str += ("R_" + (b + 1) + " -> (" + scaleBFrac + ") * R_" + (b + 1) + " + (" + scaleAFrac + ") * R_" + (a + 1));
        }
        multiplier.simplify();
        return [multiplier,str];
    }
    // Helper methods


    // REF stands for Row Echelon Form
    // print determines whether to print the steps
    toREF(print: boolean): [Fraction, string] {
        let str: string = "";
        let multiplier: Fraction = new Fraction(1, 1);
        // First find rows with minimum value for pivot
        let arr: number[] = [];
        for (let i = 0; i < this.M; i++) {
            let pivotVal: number = Number.MAX_VALUE;
            let firstIndex: number = -1;
            arr = [];
            let arrSize: number = 0;
            for (let j = i; j < this.M; j++) {
                if (this.pivots[j] < pivotVal) {
                    pivotVal = this.pivots[j];
                    arr = [];
                    arrSize = 0;
                    firstIndex = j;
                } else if (this.pivots[j] == pivotVal) {
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
                for (let j = 0; j < arrSize; j++) {
                    let cancelRet: [Fraction, string] = this.cancel(i, arr[j], print);
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
        for (let i = 0; i < Numbers.min(this.M, this.N); i++) {
            multiplier.multiply(this.vals[i][i]);
        }
        multiplier.simplify();
        return [multiplier, str];
    }
    toRREF(print: boolean): string {
        let str: string = "";
        if (print) {
            str += this.toREF(print)[1]; 
        }
        // Go through rows and cancel with rows above them
        for (let i = this.M - 1; i >= 0; i--) {
            if (this.pivots[i] < this.N) {
                for (let j = 0; j < i; j++) {
                    if (this.vals[j][this.pivots[i]] != 0) {
                        let cancelRet: string = this.cancel(i, j, print)[1];
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
    }
    copy(): Matrix {
        let ret: Matrix = new Matrix(this.M, this.N);
        for (let i = 0; i < this.M; i++) {
            for (let j = 0; j < this.N; j++) {
                ret.setValue(this.vals[i][j], i, j);
            }
        }
        return ret;
    }
}