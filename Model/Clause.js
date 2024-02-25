class Clause {
    constructor(variable, condition, value) {
      this.variable = variable;
      this.condition = condition;
      this.value = value;
    }
  
    isTrue() {
      console.log(this.variable)
      console.log(this.condition)
      console.log(this.value)
      return this.condition.test(this.variable.value, this.value);
    }
  
    getVariable() {
      return this.variable;
    }
  
    getValue() {
      return this.value;
    }
  
    toString() {
      return `${this.variable.getName()} ${this.condition.toString()} ${this.value}`;
    }
  }
  
  module.exports = Clause