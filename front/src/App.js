import React from 'react';
import { useState, useEffect } from 'react';

const App = () => {

    const [state,setState] = useState({
        "base" : {},
        "base name" : "base.json",
        "bases list" : [],
        "log" : []
    });

    useEffect(() => {
        const url = "http://localhost:5000/api/bases";

        fetch(url, {
            method : 'GET'
        })
        .then(response => response.json())
        .then(data => {
            setState(state => ({...state,...data}));
            console.log("data")
            console.log(data)
        })
        .catch(error => console.log(error));
    },[])

    const handleForward = () => {
        document.getElementById("forward-button").disabled = true;

        let request = {
            "base" : state["base name"],
            "memory" : []
        };

        state["base"]["variables"].forEach(variable => {
            const name = variable["name"];
            if(variable["name"]!=="Common Name" && variable["name"] !== "Name" && variable["name"]!== "Brightness"){


            const select = document.getElementById(name + "-select");
            const value = select.options[select.selectedIndex].value;
            request["memory"].push({
                "variable" : name,
                "value" : value
            });
        }
        else {
            request["memory"].push({
                "variable" : name,
                "value" : ""
            });
        }
        });

        const url = "http://localhost:5000/api/bases";
        console.log(request)
        fetch(url, {
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify(request)
        })
        .then(response => response.json())
        .then(data => {
            console.log("dataa")
            console.log(data)
            let new_base = state.base;
            new_base.memory = data.memory;
            setState({...state,
                log : data.log,
                base : new_base
            }, () => {
                document.getElementById("forward-button").disabled = false;
            });
        })
        .catch(error => console.log(error));
    }

    const handleBaseChange = () => {
        const select = document.getElementById("base-select");
        const selectedBase = select.options[select.selectedIndex].value
        if (selectedBase !== "") {
            const url = "/api/bases?base=" + selectedBase;

            fetch(url, {
                method : 'GET'
            })
            .then(response => response.json())
            .then(data => {
                data["base name"] = selectedBase;
                data["log"] = [];
                setState(...state,data);
            })
            .catch(error => console.log(error));
        }
    }

    return (
            <div className=" bg-transparent bg-opacity-10">
              <header class="p-3  text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
      <a href="/" class="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto text-dark text-decoration-none">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#218838" class="bi bi-flower1" viewBox="0 0 16 16">
  <path d="M6.174 1.184a2 2 0 0 1 3.652 0A2 2 0 0 1 12.99 3.01a2 2 0 0 1 1.826 3.164 2 2 0 0 1 0 3.652 2 2 0 0 1-1.826 3.164 2 2 0 0 1-3.164 1.826 2 2 0 0 1-3.652 0A2 2 0 0 1 3.01 12.99a2 2 0 0 1-1.826-3.164 2 2 0 0 1 0-3.652A2 2 0 0 1 3.01 3.01a2 2 0 0 1 3.164-1.826zM8 1a1 1 0 0 0-.998 1.03l.01.091c.012.077.029.176.054.296.049.241.122.542.213.887.182.688.428 1.513.676 2.314L8 5.762l.045-.144c.248-.8.494-1.626.676-2.314.091-.345.164-.646.213-.887a4.997 4.997 0 0 0 .064-.386L9 2a1 1 0 0 0-1-1zM2 9l.03-.002.091-.01a4.99 4.99 0 0 0 .296-.054c.241-.049.542-.122.887-.213a60.59 60.59 0 0 0 2.314-.676L5.762 8l-.144-.045a60.59 60.59 0 0 0-2.314-.676 16.705 16.705 0 0 0-.887-.213 4.99 4.99 0 0 0-.386-.064L2 7a1 1 0 1 0 0 2zm7 5-.002-.03a5.005 5.005 0 0 0-.064-.386 16.398 16.398 0 0 0-.213-.888 60.582 60.582 0 0 0-.676-2.314L8 10.238l-.045.144c-.248.8-.494 1.626-.676 2.314-.091.345-.164.646-.213.887a4.996 4.996 0 0 0-.064.386L7 14a1 1 0 1 0 2 0zm-5.696-2.134.025-.017a5.001 5.001 0 0 0 .303-.248c.184-.164.408-.377.661-.629A60.614 60.614 0 0 0 5.96 9.23l.103-.111-.147.033a60.88 60.88 0 0 0-2.343.572c-.344.093-.64.18-.874.258a5.063 5.063 0 0 0-.367.138l-.027.014a1 1 0 1 0 1 1.732zM4.5 14.062a1 1 0 0 0 1.366-.366l.014-.027c.01-.02.021-.048.036-.084a5.09 5.09 0 0 0 .102-.283c.078-.233.165-.53.258-.874a60.6 60.6 0 0 0 .572-2.343l.033-.147-.11.102a60.848 60.848 0 0 0-1.743 1.667 17.07 17.07 0 0 0-.629.66 5.06 5.06 0 0 0-.248.304l-.017.025a1 1 0 0 0 .366 1.366zm9.196-8.196a1 1 0 0 0-1-1.732l-.025.017a4.951 4.951 0 0 0-.303.248 16.69 16.69 0 0 0-.661.629A60.72 60.72 0 0 0 10.04 6.77l-.102.111.147-.033a60.6 60.6 0 0 0 2.342-.572c.345-.093.642-.18.875-.258a4.993 4.993 0 0 0 .367-.138.53.53 0 0 0 .027-.014zM11.5 1.938a1 1 0 0 0-1.366.366l-.014.027c-.01.02-.021.048-.036.084a5.09 5.09 0 0 0-.102.283c-.078.233-.165.53-.258.875a60.62 60.62 0 0 0-.572 2.342l-.033.147.11-.102a60.848 60.848 0 0 0 1.743-1.667c.252-.253.465-.477.629-.66a5.001 5.001 0 0 0 .248-.304l.017-.025a1 1 0 0 0-.366-1.366zM14 9a1 1 0 0 0 0-2l-.03.002a4.996 4.996 0 0 0-.386.064c-.242.049-.543.122-.888.213-.688.182-1.513.428-2.314.676L10.238 8l.144.045c.8.248 1.626.494 2.314.676.345.091.646.164.887.213a4.996 4.996 0 0 0 .386.064L14 9zM1.938 4.5a1 1 0 0 0 .393 1.38l.084.035c.072.03.166.064.283.103.233.078.53.165.874.258a60.88 60.88 0 0 0 2.343.572l.147.033-.103-.111a60.584 60.584 0 0 0-1.666-1.742 16.705 16.705 0 0 0-.66-.629 4.996 4.996 0 0 0-.304-.248l-.025-.017a1 1 0 0 0-1.366.366zm2.196-1.196.017.025a4.996 4.996 0 0 0 .248.303c.164.184.377.408.629.661A60.597 60.597 0 0 0 6.77 5.96l.111.102-.033-.147a60.602 60.602 0 0 0-.572-2.342c-.093-.345-.18-.642-.258-.875a5.006 5.006 0 0 0-.138-.367l-.014-.027a1 1 0 1 0-1.732 1zm9.928 8.196a1 1 0 0 0-.366-1.366l-.027-.014a5 5 0 0 0-.367-.138c-.233-.078-.53-.165-.875-.258a60.619 60.619 0 0 0-2.342-.572l-.147-.033.102.111a60.73 60.73 0 0 0 1.667 1.742c.253.252.477.465.66.629a4.946 4.946 0 0 0 .304.248l.025.017a1 1 0 0 0 1.366-.366zm-3.928 2.196a1 1 0 0 0 1.732-1l-.017-.025a5.065 5.065 0 0 0-.248-.303 16.705 16.705 0 0 0-.629-.661A60.462 60.462 0 0 0 9.23 10.04l-.111-.102.033.147a60.6 60.6 0 0 0 .572 2.342c.093.345.18.642.258.875a4.985 4.985 0 0 0 .138.367.575.575 0 0 0 .014.027zM8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
</svg>
        <span class="fs-4" style={{ marginLeft: 15, fontSize: '12px'}}>Indoor Plants Expert System</span>
      </a>
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" class="nav-link px-2 text-secondary">Home</a></li>
          <li><a href="#" class="nav-link px-2 text-secondary">Features</a></li>
          <li><a href="#" class="nav-link px-2 text-secondary">FAQs</a></li>
          <li><a href="#" class="nav-link px-2 text-secondary">About</a></li>
        </ul>

        <div class="text-end">
          <button type="button" class="btn btn-outline-success me-2" style={{ borderRadius: '40px', width: '90px' }}>Login</button>
          <button type="button" className="btn btn-success" style={{ borderRadius: '40px', width: '90px', background:'#218838' }}>Sign-up</button>
        </div>
      </div>
    </div>
  </header>
                <div className="container">
                <div className="row">
                    <div className="col">
                        <div  className="row d-flex justify-content-center align-items-center" >
                                <div className="mt-4 mb-3">
                                <Variables variables={state.base["variables"]} memory={state.base["memory"]} /> 
                                </div>
                            </div>
                            <div className="bg-transparent bg-opacity-25 rounded-3 p-2 my-2">
                                <Controls basesList={state["bases list"]}
                                    onForward={handleForward}
                                    onBaseChange={handleBaseChange} />
                            </div>
                        <div className="col">
                            <div className="bg-transparent bg-opacity-25 rounded-3 my-2">
                                <Log log={state.log} result = {state.base.memory && state.base.memory[1].value != 'toxic' ? state.base.memory[1].value : 'no deductions yet'}/>
                            </div>
                        </div>
                        <div className="col">
                            <div className="bg-transparent bg-opacity-25 rounded-3 p-2 my-2">
                                <KnowledgeBase rules={state.base["knowledge base"]} />
                            </div>
                        </div>
                        
                    </div>
                </div>
                </div>
            </div>
        );
    }


