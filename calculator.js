let buttons = document.querySelectorAll('button');
let numDisplay = document.getElementById("operand-display");
let opDisplay = document.getElementById("operator-indicator");

let currNum = numDisplay.textContent;
let currOperation = null;

let numArr = [];

buttons.forEach(button => {
    button.addEventListener("mousedown", function(e) {
        this.classList.add("clicked");
        run(button.value);
    });

    button.addEventListener("mouseup", function(e) {
        this.classList.remove("clicked");
        console.log(numArr);
        console.log(`currNum: ${currNum}`);
        console.log(`currOperation: ${currOperation}`);
        console.log("=====");
    });
});

function run(cmd) {
    switch(cmd) {
        case "clr":
            numDisplay.textContent = "0";
            opDisplay.textContent = "";
            currOperation = null;
            currNum = "0";
            numArr = [];
        return;

        case "op_divide":
            runOperation();
            opDisplay.textContent = currOperation = "/";
        return;

        case "op_mult":
            runOperation();
            opDisplay.textContent = currOperation = "*";
        return;

        case "op_add":
            runOperation();
            opDisplay.textContent = currOperation = "+";
        return;

        case "op_sub":
            runOperation();
            opDisplay.textContent = currOperation = "-";
        return;

        case "dec":
            currNum = currNum + ".";
            numDisplay.textContent = currNum;
            return;

        case "solve":
            opDisplay.textContent = "";
            runOperation(true);
            currOperation = null;
        return;
    }

    displayNumbers(cmd);
}

function displayNumbers(numStr) {
    numDisplay.textContent = currNum;

    if(currNum.length === 1 && currNum[0] === '0') {
        currNum = (numStr === "sign") ? currNum : numStr;
    } else if(numStr === "sign") {
        if(currNum[0] === '-')
            currNum = currNum.slice(1);
        else
            currNum = "-" + currNum;
    } else {
        currNum = currNum.concat(numStr);
    }

    numDisplay.textContent = currNum;
}

function runOperation(returnSolution=false) {
    numArr.push(currNum);
    currNum = "";

    if(numArr.length >= 2) {
        while(numArr.length !== 1) {
            let operand1 = numArr.shift();
            let operand2 = numArr.shift();
    
            operand1 = operand1.toString();
            operand2 = operand2.toString();
            let solution = operate(operand1, currOperation, operand2);
            numArr.unshift(solution.toString());

            if(numArr.length === 1)
                break;
        }
    } 
    
    if(numArr.length === 2 && returnSolution) {
        let operand1 = numArr.shift();
        let operand2 = numArr.shift();
        currNum = operate(operand1, currOperation, operand2);
        currNum = currNum.toString();
        numDisplay.textContent = currNum;
    } else if(numArr.length === 1 && returnSolution) {
        currNum = numArr.pop().toString();
        numDisplay.textContent = currNum;
    }
}

function operate(num1, op, num2) {
    if(!num1 || !op || !num2)
        return "ERROR";

    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch(op) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num1 / num2;
        default:
            return "ERROR";
    }
}