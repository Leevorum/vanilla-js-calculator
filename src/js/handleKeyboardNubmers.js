import { calcState, numbersArray } from './refs';
import clearAll from './functions/cleaAll';
import fontSizeChanger from './fontSizeChanger';
import setNumber from './setNumber';

function handleKeyboardNubmers(evt) {
  if (numbersArray.includes(evt.key)) {
    if (document.querySelector(`[data-action="${evt.key}"]`)) {
      document
        .querySelector(`[data-action="${evt.key}"]`)
        .classList.add('btn-active');
    }
    fontSizeChanger();

    // Clear result
    // Clear calcState.result after Math for new values.
    if (calcState.result !== '' && calcState.sign === '') {
      clearAll();
    }

    setNumber(evt.key);
  }
}
export default handleKeyboardNubmers;
