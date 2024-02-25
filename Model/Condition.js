
class Condition {
    constructor(label) {
      this.label = label;
    }
  
    toString() {
      return this.label;
    }
  
    static fromString(label) {
      for (const condition of Object.keys(Condition)) {
        console.log("label : " + label + "condition : " + condition)
        if (Condition[condition] === label) {
          return condition;
        }
      }
      return null;
    }
  
    test(leftValue, rightValue) {
      try {
        const floatLeftValue = parseFloat(leftValue);
        const floatRightValue = parseFloat(rightValue);
  
        switch (this) {
          case Condition.EQUAL:
            return floatLeftValue === floatRightValue;
          case Condition.LESS:
            return floatLeftValue < floatRightValue;
          case Condition.GREAT:
            return floatLeftValue > floatRightValue;
          case Condition.NOT_EQUAL:
            return floatLeftValue !== floatRightValue;
          default:
            return false;
        }
      } catch (e) {
        switch (this) {
          case Condition.EQUAL:
            return leftValue === rightValue;
          case Condition.LESS:
            return leftValue.localeCompare(rightValue) < 0;
          case Condition.GREAT:
            return leftValue.localeCompare(rightValue) > 0;
          case Condition.NOT_EQUAL:
            return leftValue !== rightValue;
          default:
            return false;
        }
      }
    }
  }
  
  Condition.EQUAL = new Condition("=");
  Condition.LESS = new Condition("<");
  Condition.GREAT = new Condition(">");
  Condition.NOT_EQUAL = new Condition("!=");
  
  module.exports = Condition