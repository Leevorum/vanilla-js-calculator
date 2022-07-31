import getRefs from './refs';

const {
  calculator,
  container,
  calculatorNumbers,
  calculatorFunctions,
  calcFirstNumber,
  calcSecondNumber,
  calcSign,
} = getRefs();

let firstNumber = '';
let secondNumber = '';
let sign = '';
let result = '';

export default function app() {
  calculatorNumbers.addEventListener('click', handleClickNumbers);
  calculatorFunctions.addEventListener('click', handleCkickFunctions);
}

const handleClickNumbers = evt => {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }

  //Only one dot in calcView
  if (
    evt.target.textContent === '.' &&
    calcFirstNumber.textContent.indexOf('.') >= 0 &&
    calcSecondNumber.textContent.indexOf('.') >= 0
  ) {
    return;
  }
  //Clear result after Math for new values.
  if (result !== '') {
    clearAll();
  }
  //Set first number if second number and sign are empty
  if (secondNumber === '' && sign === '') {
    //Delete 0 from calcViev
    if (firstNumber === '') {
      calcFirstNumber.textContent = '';
    }
    //Set First number
    firstNumber += evt.target.textContent;
    calcFirstNumber.textContent += evt.target.textContent;
  } else {
    //Set second number
    secondNumber += evt.target.textContent;
    calcSecondNumber.textContent += evt.target.textContent;
  }
};

const handleCkickFunctions = evt => {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }

  //Function +-/
  if (evt.target.textContent === '+/-') {
    if (Math.sign(firstNumber) === -1) {
      firstNumber = Math.abs(firstNumber);
      calcFirstNumber.textContent = firstNumber;
      calcSign.textContent = '';
    } else {
      firstNumber = -firstNumber;
      calcFirstNumber.textContent = firstNumber;
      calcSign.textContent = '';
    }
    return;
  }
  //Set sign
  if (evt.target.textContent !== '=' && evt.target.textContent !== 'AC') {
    sign = evt.target.textContent;
    calcSign.textContent = sign;
    return;
  }

  //AC button
  if (evt.target.textContent === 'AC') {
    clearAll();
    calcSign.textContent = '0';
  }

  //Math
  if (evt.target.textContent === '=') {
    if (secondNumber === '') secondNumber = firstNumber;
    if (firstNumber === '') firstNumber = '0';
    switch (sign) {
      case '+':
        calcFirstNumber.textContent =
          Number(firstNumber) + Number(secondNumber);
        result = calcFirstNumber.textContent;
        break;
      case '-':
        calcFirstNumber.textContent =
          Number(firstNumber) - Number(secondNumber);
        result = calcFirstNumber.textContent;
        break;

      case '*':
        calcFirstNumber.textContent =
          Number(firstNumber) * Number(secondNumber);
        result = calcFirstNumber.textContent;
        break;
      case '%':
        calcFirstNumber.textContent =
          (Number(firstNumber) * Number(secondNumber)) / 100;
        result = calcFirstNumber.textContent;
        break;
      case '/':
        //Prevent js Infinity, when divide by zero.
        if (secondNumber === '0') {
          calcFirstNumber.textContent = 'Error';
          return;
        }
        calcFirstNumber.textContent =
          Number(firstNumber) / Number(secondNumber);
        result = calcFirstNumber.textContent;
        break;

      default:
        console.log('Sorry, we are no support this functions');
    }
  }
  console.log(result);
  secondNumber = '';
  calcSecondNumber.textContent = '';
  sign = '';
  calcSign.textContent = '';
};

//Clear function
const clearAll = () => {
  firstNumber = '';
  secondNumber = '';
  sign = '';
  result = '';
  calcFirstNumber.textContent = '0';
  calcSecondNumber.textContent = '';
  calcSign.textContent = '';
};

// Make the DIV element draggable:
dragElement(container);

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (calculator) {
    // if present, the header is where you move the DIV from:
    calculator.onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    calculator.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
    elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
