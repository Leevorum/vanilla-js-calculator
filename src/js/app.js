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
const numbersArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const functionsArray = ['Clear', 'Enter', '=', '/', '*', '-', '+', '%'];

let firstNumber = '';
let secondNumber = '';
let sign = '';
let result = '';
let accumulator = '';

export default function app() {
  calculatorNumbers.addEventListener('click', handleClickNumbers);
  calculatorFunctions.addEventListener('click', handleClickFunctions);
  document.addEventListener('keydown', handleKeyboardNubmers);
  document.addEventListener('keydown', handleKeyBoardFunctions);
  document.addEventListener('keyup', hanldeKeyUp);
}

function parse(str) {
  return Function(` return (${str})`)();
}

const handleClickNumbers = evt => {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }
  const trimEvt = evt.target.textContent.trim();

  if (firstNumber.length + secondNumber.length + result.length > 10) {
    calculatorViewWrapper.classList.add('large-font');
  }
  if (firstNumber.length + secondNumber.length + result.length > 20) {
    calculatorViewWrapper.classList.add('medium-font');
    calculatorViewWrapper.classList.remove('large-font');
  }
  if (firstNumber.length + secondNumber.length + result.length > 28) {
    calculatorViewWrapper.classList.add('small-font');
    calculatorViewWrapper.classList.remove('medium-font');
  }
  // Clear result after Math for new values.
  if (result !== '' && sign === '') {
    clearAll();
  }
  //Set first number if second number and sign are empty
  if (secondNumber === '' && sign === '') {
    //Prevent few 0
    if (firstNumber === '0' && trimEvt === '0') {
      return;
    }
    if (firstNumber === '0' && trimEvt !== '.') {
      firstNumber = '';
    }
    //Delete 0 from calcViev
    if (firstNumber === '') {
      calcFirstNumber.textContent = '';
    }

    if (trimEvt === '.' && calcFirstNumber.textContent.indexOf('.') >= 0) {
      // Only one dot in calcView
      return;
    }
    //Set First number
    firstNumber += trimEvt;
    calcFirstNumber.textContent += trimEvt;
  } else {
    //Set second number

    //Prevent few 0
    if (secondNumber === '0' && trimEvt === '0') {
      return;
    }
    if (secondNumber === '0' && trimEvt !== '.') {
      secondNumber = '';
    }
    if (trimEvt === '.' && calcSecondNumber.textContent.indexOf('.') >= 0) {
      // Only one dot in calcView
      return;
    }
    secondNumber += trimEvt;
    calcSecondNumber.textContent += trimEvt;
    if (accumulator !== '') {
      accumulator += sign;
      accumulator += secondNumber;
    }
  }
};

