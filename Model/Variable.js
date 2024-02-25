
class Variable {
    constructor(name) {
      this.name = name;
      this.value = "";
    }
  
    getName() {
      return this.name;
    }
  
    getValue() {
      return this.value;
    }
  
    setValue(value) {
      this.value = value;
    }
}
  

module.exports = Variable 