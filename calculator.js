let num1 = undefined;
let num2 = undefined;
let operator = undefined;

const ERROR_MSG = "ERROR";

//operation logic
function operate(num1, num2, operator) {
    switch (operator) {
        case 'sum':
            return num1 + num2;
            break;
        case 'min':
            return num1 - num2;
            break;
        case 'mul':
            return num1 * num2;
            break;
        case 'div':
            if (num2 == 0) {
                return ERROR_MSG;
            }
            return num1 / num2;
            break;
        default:
            return 0;
    }
}

let display_value = "0";
let display = document.querySelector("#screen_main");
let buttons = document.querySelectorAll("button");

//number buttons functionality
buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (Number.isInteger(parseInt(btn.textContent))) {
            if (display_value == '0') {
                display_value = ""; //to avoid trailing zeros
            }
            if (display_value.length < 10) { //check if fits into the display
                display_value += btn.textContent.toString();
                updateDisplay();
            }
        }
    });
});

//dot button
let dot_button = document.querySelector("#dot_button");
dot_button.addEventListener("click", () => {
    if (!display_value.includes('.')) { //if no dot already
        if (display_value.length < 10) { //check if fits into the display
            display_value += '.';
            updateDisplay();
        }
    }
});

//update display value
function updateDisplay() {
    if (display_value.length > 10) {
        //length of number before dot
        let full_part_length = Math.floor(parseFloat(display_value)).toString().length;
        let remaining_digits_for_decimal = Math.max(0, 10 - full_part_length);
        display_value = parseFloat(display_value).toFixed(remaining_digits_for_decimal).toString();
    }
    display.textContent = display_value;
}

//clear button
let clear_btn = document.querySelector("#clear_button");
clear_btn.addEventListener("click", () => {
    display_value = 0
    num1 = undefined;
    num2 = undefined;
    operator = undefined;
    updateDisplay();
})

//operator buttons
let operator_btns = document.querySelectorAll(".operator")

operator_btns.forEach((btn) => {
    btn.addEventListener("click", () => {
        performPendingOperation();
        switch (btn.id) {
            case "div_btn":
                operator = 'div';
                break;
            case "mul_btn":
                operator = 'mul';
                break;
            case "add_btn":
                operator = 'sum';
                break;
            case "min_btn":
                operator = 'min';
                break;
        }
        num1 = parseFloat(display_value);
        display_value = 0;
    });
});

function performPendingOperation () {
    if (operator != undefined) {
        //if calculation is pending then perform it before proceeding to next action
        num2 = parseFloat(display_value);
        display_value = operate(num1, num2, operator).toString();
        updateDisplay();

        num1 = undefined;
        num2 = undefined;
        operator = undefined;
    }
}

//equal button
let eq_btn = document.querySelector("#eq_btn");
eq_btn.addEventListener("click", () => {
    //only run calculation if operator and first operand has been selected
    if (num1 != undefined && operator != undefined) {

        //if '=' is pressed several times in a row - keep the current second operand
        //if '=' is pressed for the first time (num2 == undefined) - parse the second operand
        if (num2 == undefined) {
            num2 = parseFloat(display_value);
        }

        //perform calculation and update display
        display_value = operate(num1, num2, operator).toString();
        updateDisplay();

        //save the number on screen as num1 in case user will press '=' sign more times
        num1 = parseFloat(display_value);

        display_value = 0;
    }

});
