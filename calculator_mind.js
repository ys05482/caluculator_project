
let currentInput = "";
let previousInput = "";
let operator = "";


const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");


function updateDisplay() {
    display.innerText = currentInput || "0";
}


function handleNumber(value) {
    if (value === "." && currentInput.includes(".")) return;
    currentInput += value;
    updateDisplay();
}


function handleOperator(value) {
    if (currentInput === "") return;
    if (previousInput !== "") {
        calculate();
    }
    operator = value;
    previousInput = currentInput;
    currentInput = "";
}


function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            result = prev / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = "";
    previousInput = "";
    updateDisplay();
}


function clearCalculator() {
    currentInput = "";
    previousInput = "";
    operator = "";
    updateDisplay();
}


buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");

        if (button.classList.contains("operator")) {
            handleOperator(value);
        } else if (button.classList.contains("equal")) {
            calculate();
        } else if (button.classList.contains("clear")) {
            clearCalculator();
        } else {
            handleNumber(value);
        }
    });
});


updateDisplay();