import { functionsArray, numbersArray } from './refs';

const hanldeKeyUp = evt => {
  if (numbersArray.includes(evt.key) || functionsArray.includes(evt.key)) {
    if (evt.key === 'Enter') {
      document
        .querySelector(`[data-action="="]`)
        .classList.remove('btn-active');
      return;
    }
    document
      .querySelector(`[data-action="${evt.key}"]`)
      .classList.remove('btn-active');
  }
};
export default hanldeKeyUp;
