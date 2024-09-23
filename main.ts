import * as fs from 'fs';
import * as path from 'path';

interface Input {
    keys: {
        n: number;
        k: number;
    };
    [key: string]: any;
}

function decodeValue(value: string, base: number): number {
    return parseInt(value, base);
}

function calculateSecret(points: [number, number][]): number {
    const k = points.length; // Number of points
    let secret = 0;

    // Lagrange interpolation
    for (let i = 0; i < k; i++) {
        const xi = points[i][0];
        const yi = points[i][1];
        let term = yi;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                const xj = points[j][0];
                term *= (0 - xj) / (xi - xj);
            }
        }
        secret += term;
    }

    return secret;
}

function processInput(fileName: string): void {
    const input: Input = JSON.parse(fs.readFileSync(path.join(__dirname, fileName), 'utf-8'));

    const n = input.keys.n;
    const k = input.keys.k;

    if (k > n) {
        console.log(`Not enough roots to calculate c for ${fileName}.`);
        return;
    }

    const points: [number, number][] = [];
    for (let i = 1; i <= n; i++) {
        if (input[i.toString()]) {
            const base = parseInt(input[i.toString()].base);
            const value = input[i.toString()].value;
            const decodedValue = decodeValue(value, base);
            points.push([i, decodedValue]);
        }
    }
    if (points.length < k) {
        console.log(`Not enough roots to calculate c for ${fileName}.`);
        return;
    }

    const secret = calculateSecret(points.slice(0, k));
    console.log(`The constant term c for ${fileName} is: ${secret}`);
}

function main(): void {
    processInput('input.json');
    processInput('input2.json');
}

main();
