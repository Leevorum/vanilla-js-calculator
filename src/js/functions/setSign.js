import getRefs, { calcState } from '../refs';

const { calcFirstNumber, calcSecondNumber, calcSign } = getRefs();

export default function setSign(evt) {
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
  calcState.sign = evt;
  calcSign.textContent = calcState.sign;
}
