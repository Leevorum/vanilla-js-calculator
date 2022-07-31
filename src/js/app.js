import getRefs from './refs';

const {
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
