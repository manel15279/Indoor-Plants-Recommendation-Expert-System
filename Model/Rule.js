class Rule {
    constructor(label, antecedents, consequent) {
        this.label = label;
        this.antecedents = antecedents;
        this.consequent = consequent;
        this.fired = false;
    }

    isTriggered() {
        for (let clause of this.antecedents) {
            if (!clause.isTrue()) {
                return false;
            }
        }
        return true;
    }

    fire() {
        this.consequent.getVariable().setValue(this.consequent.getValue());
        this.fired = true;
    }

    getLabel() {
        return this.label;
    }

    isFired() {
        return this.fired;
    }

    getNumberOfAntecedents() {
        return this.antecedents.length;
    }

    getAntecedentsString() {
        let clauses = [];
        for (let clause of this.antecedents) {
            clauses.push(clause.toString());
        }
        return clauses.join(" AND ");
    }

    getConsequentString() {
        return this.consequent.toString();
    }

    getFiredString() {
        return this.fired.toString();
    }
}

module.exports = Rule