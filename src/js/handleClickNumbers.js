import getRefs, { calcState } from './refs';
import clearAll from './cleaAll';

const { calcFirstNumber, calcSecondNumber, calculatorViewWrapper } = getRefs();

function handleClickNumbers(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }

  const trimEvt = evt.target.textContent.trim();

  if (
    calcState.firstNumber.length +
      calcState.secondNumber.length +
      calcState.result.length >
    11
  ) {
    calculatorViewWrapper.classList.add('large-font');
  }
  if (
    calcState.firstNumber.length +
      calcState.secondNumber.length +
      calcState.result.length >
    19
  ) {
    calculatorViewWrapper.classList.add('medium-font');
    calculatorViewWrapper.classList.remove('large-font');
  }
  if (
    calcState.firstNumber.length +
      calcState.secondNumber.length +
      calcState.result.length >
    26
  ) {
    calculatorViewWrapper.classList.add('small-font');
    calculatorViewWrapper.classList.remove('medium-font');
  }
  // Clear result after Math for new values.
  if (calcState.result !== '' && calcState.sign === '') {
    clearAll();
  }
  //Set first number if second number and sign are empty
  if (calcState.secondNumber === '' && calcState.sign === '') {
    if (calcState.firstNumber === '' && trimEvt === '.') {
      calcState.firstNumber = '0.';
    }
    //Delete 0 from calcViev
    if (calcState.firstNumber === '0' && trimEvt !== '.') {
      calcState.firstNumber = '';
    }
    if (calcState.firstNumber === '') {
      calcFirstNumber.textContent = '';
    }
    //Prevent few 0
    if (calcState.firstNumber === '0' && trimEvt === '0') {
      return;
    }

    if (trimEvt === '.' && calcFirstNumber.textContent.indexOf('.') >= 0) {
      // Only one dot in calcView
      return;
    }
    //Set First number
    calcState.firstNumber += trimEvt;
    calcFirstNumber.textContent += trimEvt;
  } else {
    //Set second number
    //
    if (calcState.secondNumber === '0' && trimEvt !== '.') {
      calcState.secondNumber = trimEvt;

      calcSecondNumber.textContent = calcState.secondNumber;
      return;
    }
    if (calcState.secondNumber === '' && trimEvt === '.') {
      calcState.secondNumber = '0.';

      calcSecondNumber.textContent += calcState.secondNumber;
      return;
    }
    //Prevent few 0
    if (calcState.secondNumber === '0' && trimEvt === '0') {
      return;
    }

    if (trimEvt === '.' && calcSecondNumber.textContent.indexOf('.') >= 0) {
      // Only one dot in calcView
      return;
    }
    calcState.secondNumber += trimEvt;
    calcSecondNumber.textContent += trimEvt;
    if (calcState.accumulator !== '') {
      calcState.accumulator += calcState.sign;
      calcState.accumulator += calcState.secondNumber;
    }
  }
}
export default handleClickNumbers;
