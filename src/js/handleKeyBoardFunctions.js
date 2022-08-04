import getRefs, { calcState, functionsArray } from './refs';
import parse from './parse';
import clearAll from './cleaAll';

const { calcFirstNumber, calcSecondNumber, calcSign } = getRefs();

function handleKeyBoardFunctions(evt) {
  if (functionsArray.includes(evt.key)) {
    if (evt.key === 'Enter') {
      document.querySelector(`[data-action="="]`).classList.add('btn-active');
    } else {
      document
        .querySelector(`[data-action="${evt.key}"]`)
        .classList.add('btn-active');
    }

    // Percents in numbers
    if (evt.key === '%') {
      if (calcState.firstNumber !== '' && calcState.secondNumber === '') {
        if (Math.calcState.sign(parse(calcState.firstNumber)) === -1) {
          calcState.firstNumber = `(${(parse(calcState.firstNumber) * 1) /
            100})`;
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

        calcSecondNumber.textContent =
          (parse(calcState.secondNumber) * 1) / 100;

        calcState.secondNumber = calcSecondNumber.textContent;
        return;
      }
    }

    // Set calcState.sign
    if (evt.key !== '=' && evt.key !== 'Clear' && evt.key !== 'Enter') {
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
      calcState.sign = evt.key;
      calcSign.textContent = calcState.sign;
      return;
    }

    // AC button
    if (evt.key === 'Clear') {
      clearAll();
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
    if (evt.key === '=' || evt.key === 'Enter') {
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
}
export default handleKeyBoardFunctions;
