const calculator = document.querySelector('#calculator');

const numbers = document.querySelectorAll('[data-number]');
const operations = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equal]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-allclear]');

const currentNumber = document.querySelector('#current-number');
const previousNumber = document.querySelector('#previous-number');
let operation = undefined;

// Operations
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        alert("If you try to divide by 0, your device is going to explode. :)");
        allClear();
        Event.preventDefault();
        return;
    }
    return a / b;
}

// Append a number to screen (output) text
function appendNumber(number) {
    if(number === '.' && currentNumber.innerText.toString().includes('.')) return;
    if(number === '.' && currentNumber.innerText === '')
        currentNumber.innerText = '0';
    currentNumber.innerText += number;
}

// All-clear function
function allClear() {
    currentNumber.innerText = '';
    previousNumber.innerText = '';
    operation = undefined;
}

// Calculate function (returns the result of an operation)
function calculate(operation) {
    if(previousNumber.innerText === "") return;
    let result;
    switch (operation) {
        case "+":
            result = add(parseFloat(previousNumber.innerText), parseFloat(currentNumber.innerText));
            break;
        case "-":
            result = subtract(parseFloat(previousNumber.innerText), parseFloat(currentNumber.innerText));
            break;
        case "*":
            result = multiply(parseFloat(previousNumber.innerText), parseFloat(currentNumber.innerText));
            break;
        case "/":
            result = divide(parseFloat(previousNumber.innerText), parseFloat(currentNumber.innerText));
            break;
        default:
            return;
    }
    previousNumber.innerText = '';
    currentNumber.innerText = result;
    operation = undefined;
}

// Operate function
function operate(buttonText) {
    if (previousNumber.innerText !== '')
        calculate(operation);

    if (currentNumber.innerText === '')
        currentNumber.innerText = '0';

    operation = buttonText;
    previousNumber.innerText = `${currentNumber.innerText} ${operation}`;
    currentNumber.innerText = '';
}

// Numbers button click handler
numbers.forEach((number) => {
    number.addEventListener('click', (e) => {
        appendNumber(e.target.innerText);
    });
});

// All-clear button click handler
allClearButton.addEventListener('click', () => {
    allClear();
});

// Operation buttons click handler
operations.forEach((buttonOperation) => {
    buttonOperation.addEventListener('click', (e) => {
        buttonText = e.target.innerText;
        operate(buttonText);
    });
});

// Equal button click handler
equalButton.addEventListener('click', () => {
    if(operation == undefined) return;
    calculate(operation);
});

// Delete button click handler
deleteButton.addEventListener('click', () => {
    currentNumber.innerText = currentNumber.innerText.slice(0, -1);
});