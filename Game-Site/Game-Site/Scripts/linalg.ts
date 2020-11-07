class Numbers {
    abs(n: number): number {
        if (n > 0) {
            return n;
        } else {
            return -n;
        }
    }
    // Finds gcd of i and j (want my own implementation to make sure negatives are dealt with correctly and to show off)
    gcd(i: number, j: number): number {
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
    gcdArr(arr: number[]): number {
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