const Controls = (props) => {
    const handleForward = () => {
        props.onForward()
    } 
    const handleBaseChange = () => {
        props.onBaseChange()
    }
    if (props.basesList) {
            return (
                <div>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-success icon-button" style={{ borderRadius: '40px', width: 'auto', background:'#218838'}} id="forward-button" onClick={handleForward}>
                        <svg className="icon" style={{marginRight: '5px'}} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#FFFFFF" class="bi bi-flower1" viewBox="0 0 16 16">
                            <path d="M6.174 1.184a2 2 0 0 1 3.652 0A2 2 0 0 1 12.99 3.01a2 2 0 0 1 1.826 3.164 2 2 0 0 1 0 3.652 2 2 0 0 1-1.826 3.164 2 2 0 0 1-3.164 1.826 2 2 0 0 1-3.652 0A2 2 0 0 1 3.01 12.99a2 2 0 0 1-1.826-3.164 2 2 0 0 1 0-3.652A2 2 0 0 1 3.01 3.01a2 2 0 0 1 3.164-1.826zM8 1a1 1 0 0 0-.998 1.03l.01.091c.012.077.029.176.054.296.049.241.122.542.213.887.182.688.428 1.513.676 2.314L8 5.762l.045-.144c.248-.8.494-1.626.676-2.314.091-.345.164-.646.213-.887a4.997 4.997 0 0 0 .064-.386L9 2a1 1 0 0 0-1-1zM2 9l.03-.002.091-.01a4.99 4.99 0 0 0 .296-.054c.241-.049.542-.122.887-.213a60.59 60.59 0 0 0 2.314-.676L5.762 8l-.144-.045a60.59 60.59 0 0 0-2.314-.676 16.705 16.705 0 0 0-.887-.213 4.99 4.99 0 0 0-.386-.064L2 7a1 1 0 1 0 0 2zm7 5-.002-.03a5.005 5.005 0 0 0-.064-.386 16.398 16.398 0 0 0-.213-.888 60.582 60.582 0 0 0-.676-2.314L8 10.238l-.045.144c-.248.8-.494 1.626-.676 2.314-.091.345-.164.646-.213.887a4.996 4.996 0 0 0-.064.386L7 14a1 1 0 1 0 2 0zm-5.696-2.134.025-.017a5.001 5.001 0 0 0 .303-.248c.184-.164.408-.377.661-.629A60.614 60.614 0 0 0 5.96 9.23l.103-.111-.147.033a60.88 60.88 0 0 0-2.343.572c-.344.093-.64.18-.874.258a5.063 5.063 0 0 0-.367.138l-.027.014a1 1 0 1 0 1 1.732zM4.5 14.062a1 1 0 0 0 1.366-.366l.014-.027c.01-.02.021-.048.036-.084a5.09 5.09 0 0 0 .102-.283c.078-.233.165-.53.258-.874a60.6 60.6 0 0 0 .572-2.343l.033-.147-.11.102a60.848 60.848 0 0 0-1.743 1.667 17.07 17.07 0 0 0-.629.66 5.06 5.06 0 0 0-.248.304l-.017.025a1 1 0 0 0 .366 1.366zm9.196-8.196a1 1 0 0 0-1-1.732l-.025.017a4.951 4.951 0 0 0-.303.248 16.69 16.69 0 0 0-.661.629A60.72 60.72 0 0 0 10.04 6.77l-.102.111.147-.033a60.6 60.6 0 0 0 2.342-.572c.345-.093.642-.18.875-.258a4.993 4.993 0 0 0 .367-.138.53.53 0 0 0 .027-.014zM11.5 1.938a1 1 0 0 0-1.366.366l-.014.027c-.01.02-.021.048-.036.084a5.09 5.09 0 0 0-.102.283c-.078.233-.165.53-.258.875a60.62 60.62 0 0 0-.572 2.342l-.033.147.11-.102a60.848 60.848 0 0 0 1.743-1.667c.252-.253.465-.477.629-.66a5.001 5.001 0 0 0 .248-.304l.017-.025a1 1 0 0 0-.366-1.366zM14 9a1 1 0 0 0 0-2l-.03.002a4.996 4.996 0 0 0-.386.064c-.242.049-.543.122-.888.213-.688.182-1.513.428-2.314.676L10.238 8l.144.045c.8.248 1.626.494 2.314.676.345.091.646.164.887.213a4.996 4.996 0 0 0 .386.064L14 9zM1.938 4.5a1 1 0 0 0 .393 1.38l.084.035c.072.03.166.064.283.103.233.078.53.165.874.258a60.88 60.88 0 0 0 2.343.572l.147.033-.103-.111a60.584 60.584 0 0 0-1.666-1.742 16.705 16.705 0 0 0-.66-.629 4.996 4.996 0 0 0-.304-.248l-.025-.017a1 1 0 0 0-1.366.366zm2.196-1.196.017.025a4.996 4.996 0 0 0 .248.303c.164.184.377.408.629.661A60.597 60.597 0 0 0 6.77 5.96l.111.102-.033-.147a60.602 60.602 0 0 0-.572-2.342c-.093-.345-.18-.642-.258-.875a5.006 5.006 0 0 0-.138-.367l-.014-.027a1 1 0 1 0-1.732 1zm9.928 8.196a1 1 0 0 0-.366-1.366l-.027-.014a5 5 0 0 0-.367-.138c-.233-.078-.53-.165-.875-.258a60.619 60.619 0 0 0-2.342-.572l-.147-.033.102.111a60.73 60.73 0 0 0 1.667 1.742c.253.252.477.465.66.629a4.946 4.946 0 0 0 .304.248l.025.017a1 1 0 0 0 1.366-.366zm-3.928 2.196a1 1 0 0 0 1.732-1l-.017-.025a5.065 5.065 0 0 0-.248-.303 16.705 16.705 0 0 0-.629-.661A60.462 60.462 0 0 0 9.23 10.04l-.111-.102.033.147a60.6 60.6 0 0 0 .572 2.342c.093.345.18.642.258.875a4.985 4.985 0 0 0 .138.367.575.575 0 0 0 .014.027zM8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                        </svg>
                        <span className="text">Search</span>
                        </button>
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }

}


const Log = (props) => {

    let log = null;
    let placeholder = (<tr><td colSpan={3}>No results</td></tr>);
    if (props.log && props.log.length > 0) {
        let stepId = 0;
        log = props.log.map(step => {
            stepId = stepId + 1;
            if (step["type"] === "target found") {
                /*return (
                    <tr>
                        <td>{stepId}</td>
                        <td colSpan={2}>Target variable found</td>
                    </tr>
                );*/
            } else if (step["type"] === "no rule") {
                return (
                    <tr>
                        <td>{stepId}</td>
                        <td colSpan={2}>None applicable rules!</td>
                    </tr>
                );
            } else if (step["type"] === "step") {
                return (
                    <tr>
                        <td>{step["selected rule"]}</td>
                    </tr>
                );
            } else {
                return (
                    <tr></tr>
                );
            }
            
        });
    }
    return (
        <div>
            <div className="row mb-4">
            <h2 className="py-2 d-flex justify-content-center">Result: </h2>
            <div class="d-flex justify-content-center">
                <div>
                    { props.result }
                </div>
            </div>
            </div>
        </div>
    );
}


const Variables = (props) => {
    if (props.variables) {
        const memory = groupBy(props.memory, "variable", "value");

        const variablesInputs = props.variables.map((variable) => {         
            const name = variable["name"];
            const values = variable["values"];
            if(variable["name"]!=="Common Name" && variable["name"] !== "Name" && variable["name"]!== "Brightness"){
            return (
                <div>
                    <VariableInput name={name} values={values} selected={memory[name]}/>
                </div>
            );
    }
});
        return (
            <div>
                <h2>Variables</h2>
                
                <div style={{display:"grid", gridTemplateColumns:"auto auto auto"}}>
                    {variablesInputs}
                </div>
            </div>
        );
    } else {
        return (
            <div>
            </div>
        );
    }
}


const VariableInput = (props) => {
    if (props.values) {
        const options = props.values.map((value) => {
            return (
                <option value={value} selected={props.selected === value}>{value}</option>
            );
        });
        return (
            <div className="col">
            <div className="form-floating" style={{ width: '250px', margin: '25px'}}>
                {props.hidden==="hidden" ?
                <select className="form-select " style={{boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px', borderRadius: '40px', paddingLeft: '25px', border:'2px solid #218838ff'}} id={props.name + "-select"} aria-label="Floating label select example" hidden>
                    <option value=""></option>
                    {options}
                </select> :                 <select className="form-select " style={{boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px', borderRadius: '40px', paddingLeft: '25px', border:'2px solid #218838ff'}} id={props.name + "-select"} aria-label="Floating label select example">
                    <option value=""></option>
                    {options}
                </select>
                }
                <label htmlFor={props.name + "-select"} style={{ marginLeft: '12px'}}>{props.name}</label>
            </div>
            </div>
            
        );
    } else {
        return (
            <fieldset>
            </fieldset>
        );
    }
}

const KnowledgeBase = (props) => {
    let rules = null;
    if (props.rules) {
        rules = props.rules.map((rule) => {
            const label = rule["label"];
            const antecedents = rule["antecedents"].map((clause) => {
                return Object.values(clause).join(" ");
            }).join(" AND ");
            const consequent = Object.values(rule["consequent"]).join(" ");

            return (
                <tr>
                    <td>{label}</td>
                    <td>IF {antecedents} THEN {consequent}</td>
                </tr>
            );
        });
    }
    return (
        <div>
            <h2>Rules</h2>
            <table className="table table-bordered table-responsive align-middle">
                <thead className="table-light">
                    <tr>
                        <th>Label</th>
                        <th>Rule</th>
                    </tr>
                </thead>
                <tbody>
                    {props.rules ? rules : "No rules!"}
                </tbody>
            </table>
        </div>
    );
}

function groupBy(list, key, value) {
    const map = {};
    list.forEach((item) => {
        const k = item[key];
        const v = item[value];
        map[k] = v;
    });
    return map;
}

export default App;