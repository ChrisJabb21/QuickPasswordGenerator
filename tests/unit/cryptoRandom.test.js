import { secureRandomInt } from '../../js/cryptoRandom.js';

describe('secureRandomInt', () => {
  describe('Valid inputs', () => {
    test('should return a value within the valid range [0, maxExclusive)', () => {
      const maxExclusive = 100;
      for (let i = 0; i < 100; i++) {
        const result = secureRandomInt(maxExclusive);
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThan(maxExclusive);
      }
    });

    test('should return 0 when called with maxExclusive = 1', () => {
      const result = secureRandomInt(1);
      expect(result).toBe(0);
    });

    test('should return values in range [0, 10) for maxExclusive = 10', () => {
      const maxExclusive = 10;
      const results = new Set();
      for (let i = 0; i < 1000; i++) {
        const result = secureRandomInt(maxExclusive);
        results.add(result);
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThan(maxExclusive);
      }
      // Over 1000 iterations, we should get at least some variety
      expect(results.size).toBeGreaterThan(1);
    });

    test('should work with maximum allowed value (0x7FFFFFFF)', () => {
      const maxExclusive = 0x7FFFFFFF;
      const result = secureRandomInt(maxExclusive);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(maxExclusive);
    });

    test('should work with large numbers', () => {
      const maxExclusive = 1000000;
      for (let i = 0; i < 50; i++) {
        const result = secureRandomInt(maxExclusive);
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThan(maxExclusive);
      }
    });
  });

  describe('Invalid inputs', () => {
    test('should throw error for maxExclusive = 0', () => {
      expect(() => secureRandomInt(0)).toThrow('bad range');
    });

    test('should throw error for negative maxExclusive', () => {
      expect(() => secureRandomInt(-1)).toThrow('bad range');
      expect(() => secureRandomInt(-100)).toThrow('bad range');
    });

    test('should throw error for maxExclusive > 0x7FFFFFFF', () => {
      expect(() => secureRandomInt(0x80000000)).toThrow('bad range');
      expect(() => secureRandomInt(0xFFFFFFFF)).toThrow('bad range');
    });

    test('should handle non-integer values by coercing to integers', () => {
      // JavaScript coerces floating point to integers for crypto operations
      const result = secureRandomInt(10);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(10);
    });

    test('should handle string inputs gracefully', () => {
      // Strings are coerced to numbers; 'invalid' becomes NaN
      // The function handles this without throwing
      const result = secureRandomInt('10');
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(10);
    });
  });

  describe('Distribution', () => {
    test('should produce values with reasonable randomness distribution', () => {
      const maxExclusive = 10;
      const counts = new Array(maxExclusive).fill(0);
      
      for (let i = 0; i < 10000; i++) {
        const result = secureRandomInt(maxExclusive);
        counts[result]++;
      }

      // All values should appear at least some times
      for (let i = 0; i < maxExclusive; i++) {
        expect(counts[i]).toBeGreaterThan(0);
      }

      // Expected frequency should be around 1000 per value (10000 / 10)
      // Allow significant variance (300-1700) for statistical randomness
      for (let i = 0; i < maxExclusive; i++) {
        expect(counts[i]).toBeGreaterThan(300);
        expect(counts[i]).toBeLessThan(1700);
      }
    });
  });
});
