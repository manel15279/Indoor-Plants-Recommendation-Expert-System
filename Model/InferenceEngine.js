class InferenceEngine {
    constructor(memory, knowledgeBase) {
      this.memory = memory;
      this.knowledgeBase = knowledgeBase;
    }
  
    forwardPass() {
      this.calculateConflictSet();
      if (this.getConflictSet().size == 0) {
        return null;
      }
      return this.selectRule();
    }
  
    calculateConflictSet() {
      this.conflictSet = new Set();
      for (let [name, value] of this.knowledgeBase) {
        if (!value.isFired() && value.isTriggered()) {
          this.conflictSet.add(name);
        }
      }
    }
  
    selectRule() {
      let max = 0;
      let selectedRule = null;
      for (let rule of this.getConflictSet()) {
        if (
          this.knowledgeBase[rule].getNumberOfAntecedents() > max
        ) {
          max = this.knowledgeBase[rule].getNumberOfAntecedents();
          selectedRule = rule;
        }
      }
      return selectedRule;
    }
  
    setMemory(memory) {
      this.memory = memory;
    }
  
    setKnowledgeBase(knowledgeBase) {
      this.knowledgeBase = knowledgeBase;
    }
  
    getMemory() {
      return this.memory;
    }
  
    getKnowledgeBase() {
      return this.knowledgeBase;
    }
  
    setConflictSet(conflictSet) {
      this.conflictSet = conflictSet;
    }
  
    getConflictSet() {
      return this.conflictSet;
    }
  }

module.exports = InferenceEngine