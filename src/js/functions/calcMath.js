import getRefs, { calcState } from '../refs';
import parse from './parse';

const { calcFirstNumber, calcSecondNumber, calcSign } = getRefs();

export default function calcMath() {
  if (calcState.secondNumber === '') {
    calcState.secondNumber = calcState.firstNumber;
  }
  if (calcState.firstNumber === '') {
    calcState.firstNumber = '0';
  }

  if (calcState.accumulator !== '') {
    calcState.result = parse(calcState.accumulator);

    infinityCheck();
    roundNumbers();
    setCalcState();

    return;
  } else {
    calcState.result = parse(
      calcState.firstNumber + calcState.sign + calcState.secondNumber
    );

    infinityCheck();
    roundNumbers();
    setCalcState();
  }

  calcState.secondNumber = '';
  calcSecondNumber.textContent = '';
  calcState.sign = '';
  calcSign.textContent = '';
}

function setCalcState() {
  calcFirstNumber.textContent = calcState.result;
  calcState.firstNumber = calcFirstNumber.textContent;
  calcState.secondNumber = '';
  calcState.accumulator = '';
  calcSecondNumber.textContent = '';
  calcState.sign = '';
  calcSign.textContent = '';
}

function infinityCheck() {
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
}

function roundNumbers() {
  if (
    !Number.isInteger(calcState.result) &&
    String(calcState.result).length > 7
  ) {
    calcState.result = parseFloat(calcState.result.toFixed(5));
  }
}
