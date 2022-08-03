import getRefs from './refs';
import { calculatorState } from './app';

const { calcFirstNumber, calcSecondNumber, calculatorViewWrapper } = getRefs();
let {
  firstNumber,
  secondNumber,
  sign,
  result,
  accumulator,
} = calculatorState();

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
    //Prevent few 0
    if (firstNumber === '0' && evt.target.textContent === '0') {
      return;
    }
    if (firstNumber === '0' && evt.target.textContent !== '.') {
      firstNumber = '';
    }
    //Delete 0 from calcViev
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

    //Prevent few 0
    if (secondNumber === '0' && evt.target.textContent === '0') {
      return;
    }
    if (secondNumber === '0' && evt.target.textContent !== '.') {
      secondNumber = '';
    }
    if (
      evt.target.textContent === '.' &&
      calcSecondNumber.textContent.indexOf('.') >= 0
    ) {
      // Only one dot in calcView
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
export default handleClickNumbers;
