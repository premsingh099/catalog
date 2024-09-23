var jsonString = "{\n    \"keys\": {\n      \"n\": 4,\n      \"k\": 3\n    },\n    \"1\": {\n      \"base\": \"10\",\n      \"value\": \"4\"\n    },\n    \"2\": {\n      \"base\": \"2\",\n      \"value\": \"111\"\n    },\n    \"3\": {\n      \"base\": \"10\",\n      \"value\": \"12\"\n    },\n    \"6\": {\n      \"base\": \"4\",\n      \"value\": \"213\"\n    }\n  }";
function convertToDecimal(base, value) {
    return parseInt(value, parseInt(base));
}
function main() {
    var data = JSON.parse(jsonString);
    var n = data.keys.n; // number of roots
    var k = data.keys.k; // min roots required
    var roots = [];
    for (var key in data) {
        if (key !== "keys") {
            var base = data[key].base;
            var value = data[key].value;
            var decimalValue = convertToDecimal(base, value);
            roots.push([parseInt(key), decimalValue]); // x is the key, y is the decimal value
        }
    }
    if (roots.length < k) {
        throw new Error("Not enough roots provided.");
    }
    // Assuming a simple linear polynomial (degree 1) for this example
    var lastTerm = roots[0][1]; // Using the first root to find c
    console.log("The constant term c (using first root) is: ".concat(lastTerm));
}
main();
