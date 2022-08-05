import { calcState, functionsArray } from './refs';
import clearAll from './functions/cleaAll';
import calcMath from './functions/calcMath';
import percentsFunction from './functions/percentsFunction';
import setSign from './functions/setSign';

function handleKeyBoardFunctions(evt) {
  if (functionsArray.includes(evt.key)) {
    //Add syles when clicking buttons
    if (evt.key === 'Enter') {
      document.querySelector(`[data-action="="]`).classList.add('btn-active');
    } else {
      document
        .querySelector(`[data-action="${evt.key}"]`)
        .classList.add('btn-active');
    }

    // Percents in numbers
    if (evt.key === '%') {
      percentsFunction();
      return;
    }

    // Set calcState.sign
    if (
      evt.key !== '=' &&
      evt.key !== 'Clear' &&
      evt.key !== 'Enter' &&
      evt.key !== '%'
    ) {
      //Concat string for multiple math operations
      setSign(evt.key);
      return;
    }

    // AC button
    if (evt.key === 'Clear') {
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
    if (evt.key === '=' || evt.key === 'Enter') {
      calcMath();
    }
  }
}
export default handleKeyBoardFunctions;
