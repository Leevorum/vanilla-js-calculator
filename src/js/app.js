import getRefs from './refs';

const {
  calculator,
  container,
  calculatorNumbers,
  calculatorFunctions,
  calcFirstNumber,
  calcSecondNumber,
  calcSign,
  calculatorViewWrapper,
} = getRefs();

let firstNumber = '';
let secondNumber = '';
let sign = '';
let result = '';
let accumulator = '';

export default function app() {
  calculatorNumbers.addEventListener('click', handleClickNumbers);
  calculatorFunctions.addEventListener('click', handleCkickFunctions);
}

function parse(str) {
  return Function(` return (${str})`)();
}

const handleClickNumbers = evt => {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }

  if (firstNumber.length + secondNumber.length + result.length > 10) {
    console.log('maxlenth limit!!!');
    console.log(firstNumber.length + secondNumber.length + result.length);
    calculatorViewWrapper.classList.add('large-font');
  }
  if (firstNumber.length + secondNumber.length + result.length > 20) {
    console.log('maxlenth limit!!!');
    console.log(firstNumber.length + secondNumber.length + result.length);
    calculatorViewWrapper.classList.add('medium-font');
    calculatorViewWrapper.classList.remove('large-font');
  }
  if (firstNumber.length + secondNumber.length + result.length > 28) {
    console.log('maxlenth limit!!!');
    console.log(firstNumber.length + secondNumber.length + result.length);
    calculatorViewWrapper.classList.add('small-font');
    calculatorViewWrapper.classList.remove('medium-font');
  }

  // Clear result after Math for new values.
  if (result !== '' && sign === '') {
    clearAll();
  }
  //Set first number if second number and sign are empty
  if (secondNumber === '' && sign === '') {
    //Delete 0 from calcViev
    if (firstNumber === '0' && evt.target.textContent === '0') {
      return;
    }
    if (firstNumber === '') {
      calcFirstNumber.textContent = '';
    }

    if (
      evt.target.textContent === '.' &&
      calcFirstNumber.textContent.indexOf('.') >= 0
    ) {
      // Only one dot in calcView
      return;
    }
    //Set First number
    firstNumber += evt.target.textContent;
    calcFirstNumber.textContent += evt.target.textContent;
  } else {
    //Set second number
    // Only one dot in calcView
    if (secondNumber === '0' && evt.target.textContent === '0') {
      return;
    }
    if (
      evt.target.textContent === '.' &&
      calcSecondNumber.textContent.indexOf('.') >= 0
    ) {
      return;
    }
    secondNumber += evt.target.textContent;
    calcSecondNumber.textContent += evt.target.textContent;
    if (accumulator !== '') {
      accumulator += sign;
      accumulator += secondNumber;
    }
  }
};

const handleCkickFunctions = evt => {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }

  // Function +-/
  if (evt.target.textContent === '+/-') {
    if (firstNumber !== '' && secondNumber !== '') {
      console.log(firstNumber);
      if (Math.sign(secondNumber) === -1) {
        secondNumber = String(Math.abs(secondNumber));
        calcSecondNumber.textContent = secondNumber;

        return;
      } else {
        secondNumber = `(${String(-secondNumber)})`;
        calcSecondNumber.textContent = secondNumber;

        return;
      }
    }
    if (Math.sign(firstNumber) === -1) {
      firstNumber = String(Math.abs(firstNumber));
      calcFirstNumber.textContent = firstNumber;
    } else {
      firstNumber = `(${String(-firstNumber)})`;
      calcFirstNumber.textContent = firstNumber;
    }
    return;
  }
  // Percents in numbers
  if (evt.target.textContent === '%') {
    if (firstNumber !== '' && secondNumber === '') {
      // console.log((parse(firstNumber) * 1) / 100);
      // calcFirstNumber.textContent = (Number(firstNumber) * 1) / 100;
      if (Math.sign(parse(firstNumber)) === -1) {
        console.log('this');
        firstNumber = `(${(parse(firstNumber) * 1) / 100})`;
        calcFirstNumber.textContent = firstNumber;
        // result = calcFirstNumber.textContent;
        return;
      }
      calcFirstNumber.textContent = (parse(firstNumber) * 1) / 100;
      // result = calcFirstNumber.textContent;
      firstNumber = calcFirstNumber.textContent;
      return;
    } else {
      if (Math.sign(parse(secondNumber)) === -1) {
        console.log('this');
        secondNumber = `(${(parse(secondNumber) * 1) / 100})`;
        calcSecondNumber.textContent = secondNumber;
        // result = calcSecondNumber.textContent;
        return;
      }
      // calcSecondNumber.textContent = (Number(secondNumber) * 1) / 100;
      calcSecondNumber.textContent = (parse(secondNumber) * 1) / 100;
      // result = calcSecondNumber.textContent;
      secondNumber = calcSecondNumber.textContent;
      return;
    }
  }

  // Set sign
  if (
    evt.target.textContent !== '=' &&
    evt.target.textContent !== 'AC' &&
    evt.target.textContent !== '+/-'
  ) {
    //Concat string for multiple math operations
    if (firstNumber !== '' && secondNumber !== '' && sign !== '') {
      accumulator = firstNumber + sign + secondNumber;
      firstNumber = firstNumber + sign + secondNumber;

      secondNumber = '';
      calcFirstNumber.textContent = firstNumber;
      calcSecondNumber.textContent = '';
    }
    sign = evt.target.textContent;
    calcSign.textContent = sign;
    return;
  }

  // AC button
  if (evt.target.textContent === 'AC') {
    clearAll();
    calcSign.textContent = '0';
  }

  //Math;
  if (evt.target.textContent === '=') {
    console.log(parse('12.23 * 96.3'));
    if (secondNumber === '') secondNumber = firstNumber;
    if (firstNumber === '') firstNumber = '0';

    if (accumulator !== '') {
      result = parse(accumulator);
      if (!Number.isInteger(result)) {
        result = result.toFixed(5);
      }
      calcFirstNumber.textContent = result;
      firstNumber = calcFirstNumber.textContent;
      accumulator = calcFirstNumber.textContent;
      secondNumber = '';
      calcSecondNumber.textContent = '';
      sign = '';
      calcSign.textContent = '';

      return;
    } else {
      result = parse(firstNumber + sign + secondNumber);
      if (!Number.isInteger(result)) {
        result = result.toFixed(5);
      }
      calcFirstNumber.textContent = result;
      firstNumber = calcFirstNumber.textContent;
      accumulator = calcFirstNumber.textContent;
      secondNumber = '';
      calcSecondNumber.textContent = '';
      sign = '';
      calcSign.textContent = '';
    }
  }

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
  accumulator = '';
  calcFirstNumber.textContent = '0';
  calcSecondNumber.textContent = '';
  calcSign.textContent = '';
  calculatorViewWrapper.classList.remove('large-font');
  calculatorViewWrapper.classList.remove('medium-font');
  calculatorViewWrapper.classList.remove('small-font');
};

// Make the DIV element draggable:
dragElement(container);

function dragElement(elmnt) {
  let pos1 = 0;
  let pos2 = 0;
  let pos3 = 0;
  let pos4 = 0;
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
