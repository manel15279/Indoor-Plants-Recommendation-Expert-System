const express = require('express');
const app = express();
const cors = require('cors')
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const JSONParser = require('json-parse-async');

const InferenceEngine = require('./Model/InferenceEngine');
const Variable = require('./Model/Variable');
const Rule = require('./Model/Rule');
const Condition = require('./Model/Condition')
const Clause = require('./Model/Clause')
app.use(cors())
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

let fired = new Map()
let memory
    /*
      let variables = new Map();
      let memory = new Map();
      let knowledgeBase = new Map();
      let targetVariable;
      let inferenceEngine;
      */

app.get('/api/bases', async(req, res) => {
    console.log('tethered')
    try {
        const baseFileName = req.query.base || 'base.json';
        const filePath = path.join(__dirname, '/bases', baseFileName);
        const baseJSON = await fs.promises.readFile(filePath, 'utf8');
        const basesFileNames = await fs.promises.readdir(path.join(__dirname, '/bases'));
        const base = JSON.parse(baseJSON);
        const responseJSON = baseToJson(baseJSON, basesFileNames);
        res.status(200).send({ "bases list": ["base.json"], base });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/bases', async(req, res) => {
    console.log("fethered")
    try {
        const baseFileName = req.body["base"]
        let memoryJSON = req.body["memory"]
        console.log(memoryJSON)
        let vars = new Map()
        let mem = new Map()
        let KB = new Map()
        let memory = new Map()
        const resourcePath = path.join(__dirname, 'bases/' + baseFileName);
        const baseJSON = await fs.promises.readFile(resourcePath, 'utf8');

        const base = JSON.parse(baseJSON);
        let targetVariable = base["target"];

        let variables = base["variables"];

        let knowledgeBase = base["knowledge base"]
            //console.log(knowledgeBase)
        memoryJSON.forEach((elm) => {
            memory.set(elm.variable, elm)
        })


        let log = '[';
        fired = new Map()
        selectedRule = 'selectedRule'
        let cpt = 0
        while (true) {
            console.log("targetVariable : " + targetVariable)
            console.log(memory.get(targetVariable))
            if (memory.get(targetVariable).value != "" && cpt != 0) {
                log += '{"type" : "target found"}';
                break;
            } else if (selectedRule == null) {
                log += '{"type" : "no rule"}';
                break;
            } else {
                cpt++
                let { conflictSet, selectedRule } = infer(knowledgeBase, fired, memory)
                let result = ''
                let i = 0;
                const confSetIterator = conflictSet.values()
                while (i < conflictSet.size - 1) {
                    result += confSetIterator.next().value.label + ', ';
                    i++;
                }
                result += confSetIterator.next().value.label

                log += `{"type" : "step", "conflict set" : "${result}", "selected rule" : "${selectedRule.label}"},`;
                // let {conflictSet,selectedRule} = infer(knowledgeBase,fired,memoryJSON)
            }
        }

        log += ']';
        let finalValues = '[';

        for (const [key, value] of memory.entries()) {
            finalValues += `{"variable":"${value.variable}","value":"${value.value}"},`;
        }
        finalValues = finalValues.slice(0, -1) + ']';

        const responseJSON = `{"log":${log},"memory":${finalValues}}`;
        console.log(responseJSON)
        res.status(200).send(responseJSON);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
    /*try {
      const baseFileName = req.body["base"];
      const memoryJSON = req.body["memory"];
      let vars = new Map();
      let mem = new Map();
      let KB = new Map();
      await jsonToExpertSystem(path.join('/bases', baseFileName), memoryJSON, mem, vars, KB);
      let inferenceEngine = new InferenceEngine(mem, KB);

      let log = '[';

      let selectedRule = inferenceEngine.forwardPass();
      while (true) {
        if (mem.get(targetVariable)!==('')) {
          log += '{"type" : "target found"}';
          break;
        } else if (selectedRule == null) {
          log += '{"type" : "no rule"}';
          break;
        } else {
          log += `{"type" : "step", "conflict set" : "${inferenceEngine.getConflictSet().join(', ')}", "selected rule" : "${selectedRule}"},`;
          KB.get(selectedRule).fire();
        }

        selectedRule = inferenceEngine.forwardPass();
      }

      log += ']';
      let finalValues = '[';

      for (const [key, value] of mem.entries()) {
        finalValues += `{"variable":"${key}","value":"${value}"},`;
      }
      finalValues = finalValues.slice(0, -1) + ']';

      const responseJSON = `{"log":${log},"memory":${finalValues}}`;
      res.status(200).send(responseJSON);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } */
});

function infer(knowledgeBase, fired, memory) {
    let conflictSet = new Map()
    knowledgeBase.forEach((rule) => {
        //conflictSet = new Map()
        if (!fired.get(rule.label)) {
            let ants = rule.antecedents
            let nb = 0
            memory.forEach((key, value, map) => {
                if (key.value != '') {
                    ants.forEach((elm) => {
                        if (elm["variable"] == key.variable && elm["value"] == key.value) {
                            nb++;
                        }
                    })
                }
            })
            if (nb == ants.length) conflictSet.set(rule.label, rule)
        }
    })
    let max = 0;
    let selectedRule = null;
    for (let rule of conflictSet) {
        //  console.log(rule)
        if (
            rule[1].antecedents.length > max
        ) {
            max = rule[1].antecedents.length;
            selectedRule = rule[1];
        }
    }
    if (selectedRule != null) {
        fired.set(selectedRule.label, selectedRule)
        memory.set(selectedRule["consequent"]["variable"], { variable: selectedRule["consequent"]["variable"], value: selectedRule["consequent"]["value"] })
    }
    return { conflictSet, selectedRule }

}
async function jsonToExpertSystem(baseFile, memory, mem, vars, KB) {

    const resourcePath = path.join(__dirname, baseFile);
    const baseJSON = await fs.promises.readFile(resourcePath, 'utf8');

    const base = JSON.parse(baseJSON);

    targetVariable = base["target"];

    variables = base["variables"];

    for (const variable of variables) {
        const name = variable.name;
        const values = variable.values;

        mem.set(name, new Variable(name));
        vars.set(name, values);
    }

    for (const valuation of memory) {
        const variable = valuation.variable;
        const value = valuation.value;
        mem.set(variable, mem.get(variable).value = value);
    }

    const knowledgeBase = base["knowledge base"];
    for (const rule of knowledgeBase) {
        const label = rule.label;
        const antecedentsJSON = rule.antecedents;
        const consequentJSON = rule.consequent;

        const antecedents = [];
        for (const antecedentJSON of antecedentsJSON) {
            antecedents.push(objectToClause(antecedentJSON, memory));
        }

        const consequent = objectToClause(consequentJSON, memory);

        KB.set(label, new Rule(label, antecedents, consequent));
    }
}

function objectToClause(object, memory) {
    const variable = object.variable;
    const condition = object.condition;
    const value = object.value;
    console.log("mem[variable] + " + memory[variable])
    return new Clause(memory[variable], condition, value);
}

function baseToJson(base, basesFileNames) {
    let list = "";
    for (let i = 0; i < basesFileNames.length; ++i) {
        list += `"${basesFileNames[i]}"`;
        if (i < basesFileNames.length - 1) {
            list += ",";
        }
    }

    return `{
      "base": ${JSON.stringify(base)},
      "bases list": [${list}]
    }`;
}


const port = 5000

app.listen(5000, () => console.log('listening in port ' + port))