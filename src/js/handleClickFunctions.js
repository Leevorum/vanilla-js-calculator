import getRefs, { calcState } from './refs';
import calcMath from './functions/calcMath';
import parse from './functions/parse';
import clearAll from './functions/cleaAll';
import percentsFunction from './functions/percentsFunction';
import setSign from './functions/setSign';

const { calcFirstNumber, calcSecondNumber } = getRefs();

function handleClickFunctions(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }

  const trimEvt = evt.target.textContent.trim();

  // Function +-/
  if (trimEvt === '+/-') {
    if (calcState.firstNumber !== '' && calcState.secondNumber !== '') {
      if (Math.sign(parse(calcState.secondNumber)) === -1) {
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
    if (Math.sign(parse(calcState.firstNumber)) === -1) {
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
    percentsFunction();
    return;
  }

  // Set calcState.sign
  if (trimEvt !== '=' && trimEvt !== 'AC' && trimEvt !== '+/-') {
    //Concat string for multiple math operations
    setSign(trimEvt);
    return;
  }

  // AC button
  if (trimEvt === 'AC') {
    clearAll();
  }
  //Prevent calculations if numbers are empty
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
    calcMath();
  }
}
export default handleClickFunctions;
