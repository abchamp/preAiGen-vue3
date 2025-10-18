import { describe, it, expect, beforeEach } from 'vitest'
import DecimalHelper from '../../../utils/decimal_number_helper.js'

describe('DecimalNumberHelper', () => {
  let decimalHelper

  beforeEach(() => {
    decimalHelper = new DecimalHelper()
  })

  describe('add', () => {
    it('should add two decimal numbers correctly', () => {
      const result = decimalHelper.add(0.1, 0.2)

      expect(result.toString()).toBe('0.3')
    })

    it('should handle whole numbers', () => {
      const result = decimalHelper.add(5, 3)

      expect(result.toString()).toBe('8')
    })

    it('should handle string inputs', () => {
      const result = decimalHelper.add('10.5', '5.5')

      expect(result.toString()).toBe('16')
    })

    it('should handle negative numbers', () => {
      const result = decimalHelper.add(-5, 3)

      expect(result.toString()).toBe('-2')
    })

    it('should handle zero addition', () => {
      const result = decimalHelper.add(100, 0)

      expect(result.toString()).toBe('100')
    })

    it('should handle large decimal places', () => {
      const result = decimalHelper.add('0.123456789', '0.987654321')

      expect(result.toString()).toBe('1.11111111')
    })
  })

  describe('subtract', () => {
    it('should subtract two decimal numbers correctly', () => {
      const result = decimalHelper.subtract(0.3, 0.1)

      expect(result.toString()).toBe('0.2')
    })

    it('should handle whole numbers', () => {
      const result = decimalHelper.subtract(10, 3)

      expect(result.toString()).toBe('7')
    })

    it('should handle string inputs', () => {
      const result = decimalHelper.subtract('20.5', '5.5')

      expect(result.toString()).toBe('15')
    })

    it('should handle negative results', () => {
      const result = decimalHelper.subtract(5, 10)

      expect(result.toString()).toBe('-5')
    })

    it('should handle subtracting zero', () => {
      const result = decimalHelper.subtract(100, 0)

      expect(result.toString()).toBe('100')
    })

    it('should handle negative numbers', () => {
      const result = decimalHelper.subtract(-5, 3)

      expect(result.toString()).toBe('-8')
    })
  })

  describe('multiply', () => {
    it('should multiply two decimal numbers correctly', () => {
      const result = decimalHelper.multiply(0.1, 0.2)

      expect(result.toString()).toBe('0.02')
    })

    it('should handle whole numbers', () => {
      const result = decimalHelper.multiply(5, 3)

      expect(result.toString()).toBe('15')
    })

    it('should handle string inputs', () => {
      const result = decimalHelper.multiply('2.5', '4')

      expect(result.toString()).toBe('10')
    })

    it('should handle multiplication by zero', () => {
      const result = decimalHelper.multiply(100, 0)

      expect(result.toString()).toBe('0')
    })

    it('should handle multiplication by one', () => {
      const result = decimalHelper.multiply(100, 1)

      expect(result.toString()).toBe('100')
    })

    it('should handle negative numbers', () => {
      const result = decimalHelper.multiply(-5, 3)

      expect(result.toString()).toBe('-15')
    })

    it('should handle two negative numbers', () => {
      const result = decimalHelper.multiply(-5, -3)

      expect(result.toString()).toBe('15')
    })
  })

  describe('divide', () => {
    it('should divide two decimal numbers correctly', () => {
      const result = decimalHelper.divide(0.6, 0.2)

      expect(result.toString()).toBe('3')
    })

    it('should handle whole numbers', () => {
      const result = decimalHelper.divide(15, 3)

      expect(result.toString()).toBe('5')
    })

    it('should handle string inputs', () => {
      const result = decimalHelper.divide('10', '2.5')

      expect(result.toString()).toBe('4')
    })

    it('should handle division resulting in decimals', () => {
      const result = decimalHelper.divide(1, 3)

      expect(result.toString()).toContain('0.333333')
    })

    it('should handle division by one', () => {
      const result = decimalHelper.divide(100, 1)

      expect(result.toString()).toBe('100')
    })

    it('should handle negative numbers', () => {
      const result = decimalHelper.divide(-10, 2)

      expect(result.toString()).toBe('-5')
    })

    it('should throw error when dividing by zero', () => {
      expect(() => {
        decimalHelper.divide(10, 0)
      }).toThrow()
    })
  })

  describe('compare', () => {
    it('should return 1 when first value is greater', () => {
      const result = decimalHelper.compare(10, 5)

      expect(result).toBe(1)
    })

    it('should return -1 when first value is smaller', () => {
      const result = decimalHelper.compare(5, 10)

      expect(result).toBe(-1)
    })

    it('should return 0 when values are equal', () => {
      const result = decimalHelper.compare(10, 10)

      expect(result).toBe(0)
    })

    it('should handle decimal comparisons', () => {
      const result = decimalHelper.compare(0.1, 0.2)

      expect(result).toBe(-1)
    })

    it('should handle string inputs', () => {
      const result = decimalHelper.compare('10.5', '5.5')

      expect(result).toBe(1)
    })

    it('should handle negative numbers', () => {
      const result = decimalHelper.compare(-5, -10)

      expect(result).toBe(1)
    })

    it('should compare very close decimal values correctly', () => {
      const result = decimalHelper.compare('0.1000000001', '0.1')

      expect(result).toBe(1)
    })
  })

  describe('equals', () => {
    it('should return true for equal whole numbers', () => {
      const result = decimalHelper.equals(10, 10)

      expect(result).toBe(true)
    })

    it('should return false for different whole numbers', () => {
      const result = decimalHelper.equals(10, 5)

      expect(result).toBe(false)
    })

    it('should return true for equal decimal numbers', () => {
      const result = decimalHelper.equals(0.1, 0.1)

      expect(result).toBe(true)
    })

    it('should handle string inputs', () => {
      const result = decimalHelper.equals('10.5', '10.5')

      expect(result).toBe(true)
    })

    it('should handle mixed types (number and string)', () => {
      const result = decimalHelper.equals(10, '10')

      expect(result).toBe(true)
    })

    it('should return true for zero in different forms', () => {
      const result = decimalHelper.equals(0, '0.0')

      expect(result).toBe(true)
    })

    it('should handle negative numbers', () => {
      const result = decimalHelper.equals(-5, -5)

      expect(result).toBe(true)
    })

    it('should return false for very close but different values', () => {
      const result = decimalHelper.equals('0.1000000001', '0.1')

      expect(result).toBe(false)
    })
  })

  describe('Integration tests', () => {
    it('should handle complex calculations', () => {
      // (10 + 5) * 2 / 3 = 10
      const step1 = decimalHelper.add(10, 5)
      const step2 = decimalHelper.multiply(step1, 2)
      const result = decimalHelper.divide(step2, 3)

      expect(result.toString()).toBe('10')
    })

    it('should maintain precision in chain operations', () => {
      const step1 = decimalHelper.add('0.1', '0.2')
      const step2 = decimalHelper.multiply(step1, 10)
      const result = decimalHelper.equals(step2, 3)

      expect(result).toBe(true)
    })

    it('should handle comparison after arithmetic operations', () => {
      const value1 = decimalHelper.add(0.1, 0.2)
      const value2 = decimalHelper.subtract(0.5, 0.2)
      const result = decimalHelper.equals(value1, value2)

      expect(result).toBe(true)
    })
  })
})
