const numberButtons = document.querySelectorAll("button.num");
const operationButtons = document.querySelectorAll(".operation");
const allClearButton = document.querySelector("#all-clear");
const negationButton = document.querySelector("#negation");
const deleteButton = document.querySelector("#delete");
const equalsButton = document.querySelector("#equals");
// The bigger portion of the screen where the current input or final answer is didsplayed
const currentOperandText = document.querySelector("#operand");
// the smaller portion of the screen here the previous operation is displays
const prevOperationText = document.querySelector("#prev-operation");
let currentOperand;
let operation;

// FUNCTIONS
// updateScreen is used to update the screen accordingly when the AC or DEL button is pressed
const updateScreen = (stringContent = "") => {
  currentOperandText.textContent = stringContent || "";
  prevOperationText.textContent = "";
  currentOperation = undefined;
  currentOperand = undefined;
};

// getCurrentOperand gets the current operand we are working with
const getCurrentOperand = () => {
  currentOperand = operationsMap[operation](Number(currentOperand), Number(currentOperandText.textContent));
  if (String(currentOperand).length > 7) {
    return currentOperand.toExponential(7);
  }
  return currentOperand;
}

// operationsMap is an object that stores operations with their corresponding functions
const operationsMap = {
  '+': (x, y) => { return x + y },
  '-': (x, y) => { return x - y },
  'x': (x, y) => { return x * y },
  '÷': (x, y) => { return x / y }
};

// BUTTON EVENTS
// Event listener for all numbers
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (currentOperandText.textContent.length <= 12) {
      // The if statement below dissallows the user to put use the decimal point twice
      if (button.textContent === "." && currentOperandText.textContent.includes(".")) return;
      console.log(typeof currentOperandText.textContent);
      currentOperandText.textContent = currentOperandText.textContent + button.textContent;
    } else {
      alert("you can't input more than 12 digits");
    }
  });
});

// operationButtons sets an event listener for all operation buttons
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Check if an operation is on already
    if (!currentOperand) {
      currentOperand = Number(currentOperandText.textContent.replace(/,/g, ''));
      prevOperationText.textContent = currentOperand.toLocaleString() + " " + button.textContent;
      operation = button.textContent;
    } else {
      // Disallows the effect of pressing the operation buttons twice consecutively (which would have set the currentOperand to 0)
      if (!currentOperandText.textContent) return;
      getCurrentOperand()
      prevOperationText.textContent = currentOperand.toLocaleString() + " " + button.textContent;
      operation = prevOperationText.textContent.slice(-1); // get the latest operation
    }
    currentOperandText.textContent = "";
  });
});

allClearButton.addEventListener('click', () => {
  updateScreen();
});

negationButton.addEventListener('click', () => {
  // Check if the number on screen is already negative, then change to positive else, change to negative
  if (currentOperandText.textContent.includes("-")) {
    currentOperandText.textContent = currentOperandText.textContent.slice(1);
    return;
  }
  currentOperandText.textContent = "-" + currentOperandText.textContent;
});

deleteButton.addEventListener('click', () => {
  currentOperandText.textContent = currentOperandText.textContent.slice(0, -1);
});

equalsButton.addEventListener('click', () => {
  // The condition here stops the equals button from running twice by making sure the prevOperation div contains something
  if (prevOperationText.textContent) updateScreen(getCurrentOperand().toLocaleString());
});
