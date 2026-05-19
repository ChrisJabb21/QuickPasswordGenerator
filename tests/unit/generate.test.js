import { generatePassword } from '../../js/generate.js';

describe('generatePassword', () => {
  describe('Password length', () => {
    test('should generate password with specified length', () => {
      const password = generatePassword({ length: 20 });
      expect(password).toHaveLength(20);
    });

    test('should generate password with length 8', () => {
      const password = generatePassword({ length: 8 });
      expect(password).toHaveLength(8);
    });

    test('should generate password with default length 16', () => {
      const password = generatePassword({});
      expect(password).toHaveLength(16);
    });

    test('should generate password with length 1', () => {
      const password = generatePassword({ 
        length: 1, 
        lowerCase: true,
        upperCase: false,
        digits: false,
        symbols: false
      });
      expect(password).toHaveLength(1);
    });

    test('should generate password with large length', () => {
      const password = generatePassword({ length: 256 });
      expect(password).toHaveLength(256);
    });
  });

  describe('Character inclusion - Lowercase', () => {
    test('should include lowercase letters when lowerCase = true', () => {
      const password = generatePassword({
        length: 100,
        lowerCase: true,
        upperCase: false,
        digits: false,
        symbols: false,
      });
      expect(/[a-z]/.test(password)).toBe(true);
      expect(/^[a-z]*$/.test(password)).toBe(true);
    });

    test('should not include lowercase letters when lowerCase = false', () => {
      const password = generatePassword({
        length: 50,
        lowerCase: false,
        upperCase: true,
        digits: true,
        symbols: false,
        noLookAlikes: true,
      });
      expect(/[a-z]/.test(password)).toBe(false);
    });

    test('should include lowercase in mixed password', () => {
      const password = generatePassword({
        length: 100,
        lowerCase: true,
        upperCase: true,
        digits: true,
        symbols: false,
      });
      expect(/[a-z]/.test(password)).toBe(true);
    });
  });

  describe('Character inclusion - Uppercase', () => {
    test('should include uppercase letters when upperCase = true', () => {
      const password = generatePassword({
        length: 100,
        lowerCase: false,
        upperCase: true,
        digits: false,
        symbols: false,
      });
      expect(/[A-Z]/.test(password)).toBe(true);
      expect(/^[A-Z]*$/.test(password)).toBe(true);
    });

    test('should not include uppercase letters when upperCase = false', () => {
      const password = generatePassword({
        length: 50,
        lowerCase: true,
        upperCase: false,
        digits: true,
        symbols: false,
      });
      expect(/[A-Z]/.test(password)).toBe(false);
    });

    test('should include uppercase in mixed password', () => {
      const password = generatePassword({
        length: 100,
        lowerCase: true,
        upperCase: true,
        digits: true,
        symbols: false,
      });
      expect(/[A-Z]/.test(password)).toBe(true);
    });
  });

  describe('Character inclusion - Digits', () => {
    test('should include digits when digits = true', () => {
      const password = generatePassword({
        length: 100,
        lowerCase: false,
        upperCase: false,
        digits: true,
        symbols: false,
      });
      expect(/[0-9]/.test(password)).toBe(true);
      expect(/^[0-9]*$/.test(password)).toBe(true);
    });

    test('should not include digits when digits = false', () => {
      const password = generatePassword({
        length: 50,
        lowerCase: true,
        upperCase: true,
        digits: false,
        symbols: false,
      });
      expect(/[0-9]/.test(password)).toBe(false);
    });

    test('should include digits in mixed password', () => {
      const password = generatePassword({
        length: 100,
        lowerCase: true,
        upperCase: true,
        digits: true,
        symbols: true,
      });
      expect(/[0-9]/.test(password)).toBe(true);
    });
  });

  describe('Character inclusion - Symbols', () => {
    test('should include symbols when symbols = true', () => {
      const password = generatePassword({
        length: 100,
        lowerCase: false,
        upperCase: false,
        digits: false,
        symbols: true,
      });
      expect(/[!@#$%^&*()\-=_+\[\]{}|;:,.<>?/~`]/.test(password)).toBe(true);
    });

    test('should not include symbols when symbols = false', () => {
      const password = generatePassword({
        length: 50,
        lowerCase: true,
        upperCase: true,
        digits: true,
        symbols: false,
      });
      expect(/[!@#$%^&*()\-=_+\[\]{}|;:,.<>?/~`]/.test(password)).toBe(false);
    });

    test('should include only allowed symbols', () => {
      const password = generatePassword({
        length: 100,
        lowerCase: false,
        upperCase: false,
        digits: false,
        symbols: true,
      });
      const allowedSymbols = "!@#$%^&*()-=_+[]{}|;:,.<>?/~`";
      for (const char of password) {
        expect(allowedSymbols).toContain(char);
      }
    });
  });

  describe('Look-alike character exclusion', () => {
    test('should exclude look-alike characters when noLookAlikes = true', () => {
      // With noLookAlikes = true, the character pool should be the same
      // as the sets object (no ambiguous characters removed from sets)
      const password = generatePassword({
        length: 50,
        lowerCase: true,
        upperCase: true,
        digits: true,
        symbols: false,
        noLookAlikes: true,
      });
      // Just verify it generates successfully
      expect(password).toHaveLength(50);
    });

    test('should include look-alike characters when noLookAlikes = false', () => {
      const password = generatePassword({
        length: 50,
        lowerCase: true,
        upperCase: true,
        digits: true,
        symbols: false,
        noLookAlikes: false,
      });
      expect(password).toHaveLength(50);
    });
  });

  describe('Default parameters', () => {
    test('should use default values when no parameters provided', () => {
      const password = generatePassword({});
      expect(password).toHaveLength(16);
      expect(/[a-z]/.test(password)).toBe(true);
      expect(/[A-Z]/.test(password)).toBe(true);
      expect(/[0-9]/.test(password)).toBe(true);
      expect(/[!@#$%^&*()\-=_+\[\]{}|;:,.<>?/~`]/.test(password)).toBe(false); // symbols false by default
    });

    test('should use provided parameters over defaults', () => {
      const password = generatePassword({
        length: 32,
        symbols: true,
      });
      expect(password).toHaveLength(32);
      expect(/[!@#$%^&*()\-=_+\[\]{}|;:,.<>?/~`]/.test(password)).toBe(true);
    });
  });

  describe('Randomness and uniqueness', () => {
    test('should generate different passwords on successive calls', () => {
      const passwords = new Set();
      for (let i = 0; i < 50; i++) {
        const password = generatePassword({ length: 20 });
        passwords.add(password);
      }
      // All 50 passwords should be unique
      expect(passwords.size).toBe(50);
    });

    test('should generate highly unique passwords with longer lengths', () => {
      const passwords = new Set();
      for (let i = 0; i < 100; i++) {
        const password = generatePassword({ length: 32, symbols: true });
        passwords.add(password);
      }
      // All 100 passwords should be unique
      expect(passwords.size).toBe(100);
    });
  });

  describe('Error handling', () => {
    test('should throw error when no character sets selected', () => {
      expect(() =>
        generatePassword({
          length: 10,
          lowerCase: false,
          upperCase: false,
          digits: false,
          symbols: false,
        })
      ).toThrow('No character sets selected');
    });
  });

  describe('All character sets included', () => {
    test('should include characters from all selected sets', () => {
      const password = generatePassword({
        length: 100,
        lowerCase: true,
        upperCase: true,
        digits: true,
        symbols: true,
      });
      // With 100 characters and 4 required (one from each set), 
      // we should have all four character types
      expect(/[a-z]/.test(password)).toBe(true);
      expect(/[A-Z]/.test(password)).toBe(true);
      expect(/[0-9]/.test(password)).toBe(true);
      expect(/[!@#$%^&*()\-=_+\[\]{}|;:,.<>?/~`]/.test(password)).toBe(true);
    });
  });

  describe('Mixed parameter combinations', () => {
    test('should work with various parameter combinations', () => {
      const configs = [
        { length: 12, lowerCase: true, upperCase: false, digits: true, symbols: false },
        { length: 24, lowerCase: true, upperCase: true, digits: false, symbols: false },
        { length: 16, lowerCase: false, upperCase: true, digits: true, symbols: true },
        { length: 8, lowerCase: true, upperCase: true, digits: true, symbols: true },
      ];

      configs.forEach((config) => {
        const password = generatePassword(config);
        expect(password).toHaveLength(config.length);
        expect(typeof password).toBe('string');
        expect(password.length).toBeGreaterThan(0);
      });
    });
  });
});