const handleClickFunctions = evt => {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }

  const trimEvt = evt.target.textContent.trim();

  // Function +-/
  if (trimEvt === '+/-') {
    if (firstNumber !== '' && secondNumber !== '') {
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
  if (trimEvt === '%') {
    if (firstNumber !== '' && secondNumber === '') {
      if (Math.sign(parse(firstNumber)) === -1) {
        firstNumber = `(${(parse(firstNumber) * 1) / 100})`;
        calcFirstNumber.textContent = firstNumber;

        return;
      }
      calcFirstNumber.textContent = (parse(firstNumber) * 1) / 100;

      firstNumber = calcFirstNumber.textContent;
      return;
    } else {
      if (Math.sign(parse(secondNumber)) === -1) {
        secondNumber = `(${(parse(secondNumber) * 1) / 100})`;
        calcSecondNumber.textContent = secondNumber;

        return;
      }

      calcSecondNumber.textContent = (parse(secondNumber) * 1) / 100;

      secondNumber = calcSecondNumber.textContent;
      return;
    }
  }

  // Set sign
  if (trimEvt !== '=' && trimEvt !== 'AC' && trimEvt !== '+/-') {
    //Concat string for multiple math operations
    if (firstNumber !== '' && secondNumber !== '' && sign !== '') {
      accumulator = firstNumber + sign + secondNumber;
      firstNumber = firstNumber + sign + secondNumber;

      secondNumber = '';
      calcFirstNumber.textContent = firstNumber;
      calcSecondNumber.textContent = '';
    }
    sign = trimEvt;
    calcSign.textContent = sign;
    return;
  }

  // AC button
  if (trimEvt === 'AC') {
    clearAll();
    calcSign.textContent = '0';
  }
  if (
    ((firstNumber === '' || firstNumber === '0') &&
      sign !== '' &&
      secondNumber === '') ||
    (firstNumber !== '' && sign === '' && secondNumber === '')
  ) {
    return;
  }
  //Math;
  if (trimEvt === '=') {
    if (secondNumber === '') secondNumber = firstNumber;
    if (firstNumber === '') firstNumber = '0';

    if (accumulator !== '') {
      result = parse(accumulator);
      if (result === Infinity) {
        result = 'Error';
        calcFirstNumber.textContent = result;
        firstNumber = '0';
        accumulator = '';
        secondNumber = '';
        calcSecondNumber.textContent = '';
        sign = '';
        calcSign.textContent = '';
        return;
      }
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
      if (result === Infinity) {
        result = 'Error';
        calcFirstNumber.textContent = result;
        firstNumber = '0';
        accumulator = '';
        secondNumber = '';
        calcSecondNumber.textContent = '';
        sign = '';
        calcSign.textContent = '';
        return;
      }
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

const handleKeyboardNubmers = evt => {
  if (numbersArray.includes(evt.key)) {
    if (document.querySelector(`[data-action="${evt.key}"]`)) {
      document
        .querySelector(`[data-action="${evt.key}"]`)
        .classList.add('btn-active');
    }
    if (firstNumber.length + secondNumber.length + result.length > 10) {
      calculatorViewWrapper.classList.add('large-font');
    }
    if (firstNumber.length + secondNumber.length + result.length > 20) {
      calculatorViewWrapper.classList.add('medium-font');
      calculatorViewWrapper.classList.remove('large-font');
    }
    if (firstNumber.length + secondNumber.length + result.length > 28) {
      calculatorViewWrapper.classList.add('small-font');
      calculatorViewWrapper.classList.remove('medium-font');
    }
    // Clear resul
    // Clear result after Math for new values.
    if (result !== '' && sign === '') {
      clearAll();
    }
    //Set first number if second number and sign are empty
    if (secondNumber === '' && sign === '') {
      //Prevent few 0
      if (firstNumber === '0' && evt.key === '0') {
        return;
      }
      if (firstNumber === '0' && evt.key !== '.') {
        firstNumber = '';
      }
      //Delete 0 from calcViev
      if (firstNumber === '') {
        calcFirstNumber.textContent = '';
      }

      if (evt.key === '.' && calcFirstNumber.textContent.indexOf('.') >= 0) {
        // Only one dot in calcView
        return;
      }
      //Set First number
      firstNumber += evt.key;
      calcFirstNumber.textContent += evt.key;
    } else {
      //Set second number

      //Prevent few 0
      if (secondNumber === '0' && evt.key === '0') {
        return;
      }
      if (secondNumber === '0' && evt.key !== '.') {
        secondNumber = '';
      }
      if (evt.key === '.' && calcSecondNumber.textContent.indexOf('.') >= 0) {
        // Only one dot in calcView
        return;
      }
      secondNumber += evt.key;
      calcSecondNumber.textContent += evt.key;
      if (accumulator !== '') {
        accumulator += sign;
        accumulator += secondNumber;
      }
    }
  }
};

const handleKeyBoardFunctions = evt => {
  if (functionsArray.includes(evt.key)) {
    if (evt.key === 'Enter') {
      document.querySelector(`[data-action="="]`).classList.add('btn-active');
      return;
    }
    document
      .querySelector(`[data-action="${evt.key}"]`)
      .classList.add('btn-active');

    // Percents in numbers
    if (evt.key === '%') {
      if (firstNumber !== '' && secondNumber === '') {
        if (Math.sign(parse(firstNumber)) === -1) {
          firstNumber = `(${(parse(firstNumber) * 1) / 100})`;
          calcFirstNumber.textContent = firstNumber;

          return;
        }
        calcFirstNumber.textContent = (parse(firstNumber) * 1) / 100;

        firstNumber = calcFirstNumber.textContent;
        return;
      } else {
        if (Math.sign(parse(secondNumber)) === -1) {
          secondNumber = `(${(parse(secondNumber) * 1) / 100})`;
          calcSecondNumber.textContent = secondNumber;

          return;
        }

        calcSecondNumber.textContent = (parse(secondNumber) * 1) / 100;

        secondNumber = calcSecondNumber.textContent;
        return;
      }
    }

    // Set sign
    if (evt.key !== '=' && evt.key !== 'Clear' && evt.key !== 'Enter') {
      //Concat string for multiple math operations
      if (firstNumber !== '' && secondNumber !== '' && sign !== '') {
        accumulator = firstNumber + sign + secondNumber;
        firstNumber = firstNumber + sign + secondNumber;

        secondNumber = '';
        calcFirstNumber.textContent = firstNumber;
        calcSecondNumber.textContent = '';
      }
      sign = evt.key;
      calcSign.textContent = sign;
      return;
    }

    // AC button
    if (evt.key === 'Clear') {
      clearAll();
    }
    if (
      ((firstNumber === '' || firstNumber === '0') &&
        sign !== '' &&
        secondNumber === '') ||
      (firstNumber !== '' && sign === '' && secondNumber === '')
    ) {
      return;
    }
    //Math;
    if (evt.key === '=' || evt.key === 'Enter') {
      if (secondNumber === '') secondNumber = firstNumber;
      if (firstNumber === '') firstNumber = '0';

      if (accumulator !== '') {
        result = parse(accumulator);
        if (result === Infinity) {
          result = 'Error';
          calcFirstNumber.textContent = result;
          firstNumber = '0';
          accumulator = '';
          secondNumber = '';
          calcSecondNumber.textContent = '';
          sign = '';
          calcSign.textContent = '';
          return;
        }
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
        if (result === Infinity) {
          result = 'Error';
          calcFirstNumber.textContent = result;
          firstNumber = '0';
          accumulator = '';
          secondNumber = '';
          calcSecondNumber.textContent = '';
          sign = '';
          calcSign.textContent = '';
          return;
        }
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
  }
};

const hanldeKeyUp = evt => {
  if (evt.key === 'Enter') {
    document.querySelector(`[data-action="="]`).classList.remove('btn-active');
    return;
  }
  document
    .querySelector(`[data-action="${evt.key}"]`)
    .classList.remove('btn-active');
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
