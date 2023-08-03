let buttons = document.querySelectorAll('button');
let numDisplay = document.getElementById("operand-display");
let opDisplay = document.getElementById("operator-indicator");

let currNum = numDisplay.textContent;
let operandOne = parseInt(currNum);
let operandTwo = null;
let currOperation = null;

buttons.forEach(button => {
    button.addEventListener("mousedown", function(e) {
        this.classList.add("clicked");
        run(button.value);
    });

    button.addEventListener("mouseup", function(e) {
        this.classList.remove("clicked");
    });
});

function run(cmd) {
    console.log(cmd);
    switch(cmd) {
        case "clr":
            numDisplay.textContent = "0";
            opDisplay.textContent = "";
            currOperation = null;
            currNum = "0";
        return;

        case "op_divide":
            opDisplay.textContent = currOperation = "/";
            //TODO: calculation implementation
        return;

        case "op_mult":
            opDisplay.textContent = currOperation = "*";
            //TODO: calculation implementation
        return;

        case "op_add":
            opDisplay.textContent = currOperation = "+";
            //TODO: calculation implementation
        return;

        case "op_sub":
            opDisplay.textContent = currOperation = "-";
            //TODO: calculation implementation
        return;

        case "solve":
            //TODO: calculation implementation
        return;

        default:
            displayNumbers(cmd);
    }
}

function displayNumbers(numStr) {
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

// operate(operandOne, currOperation, operandTwo)
function operate(num1, op, num2) {
    if(!num1 || !op || !num2)
        return "ERROR";

    num1 = parseInt(num1);
    num2 = parseInt(num2);

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