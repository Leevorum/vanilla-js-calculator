import getRefs, { calcState } from './refs';
import parse from './parse';
import clearAll from './cleaAll';

const { calcFirstNumber, calcSecondNumber, calcSign } = getRefs();

function handleClickFunctions(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }

  const trimEvt = evt.target.textContent.trim();

  // Function +-/
  if (trimEvt === '+/-') {
    if (calcState.firstNumber !== '' && calcState.secondNumber !== '') {
      if (Math.calcState.sign(parse(calcState.secondNumber)) === -1) {
        calcState.secondNumber = String(
          Math.abs(parse(calcState.secondNumber))
        );
        calcSecondNumber.textContent = calcState.secondNumber;

        return;
      } else {
        calcState.secondNumber = `(${String(-calcState.secondNumber)})`;
        calcSecondNumber.textContent = calcState.secondNumber;

        return;
      }
    }
    if (Math.calcState.sign(parse(calcState.firstNumber)) === -1) {
      calcState.firstNumber = String(Math.abs(parse(calcState.firstNumber)));
      calcFirstNumber.textContent = calcState.firstNumber;
    } else {
      calcState.firstNumber = `(${String(-calcState.firstNumber)})`;
      calcFirstNumber.textContent = calcState.firstNumber;
    }
    return;
  }

  // Percents in numbers
  if (trimEvt === '%') {
    if (calcState.firstNumber !== '' && calcState.secondNumber === '') {
      if (Math.calcState.sign(parse(calcState.firstNumber)) === -1) {
        calcState.firstNumber = `(${(parse(calcState.firstNumber) * 1) / 100})`;
        calcFirstNumber.textContent = calcState.firstNumber;

        return;
      }
      calcFirstNumber.textContent = (parse(calcState.firstNumber) * 1) / 100;

      calcState.firstNumber = calcFirstNumber.textContent;
      return;
    } else {
      if (Math.calcState.sign(parse(calcState.secondNumber)) === -1) {
        calcState.secondNumber = `(${(parse(calcState.secondNumber) * 1) /
          100})`;
        calcSecondNumber.textContent = calcState.secondNumber;

        return;
      }

      calcSecondNumber.textContent = (parse(calcState.secondNumber) * 1) / 100;

      calcState.secondNumber = calcSecondNumber.textContent;
      return;
    }
  }

  // Set calcState.sign
  if (trimEvt !== '=' && trimEvt !== 'AC' && trimEvt !== '+/-') {
    //Concat string for multiple math operations
    if (
      calcState.firstNumber !== '' &&
      calcState.secondNumber !== '' &&
      calcState.sign !== ''
    ) {
      calcState.accumulator =
        calcState.firstNumber + calcState.sign + calcState.secondNumber;
      calcState.firstNumber =
        calcState.firstNumber + calcState.sign + calcState.secondNumber;

      calcState.secondNumber = '';
      calcFirstNumber.textContent = calcState.firstNumber;
      calcSecondNumber.textContent = '';
    }
    calcState.sign = trimEvt;
    calcSign.textContent = calcState.sign;
    return;
  }

  // AC button
  if (trimEvt === 'AC') {
    clearAll();
    calcSign.textContent = '0';
  }
  if (
    ((calcState.firstNumber === '' || calcState.firstNumber === '0') &&
      calcState.sign !== '' &&
      calcState.secondNumber === '') ||
    (calcState.firstNumber !== '' &&
      calcState.sign === '' &&
      calcState.secondNumber === '')
  ) {
    return;
  }
  //Math;
  if (trimEvt === '=') {
    if (calcState.secondNumber === '')
      calcState.secondNumber = calcState.firstNumber;
    if (calcState.firstNumber === '') calcState.firstNumber = '0';

    if (calcState.accumulator !== '') {
      calcState.result = parse(calcState.accumulator);
      if (calcState.result === Infinity || calcState.result === -Infinity) {
        calcState.result = 'Error';
        calcFirstNumber.textContent = calcState.result;
        calcState.firstNumber = '0';
        calcState.accumulator = '';
        calcState.secondNumber = '';
        calcSecondNumber.textContent = '';
        calcState.sign = '';
        calcSign.textContent = '';
        return;
      }
      if (
        !Number.isInteger(calcState.result) &&
        String(calcState.result).length > 7
      ) {
        calcState.result = parseFloat(calcState.result.toFixed(5));
      }
      calcFirstNumber.textContent = calcState.result;
      calcState.firstNumber = calcFirstNumber.textContent;
      calcState.accumulator = calcFirstNumber.textContent;
      calcState.secondNumber = '';
      calcSecondNumber.textContent = '';
      calcState.sign = '';
      calcSign.textContent = '';

      return;
    } else {
      calcState.result = parse(
        calcState.firstNumber + calcState.sign + calcState.secondNumber
      );
      if (calcState.result === Infinity || calcState.result === -Infinity) {
        calcState.result = 'Error';
        calcFirstNumber.textContent = calcState.result;
        calcState.firstNumber = '0';
        calcState.accumulator = '';
        calcState.secondNumber = '';
        calcSecondNumber.textContent = '';
        calcState.sign = '';
        calcSign.textContent = '';
        return;
      }
      if (
        !Number.isInteger(calcState.result) &&
        String(calcState.result).length > 7
      ) {
        calcState.result = parseFloat(calcState.result.toFixed(5));
      }
      calcFirstNumber.textContent = calcState.result;
      calcState.firstNumber = calcFirstNumber.textContent;
      calcState.accumulator = calcFirstNumber.textContent;
      calcState.secondNumber = '';
      calcSecondNumber.textContent = '';
      calcState.sign = '';
      calcSign.textContent = '';
    }
  }

  calcState.secondNumber = '';
  calcSecondNumber.textContent = '';
  calcState.sign = '';
  calcSign.textContent = '';
}
export default handleClickFunctions;
