import Decimal from 'decimal.js'

class DecimalNumberHelper {
  add(value1, value2) {
    return new Decimal(value1).add(value2)
  }

  subtract(value1, value2) {
    return new Decimal(value1).minus(value2)
  }

  multiply(value1, value2) {
    return new Decimal(value1).times(value2)
  }

  divide(value1, value2) {
    if (this.equals(value2, 0)) {
      throw new Error('Division by zero')
    }
    return new Decimal(value1).div(value2)
  }

  compare(value1, value2) {
    return new Decimal(value1).comparedTo(value2)    
  }

  equals(value1, value2) {
    return new Decimal(value1).equals(value2)
  }
}

export default DecimalNumberHelper