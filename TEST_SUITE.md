# Unit Test Suite for Secure Password Generator

This project includes a comprehensive unit test suite built with Jest to ensure the reliability and correctness of the password generator.

## Test Structure

### 1. **cryptoRandom.test.js**

Tests for the `secureRandomInt()` function that generates cryptographically secure random integers.

**Test Coverage:**

- ✅ Valid inputs (range checking, edge cases)
- ✅ Invalid inputs (error handling)
- ✅ Distribution analysis (randomness verification)
- ✅ Boundary conditions (0x7FFFFFFF max value)
- ✅ Error handling for negative, zero, and out-of-range values

**Key Tests:**

- Returns values within the specified range [0, maxExclusive)
- Throws "bad range" error for invalid inputs
- Produces reasonably distributed random values
- Handles maximum allowed value (0x7FFFFFFF)

### 2. **entropy.test.js**

Tests for the `estimateEntropyBits()` function that calculates password entropy.

**Test Coverage:**

- ✅ Correct entropy calculations for various character set sizes
- ✅ Edge cases (length 0, characterSetSize 1, etc.)
- ✅ Common password strength scenarios (weak, moderate, strong, very strong)
- ✅ Proper rounding of results
- ✅ Large number handling

**Key Tests:**

- Calculates entropy using formula: entropy = length × log₂(characterSetSize)
- Returns rounded integer values
- Correctly classifies password strength levels
- Handles edge cases gracefully

### 3. **generate.test.js**

Tests for the `generatePassword()` function that generates secure passwords.

**Test Coverage:**

- ✅ Password length validation
- ✅ Character inclusion/exclusion (lowercase, uppercase, digits, symbols)
- ✅ Default parameter handling
- ✅ Look-alike character exclusion option
- ✅ Randomness and uniqueness
- ✅ Error handling (no character sets selected)
- ✅ All character set combinations
- ✅ Mixed parameter configurations

**Key Tests:**

- Generates passwords with correct specified length
- Includes only selected character types
- Excludes unselected character types
- Throws error when no character sets are selected
- Produces unique passwords on successive calls
- Handles default parameters correctly
- Ensures at least one character from each selected set

## Running the Tests

### Prerequisites

Install dependencies:

```bash
npm install
```

### Commands

**Run all tests:**

```bash
npm test
```

**Run tests in watch mode (re-run on file changes):**

```bash
npm run test:watch
```

**Run tests with coverage report:**

```bash
npm run test:coverage
```

## Test Statistics

- **Total Test Cases:** 80+
- **Test Files:** 3
- **Modules Tested:** 3 (cryptoRandom, entropy, generate)
- **Coverage Areas:** Input validation, edge cases, randomness, error handling, real-world scenarios

## Example Test Cases

### Cryptographically Secure Random

```javascript
secureRandomInt(100)  // Returns random value: 0-99
secureRandomInt(1)    // Always returns: 0
secureRandomInt(0)    // Throws: "bad range"
```

### Entropy Calculation

```javascript
estimateEntropyBits(12, 62)   // Returns: 71 bits (moderate)
estimateEntropyBits(32, 94)   // Returns: 190+ bits (very strong)
```

### Password Generation

```javascript
generatePassword({ 
  length: 16, 
  lowerCase: true, 
  upperCase: true, 
  digits: true, 
  symbols: false 
})
// Returns: "aB3cDefG7hIjKlMn"

generatePassword({ length: 8 }) // Uses all defaults
// Returns: "AbC1deFg"
```

## Test Philosophy

The test suite follows these principles:

1. **Comprehensive Coverage** - Tests cover normal cases, edge cases, and error conditions
2. **Randomness Validation** - Verifies that random functions produce appropriately distributed outputs
3. **Security Focus** - Ensures no weak implementations or security regressions
4. **User Scenarios** - Includes real-world password strength classifications
5. **Error Handling** - Validates proper error throwing and messages
6. **Uniqueness** - Verifies unique passwords are generated
7. **Deterministic Validation** - Tests that respect cryptographic randomness while validating constraints

## Continuous Integration

These tests are designed to run in CI/CD pipelines. All tests should pass before deploying:

```bash
npm test -- --coverage --detectOpenHandles
```

## Future Enhancements

Potential additional tests:

- Performance benchmarks for password generation
- Unicode character support testing
- Custom character set support
- Batch password generation efficiency
- Memory usage under high volume

---

For more information about the project, see [README.md](../README.md)
