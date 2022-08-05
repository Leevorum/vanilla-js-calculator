import { calcState } from './refs';
import clearAll from './functions/cleaAll';
import fontSizeChanger from './fontSizeChanger';
import setNumber from './setNumber';

function handleClickNumbers(evt) {
  if (evt.target.nodeName !== 'BUTTON') {
    return;
  }

  const trimEvt = evt.target.textContent.trim();

  fontSizeChanger();

  // Clear result after Math for new values.
  if (calcState.result !== '' && calcState.sign === '') {
    clearAll();
  }

  setNumber(trimEvt);
}
export default handleClickNumbers;
