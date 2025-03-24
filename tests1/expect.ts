type Expect = {
    toBe: (expectedResult: any) => string,
    toBeGreaterThan: (expectedResult: number) => string,
    toEqual: (expectedResult: any) => string,
}

export function expect(actualResult: any): Expect {
    return {
        toBe: function (expectedResult: any): string {
            if (actualResult === expectedResult) {
                return '[Test PASSED]: Expected value matches actual value.';
            } else {
                return `[Test FAILED]: Expected ${expectedResult}, but got ${actualResult}.`;
            }
        },

        toBeGreaterThan: function (expectedResult: number): string {
            if (actualResult > expectedResult) {
                return '[Test PASSED]: The actual value is greater than the expected value.';
            } else {
                return `[Test FAILED]: Expected value to be greater than ${expectedResult}, but got ${actualResult}.`;
            }
        },

        toEqual: function (expectedResult: any): string {
            if (JSON.stringify(actualResult) === JSON.stringify(expectedResult)) {
                return '[Test PASSED]: Values are equal.';
            } else {
                return `[Test FAILED]: Expected ${JSON.stringify(expectedResult)}, but got ${JSON.stringify(actualResult)}.`;
            }
        }
    }
}