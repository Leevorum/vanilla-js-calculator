import getRefs from './refs';
import { calculatorState } from './app';
import parse from './parse';

const { calcFirstNumber, calcSecondNumber, calcSign } = getRefs();
let {
  firstNumber,
  secondNumber,
  sign,
  result,
  accumulator,
} = calculatorState();

export default function handleClickFunctions(evt) {
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
      if (Math.sign(parse(firstNumber)) === -1) {
        console.log('this');
        firstNumber = `(${(parse(firstNumber) * 1) / 100})`;
        calcFirstNumber.textContent = firstNumber;

        return;
      }
      calcFirstNumber.textContent = (parse(firstNumber) * 1) / 100;

      firstNumber = calcFirstNumber.textContent;
      return;
    } else {
      if (Math.sign(parse(secondNumber)) === -1) {
        console.log('this');
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
}
