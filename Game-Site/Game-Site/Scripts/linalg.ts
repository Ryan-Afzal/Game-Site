"use strict";

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
    isInRange(num: number, min: number, max: number): boolean {
        if (num <= max && num >= min) {
            return true;
        }
        return false;
    }
    // Returns the smaller of the two numbers.
    min(i: number, j: number): number {
        if (i < j) {
            return i;
        } else {
            return j;
        }
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
    public toString(): String {
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
}