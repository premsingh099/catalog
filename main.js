"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
function decodeValue(value, base) {
    return parseInt(value, base);
}
function calculateSecret(points) {
    var k = points.length; // Number of points
    var secret = 0;
    // Lagrange interpolation
    for (var i = 0; i < k; i++) {
        var xi = points[i][0];
        var yi = points[i][1];
        var term = yi;
        for (var j = 0; j < k; j++) {
            if (i !== j) {
                var xj = points[j][0];
                term *= (0 - xj) / (xi - xj);
            }
        }
        secret += term;
    }
    return secret;
}
function processInput(fileName) {
    var input = JSON.parse(fs.readFileSync(path.join(__dirname, fileName), 'utf-8'));
    var n = input.keys.n;
    var k = input.keys.k;
    if (k > n) {
        console.log("Not enough roots to calculate c for ".concat(fileName, "."));
        return;
    }
    var points = [];
    for (var i = 1; i <= n; i++) {
        if (input[i.toString()]) {
            var base = parseInt(input[i.toString()].base);
            var value = input[i.toString()].value;
            var decodedValue = decodeValue(value, base);
            points.push([i, decodedValue]);
        }
    }
    if (points.length < k) {
        console.log("Not enough roots to calculate c for ".concat(fileName, "."));
        return;
    }
    var secret = calculateSecret(points.slice(0, k));
    console.log("The constant term c for ".concat(fileName, " is: ").concat(secret));
}
function main() {
    processInput('input.json');
    processInput('input2.json');
}
main();
