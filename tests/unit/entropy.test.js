import { estimateEntropyBits } from '../../js/entropy.js';

describe('estimateEntropyBits', () => {
  describe('Valid calculations', () => {
    test('should calculate entropy correctly for alphanumeric characters', () => {
      // 26 lowercase + 26 uppercase + 10 digits = 62 characters
      const length = 12;
      const characterSetSize = 62;
      const result = estimateEntropyBits(length, characterSetSize);
      // log2(62) ≈ 5.954, so 12 * 5.954 ≈ 71.45 ≈ 71 bits
      expect(result).toBe(71);
    });

    test('should calculate entropy for all character sets including symbols', () => {
      // 26 + 26 + 10 + 24 symbols = 86 characters
      const length = 20;
      const characterSetSize = 86;
      const result = estimateEntropyBits(length, characterSetSize);
      // log2(86) ≈ 6.426, so 20 * 6.426 ≈ 128.52 ≈ 129 bits
      expect(result).toBe(129);
    });

    test('should calculate entropy for binary characters', () => {
      const length = 256;
      const characterSetSize = 2;
      const result = estimateEntropyBits(length, characterSetSize);
      // log2(2) = 1, so 256 * 1 = 256 bits
      expect(result).toBe(256);
    });

    test('should calculate entropy for hexadecimal characters', () => {
      const length = 32;
      const characterSetSize = 16;
      const result = estimateEntropyBits(length, characterSetSize);
      // log2(16) = 4, so 32 * 4 = 128 bits
      expect(result).toBe(128);
    });

    test('should calculate entropy for single character set', () => {
      const length = 8;
      const characterSetSize = 26; // lowercase only
      const result = estimateEntropyBits(length, characterSetSize);
      // log2(26) ≈ 4.7004, so 8 * 4.7004 ≈ 37.6 ≈ 38 bits
      expect(result).toBe(38);
    });

    test('should return correct value for length = 1', () => {
      const result = estimateEntropyBits(1, 256);
      // log2(256) = 8, so 1 * 8 = 8 bits
      expect(result).toBe(8);
    });

    test('should return 0 for length = 0', () => {
      const result = estimateEntropyBits(0, 100);
      expect(result).toBe(0);
    });

    test('should handle large passwords', () => {
      const result = estimateEntropyBits(128, 94); // 128 char password, 94 printable ASCII
      // Should be a large positive number
      expect(result).toBeGreaterThan(600);
      expect(result).toBeLessThan(900);
    });
  });

  describe('Edge cases', () => {
    test('should handle characterSetSize = 1', () => {
      const result = estimateEntropyBits(10, 1);
      // log2(1) = 0, so 10 * 0 = 0 bits
      expect(result).toBe(0);
    });

    test('should return rounded integer values', () => {
      const result = estimateEntropyBits(10, 17);
      // log2(17) ≈ 4.087, so 10 * 4.087 ≈ 40.87, rounded to 41
      expect(result).toBe(41);
      expect(Number.isInteger(result)).toBe(true);
    });

    test('should handle very large character sets', () => {
      const result = estimateEntropyBits(32, 1000000);
      // Should be a large number
      expect(result).toBeGreaterThan(600);
      expect(Number.isInteger(result)).toBe(true);
    });
  });

  describe('Common password scenarios', () => {
    test('weak password (8 chars, lowercase only)', () => {
      const result = estimateEntropyBits(8, 26);
      // log2(26) ≈ 4.7, so 8 * 4.7 ≈ 37.6 ≈ 38 bits (weak)
      expect(result).toBeLessThan(40);
    });

    test('moderate password (12 chars, mixed case + digits)', () => {
      const result = estimateEntropyBits(12, 62);
      // 71 bits (moderate)
      expect(result).toBeGreaterThan(60);
      expect(result).toBeLessThan(80);
    });

    test('strong password (16 chars, all character types)', () => {
      const result = estimateEntropyBits(16, 94);
      // Should be strong (> 100 bits typically)
      expect(result).toBeGreaterThan(95);
    });

    test('very strong password (32 chars, all character types)', () => {
      const result = estimateEntropyBits(32, 94);
      // Should be very strong (> 200 bits)
      expect(result).toBeGreaterThan(190);
    });
  });
});
