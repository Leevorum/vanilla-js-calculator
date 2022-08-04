import getRefs, { calcState, numbersArray } from './refs';
import clearAll from './cleaAll';

const { calcFirstNumber, calcSecondNumber, calculatorViewWrapper } = getRefs();

function handleKeyboardNubmers(evt) {
  if (numbersArray.includes(evt.key)) {
    if (document.querySelector(`[data-action="${evt.key}"]`)) {
      document
        .querySelector(`[data-action="${evt.key}"]`)
        .classList.add('btn-active');
    }
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
    // Clear resul
    // Clear calcState.result after Math for new values.
    if (calcState.result !== '' && calcState.sign === '') {
      clearAll();
    }
    //Set first number if second number and calcState.sign are empty
    if (calcState.secondNumber === '' && calcState.sign === '') {
      //Prevent few 0
      if (calcState.firstNumber === '' && evt.key === '.') {
        calcState.firstNumber = '0.';
      }
      //Delete 0 from calcViev
      if (calcState.firstNumber === '0' && evt.key !== '.') {
        calcState.firstNumber = '';
      }
      if (calcState.firstNumber === '') {
        calcFirstNumber.textContent = '';
      }
      //Prevent few 0
      if (calcState.firstNumber === '0' && evt.key === '0') {
        return;
      }

      if (evt.key === '.' && calcFirstNumber.textContent.indexOf('.') >= 0) {
        // Only one dot in calcView
        return;
      }
      //Set First number
      calcState.firstNumber += evt.key;
      calcFirstNumber.textContent += evt.key;
    } else {
      //Set second number
      //
      if (calcState.secondNumber === '0' && evt.key !== '.') {
        calcState.secondNumber = evt.key;

        calcSecondNumber.textContent = calcState.secondNumber;
        return;
      }
      if (calcState.secondNumber === '' && evt.key === '.') {
        calcState.secondNumber = '0.';

        calcSecondNumber.textContent += calcState.secondNumber;
        return;
      }
      //Prevent few 0
      if (calcState.secondNumber === '0' && evt.key === '0') {
        return;
      }

      if (evt.key === '.' && calcSecondNumber.textContent.indexOf('.') >= 0) {
        // Only one dot in calcView
        return;
      }
      calcState.secondNumber += evt.key;
      calcSecondNumber.textContent += evt.key;
      if (calcState.accumulator !== '') {
        calcState.accumulator += calcState.sign;
        calcState.accumulator += calcState.secondNumber;
      }
    }
  }
}
export default handleKeyboardNubmers;
