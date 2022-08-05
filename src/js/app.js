import dragElement from './dragElement';
import getRefs from './refs';
import handleClickNumbers from './handleClickNumbers';
import handleClickFunctions from './handleClickFunctions';
import handleKeyboardNubmers from './handleKeyboardNubmers';
import handleKeyBoardFunctions from './handleKeyBoardFunctions';
import hanldeKeyUp from './hanldeKeyUp';

const { container, calculatorNumbers, calculatorFunctions } = getRefs();

export default function app() {
  calculatorNumbers.addEventListener('click', handleClickNumbers);
  calculatorFunctions.addEventListener('click', handleClickFunctions);
  document.addEventListener('keydown', handleKeyboardNubmers);
  document.addEventListener('keydown', handleKeyBoardFunctions);
  document.addEventListener('keyup', hanldeKeyUp);
}

// Make the DIV element draggable:
dragElement(container);
