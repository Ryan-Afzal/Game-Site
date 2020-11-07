class Numbers {
    abs(n) {
        if (n > 0) {
            return n;
        } else {
            return -n;
        }
    }
    // Finds gcd of i and j (want my own implementation to make sure negatives are dealt with correctly and to show off)
    gcd(i, j) {
        // Take absolute values
        let iPos = this.abs(i);
        let jPos = this.abs(j);
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
    gcdArr(arr) {
        let gcd = this.abs(arr[0]);
        for (let i of gcd) {
            gcd = this.gcd(gcd, i);
        }
        return gcd;
    }
}