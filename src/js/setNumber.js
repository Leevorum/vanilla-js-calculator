import getRefs, { calcState } from './refs';

const { calcFirstNumber, calcSecondNumber } = getRefs();

export default function setNumber(evt) {
  if (calcState.secondNumber === '' && calcState.sign === '') {
    if (calcState.firstNumber === '' && evt === '.') {
      calcState.firstNumber = '0.';
    }

    //Delete 0 from calcViev
    if (calcState.firstNumber === '0' && evt !== '.') {
      calcState.firstNumber = '';
    }

    if (calcState.firstNumber === '') {
      calcFirstNumber.textContent = '';
    }

    //Prevent few 0
    if (calcState.firstNumber === '0' && evt === '0') {
      return;
    }

    if (evt === '.' && calcFirstNumber.textContent.indexOf('.') >= 0) {
      // Only one dot in calcView
      return;
    }

    //Set First number
    calcState.firstNumber += evt;
    calcFirstNumber.textContent += evt;
  } else {
    //Set second number
    if (calcState.secondNumber === '0' && evt !== '.') {
      calcState.secondNumber = evt;

      calcSecondNumber.textContent = calcState.secondNumber;
      return;
    }

    if (calcState.secondNumber === '' && evt === '.') {
      calcState.secondNumber = '0.';

      calcSecondNumber.textContent += calcState.secondNumber;
      return;
    }

    //Prevent few 0
    if (calcState.secondNumber === '0' && evt === '0') {
      return;
    }

    if (evt === '.' && calcSecondNumber.textContent.indexOf('.') >= 0) {
      // Only one dot in calcView
      return;
    }

    calcState.secondNumber += evt;
    calcSecondNumber.textContent += evt;

    if (calcState.accumulator !== '') {
      calcState.accumulator += calcState.sign;
      calcState.accumulator += calcState.secondNumber;
    }
  }
}
