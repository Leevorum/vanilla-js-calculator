import getRefs, { calcState } from '../refs';
import parse from './parse';

const { calcFirstNumber, calcSecondNumber, calcSign } = getRefs();

export default function percentsFunction() {
  if (calcState.firstNumber !== '' && calcState.secondNumber === '') {
    if (Math.sign(parse(calcState.firstNumber)) === -1) {
      calcState.firstNumber = `(${(parse(calcState.firstNumber) * 1) / 100})`;
      calcFirstNumber.textContent = calcState.firstNumber;

      return;
    }
    calcFirstNumber.textContent = (parse(calcState.firstNumber) * 1) / 100;

    calcState.firstNumber = calcFirstNumber.textContent;
    return;
  } else {
    if (Math.sign(parse(calcState.secondNumber)) === -1) {
      calcState.secondNumber = `(${(parse(calcState.secondNumber) * 1) / 100})`;
      calcSecondNumber.textContent = calcState.secondNumber;

      return;
    }

    calcSecondNumber.textContent = (parse(calcState.secondNumber) * 1) / 100;

    calcState.secondNumber = calcSecondNumber.textContent;
    return;
  }
}
