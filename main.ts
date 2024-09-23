const jsonString: string = `{
    "keys": {
      "n": 4,
      "k": 3
    },
    "1": {
      "base": "10",
      "value": "4"
    },
    "2": {
      "base": "2",
      "value": "111"
    },
    "3": {
      "base": "10",
      "value": "12"
    },
    "6": {
      "base": "4",
      "value": "213"
    }
  }`;
  
  function convertToDecimal(base: string, value: string): number {
    return parseInt(value, parseInt(base));
  }
  
  function main(): void {
    const data: Record<string, any> = JSON.parse(jsonString);
    const n: number = data.keys.n; // number of roots
    const k: number = data.keys.k; // min roots required
    const roots: [number, number][] = [];
  
    for (let key in data) {
      if (key !== "keys") {
        const base: string = data[key].base;
        const value: string = data[key].value;
        const decimalValue: number = convertToDecimal(base, value);
        roots.push([parseInt(key), decimalValue]); // x is the key, y is the decimal value
      }
    }
  
    if (roots.length < k) {
      throw new Error("Not enough roots provided.");
    }
  
    // Assuming a simple linear polynomial (degree 1) for this example
    const lastTerm: number = roots[0][1]; // Using the first root to find c
  
    console.log(`The constant term c (using first root) is: ${lastTerm}`);
  }
  
  main();
  